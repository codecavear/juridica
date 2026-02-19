export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  // If not logged in, return default limits (free tier, no usage)
  if (!session?.user?.id) {
    return {
      searchesToday: 0,
      searchesLimit: 5,
      reportsThisMonth: 0,
      reportsLimit: 3,
      plan: 'free'
    }
  }

  const { db, schema } = await import('../../database')
  const { eq, and, gte, sql } = await import('drizzle-orm')

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id)
  })

  if (!user) {
    throw createError({ statusCode: 404, message: 'Usuario no encontrado' })
  }

  // Plan limits as specified in the task
  const planLimits: Record<string, { searchesPerDay: number, reportsPerMonth: number }> = {
    free: { searchesPerDay: 5, reportsPerMonth: 3 },
    basico: { searchesPerDay: 30, reportsPerMonth: 10 },
    pro: { searchesPerDay: 100, reportsPerMonth: 30 },
    estudio: { searchesPerDay: -1, reportsPerMonth: -1 } // -1 = unlimited
  }

  const limits = planLimits[user.plan] || planLimits.free

  // Count today's searches
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [searchStats] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.searches)
    .where(
      and(
        eq(schema.searches.userId, user.id),
        gte(schema.searches.createdAt, today)
      )
    )

  // Count this month's reports
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

  const [reportStats] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.reports)
    .where(
      and(
        eq(schema.reports.userId, user.id),
        gte(schema.reports.createdAt, monthStart)
      )
    )

  return {
    searchesToday: searchStats?.count || 0,
    searchesLimit: limits.searchesPerDay,
    reportsThisMonth: reportStats?.count || 0,
    reportsLimit: limits.reportsPerMonth,
    plan: user.plan
  }
})
