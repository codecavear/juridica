import { db, schema } from '../../database'
import { desc } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  try {
    const searches = await db
      .select()
      .from(schema.searches)
      .orderBy(desc(schema.searches.createdAt))
      .limit(100)

    return searches
  } catch (error) {
    console.error('[Admin Searches] Error:', error)
    return []
  }
})
