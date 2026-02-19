import { db, schema } from '../../database'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const { code, plan, durationDays, maxUses, expiresAt } = await readBody(event)

  if (!code || !plan || !durationDays) {
    throw createError({ statusCode: 400, message: 'code, plan y durationDays requeridos' })
  }

  const [coupon] = await db.insert(schema.coupons).values({
    code: code.toUpperCase(),
    plan,
    durationDays,
    maxUses: maxUses || 1000,
    expiresAt: expiresAt ? new Date(expiresAt) : null
  }).returning()

  return coupon
})
