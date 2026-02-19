import { eq, and, isNull, gt } from 'drizzle-orm'

async function getDbContext() {
  if (!process.env.DATABASE_URL) return null
  try {
    const mod = await import('../../database')
    return { db: mod.db, schema: mod.schema }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const token = String(query.token || '').trim()

  if (!token) {
    return sendRedirect(event, '/?error=invalid_token')
  }

  const dbCtx = await getDbContext()
  if (!dbCtx) {
    return sendRedirect(event, '/?error=db_unavailable')
  }

  try {
    // Find valid, unused, non-expired magic link
    const magicLink = await dbCtx.db.query.magicLinks.findFirst({
      where: (ml, { eq, and, isNull, gt }) => and(
        eq(ml.token, token),
        isNull(ml.usedAt),
        gt(ml.expiresAt, new Date())
      )
    })

    if (!magicLink) {
      return sendRedirect(event, '/?error=invalid_token')
    }

    // Mark token as used
    await dbCtx.db
      .update(dbCtx.schema.magicLinks)
      .set({ usedAt: new Date() })
      .where(eq(dbCtx.schema.magicLinks.id, magicLink.id))

    // Find or create user
    let user = await dbCtx.db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, magicLink.email)
    })

    if (!user) {
      const [newUser] = await dbCtx.db
        .insert(dbCtx.schema.users)
        .values({
          email: magicLink.email,
          name: magicLink.email.split('@')[0],
          provider: 'magic-link'
        })
        .returning()

      user = newUser
    }

    if (!user) {
      return sendRedirect(event, '/?error=user_creation_failed')
    }

    // Set session
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || user.email,
        avatar: user.avatar || undefined
      }
    })

    // Apply coupon if present in query param or cookie
    const couponCode = String(query.cupon || '').trim() || getCookie(event, 'juridica_coupon')
    if (couponCode) {
      try {
        const { applyCoupon } = await import('../../utils/coupon')
        const applied = await applyCoupon(user.id, couponCode)
        if (applied) {
          deleteCookie(event, 'juridica_coupon')
        }
      } catch (err) {
        console.error('[MagicLink] Coupon error:', err)
      }
    }

    return sendRedirect(event, '/perfil')
  } catch (error: any) {
    console.error('[MagicLink] Verify error:', error?.message)
    return sendRedirect(event, '/?error=oauth_failed')
  }
})
