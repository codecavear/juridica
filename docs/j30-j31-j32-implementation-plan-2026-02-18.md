# Juridica - Plan tecnico ejecutable (JURIDICA-30/31/32)

Fecha: 2026-02-18
Owner: Backend (Forge) + QA (Bugsy) + PM (Docta)

## Priorizacion recomendada
1. JURIDICA-30 (conversion + control server-side)
2. JURIDICA-31 (billing MercadoPago)
3. JURIDICA-32 (model routing premium + guardrails)

---

## JURIDICA-30 - 1 busqueda anonima pre-login + limites por plan (server-side)

### Arquitectura
- Identidad anonima por cookie firmada `anon_id` + hash de IP/UA
- Permitir 1 busqueda anonima y luego exigir login
- Enforcement en backend (`/api/search`) siempre server-side

### Cambios DB/backend/API
- Tabla `anonymous_usage` (anonId, ipHash, uaHash, searchesUsed, windowStart, lastUsedAt)
- Tabla `plan_limits` (plan, dailySearchLimit, monthlyReportLimit, maxModelTier)
- Tabla `account_usage_daily` (userId, date, counters)
- Endpoint `GET /api/usage/me` para mostrar consumo y limites
- En `/api/search`: aplicar cuota anonima o cuota por plan

### Riesgos + mitigacion
- Bypass por borrar cookie -> combinar cookie + ipHash + uaHash + rate limit
- Falsos positivos en red compartida -> ventana corta y tolerancia
- Friccion UX -> wall claro y contextual despues de primera busqueda

### Roadmap
- MVP: 1 busqueda anonima + wall login
- Fase 2: cuotas por plan robustas
- Fase 3: panel de uso y alertas

### Checklist
- [ ] migraciones y tablas
- [ ] middleware anon identity
- [ ] enforcement en /api/search
- [ ] tests 1ra/2da busqueda anonima
- [ ] tests free/basic/pro/estudio

### Recomendacion
Implementar primero por impacto inmediato en conversion y orden de costos.

---

## JURIDICA-31 - Suscripciones con MercadoPago

### Arquitectura
- Checkout/subscription via MP
- Estado de suscripcion manejado por webhooks idempotentes
- Juridica conserva estado operativo de plan

### Cambios DB/backend/API
- `subscriptions` (userId, plan, status, mpSubscriptionId, currentPeriodEnd)
- `billing_events` (eventId, type, payload, status, processedAt)
- `invoices` (opcional MVP+)
- API:
  - POST `/api/billing/checkout`
  - POST `/api/billing/webhook/mercadopago`
  - GET `/api/billing/subscription`
  - POST `/api/billing/cancel`
  - POST `/api/billing/change-plan`

### Riesgos + mitigacion
- Duplicados webhook -> idempotencia por eventId
- Eventos fuera de orden -> state machine por prioridad temporal
- Perdida webhook -> reintentos + reconciliacion diaria

### Roadmap
- MVP: alta/cancelacion + webhook + activacion/degradacion plan
- Fase 2: cambio de plan/prorrateo simple
- Fase 3: conciliacion y reportes financieros

### Checklist
- [ ] sandbox MP e2e
- [ ] verificacion firma webhook
- [ ] idempotencia + retry-safe
- [ ] pruebas approved/rejected/pending
- [ ] grace period y downgrade automatico

### Recomendacion
Webhook-first desde dia 1. Evitar procesos manuales para estado de plan.

---

## JURIDICA-32 - Modelos mejores en tiers altos (control de costo)

### Arquitectura
- Router de modelos por `plan + feature`
- Subir calidad solo en features premium (reportes/sintesis complejas)
- Guardrails de costo por cuenta y global mensual

### Cambios DB/backend/API
- `plan_model_policies` (plan, feature, model, maxTokens, timeout)
- `usage_cost_events` (accountId, feature, model, tokens, cost)
- Backend routing:
  - free/basic -> modelo economico
  - pro/estudio -> modelo mejor en features premium
  - fallback automatico a modelo economico por budget/timeout

### Riesgos + mitigacion
- Costo descontrolado -> caps + alertas + fallback
- Valor no percibido -> aplicar premium donde se note (reportes)
- Latencia alta -> timeout + degradacion controlada

### Roadmap
- MVP: routing por plan solo en reportes
- Fase 2: expandir a otras features IA
- Fase 3: optimizacion calidad/costo automatica

### Checklist
- [ ] matriz plan->modelo definida
- [ ] telemetria de costo por request
- [ ] fallback por timeout/cap
- [ ] test A/B de conversion a Pro/Estudio

### Recomendacion
Subir modelo en 1-2 features premium primero. Medir upgrade y margen antes de ampliar.

---

## Decision PM (go-forward)
- Semana 1: JURIDICA-30 MVP
- Semana 2-3: JURIDICA-31 MVP
- Semana 3: JURIDICA-32 en reportes premium + caps
