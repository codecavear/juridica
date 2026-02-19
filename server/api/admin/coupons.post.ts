import { db, schema } from '../../database'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const body = await readBody(event)
  const { code, plan, durationDays, maxUses, expiresAt } = body

  if (!code || !plan || !durationDays) {
    throw createError({ statusCode: 400, message: 'code, plan y durationDays requeridos' })
  }

  if (!['basico', 'pro', 'estudio'].includes(plan)) {
    throw createError({ statusCode: 400, message: 'Plan inválido (basico|pro|estudio)' })
  }

  const [coupon] = await db.insert(schema.coupons).values({
    code: code.toUpperCase(),
    plan,
    durationDays: Number(durationDays),
    maxUses: Number(maxUses) || 100,
    expiresAt: expiresAt ? new Date(expiresAt) : null
  }).returning()

  return coupon
})
