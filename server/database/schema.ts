import { pgTable, text, timestamp, integer, boolean, uuid, jsonb } from 'drizzle-orm/pg-core'

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  provider: text('provider').default('magic-link').notNull(), // magic-link, google
  providerId: text('provider_id'), // Google sub ID
  plan: text('plan').default('free').notNull(), // free, basico, pro, estudio
  planSource: text('plan_source').default('default').notNull(), // default, coupon, subscription
  planExpiresAt: timestamp('plan_expires_at'), // null = permanent
  searchesUsedToday: integer('searches_used_today').default(0).notNull(),
  reportsUsedThisMonth: integer('reports_used_this_month').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Magic link tokens
export const magicLinks = pgTable('magic_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  usedAt: timestamp('used_at'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Sessions
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  token: text('token').notNull().unique(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Search history
export const searches = pgTable('searches', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  query: text('query').notNull(),
  tipo: text('tipo').default('jurisprudencia').notNull(),
  resultsCount: integer('results_count').default(0).notNull(),
  ipAddress: text('ip_address'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// AI Reports
export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  title: text('title').notNull(),
  query: text('query').notNull(),
  content: text('content').notNull(),
  citations: jsonb('citations').$type<Array<{
    id: string
    titulo: string
    url: string
    extracto: string
  }>>(),
  tokensUsed: integer('tokens_used').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Subscriptions (Mercado Pago)
export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  plan: text('plan').notNull(), // basico, pro, estudio
  status: text('status').default('active').notNull(), // active, cancelled, expired
  mpSubscriptionId: text('mp_subscription_id'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

// Coupons
export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: text('code').notNull().unique(),
  plan: text('plan').notNull(), // basico, pro, estudio
  durationDays: integer('duration_days').notNull(),
  maxUses: integer('max_uses').default(100).notNull(),
  usedCount: integer('used_count').default(0).notNull(),
  expiresAt: timestamp('expires_at'), // null = never expires
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const userCoupons = pgTable('user_coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  couponId: uuid('coupon_id').references(() => coupons.id).notNull(),
  appliedAt: timestamp('applied_at').defaultNow().notNull(),
  expiresAt: timestamp('expires_at').notNull()
})

// Alerts
export const alerts = pgTable('alerts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  keywords: text('keywords').notNull(),
  tipo: text('tipo').default('jurisprudencia'),
  enabled: boolean('enabled').default(true).notNull(),
  lastChecked: timestamp('last_checked'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

// Favorites
export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  documentId: text('document_id').notNull(), // SAIJ ID
  titulo: text('titulo').notNull(),
  tipo: text('tipo').notNull(),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
