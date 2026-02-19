import { applyCoupon } from '../../utils/coupon'

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.id) {
    throw createError({ statusCode: 401, message: 'No autenticado' })
  }

  const { code } = await readBody(event)
  if (!code || typeof code !== 'string') {
    throw createError({ statusCode: 400, message: 'Código de cupón requerido' })
  }

  const applied = await applyCoupon(session.user.id, code.trim())

  if (!applied) {
    throw createError({ statusCode: 400, message: 'Cupón inválido, expirado o ya utilizado' })
  }

  return { ok: true, message: 'Cupón aplicado correctamente' }
})
