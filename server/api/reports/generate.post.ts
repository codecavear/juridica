import { searchSAIJ, type DocumentType, type SAIJSearchResult } from '../../utils/saij'

const planLimits: Record<string, { searchesPerDay: number, reportsPerMonth: number }> = {
  free: { searchesPerDay: 3, reportsPerMonth: 1 },
  basico: { searchesPerDay: 20, reportsPerMonth: 10 },
  pro: { searchesPerDay: 100, reportsPerMonth: 30 },
  estudio: { searchesPerDay: 500, reportsPerMonth: 300 }
}

interface GenerateReportBody {
  query?: string
  tipo?: DocumentType
  userId?: string
  userEmail?: string
  searchId?: string
  results?: SAIJSearchResult[]
}

interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string
    }
    finish_reason?: string
  }>
  usage?: {
    total_tokens?: number
  }
}

function buildPrompt(query: string, docs: SAIJSearchResult[]) {
  const compactDocs = docs.slice(0, 5).map((d, i) => ({
    id: d.uuid,
    titulo: d.titulo || d.caratula || `Documento ${i + 1}`,
    fecha: d.fecha || null,
    tribunal: d.tribunal || null,
    jurisdiccion: d.jurisdiccion || null,
    extracto: (d.texto || '').slice(0, 350),
    url: d.url || null
  }))

  return `Sos un asistente legal argentino. Tu tarea es generar un reporte de jurisprudencia CON FUENTES VERIFICABLES.

REGLAS OBLIGATORIAS:
- NO inventes fallos, citas ni doctrina.
- Usá EXCLUSIVAMENTE los documentos provistos.
- Si falta evidencia, decilo explícitamente.
- Siempre citá con título y URL cuando esté disponible.
- Respuesta en español rioplatense profesional.

Consulta del usuario: "${query}"

Documentos SAIJ disponibles (JSON):
${JSON.stringify(compactDocs, null, 2)}

Devolvé SOLO JSON válido con este formato:
{
  "title": "string",
  "summary": "string",
  "keyFindings": ["string"],
  "arguments": [
    {
      "point": "string",
      "support": "string",
      "sourceId": "uuid"
    }
  ],
  "risks": ["string"],
  "recommendations": ["string"],
  "practicalUse": ["string - por qué este análisis le importa al abogado en la práctica"],
  "citations": [
    {
      "id": "uuid",
      "titulo": "string",
      "url": "string",
      "extracto": "string"
    }
  ],
  "disclaimer": "string"
}`
}

async function getDbContext() {
  if (!process.env.DATABASE_URL) return null

  try {
    const mod = await import('../../database')
    return { db: mod.db, schema: mod.schema }
  } catch (error) {
    console.warn('[Reports] DB unavailable, continuing without persistence:', error)
    return null
  }
}

async function ensureUserId(dbCtx: Awaited<ReturnType<typeof getDbContext>>, userId?: string, userEmail?: string) {
  if (userId) return userId
  if (!dbCtx) return null

  const email = userEmail?.trim().toLowerCase()
  if (!email) return null

  const existing = await dbCtx.db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email)
  })

  if (existing) return existing.id

  const [created] = await dbCtx.db.insert(dbCtx.schema.users)
    .values({
      email,
      name: email.split('@')[0]
    })
    .returning({ id: dbCtx.schema.users.id })

  return created?.id || null
}

function repairTruncatedJson(
  raw: string,
  query: string,
  sourceResults: SAIJSearchResult[]
): Record<string, unknown> {
  let jsonStr = raw.trim()

  const fenced = jsonStr.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced?.[1]) jsonStr = fenced[1].trim()

  const objStart = jsonStr.indexOf('{')
  if (objStart >= 0) jsonStr = jsonStr.slice(objStart)

  // Strip trailing incomplete content back to the last complete value
  // Then close all open brackets/braces
  function tryBalancedRepair(str: string): Record<string, unknown> | null {
    // Trim back to the last cleanly closed value boundary
    const cutpoints = [
      str.lastIndexOf(',"'),
      str.lastIndexOf(', "'),
      str.lastIndexOf('",'),
      str.lastIndexOf('"},'),
      str.lastIndexOf('}],'),
      str.lastIndexOf('"],'),
      str.lastIndexOf('}]')
    ]

    const candidates = [
      str,
      ...cutpoints.filter(i => i > 0).sort((a, b) => b - a).map(i => str.slice(0, i))
    ]

    for (const base of candidates) {
      // Close any open string (count unescaped quotes)
      let unescaped = 0
      for (let i = 0; i < base.length; i++) {
        if (base[i] === '"' && (i === 0 || base[i - 1] !== '\\')) unescaped++
      }
      let closed = unescaped % 2 !== 0 ? base + '"' : base

      // Remove trailing colon or comma that would be invalid
      closed = closed.replace(/[,:]\s*$/, '')

      // Balance brackets and braces
      const openBrackets = (closed.match(/\[/g) || []).length - (closed.match(/\]/g) || []).length
      const openBraces = (closed.match(/\{/g) || []).length - (closed.match(/\}/g) || []).length

      for (let i = 0; i < openBrackets; i++) closed += ']'
      for (let i = 0; i < openBraces; i++) closed += '}'

      try {
        return JSON.parse(closed) as Record<string, unknown>
      } catch {
        // Try next cutpoint
      }
    }
    return null
  }

  const repaired = tryBalancedRepair(jsonStr)
  if (repaired) {
    console.info('[Reports] Repaired truncated JSON successfully')
    return repaired
  }

  // Last resort: extract completed fields with regex
  const extractField = (field: string): string | null => {
    const match = raw.match(new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`, 's'))
    return match?.[1] || null
  }

  const extractArray = (field: string): string[] => {
    const match = raw.match(new RegExp(`"${field}"\\s*:\\s*\\[(.*?)\\]`, 's'))
    if (!match?.[1]) return []
    const items: string[] = []
    const itemRegex = /"((?:[^"\\]|\\.)*)"/g
    let m
    while ((m = itemRegex.exec(match[1])) !== null) {
      items.push(m[1])
    }
    return items
  }

  console.warn('[Reports] JSON repair failed, extracting fields with regex')

  return {
    title: extractField('title') || `Reporte: ${query}`,
    summary: extractField('summary') || 'No se pudo procesar el resumen completo.',
    keyFindings: extractArray('keyFindings'),
    arguments: [],
    risks: extractArray('risks').length
      ? extractArray('risks')
      : ['La respuesta IA fue truncada o malformada.'],
    recommendations: extractArray('recommendations').length
      ? extractArray('recommendations')
      : ['Regenerar reporte con los mismos documentos.'],
    practicalUse: extractArray('practicalUse'),
    citations: sourceResults.slice(0, 8).map(r => ({
      id: r.uuid,
      titulo: r.titulo || r.caratula || r.uuid,
      url: r.url || '',
      extracto: (r.texto || '').slice(0, 280)
    })),
    disclaimer: 'Este reporte es informativo y no reemplaza asesoramiento legal profesional.'
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody<GenerateReportBody>(event)

  const query = body?.query?.trim()
  if (!query || query.length < 2) {
    throw createError({
      statusCode: 400,
      message: 'query is required (min 2 chars)'
    })
  }

  const openaiApiKey = process.env.OPENAI_API_KEY || config.openaiApiKey
  if (!openaiApiKey) {
    throw createError({
      statusCode: 500,
      message: 'OPENAI_API_KEY is not configured'
    })
  }

  const tipo: DocumentType = body?.tipo || 'jurisprudencia'

  const dbCtx = await getDbContext()

  // Get user session and check limits BEFORE expensive AI call
  const session = await getUserSession(event)
  let sessionUserId: string | null = null

  if (session?.user?.id) {
    sessionUserId = session.user.id

    if (dbCtx) {
      const { eq, and, gte, sql } = await import('drizzle-orm')

      // Get user and their plan
      const user = await dbCtx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, sessionUserId)
      })

      if (user) {
        const limits = planLimits[user.plan] || planLimits.free

        // Only enforce limit if not unlimited (-1)
        if (limits.reportsPerMonth !== -1) {
          // Count this month's reports
          const today = new Date()
          const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

          const [reportStats] = await dbCtx.db
            .select({ count: sql<number>`count(*)::int` })
            .from(dbCtx.schema.reports)
            .where(
              and(
                eq(dbCtx.schema.reports.userId, sessionUserId),
                gte(dbCtx.schema.reports.createdAt, monthStart)
              )
            )

          const reportsThisMonth = reportStats?.count || 0

          // Check if user exceeded their monthly limit
          if (reportsThisMonth >= limits.reportsPerMonth) {
            throw createError({
              statusCode: 429,
              message: `Has alcanzado tu límite de ${limits.reportsPerMonth} análisis IA mensuales. Actualizá tu plan para continuar.`
            })
          }
        }
      }
    }
  }

  // Input sources priority: explicit results -> searchId -> fresh search
  let sourceResults: SAIJSearchResult[] = []

  if (Array.isArray(body?.results) && body.results.length) {
    sourceResults = body.results
  } else if (body?.searchId && dbCtx) {
    const searchRecord = await dbCtx.db.query.searches.findFirst({
      where: (s, { eq }) => eq(s.id, body.searchId as string)
    })

    if (searchRecord?.query) {
      const saij = await searchSAIJ(searchRecord.query, { tipo, limit: 12, offset: 0 })
      sourceResults = saij.results
    }
  } else {
    const saij = await searchSAIJ(query, { tipo, limit: 12, offset: 0 })
    sourceResults = saij.results
  }

  if (!sourceResults.length) {
    throw createError({
      statusCode: 404,
      message: 'No SAIJ results available for report generation'
    })
  }

  const prompt = buildPrompt(query, sourceResults)

  const aiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      temperature: 0.2,
      max_tokens: 2500,
      messages: [
        {
          role: 'system',
          content: 'Sos un analista legal argentino extremadamente estricto con fuentes. Nunca inventes citas.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  })

  if (!aiResponse.ok) {
    const errorText = await aiResponse.text()
    console.error('[Reports] OpenAI error:', aiResponse.status, errorText)
    throw createError({
      statusCode: 502,
      message: `OpenAI error (${aiResponse.status})`
    })
  }

  const aiData = await aiResponse.json() as OpenAIResponse
  const rawContent = aiData?.choices?.[0]?.message?.content
  const finishReason = aiData?.choices?.[0]?.finish_reason

  if (!rawContent) {
    throw createError({
      statusCode: 502,
      message: 'OpenAI returned empty content'
    })
  }

  if (finishReason === 'length') {
    console.warn('[Reports] OpenAI response was truncated (finish_reason=length)')
  }

  let parsed: Record<string, unknown>
  try {
    // OpenAI sometimes wraps JSON in markdown code fences — strip them
    let jsonContent = rawContent.trim()
    const fenced = jsonContent.match(/```(?:json)?\s*([\s\S]*?)```/i)
    if (fenced?.[1]) jsonContent = fenced[1].trim()

    if (!jsonContent.startsWith('{')) {
      const start = jsonContent.indexOf('{')
      const end = jsonContent.lastIndexOf('}')
      if (start >= 0 && end > start) jsonContent = jsonContent.slice(start, end + 1)
    }

    parsed = JSON.parse(jsonContent)
  } catch {
    // Try to repair truncated JSON before giving up
    parsed = repairTruncatedJson(rawContent, query, sourceResults)
  }

  const citations = Array.isArray(parsed.citations)
    ? parsed.citations as Array<{ id: string, titulo: string, url: string, extracto: string }>
    : sourceResults.slice(0, 8).map(r => ({
        id: r.uuid,
        titulo: r.titulo || r.caratula || r.uuid,
        url: r.url || '',
        extracto: (r.texto || '').slice(0, 280)
      }))

  // Use session userId first, fallback to body params for backwards compatibility
  const userId = sessionUserId || await ensureUserId(dbCtx, body?.userId, body?.userEmail)

  let reportId: string | null = null

  if (userId && dbCtx) {
    const title = typeof parsed.title === 'string' ? parsed.title : `Reporte: ${query}`

    const [saved] = await dbCtx.db.insert(dbCtx.schema.reports)
      .values({
        userId,
        title,
        query,
        content: JSON.stringify(parsed),
        citations,
        tokensUsed: aiData?.usage?.total_tokens || 0
      })
      .returning({ id: dbCtx.schema.reports.id })

    reportId = saved?.id || null
  }

  return {
    ok: true,
    model: 'gpt-4.1-mini',
    query,
    tipo,
    reportId,
    report: parsed,
    citations,
    sourceCount: sourceResults.length,
    tokensUsed: aiData?.usage?.total_tokens || 0,
    disclaimer: 'Resultado orientativo. Verificá siempre las fuentes oficiales antes de usar en escritos judiciales.'
  }
})
