# Investigación proveedores jurídicos faltantes (2026-02-18)

## Estado actual
- API actual de búsqueda: `server/api/search.get.ts`
- Solo usa `searchSAIJ()` desde `server/utils/saij.ts`
- No existe adapter para CSJN/JUBA/JUSCABA todavía.

## Hallazgos técnicos

### 1) CSJN / Observatorio (OM) — endpoints detectados
Fuente: HTML de `https://om.csjn.gov.ar/JurisprudenciaOM/consultaOM/consultaSentencias.html`

Endpoints visibles:
- `GET /JurisprudenciaOM/consultaOM/getCategoriasPrincipales/`
- `GET /JurisprudenciaOM/consultaOM/getClasificacionesPropias/`
- `GET /JurisprudenciaOM/consultaOM/getSubcategorias/?idCategoriaPadre=...`
- `GET /JurisprudenciaOM/consultaOM/listarSentencias/?primerResultado=...`
- `POST /JurisprudenciaOM/consultaOM/buscarSentencia/...` (usa reCAPTCHA Enterprise)
- `GET /JurisprudenciaOM/consultaOM/verDoc/?idJuri=...`
- `GET /JurisprudenciaOM/consultaOM/verSentenciaExterna/?idJurisprudencia=...`

#### Pruebas
- `getCategoriasPrincipales` ✅ responde JSON
- `getClasificacionesPropias` ✅ responde JSON
- `listarSentencias` ✅ responde JSON (listado público)
- `buscarSentencia` ❌ no usable directo sin token captcha (reCAPTCHA Enterprise)

Observación: `listarSentencias` devuelve listado, pero no evidenció filtrado útil por query (`libre`, `dependencia`, `fecha...` parecieron ignorados en request directa).

### 2) Secretaría de Jurisprudencia CSJN (sj.csjn)
- URL: `https://sj.csjn.gov.ar/homeSJ/`
- Resultado: bloqueado por WAF (`Web Application Firewall`, event signature).
- Sin acceso estable para scraping server-to-server hoy.

### 3) JUBA / JUSCABA
- No hay adapter ni endpoint público integrado en el repo.
- Pendiente research específico por fuente para verificar:
  - API pública real
  - términos de uso
  - captcha/login/sesión

## Conclusión operativa
1. **Lo más viable inmediato:** mantener SAIJ como backend de búsqueda productiva.
2. **CSJN OM:** posible integración parcial (catálogos/listado), pero **búsqueda por texto real** está protegida por captcha.
3. Para “multi-fuente real” sin fricción: necesitamos
   - endpoint oficial sin captcha,
   - o integración institucional/API,
   - o pipeline semimanual con caché/index propio (si legalmente viable).

## Próximos pasos recomendados
1. Crear arquitectura de adapters (`providers/`) con feature flags por fuente.
2. Implementar `provider=saij` (actual) + `provider=csjn_om_list` (solo catálogo/listado) como PoC técnico.
3. Agregar `providerStatus` en API para no prometer cobertura inexistente.
4. Research legal/técnico de JUBA y JUSCABA con evidencia de endpoint y límites.
5. Ajustar copy público para reflejar disponibilidad real por proveedor (evitar sobre-promesa).
