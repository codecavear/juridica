import { db, schema } from '../../database'
import { eq, and } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const { userId } = await readBody(event)
  if (!userId) throw createError({ statusCode: 400, message: 'userId requerido' })

  const deleted = await db.delete(schema.userCoupons)
    .where(eq(schema.userCoupons.userId, userId))
    .returning()

  return { ok: true, deleted: deleted.length }
})
