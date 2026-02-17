import { searchSAIJ, type DocumentType, type SAIJSearchResult } from '../../utils/saij'

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
  }>
  usage?: {
    total_tokens?: number
  }
}

function buildPrompt(query: string, docs: SAIJSearchResult[]) {
  const compactDocs = docs.slice(0, 8).map((d, i) => ({
    id: d.uuid,
    titulo: d.titulo || d.caratula || `Documento ${i + 1}`,
    fecha: d.fecha || null,
    tribunal: d.tribunal || null,
    jurisdiccion: d.jurisdiccion || null,
    extracto: (d.texto || '').slice(0, 800),
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
      Authorization: `Bearer ${openaiApiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      temperature: 0.2,
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

  if (!rawContent) {
    throw createError({
      statusCode: 502,
      message: 'OpenAI returned empty content'
    })
  }

  let parsed: Record<string, unknown>
  try {
    parsed = JSON.parse(rawContent)
  } catch {
    // Fallback: still return usable payload with strict citations from source
    parsed = {
      title: `Reporte: ${query}`,
      summary: rawContent,
      keyFindings: [],
      arguments: [],
      risks: ['La respuesta IA no vino en JSON válido. Revisar prompt/parseo.'],
      recommendations: ['Regenerar reporte con los mismos documentos.'],
      citations: sourceResults.slice(0, 8).map((r) => ({
        id: r.uuid,
        titulo: r.titulo || r.caratula || r.uuid,
        url: r.url || '',
        extracto: (r.texto || '').slice(0, 280)
      })),
      disclaimer: 'Este reporte es informativo y no reemplaza asesoramiento legal profesional.'
    }
  }

  const citations = Array.isArray(parsed.citations)
    ? parsed.citations as Array<{ id: string, titulo: string, url: string, extracto: string }>
    : sourceResults.slice(0, 8).map((r) => ({
      id: r.uuid,
      titulo: r.titulo || r.caratula || r.uuid,
      url: r.url || '',
      extracto: (r.texto || '').slice(0, 280)
    }))

  const userId = await ensureUserId(dbCtx, body?.userId, body?.userEmail)

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
