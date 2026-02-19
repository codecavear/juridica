import { db, schema } from '../../database'
import { desc } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  try {
    const users = await db
      .select()
      .from(schema.users)
      .orderBy(desc(schema.users.createdAt))
      .limit(100)

    return users
  } catch (error) {
    console.error('[Admin Users] Error:', error)
    return []
  }
})
