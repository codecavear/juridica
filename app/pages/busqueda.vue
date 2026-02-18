<template>
  <div class="min-h-screen bg-default py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-highlighted">Resultados de búsqueda</h1>
          <p class="text-muted">
            {{ resultsLoading ? 'Buscando resultados...' : `${sortedResults.length} resultados para "${queryText}"` }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UDropdownMenu :items="saveItems">
            <UButton variant="outline" color="neutral" icon="i-lucide-save">Guardar</UButton>
          </UDropdownMenu>
          <UButton to="/" color="primary" variant="soft" icon="i-lucide-search">Hacer nueva búsqueda</UButton>
        </div>
      </div>

      <div class="grid lg:grid-cols-5 gap-6">
        <!-- AI Summary -->
        <div class="lg:col-span-2 min-h-0">
          <UCard class="lg:sticky lg:top-24" :ui="{ body: 'max-h-[68vh] overflow-y-auto pr-1' }">
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <h2 class="font-semibold text-highlighted">Resumen IA</h2>
                  <UBadge color="primary" variant="soft" size="sm">1/1</UBadge>
                </div>
                <UBadge color="info" variant="subtle">gpt-4.1-mini</UBadge>
              </div>
            </template>

            <div v-if="summaryLoading" class="py-8 text-center text-muted">
              <UIcon name="i-lucide-loader-2" class="animate-spin mr-2" />
              Analizando jurisprudencia...
            </div>

            <div v-else-if="summaryError" class="space-y-3">
              <UAlert color="warning" variant="soft" title="No se pudo generar el resumen IA" :description="summaryError" />
              <p class="text-sm text-muted">
                Podés revisar igual los fallos oficiales del panel derecho.
              </p>
            </div>

            <div v-else-if="summary" class="space-y-4 text-sm">
              <div v-if="summaryView.title">
                <p class="font-medium text-highlighted mb-1">Título</p>
                <p class="text-toned">{{ summaryView.title }}</p>
              </div>

              <div>
                <p class="font-medium text-highlighted mb-1">Resumen</p>
                <p class="text-toned whitespace-pre-line">{{ summaryView.summary || 'Sin resumen disponible' }}</p>
              </div>

              <div v-if="summaryView.keyFindings?.length">
                <p class="font-medium text-highlighted mb-1">Hallazgos clave</p>
                <ul class="list-disc ml-5 text-toned space-y-1">
                  <li v-for="(item, idx) in summaryView.keyFindings" :key="`k-${idx}`">{{ item }}</li>
                </ul>
              </div>

              <div v-if="summaryView.risks?.length">
                <p class="font-medium text-highlighted mb-1">Riesgos</p>
                <ul class="list-disc ml-5 text-toned space-y-1">
                  <li v-for="(item, idx) in summaryView.risks" :key="`r-${idx}`">{{ item }}</li>
                </ul>
              </div>
            </div>

            <template #footer>
              <p class="text-xs text-dimmed">
                Resultado orientativo. Validá siempre con fuentes oficiales antes de presentar escritos.
              </p>
            </template>
          </UCard>
        </div>

        <!-- Results -->
        <div class="lg:col-span-3 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold text-highlighted">Fuentes oficiales (continuación: 1/2)</h2>
            <UBadge color="neutral" variant="soft">{{ sortedResults.length }} fuentes</UBadge>
          </div>

          <template v-if="resultsLoading">
            <UCard v-for="n in 3" :key="`s-${n}`" class="animate-pulse">
              <div class="h-24 rounded bg-elevated" />
            </UCard>
          </template>

          <UCard
            v-else-if="sortedResults.length"
            v-for="(result, idx) in sortedResults"
            :key="result.id"
            class="hover:ring-1 hover:ring-primary/30 transition-all"
          >
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-elevated ring ring-inset ring-accented flex items-center justify-center shrink-0">
                <UIcon :name="getIconForTipo(result.tipo)" class="text-xl text-primary" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <UBadge :color="getColorForTipo(result.tipo)" variant="subtle" size="sm">{{ result.tipo }}</UBadge>
                  <UBadge color="primary" variant="soft" size="sm">1/{{ idx + 2 }}</UBadge>
                  <UBadge color="neutral" variant="soft" size="sm">Importancia {{ result.importance }}</UBadge>
                  <span v-if="result.fecha" class="text-xs text-muted">{{ formatDate(result.fecha) }}</span>
                </div>

                <h3 class="font-semibold text-lg text-highlighted mb-2">{{ result.titulo }}</h3>

                <p v-if="result.tribunal" class="text-sm text-muted mb-2">
                  {{ result.tribunal }}
                  <span v-if="result.jurisdiccion" class="text-dimmed"> · {{ result.jurisdiccion }}</span>
                </p>

                <p v-if="result.sumario" class="text-sm text-toned line-clamp-3">{{ result.sumario }}</p>

                <div class="flex gap-2 mt-4">
                  <UButton
                    :to="result.url !== '#' ? result.url : undefined"
                    :target="result.url !== '#' ? '_blank' : undefined"
                    :disabled="result.url === '#'"
                    size="sm"
                    color="primary"
                    variant="soft"
                    trailing-icon="i-lucide-external-link"
                  >
                    Ver fuente oficial
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>

          <UCard v-else>
            <p class="text-muted">No encontramos resultados para esta búsqueda. Probá con otros términos.</p>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ApiSearchResult {
  uuid: string
  type: string
  titulo?: string
  caratula?: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  texto?: string
  url?: string
}

interface SearchResultCard {
  id: string
  tipo: string
  titulo: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  sumario?: string
  url: string
  importance: number
}

interface ReportSummary {
  title?: string
  summary?: string
  keyFindings?: string[]
  risks?: string[]
}

const route = useRoute()
const queryText = computed(() => String(route.query.q || '').trim())
const tipo = computed(() => String(route.query.tipo || 'jurisprudencia'))

const sortedResults = ref<SearchResultCard[]>([])
const summary = ref<ReportSummary | null>(null)
const resultsLoading = ref(true)
const summaryLoading = ref(true)
const summaryError = ref('')
const toast = useToast()

function extractJsonBlock(input: string): string | null {
  const fenced = input.match(/```json\s*([\s\S]*?)```/i)
  if (fenced?.[1]) return fenced[1].trim()

  const start = input.indexOf('{')
  const end = input.lastIndexOf('}')
  if (start >= 0 && end > start) return input.slice(start, end + 1)

  return null
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map(v => String(v).trim()).filter(Boolean)
}

function normalizeSummaryPayload(raw: ReportSummary | null): ReportSummary {
  if (!raw) return {}

  // Caso ideal: ya viene estructurado
  if (Array.isArray(raw.keyFindings) || Array.isArray(raw.risks) || raw.title) {
    return {
      title: raw.title,
      summary: raw.summary,
      keyFindings: asStringArray(raw.keyFindings),
      risks: asStringArray(raw.risks)
    }
  }

  const candidate = typeof raw.summary === 'string' ? extractJsonBlock(raw.summary) : null
  if (!candidate) {
    return {
      title: raw.title,
      summary: raw.summary,
      keyFindings: asStringArray(raw.keyFindings),
      risks: asStringArray(raw.risks)
    }
  }

  try {
    const parsed = JSON.parse(candidate) as Record<string, unknown>
    return {
      title: typeof parsed.title === 'string' ? parsed.title : raw.title,
      summary: typeof parsed.summary === 'string' ? parsed.summary : raw.summary,
      keyFindings: asStringArray(parsed.keyFindings),
      risks: asStringArray(parsed.risks)
    }
  } catch {
    return {
      title: raw.title,
      summary: raw.summary,
      keyFindings: asStringArray(raw.keyFindings),
      risks: asStringArray(raw.risks)
    }
  }
}

const summaryView = computed<ReportSummary>(() => normalizeSummaryPayload(summary.value))

function calcImportance(r: ApiSearchResult, q: string) {
  let score = 50
  const type = (r.type || '').toLowerCase()
  if (type.includes('fallo') || type.includes('jurisprudencia')) score += 25
  if (type.includes('sumario')) score += 18

  if (r.fecha) {
    const year = Number(r.fecha.slice(0, 4))
    if (!Number.isNaN(year)) score += Math.max(0, Math.min(15, year - 2009))
  }

  const text = `${r.titulo || ''} ${r.caratula || ''} ${r.texto || ''}`.toLowerCase()
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean)
  const matches = tokens.filter(t => text.includes(t)).length
  score += matches * 4

  return Math.min(100, Math.max(1, score))
}

function normalizeAndSort(results: ApiSearchResult[], q: string): SearchResultCard[] {
  return results
    .map((r) => ({
      id: r.uuid,
      tipo: r.type || tipo.value,
      titulo: r.titulo || r.caratula || 'Documento jurídico',
      fecha: r.fecha,
      tribunal: r.tribunal,
      jurisdiccion: r.jurisdiccion,
      sumario: r.texto,
      url: r.url || '#',
      importance: calcImportance(r, q)
    }))
    .sort((a, b) => b.importance - a.importance)
}

function getIconForTipo(tipoDoc: string): string {
  const t = tipoDoc.toLowerCase()
  if (t.includes('fallo') || t.includes('jurisprudencia')) return 'i-lucide-gavel'
  if (t.includes('sumario')) return 'i-lucide-file-text'
  if (t.includes('ley') || t.includes('legisl')) return 'i-lucide-scroll'
  if (t.includes('doctrina')) return 'i-lucide-book-open'
  return 'i-lucide-file'
}

function getColorForTipo(tipoDoc: string): string {
  const t = tipoDoc.toLowerCase()
  if (t.includes('fallo') || t.includes('jurisprudencia')) return 'primary'
  if (t.includes('sumario')) return 'info'
  if (t.includes('ley') || t.includes('legisl')) return 'success'
  if (t.includes('doctrina')) return 'warning'
  return 'neutral'
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) return dateStr
  return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'short', day: 'numeric' })
}

function saveSearch() {
  try {
    const key = 'juridica_saved_searches'
    const existing = JSON.parse(localStorage.getItem(key) || '[]') as Array<{ q: string, tipo: string, savedAt: string }>
    const next = [
      { q: queryText.value, tipo: tipo.value, savedAt: new Date().toISOString() },
      ...existing.filter(item => !(item.q === queryText.value && item.tipo === tipo.value))
    ].slice(0, 20)
    localStorage.setItem(key, JSON.stringify(next))
    toast.add({ title: 'Búsqueda guardada', color: 'success', icon: 'i-lucide-check' })
  } catch {
    toast.add({ title: 'No se pudo guardar', color: 'warning', icon: 'i-lucide-alert-circle' })
  }
}

function downloadFile(filename: string, content: string, mime = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function buildPlainText() {
  const lines = [
    `Búsqueda: ${queryText.value}`,
    `Tipo: ${tipo.value}`,
    `Fecha: ${new Date().toLocaleString('es-AR')}`,
    '',
    '=== AI SUMMARY ===',
    summaryView.value.summary || 'Sin resumen disponible',
    '',
    '=== FUENTES ==='
  ]

  for (const [idx, r] of sortedResults.value.entries()) {
    lines.push(`${idx + 1}. ${r.titulo}`)
    lines.push(`   Tipo: ${r.tipo} | Importancia: ${r.importance}`)
    if (r.tribunal) lines.push(`   Tribunal: ${r.tribunal}`)
    if (r.fecha) lines.push(`   Fecha: ${r.fecha}`)
    if (r.url && r.url !== '#') lines.push(`   Fuente: ${r.url}`)
    if (r.sumario) lines.push(`   Extracto: ${r.sumario}`)
    lines.push('')
  }

  return lines.join('\n')
}

function exportAsText() {
  downloadFile(`juridica-${Date.now()}.txt`, buildPlainText())
}

function exportAsMarkdown() {
  let md = `# Resultado de búsqueda Jurídica\n\n`
  md += `- **Búsqueda:** ${queryText.value}\n`
  md += `- **Tipo:** ${tipo.value}\n`
  md += `- **Fecha:** ${new Date().toLocaleString('es-AR')}\n\n`
  md += `## Resumen IA\n\n${summaryView.value.summary || 'Sin resumen disponible'}\n\n`
  md += `## Fuentes\n\n`

  sortedResults.value.forEach((r, idx) => {
    md += `### ${idx + 1}. ${r.titulo}\n`
    md += `- Tipo: ${r.tipo}\n- Importancia: ${r.importance}\n`
    if (r.tribunal) md += `- Tribunal: ${r.tribunal}\n`
    if (r.fecha) md += `- Fecha: ${r.fecha}\n`
    if (r.url && r.url !== '#') md += `- Fuente: ${r.url}\n`
    if (r.sumario) md += `\n${r.sumario}\n`
    md += `\n`
  })

  downloadFile(`juridica-${Date.now()}.md`, md, 'text/markdown;charset=utf-8')
}

function exportAsDoc() {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Reporte Jurídica</title></head><body><pre>${buildPlainText().replace(/</g, '&lt;')}</pre></body></html>`
  downloadFile(`juridica-${Date.now()}.doc`, html, 'application/msword')
}

function exportAsJson() {
  const payload = {
    query: queryText.value,
    tipo: tipo.value,
    generatedAt: new Date().toISOString(),
    summary: summary.value,
    results: sortedResults.value
  }
  downloadFile(`juridica-${Date.now()}.json`, JSON.stringify(payload, null, 2), 'application/json;charset=utf-8')
}

const saveItems = [[
  { label: 'Guardar búsqueda', icon: 'i-lucide-bookmark-plus', onSelect: saveSearch },
  { label: 'Descargar TXT', icon: 'i-lucide-file-text', onSelect: exportAsText },
  { label: 'Descargar Markdown', icon: 'i-lucide-file-code', onSelect: exportAsMarkdown },
  { label: 'Descargar DOC', icon: 'i-lucide-file', onSelect: exportAsDoc },
  { label: 'Descargar JSON', icon: 'i-lucide-braces', onSelect: exportAsJson }
]]

async function loadSearch() {
  resultsLoading.value = true

  if (!queryText.value || queryText.value.length < 2) {
    sortedResults.value = []
    resultsLoading.value = false
    return
  }

  try {
    const data = await $fetch<{ results: ApiSearchResult[] }>('/api/search', {
      params: { q: queryText.value, tipo: tipo.value, limit: 20 }
    })

    sortedResults.value = normalizeAndSort(data.results || [], queryText.value)
  } catch (error) {
    console.error(error)
    sortedResults.value = []
  } finally {
    resultsLoading.value = false
  }
}

async function loadSummary() {
  summaryLoading.value = true
  summaryError.value = ''
  summary.value = null

  if (!queryText.value || !sortedResults.value.length) {
    summaryLoading.value = false
    return
  }

  try {
    const response = await $fetch<{ report?: ReportSummary }>('/api/reports/generate', {
      method: 'POST',
      body: {
        query: queryText.value,
        tipo: tipo.value,
        results: sortedResults.value.slice(0, 8).map(r => ({
          uuid: r.id,
          type: r.tipo,
          titulo: r.titulo,
          fecha: r.fecha,
          tribunal: r.tribunal,
          jurisdiccion: r.jurisdiccion,
          texto: r.sumario,
          url: r.url
        }))
      }
    })

    summary.value = response.report || null
  } catch (error) {
    summaryError.value = 'No se pudo generar en este momento'
    console.error(error)
  } finally {
    summaryLoading.value = false
  }
}

onMounted(async () => {
  // Mostrar loading de summary apenas se abre tras click en Buscar
  summaryLoading.value = true
  await loadSearch()
  await loadSummary()
})

useSeoMeta({
  title: queryText.value ? `Resultados: ${queryText.value} | Jurídica` : 'Búsqueda | Jurídica',
  description: 'Resultados de jurisprudencia argentina con AI summary y fuentes verificables.'
})
</script>
