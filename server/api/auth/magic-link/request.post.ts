import { randomBytes } from 'node:crypto'

interface Body {
  email?: string
  coupon?: string
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

  const coupon = body?.coupon?.trim() || ''
  const baseUrl = process.env.APP_URL || 'https://juridica.ar'
  const magicLink = `${baseUrl}/auth/magic-link?token=${token}${coupon ? `&cupon=${encodeURIComponent(coupon)}` : ''}`

  // Send email via Resend
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Jurídica <hola@juridica.ar>',
          to: [email],
          subject: 'Tu link de acceso a Jurídica',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
              <div style="text-align: center; margin-bottom: 32px;">
                <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 0;">⚖️ Jurídica</h1>
              </div>
              <p style="font-size: 16px; color: #334155; line-height: 1.6;">
                Hacé click en el siguiente botón para acceder a tu cuenta:
              </p>
              <div style="text-align: center; margin: 32px 0;">
                <a href="${magicLink}" style="display: inline-block; background-color: #0ea5e9; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; padding: 14px 32px; border-radius: 8px;">
                  Ingresar a Jurídica
                </a>
              </div>
              <p style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
                Este link expira en 20 minutos. Si no solicitaste este acceso, podés ignorar este mensaje.
              </p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
              <p style="font-size: 12px; color: #cbd5e1; text-align: center;">
                Jurídica — Jurisprudencia argentina con Inteligencia Artificial
              </p>
            </div>
          `
        })
      })

      if (!res.ok) {
        const err = await res.text()
        console.error('[MagicLink] Resend error:', res.status, err)
        throw createError({ statusCode: 500, message: 'No se pudo enviar el email. Intentá de nuevo.' })
      }

      console.log('[MagicLink] Email sent to', email)
    } catch (e: any) {
      if (e.statusCode) throw e
      console.error('[MagicLink] Send failed:', e)
      throw createError({ statusCode: 500, message: 'Error al enviar email. Intentá de nuevo.' })
    }
  } else {
    console.warn('[MagicLink] RESEND_API_KEY not set, logging link:', magicLink)
  }

  return {
    ok: true,
    message: 'Magic link enviado'
  }
})
