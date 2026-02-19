/**
 * Agent auth endpoint for codeCave agents
 * Validates master key and creates a session for the agent
 */
import { eq } from 'drizzle-orm'

const AGENT_CONFIGS: Record<string, { name: string, email: string }> = {
  docta: { name: 'Docta ⚡', email: 'docta@codecave.ar' },
  pixel: { name: 'Pixel 🎨', email: 'pixel@codecave.ar' },
  forge: { name: 'Forge 🔧', email: 'forge@codecave.ar' },
  bugsy: { name: 'Bugsy 🐛', email: 'bugsy@codecave.ar' },
  growth: { name: 'Growth 📈', email: 'growth@codecave.ar' },
  atlas: { name: 'Atlas 🚀', email: 'atlas@codecave.ar' }
}

// Rate limiter
const rateLimitMap = new Map<string, { count: number, resetAt: number }>()

function checkRateLimit(ip: string, max = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (record.count >= max) return false
  record.count++
  return true
}

export default defineEventHandler(async (event) => {
  const ip = getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
    || getHeader(event, 'x-real-ip')
    || 'unknown'

  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, message: 'Too many attempts' })
  }

  const body = await readBody(event)
  const token = body?.token as string
  const agentId = body?.agentId as string

  if (!token) {
    throw createError({ statusCode: 400, message: 'Token required' })
  }

  // Validate against master key
  const masterKey = process.env.CODECAVE_AGENT_KEY
  if (!masterKey || token !== masterKey) {
    console.warn(`[auth/agent] Invalid token from ${ip}`)
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  const agent = AGENT_CONFIGS[agentId || 'docta']
  if (!agent) {
    throw createError({ statusCode: 400, message: 'Invalid agentId' })
  }

  // Ensure agent user exists in DB
  try {
    const { db, schema } = await import('../../database')

    let user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, agent.email)
    })

    if (!user) {
      const [newUser] = await db
        .insert(schema.users)
        .values({
          email: agent.email,
          name: agent.name,
          provider: 'agent',
          providerId: `agent:${agentId}`
        })
        .returning()
      user = newUser!
    }

    // Create session
    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        name: user.name || agent.name,
        avatar: user.avatar || undefined
      }
    })

    console.log(`[auth/agent] ${agent.name} authenticated from ${ip}`)

    return {
      ok: true,
      agent: { id: agentId, name: agent.name, email: agent.email },
      user: { id: user.id, email: user.email, name: user.name }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown'
    console.error(`[auth/agent] DB error:`, message)
    throw createError({ statusCode: 500, message: 'Auth failed' })
  }
})
