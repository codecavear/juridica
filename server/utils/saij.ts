/**
 * SAIJ Adapter - Sistema Argentino de Información Jurídica
 * 
 * Public JSON API (no auth required)
 * Docs: https://www.saij.gob.ar
 */

export interface SAIJSearchResult {
  id: string
  tipo: string
  titulo: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  sumario?: string
  url: string
  pdfUrl?: string
}

export interface SAIJDocument {
  id: string
  tipo: string
  titulo: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  magistrados?: string[]
  sumarios?: string[]
  texto?: string
  pdfUrl?: string
  url: string
}

export type DocumentType = 
  | 'fallo'
  | 'sumario'
  | 'jurisprudencia'
  | 'legislacion'
  | 'ley'
  | 'decreto'
  | 'doctrina'
  | 'dictamen'
  | 'todo'

const SAIJ_BASE_URL = 'https://www.saij.gob.ar'

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
): Promise<SAIJSearchResult[]> {
  const {
    tipo = 'jurisprudencia',
    limit = 20,
    offset = 0,
    campo = 'titulo'
  } = options

  // Build Lucene-style query
  const params = new URLSearchParams({
    q: query,
    rows: String(limit),
    start: String(offset),
    wt: 'json'
  })

  // Add document type filter
  if (tipo !== 'todo') {
    params.append('fq', `tipo:${tipo}`)
  }

  // Add field filter
  if (campo) {
    params.append('qf', campo)
  }

  try {
    const response = await fetch(`${SAIJ_BASE_URL}/busqueda?${params}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Juridica/1.0 (https://juridica.ar)'
      }
    })

    if (!response.ok) {
      throw new Error(`SAIJ API error: ${response.status}`)
    }

    const data = await response.json()
    
    // Parse results
    const docs = data.response?.docs || []
    
    return docs.map((doc: Record<string, unknown>) => ({
      id: doc.id_infojus || doc.id,
      tipo: doc.tipo || 'desconocido',
      titulo: doc.titulo || doc.caratula || 'Sin título',
      fecha: doc.fecha_sancion || doc.fecha_publicacion || doc.fecha,
      tribunal: doc.tribunal || doc.organismo,
      jurisdiccion: doc.jurisdiccion,
      sumario: doc.sumario || doc.texto_sumario,
      url: `${SAIJ_BASE_URL}/documento/${doc.id_infojus || doc.id}`,
      pdfUrl: doc.pdf_url || doc.url_pdf
    }))
  } catch (error) {
    console.error('[SAIJ] Search error:', error)
    throw error
  }
}

/**
 * Get document by SAIJ ID
 */
export async function getDocument(id: string): Promise<SAIJDocument | null> {
  try {
    const response = await fetch(`${SAIJ_BASE_URL}/documento/${id}?wt=json`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Juridica/1.0 (https://juridica.ar)'
      }
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`SAIJ API error: ${response.status}`)
    }

    const doc = await response.json()
    
    return {
      id: doc.id_infojus || doc.id,
      tipo: doc.tipo,
      titulo: doc.titulo || doc.caratula,
      fecha: doc.fecha_sancion || doc.fecha_publicacion,
      tribunal: doc.tribunal || doc.organismo,
      jurisdiccion: doc.jurisdiccion,
      magistrados: doc.magistrados || [],
      sumarios: doc.sumarios || [],
      texto: doc.texto,
      pdfUrl: doc.pdf_url || doc.url_pdf,
      url: `${SAIJ_BASE_URL}/documento/${id}`
    }
  } catch (error) {
    console.error('[SAIJ] Get document error:', error)
    throw error
  }
}

/**
 * Get sumarios linked to a fallo
 */
export async function getSumarios(falloId: string): Promise<SAIJSearchResult[]> {
  return searchSAIJ(`fallo_id:${falloId}`, { tipo: 'sumario', limit: 50 })
}
