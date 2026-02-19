import { db, schema } from '../../database'
import { count, desc, ne } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  try {
    // Get counts
    const [usersCount] = await db.select({ count: count() }).from(schema.users)
    const [searchesCount] = await db.select({ count: count() }).from(schema.searches)
    const [reportsCount] = await db.select({ count: count() }).from(schema.reports)
    const [paidCount] = await db
      .select({ count: count() })
      .from(schema.users)
      .where(ne(schema.users.plan, 'free'))

    // Get recent searches
    const recentSearches = await db
      .select()
      .from(schema.searches)
      .orderBy(desc(schema.searches.createdAt))
      .limit(5)

    // Get recent users
    const recentUsers = await db
      .select()
      .from(schema.users)
      .orderBy(desc(schema.users.createdAt))
      .limit(5)

    return {
      stats: {
        totalUsers: usersCount.count,
        totalSearches: searchesCount.count,
        totalReports: reportsCount.count,
        paidUsers: paidCount.count
      },
      recentSearches,
      recentUsers
    }
  } catch (error) {
    console.error('[Admin Stats] Error:', error)

    // Return empty data if DB not connected
    return {
      stats: {
        totalUsers: 0,
        totalSearches: 0,
        totalReports: 0,
        paidUsers: 0
      },
      recentSearches: [],
      recentUsers: []
    }
  }
})
