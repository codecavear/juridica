import { randomBytes } from 'node:crypto'

interface Body {
  email?: string
}

async function getDbContext() {
  if (!process.env.DATABASE_URL) return null
  try {
    const mod = await import('../../../database')
    return { db: mod.db, schema: mod.schema }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Body>(event)
  const email = body?.email?.trim().toLowerCase()

  if (!email || !email.includes('@')) {
    throw createError({ statusCode: 400, message: 'Email inválido' })
  }

  const token = randomBytes(24).toString('hex')
  const expiresAt = new Date(Date.now() + 1000 * 60 * 20) // 20 min

  const dbCtx = await getDbContext()
  if (dbCtx) {
    await dbCtx.db.insert(dbCtx.schema.magicLinks).values({
      email,
      token,
      expiresAt
    })
  }

  const baseUrl = process.env.APP_URL || 'https://juridica.ar'
  const magicLink = `${baseUrl}/auth/magic-link?token=${token}`

  // TODO: conectar proveedor real de email (Resend)
  console.log('[MagicLink] send', { email, magicLink, expiresAt: expiresAt.toISOString() })

  return {
    ok: true,
    message: 'Magic link enviado',
    // En producción se puede ocultar esto; lo dejamos útil mientras se integra el mailer
    magicLink
  }
})
