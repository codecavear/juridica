import { db, schema } from '../../database'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  // TODO: Add admin auth check here

  try {
    const users = await db
      .select()
      .from(schema.users)
      .orderBy(desc(schema.users.createdAt))
      .limit(100)

    return users
  } catch (error) {
    console.error('[Admin Users] Error:', error)
    return []
  }
})
