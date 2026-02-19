/**
 * SAIJ Adapter - Sistema Argentino de Información Jurídica
 *
 * Public JSON API (no auth required)
 * Based on saij-mcp by hernan-cc
 */

export interface SAIJSearchResult {
  uuid: string
  type: string
  tribunal?: string
  caratula?: string
  titulo?: string
  fecha?: string
  jurisdiccion?: string
  texto?: string
  descriptores?: string[]
  url?: string
  sumarios_relacionados?: string[]
}

export interface SAIJSearchResponse {
  total: number
  offset: number
  limit: number
  results: SAIJSearchResult[]
}

export type DocumentType
  = | 'fallo'
    | 'sumario'
    | 'jurisprudencia'
    | 'legislacion'
    | 'ley'
    | 'decreto'
    | 'doctrina'
    | 'dictamen'
    | 'todo'

const SAIJ_BASE_URL = 'https://www.saij.gob.ar'

const DOC_TYPE_FACETS: Record<string, string> = {
  fallo: 'Tipo de Documento/Jurisprudencia/Fallo',
  sumario: 'Tipo de Documento/Jurisprudencia/Sumario',
  jurisprudencia: 'Tipo de Documento/Jurisprudencia',
  legislacion: 'Tipo de Documento/Legislación',
  ley: 'Tipo de Documento/Legislación/Ley',
  decreto: 'Tipo de Documento/Legislación/Decreto',
  doctrina: 'Tipo de Documento/Doctrina',
  dictamen: 'Tipo de Documento/Dictamen',
  todo: 'Tipo de Documento'
}

function buildFacets(docType: DocumentType): string {
  const parts = ['Total']
  if (docType && DOC_TYPE_FACETS[docType]) {
    parts.push(DOC_TYPE_FACETS[docType])
  }
  parts.push('Fecha', 'Tribunal', 'Jurisdicción')
  return parts.join('|')
}

function parseResult(raw: Record<string, unknown>): SAIJSearchResult {
  const abstractStr = raw.documentAbstract as string
  const abstract = JSON.parse(abstractStr)
  const meta = abstract.document.metadata
  const content = abstract.document.content
  const furl = meta['friendly-url'] || {}

  const result: SAIJSearchResult = {
    uuid: meta.uuid,
    type: meta['document-content-type'] || ''
  }

  // Common fields
  if (content.tribunal) result.tribunal = content.tribunal
  if (content.actor) result.caratula = content.actor
  if (content.titulo) result.titulo = content.titulo
  if (content.fecha) result.fecha = content.fecha
  if (content.texto) result.texto = content.texto

  // Jurisdiction
  if (content.jurisdiccion) {
    result.jurisdiccion = typeof content.jurisdiccion === 'object'
      ? content.jurisdiccion.descripcion
      : content.jurisdiccion
  }

  // Descriptors
  if (content.descriptores?.descriptor) {
    const dl = Array.isArray(content.descriptores.descriptor)
      ? content.descriptores.descriptor
      : [content.descriptores.descriptor]
    result.descriptores = dl.map((d: Record<string, unknown>) =>
      (d.elegido as Record<string, string>)?.termino || ''
    ).filter(Boolean)
  }

  // Related sumarios
  const sr = content['sumarios-relacionados']
  if (sr?.['sumario-relacionado']) {
    const ids = sr['sumario-relacionado']
    result.sumarios_relacionados = Array.isArray(ids) ? ids : [ids]
  }

  // URL
  if (furl.subdomain && furl.description) {
    result.url = `${SAIJ_BASE_URL}/${furl.subdomain}/${furl.description}/${meta.uuid}`
  }

  return result
}

/**
 * Search SAIJ database
 */
export async function searchSAIJ(
  query: string,
  options: {
    tipo?: DocumentType
    limit?: number
    offset?: number
    campo?: 'titulo' | 'texto'
  } = {}
): Promise<SAIJSearchResponse> {
  const {
    tipo = 'jurisprudencia',
    limit = 20,
    offset = 0,
    campo = 'titulo'
  } = options

  const safeLimit = Math.max(1, Math.min(25, limit))

  const params = new URLSearchParams({
    r: `+${campo}: ${query}`,
    o: String(offset),
    p: String(safeLimit),
    f: buildFacets(tipo),
    v: 'colapsada'
  })

  try {
    const response = await fetch(`${SAIJ_BASE_URL}/busqueda?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`SAIJ API error: ${response.status}`)
    }

    const data = await response.json()
    const sr = data.searchResults || {}
    const docs = sr.documentResultList || []

    return {
      total: sr.totalSearchResults || 0,
      offset,
      limit: safeLimit,
      results: docs.map(parseResult)
    }
  } catch (error) {
    console.error('[SAIJ] Search error:', error)
    throw error
  }
}

/**
 * Get document by UUID or SAIJ ID (e.g., FA20000057)
 */
export async function getDocument(identifier: string): Promise<SAIJSearchResult | null> {
  let uuid = identifier

  // Resolve id-infojus to UUID if needed
  if (!identifier.startsWith('123456789')) {
    const params = new URLSearchParams({
      r: `id-infojus:${identifier}`,
      o: '0',
      p: '1',
      f: 'Total'
    })

    const response = await fetch(`${SAIJ_BASE_URL}/busqueda?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })

    if (!response.ok) return null

    const data = await response.json()
    const docs = data.searchResults?.documentResultList || []
    if (!docs.length) return null

    const abstract = JSON.parse(docs[0].documentAbstract)
    uuid = abstract.document.metadata.uuid
  }

  // Get full document
  const response = await fetch(
    `${SAIJ_BASE_URL}/view-document?guid=${encodeURIComponent(uuid)}`,
    { headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    } }
  )

  if (!response.ok) return null

  const data = await response.json()
  const doc = JSON.parse(data.data)
  const content = doc.document.content
  const meta = doc.document.metadata

  const result: SAIJSearchResult = {
    uuid,
    type: meta['document-content-type'] || ''
  }

  if (content.tribunal) result.tribunal = content.tribunal
  if (content.actor) result.caratula = content.actor
  if (content.titulo) result.titulo = content.titulo
  if (content.fecha) result.fecha = content.fecha
  if (content.texto) result.texto = content.texto
  if (content.jurisdiccion) {
    result.jurisdiccion = typeof content.jurisdiccion === 'object'
      ? content.jurisdiccion.descripcion
      : content.jurisdiccion
  }

  // URL
  const furl = meta['friendly-url'] || {}
  if (furl.subdomain && furl.description) {
    result.url = `${SAIJ_BASE_URL}/${furl.subdomain}/${furl.description}/${uuid}`
  }

  return result
}
