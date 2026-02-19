import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    console.error('DATABASE_URL not found')
    process.exit(1)
  }

  console.log('🚀 Running migrations...')

  const migrationClient = postgres(databaseUrl, { max: 1 })
  const db = drizzle(migrationClient)

  try {
    await migrate(db, { migrationsFolder: './server/database/migrations' })
    console.log('✅ Migrations completed successfully')
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  } finally {
    await migrationClient.end()
  }

  process.exit(0)
}

runMigrations()
