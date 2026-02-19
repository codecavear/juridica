import { db, schema } from '../../database'
import { eq } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const { userId } = await readBody(event)
  if (!userId)
    throw createError({ statusCode: 400, message: 'userId requerido' })

  const [updated] = await db
    .update(schema.users)
    .set({
      plan: 'free',
      planSource: 'default',
      planExpiresAt: null,
      updatedAt: new Date()
    })
    .where(eq(schema.users.id, userId))
    .returning({ id: schema.users.id, email: schema.users.email, plan: schema.users.plan })

  if (!updated)
    throw createError({ statusCode: 404, message: 'Usuario no encontrado' })

  return updated
})
