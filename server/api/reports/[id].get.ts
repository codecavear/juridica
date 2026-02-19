import { db, schema } from '../../database'
import { eq, and } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'No autenticado' })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID requerido' })
  }

  const report = await db.query.reports.findFirst({
    where: (reports, { eq, and }) => and(
      eq(reports.id, id),
      eq(reports.userId, session.user.id)
    )
  })

  if (!report) {
    throw createError({ statusCode: 404, message: 'Reporte no encontrado' })
  }

  return report
})
