import { db, schema } from '../../database'
import { eq, desc } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'No autenticado' })
  }

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

  return searches
})
