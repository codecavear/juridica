import { db, schema } from '../database'
import { eq, and, sql } from 'drizzle-orm'

/**
 * Try to apply a coupon to a user. Called after registration.
 * Returns true if coupon was applied.
 */
export async function applyCoupon(userId: string, couponCode: string): Promise<boolean> {
  if (!couponCode) return false

  const coupon = await db.query.coupons.findFirst({
    where: (c, { eq }) => eq(c.code, couponCode.toUpperCase())
  })

  if (!coupon) {
    console.log(`[Coupon] Invalid code: ${couponCode}`)
    return false
  }

  // Check expiry
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    console.log(`[Coupon] Expired: ${couponCode}`)
    return false
  }

  // Check max uses
  if (coupon.usedCount >= coupon.maxUses) {
    console.log(`[Coupon] Max uses reached: ${couponCode}`)
    return false
  }

  // Check if user already used this coupon
  const existing = await db.query.userCoupons.findFirst({
    where: (uc, { eq, and }) => and(
      eq(uc.userId, userId),
      eq(uc.couponId, coupon.id)
    )
  })

  if (existing) {
    console.log(`[Coupon] Already used by user: ${couponCode}`)
    return false
  }

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + coupon.durationDays)

  // Apply coupon: update user plan + record usage
  await db.transaction(async (tx) => {
    await tx.update(schema.users).set({
      plan: coupon.plan,
      planSource: 'coupon',
      planExpiresAt: expiresAt,
      updatedAt: new Date()
    }).where(eq(schema.users.id, userId))

    await tx.insert(schema.userCoupons).values({
      userId,
      couponId: coupon.id,
      expiresAt
    })

    await tx.update(schema.coupons).set({
      usedCount: sql`${schema.coupons.usedCount} + 1`
    }).where(eq(schema.coupons.id, coupon.id))
  })

  console.log(`[Coupon] Applied ${couponCode} (${coupon.plan} for ${coupon.durationDays}d) to user ${userId}`)
  return true
}
