import { db, schema } from '../../database'
import { desc } from 'drizzle-orm'

export default defineEventHandler(async () => {
  // TODO: Add admin auth check here

  try {
    const searches = await db
      .select()
      .from(schema.searches)
      .orderBy(desc(schema.searches.createdAt))
      .limit(100)

    return searches
  } catch (error) {
    console.error('[Admin Searches] Error:', error)
    return []
  }
})
