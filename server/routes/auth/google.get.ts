import { eq } from 'drizzle-orm'

async function getDbContext() {
  if (!process.env.DATABASE_URL) return null
  try {
    const mod = await import('../../database')
    return { db: mod.db, schema: mod.schema }
  } catch {
    return null
  }
}

export default defineOAuthGoogleEventHandler({
  config: {
    emailRequired: true,
    scope: ['email', 'profile']
  },

  async onSuccess(event, { user: googleUser }) {
    const dbCtx = await getDbContext()

    if (!dbCtx) {
      console.error('[Google OAuth] Database not available')
      return sendRedirect(event, '/ingresar?error=db_unavailable')
    }

    try {
      // Check if user exists by email
      let user = await dbCtx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, googleUser.email)
      })

      if (user) {
        // Link Google to existing account (e.g. created via magic link)
        await dbCtx.db
          .update(dbCtx.schema.users)
          .set({
            providerId: googleUser.sub,
            avatar: googleUser.picture || user.avatar,
            name: user.name || googleUser.name,
            updatedAt: new Date()
          })
          .where(eq(dbCtx.schema.users.id, user.id))

        user = await dbCtx.db.query.users.findFirst({
          where: (users, { eq }) => eq(users.id, user!.id)
        })
      } else {
        // Create new Google user
        const [newUser] = await dbCtx.db
          .insert(dbCtx.schema.users)
          .values({
            email: googleUser.email,
            name: googleUser.name || googleUser.email.split('@')[0],
            avatar: googleUser.picture,
            provider: 'google',
            providerId: googleUser.sub
          })
          .returning()

        user = newUser
      }

      if (!user) {
        return sendRedirect(event, '/ingresar?error=user_creation_failed')
      }

      await setUserSession(event, {
        user: {
          id: user.id,
          email: user.email,
          name: user.name || user.email,
          avatar: user.avatar || undefined
        }
      })

      return sendRedirect(event, '/')
    } catch (error) {
      console.error('[Google OAuth] Error:', error)
      return sendRedirect(event, '/ingresar?error=oauth_failed')
    }
  },

  onError(event, error) {
    console.error('[Google OAuth] Error:', error)
    return sendRedirect(event, '/ingresar?error=oauth_error')
  }
})
