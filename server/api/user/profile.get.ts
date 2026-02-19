export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'No autenticado' })
  }

  const { db, schema } = await import('../../database')
  const { eq, and, gte, sql } = await import('drizzle-orm')

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id)
  })

  if (!user) {
    throw createError({ statusCode: 404, message: 'Usuario no encontrado' })
  }

  // Plan limits
  const planLimits: Record<string, { searchesPerDay: number, reportsPerMonth: number, label: string }> = {
    free: { searchesPerDay: 5, reportsPerMonth: 0, label: 'Gratis' },
    basico: { searchesPerDay: 30, reportsPerMonth: 5, label: 'Básico' },
    pro: { searchesPerDay: 100, reportsPerMonth: 20, label: 'Profesional' },
    estudio: { searchesPerDay: -1, reportsPerMonth: -1, label: 'Estudio' } // -1 = unlimited
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

  // Total searches all time
  const [totalSearches] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(schema.searches)
    .where(eq(schema.searches.userId, user.id))

  // Member since
  const memberSince = user.createdAt

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      provider: user.provider,
      createdAt: user.createdAt
    },
    plan: {
      current: user.plan,
      label: limits.label,
      source: user.planSource || 'default',
      expiresAt: user.planExpiresAt || null,
      limits: {
        searchesPerDay: limits.searchesPerDay,
        reportsPerMonth: limits.reportsPerMonth
      }
    },
    usage: {
      searchesToday: searchStats?.count || 0,
      reportsThisMonth: reportStats?.count || 0,
      totalSearches: totalSearches?.count || 0
    }
  }
})
