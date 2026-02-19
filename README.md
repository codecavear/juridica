# Juridica

Buscador de jurisprudencia argentina con IA. Busca fallos, leyes y doctrina en fuentes oficiales (SAIJ) con citas verificables y links directos.

**Live:** [juridica.ar](https://juridica.ar)

## Stack

- Nuxt 4 + Nuxt UI 4
- PostgreSQL + Drizzle ORM
- Google OAuth (nuxt-auth-utils)
- OpenAI (gpt-4.1-mini) for AI reports
- SAIJ API for jurisprudence search
- Railway deployment
- Umami analytics

## Features

- Search Argentine jurisprudence via SAIJ with verifiable source links
- AI-powered legal reports with citations from real documents
- Google OAuth + magic link authentication
- User plans: free, basico, pro, estudio
- Admin dashboard (users, searches, stats)
- SEO pages for organic traffic

## Setup

```bash
bun install
cp .env.example .env  # configure env vars
bun run dev
```

## Environment Variables

```
DATABASE_URL=postgresql://...
NUXT_SESSION_PASSWORD=...
NUXT_OAUTH_GOOGLE_CLIENT_ID=...
NUXT_OAUTH_GOOGLE_CLIENT_SECRET=...
OPENAI_API_KEY=...
```

## Database

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```
