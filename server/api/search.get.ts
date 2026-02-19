import { searchSAIJ, type DocumentType } from '../utils/saij'

const planLimits: Record<string, { searchesPerDay: number, reportsPerMonth: number }> = {
  free: { searchesPerDay: 5, reportsPerMonth: 3 },
  basico: { searchesPerDay: 30, reportsPerMonth: 10 },
  pro: { searchesPerDay: 100, reportsPerMonth: 30 },
  estudio: { searchesPerDay: -1, reportsPerMonth: -1 } // -1 = unlimited
}

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

  // Get user session
  const session = await getUserSession(event)
  let userId: string | null = null
  console.log('[Search] Session:', JSON.stringify({ userId: session?.user?.id, email: session?.user?.email, hasSession: !!session }))

  // If user is logged in, check limits and track the search
  if (session?.user?.id) {
    userId = session.user.id

    const { db, schema } = await import('../database')
    const { eq, and, gte, sql } = await import('drizzle-orm')

    // Get user and their plan
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId)
    })

    if (user) {
      const limits = planLimits[user.plan] || planLimits.free

      // Only enforce limit if not unlimited (-1)
      if (limits.searchesPerDay !== -1) {
        // Count today's searches
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const [searchStats] = await db
          .select({ count: sql<number>`count(*)::int` })
          .from(schema.searches)
          .where(
            and(
              eq(schema.searches.userId, userId),
              gte(schema.searches.createdAt, today)
            )
          )

        const searchesToday = searchStats?.count || 0

        // Check if user exceeded their daily limit
        if (searchesToday >= limits.searchesPerDay) {
          throw createError({
            statusCode: 429,
            message: `Has alcanzado tu límite de ${limits.searchesPerDay} búsquedas diarias. Actualizá tu plan para continuar.`
          })
        }
      }
    }
  }

  try {
    const response = await searchSAIJ(q, { tipo, limit, offset })

    // Track the search if user is logged in
    if (userId) {
      const { db, schema } = await import('../database')
      const ipAddress = getRequestIP(event, { xForwardedFor: true })

      await db.insert(schema.searches).values({
        userId,
        query: q,
        tipo,
        resultsCount: response.results.length,
        ipAddress
      }).catch((error) => {
        console.error('[API] Failed to track search:', error?.message, 'userId:', userId, 'query:', q)
        // Don't fail the request if tracking fails
      })
    }

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
// force rebuild 1771521258
