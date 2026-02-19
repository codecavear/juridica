export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  const q = getQuery(event).q as string || 'test'
  
  const result: any = {
    session: { userId: session?.user?.id, email: session?.user?.email },
    query: q
  }
  
  if (session?.user?.id) {
    try {
      const { db, schema } = await import('../database')
      
      // Try insert
      const [inserted] = await db.insert(schema.searches).values({
        userId: session.user.id,
        query: q,
        tipo: 'debug',
        resultsCount: 0,
        ipAddress: 'debug'
      }).returning()
      
      result.inserted = inserted
      result.success = true
    } catch (err: any) {
      result.error = err.message
      result.success = false
    }
  } else {
    result.noSession = true
  }
  
  return result
})
