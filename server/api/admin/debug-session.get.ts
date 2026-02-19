export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event)
    return { session, hasEmail: !!session?.user?.email }
  } catch (err: any) {
    return { error: err.message, stack: err.stack?.split('\n').slice(0,3) }
  }
})
