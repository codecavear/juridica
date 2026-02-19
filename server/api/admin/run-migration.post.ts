import { db } from '../../database'
import { sql } from 'drizzle-orm'

const ADMIN_EMAILS = ['conradocanas@gmail.com', 'canasconrado@gmail.com', 'docta@codecave.ar']

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email))
    throw createError({ statusCode: 403, message: 'No autorizado' })

  const results: string[] = []

  try {
    // Create coupons table
    await db.execute(sql`CREATE TABLE IF NOT EXISTS "coupons" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "code" text NOT NULL,
      "plan" text NOT NULL,
      "duration_days" integer NOT NULL,
      "max_uses" integer DEFAULT 100 NOT NULL,
      "used_count" integer DEFAULT 0 NOT NULL,
      "expires_at" timestamp,
      "created_at" timestamp DEFAULT now() NOT NULL,
      CONSTRAINT "coupons_code_unique" UNIQUE("code")
    )`)
    results.push('✅ coupons table')

    // Create user_coupons table
    await db.execute(sql`CREATE TABLE IF NOT EXISTS "user_coupons" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "user_id" uuid NOT NULL REFERENCES "users"("id"),
      "coupon_id" uuid NOT NULL REFERENCES "coupons"("id"),
      "applied_at" timestamp DEFAULT now() NOT NULL,
      "expires_at" timestamp NOT NULL
    )`)
    results.push('✅ user_coupons table')

    // Add columns to users (ignore if exists)
    await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan_source" text DEFAULT 'default' NOT NULL`)
    results.push('✅ users.plan_source')

    await db.execute(sql`ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "plan_expires_at" timestamp`)
    results.push('✅ users.plan_expires_at')

    // Create initial LAUNCH2026 coupon
    await db.execute(sql`INSERT INTO "coupons" ("code", "plan", "duration_days", "max_uses")
      VALUES ('LAUNCH2026', 'pro', 180, 100)
      ON CONFLICT ("code") DO NOTHING`)
    results.push('✅ LAUNCH2026 coupon created')

    return { ok: true, results }
  } catch (err: any) {
    return { ok: false, results, error: err.message }
  }
})
