import { db, schema } from '../../database'
import { desc } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const coupons = await db
    .select()
    .from(schema.coupons)
    .orderBy(desc(schema.coupons.createdAt))

  return coupons
})
