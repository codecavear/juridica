import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']
const VALID_PLANS = ['free', 'basico', 'pro', 'estudio']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const body = await readBody(event)
  const { userId, plan } = body

  if (!userId || !plan || !VALID_PLANS.includes(plan))
    throw createError({ statusCode: 400, message: 'userId y plan (free|basico|pro|estudio) requeridos' })

  const [updated] = await db
    .update(schema.users)
    .set({ plan })
    .where(eq(schema.users.id, userId))
    .returning({ id: schema.users.id, email: schema.users.email, plan: schema.users.plan })

  if (!updated)
    throw createError({ statusCode: 404, message: 'Usuario no encontrado' })

  return updated
})
