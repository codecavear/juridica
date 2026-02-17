import { searchSAIJ, type DocumentType } from '../utils/saij'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  const q = query.q as string
  if (!q || q.trim().length < 2) {
    throw createError({
      statusCode: 400,
      message: 'Query must be at least 2 characters'
    })
  }

  const tipo = (query.tipo as DocumentType) || 'jurisprudencia'
  const limit = Math.min(Number(query.limit) || 20, 25)
  const offset = Number(query.offset) || 0

  try {
    const response = await searchSAIJ(q, { tipo, limit, offset })
    
    return {
      query: q,
      tipo,
      total: response.total,
      count: response.results.length,
      offset: response.offset,
      results: response.results
    }
  } catch (error) {
    console.error('[API] Search error:', error)
    throw createError({
      statusCode: 500,
      message: 'Error searching SAIJ'
    })
  }
})
