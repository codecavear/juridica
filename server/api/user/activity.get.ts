import { db, schema } from '../../database'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'No autenticado' })
  }

  // Recent searches (last 10)
  const searches = await db
    .select({
      id: schema.searches.id,
      query: schema.searches.query,
      tipo: schema.searches.tipo,
      resultsCount: schema.searches.resultsCount,
      createdAt: schema.searches.createdAt
    })
    .from(schema.searches)
    .where(eq(schema.searches.userId, session.user.id))
    .orderBy(desc(schema.searches.createdAt))
    .limit(10)

  // Recent reports (last 10)
  const reports = await db
    .select({
      id: schema.reports.id,
      title: schema.reports.title,
      query: schema.reports.query,
      createdAt: schema.reports.createdAt
    })
    .from(schema.reports)
    .where(eq(schema.reports.userId, session.user.id))
    .orderBy(desc(schema.reports.createdAt))
    .limit(10)

  return {
    searches: searches.map(s => ({ ...s, type: 'search' as const })),
    reports: reports.map(r => ({ ...r, type: 'report' as const }))
  }
})
