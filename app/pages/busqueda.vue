<template>
  <div class="min-h-screen bg-slate-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Resultados de búsqueda</h1>
          <p class="text-gray-600">
            {{ sortedResults.length }} resultados para "{{ queryText }}"
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UButton to="/" variant="outline" color="neutral" icon="i-lucide-arrow-left">Volver</UButton>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- AI Summary -->
        <div class="lg:col-span-1">
          <UCard class="bg-white border border-slate-200 lg:sticky lg:top-24">
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="font-semibold text-gray-900">AI Summary</h2>
                <UBadge color="info" variant="subtle">gpt-4.1-mini</UBadge>
              </div>
            </template>

            <div v-if="summaryLoading" class="py-8 text-center text-gray-600">
              <UIcon name="i-lucide-loader-2" class="animate-spin mr-2" />
              Analizando jurisprudencia...
            </div>

            <div v-else-if="summaryError" class="space-y-3">
              <UAlert color="warning" variant="soft" title="No se pudo generar el resumen IA" :description="summaryError" />
              <p class="text-sm text-gray-600">
                Podés revisar igual los fallos oficiales del panel derecho.
              </p>
            </div>

            <div v-else-if="summary" class="space-y-4 text-sm">
              <div>
                <p class="font-medium text-gray-900 mb-1">Resumen</p>
                <p class="text-gray-700">{{ summary.summary }}</p>
              </div>

              <div v-if="summary.keyFindings?.length">
                <p class="font-medium text-gray-900 mb-1">Hallazgos clave</p>
                <ul class="list-disc ml-5 text-gray-700 space-y-1">
                  <li v-for="(item, idx) in summary.keyFindings" :key="`k-${idx}`">{{ item }}</li>
                </ul>
              </div>

              <div v-if="summary.risks?.length">
                <p class="font-medium text-gray-900 mb-1">Riesgos</p>
                <ul class="list-disc ml-5 text-gray-700 space-y-1">
                  <li v-for="(item, idx) in summary.risks" :key="`r-${idx}`">{{ item }}</li>
                </ul>
              </div>
            </div>

            <template #footer>
              <p class="text-xs text-gray-500">
                Resultado orientativo. Validá siempre con fuentes oficiales antes de presentar escritos.
              </p>
            </template>
          </UCard>
        </div>

        <!-- Results -->
        <div class="lg:col-span-2 space-y-4">
          <UCard
            v-for="result in sortedResults"
            :key="result.id"
            class="bg-white border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="w-11 h-11 rounded-xl bg-[#74acdf]/10 flex items-center justify-center shrink-0">
                <UIcon :name="getIconForTipo(result.tipo)" class="text-xl text-[#74acdf]" />
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <UBadge :color="getColorForTipo(result.tipo)" variant="subtle" size="sm">{{ result.tipo }}</UBadge>
                  <UBadge color="neutral" variant="soft" size="sm">Importancia {{ result.importance }}</UBadge>
                  <span v-if="result.fecha" class="text-xs text-gray-600">{{ formatDate(result.fecha) }}</span>
                </div>

                <h3 class="font-semibold text-lg text-gray-900 mb-2">{{ result.titulo }}</h3>

                <p v-if="result.tribunal" class="text-sm text-gray-600 mb-2">
                  {{ result.tribunal }}
                  <span v-if="result.jurisdiccion" class="text-gray-500"> · {{ result.jurisdiccion }}</span>
                </p>

                <p v-if="result.sumario" class="text-sm text-gray-700 line-clamp-3">{{ result.sumario }}</p>

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
  summary?: string
  keyFindings?: string[]
  risks?: string[]
}

const route = useRoute()
const queryText = computed(() => String(route.query.q || '').trim())
const tipo = computed(() => String(route.query.tipo || 'jurisprudencia'))

const sortedResults = ref<SearchResultCard[]>([])
const summary = ref<ReportSummary | null>(null)
const summaryLoading = ref(false)
const summaryError = ref('')

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

async function loadSearch() {
  if (!queryText.value || queryText.value.length < 2) return

  const data = await $fetch<{ results: ApiSearchResult[] }>('/api/search', {
    params: { q: queryText.value, tipo: tipo.value, limit: 20 }
  })

  sortedResults.value = normalizeAndSort(data.results || [], queryText.value)
}

async function loadSummary() {
  if (!queryText.value || !sortedResults.value.length) return

  summaryLoading.value = true
  summaryError.value = ''

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

await loadSearch()
await loadSummary()

useSeoMeta({
  title: queryText.value ? `Resultados: ${queryText.value} | Jurídica` : 'Búsqueda | Jurídica',
  description: 'Resultados de jurisprudencia argentina con AI summary y fuentes verificables.'
})
</script>
