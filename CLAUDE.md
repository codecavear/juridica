# Juridica

Buscador de jurisprudencia argentina con IA. Domain: juridica.ar

## Stack

- Nuxt 4 + Nuxt UI 4 + Tailwind CSS
- PostgreSQL + Drizzle ORM (postgres.js driver)
- Google OAuth via nuxt-auth-utils
- OpenAI gpt-4.1-mini for AI report generation
- SAIJ public JSON API for jurisprudence data
- Railway deployment (nixpacks with bun)
- Umami analytics at umami.codecave.ar
- Package manager: bun

## Project Structure

```
app/
  pages/
    index.vue              # Landing page with search + pricing + FAQ
    busqueda.vue           # Search results page
    demo.vue               # Interactive demo
    ingresar.vue           # Login page
    iniciar-sesion.vue     # Alt login page
    admin/                 # Admin dashboard (users, searches, stats)
    comparar/[slug].vue    # Comparison pages
    soluciones/[slug].vue  # Solutions pages
    *.vue                  # SEO content pages
  components/
    LoginModal.vue
  layouts/
    default.vue
    admin.vue
  data/
    seo-content.ts
server/
  api/
    search.get.ts              # SAIJ search endpoint
    reports/generate.post.ts   # AI report generation (OpenAI)
    admin/                     # Admin endpoints (stats, users, searches)
    auth/magic-link/           # Magic link auth
  routes/
    auth/google.get.ts         # Google OAuth handler
  database/
    index.ts                   # Drizzle client
    schema.ts                  # All tables
    migrations/
  utils/
    saij.ts                    # SAIJ API adapter (search + document retrieval)
shared/
  types/auth.d.ts              # User session type augmentation
```

## Database Schema

Tables: users, magic_links, sessions, searches, reports, subscriptions, alerts, favorites

- Users have plans: free, basico, pro, estudio
- Auth providers: google, magic-link
- Reports store AI-generated content with citations (jsonb)
- Searches track query history with optional user association

## Key APIs

- `GET /api/search?q=...&tipo=...&limit=...&offset=...` - Search SAIJ
- `POST /api/reports/generate` - Generate AI report from SAIJ results
- `GET /api/admin/stats` - Admin dashboard stats
- `GET /api/admin/users` - User management
- `GET /api/admin/searches` - Search history

## SAIJ Integration

The SAIJ adapter (`server/utils/saij.ts`) queries the public API at saij.gob.ar. Document types: fallo, sumario, jurisprudencia, legislacion, ley, decreto, doctrina, dictamen, todo.

## Data Sources

- **SAIJ** (active) - Sistema Argentino de Informacion Juridica
- **CSJN** (planned) - Corte Suprema de Justicia de la Nacion
- **JUBA** (planned) - Jurisprudencia Provincia de Buenos Aires
- **JUSCABA** (planned) - Justicia Ciudad de Buenos Aires

## Conventions

- Spanish (es-AR) for all user-facing content
- Primary color: blue, accent: #74acdf (Argentine celeste)
- Color mode preference: light
- ESLint stylistic: commaDangle never, braceStyle 1tbs
- All database IDs are UUID with defaultRandom()
- Timestamps: createdAt + updatedAt with defaultNow()
