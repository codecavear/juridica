import { db, schema } from '../../database'
import { sql } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { secret } = await readBody(event)
  if (secret !== 'codecave2026') {
    throw createError({ statusCode: 403, message: 'No autorizado' })
  }

  // Run pending migration for coupons tables if needed
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "coupons" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "code" text NOT NULL,
        "plan" text NOT NULL,
        "duration_days" integer NOT NULL,
        "max_uses" integer DEFAULT 100 NOT NULL,
        "used_count" integer DEFAULT 0 NOT NULL,
        "expires_at" timestamp,
        "created_at" timestamp DEFAULT now() NOT NULL,
        CONSTRAINT "coupons_code_unique" UNIQUE("code")
      )
    `)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "user_coupons" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "user_id" uuid NOT NULL REFERENCES "users"("id"),
        "coupon_id" uuid NOT NULL REFERENCES "coupons"("id"),
        "applied_at" timestamp DEFAULT now() NOT NULL,
        "expires_at" timestamp NOT NULL
      )
    `)
    await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan_source" text DEFAULT 'default' NOT NULL`)
    await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan_expires_at" timestamp`)
  } catch (e) {
    console.log('[Seed] Tables may already exist:', e)
  }

  // Create LAUNCH2026 coupon
  try {
    const [coupon] = await db.insert(schema.coupons).values({
      code: 'LAUNCH2026',
      plan: 'pro',
      durationDays: 180,
      maxUses: 1000
    }).onConflictDoNothing().returning()

    return { ok: true, coupon: coupon || 'already exists' }
  } catch (e: any) {
    return { ok: false, error: e.message }
  }
})
