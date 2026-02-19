<template>
  <div class="min-h-screen bg-default py-8">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <UButton
            to="/perfil"
            variant="link"
            color="neutral"
            icon="i-lucide-arrow-left"
            class="mb-2"
          >
            Volver al perfil
          </UButton>
          <h1 class="text-2xl sm:text-3xl font-bold text-highlighted">
            {{ report?.title || 'Reporte' }}
          </h1>
          <p class="text-muted text-sm mt-1">
            Búsqueda: "{{ report?.query }}" · {{ formatDate(report?.createdAt) }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UDropdownMenu :items="exportItems">
            <UButton
              variant="outline"
              color="neutral"
              icon="i-lucide-download"
            >
              Exportar
            </UButton>
          </UDropdownMenu>
          <UButton
            :to="`/busqueda?q=${encodeURIComponent(report?.query || '')}`"
            color="primary"
            variant="soft"
            icon="i-lucide-search"
          >
            Repetir búsqueda
          </UButton>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Report content -->
        <div class="lg:col-span-2 space-y-4">
          <UCard v-if="parsed">
            <div class="space-y-5 text-sm">
              <div v-if="parsed.summary">
                <p class="font-medium text-highlighted mb-1">
                  Resumen
                </p>
                <p class="text-toned whitespace-pre-line">
                  {{ parsed.summary }}
                </p>
              </div>

              <div v-if="parsed.keyFindings?.length">
                <p class="font-medium text-highlighted mb-1">
                  Hallazgos clave
                </p>
                <ul class="list-disc ml-5 text-toned space-y-1">
                  <li
                    v-for="(item, idx) in parsed.keyFindings"
                    :key="`k-${idx}`"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-if="parsed.arguments?.length">
                <p class="font-medium text-highlighted mb-1">
                  Argumentos
                </p>
                <div class="space-y-2">
                  <div
                    v-for="(arg, idx) in parsed.arguments"
                    :key="`a-${idx}`"
                    class="border-l-2 border-primary/30 pl-3"
                  >
                    <p class="text-toned font-medium">
                      {{ arg.point }}
                    </p>
                    <p
                      v-if="arg.support"
                      class="text-muted text-xs mt-0.5"
                    >
                      {{ arg.support }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="parsed.risks?.length">
                <p class="font-medium text-highlighted mb-1">
                  Riesgos
                </p>
                <ul class="list-disc ml-5 text-toned space-y-1">
                  <li
                    v-for="(item, idx) in parsed.risks"
                    :key="`r-${idx}`"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-if="parsed.recommendations?.length">
                <p class="font-medium text-highlighted mb-1">
                  Recomendaciones
                </p>
                <ul class="list-disc ml-5 text-toned space-y-1">
                  <li
                    v-for="(item, idx) in parsed.recommendations"
                    :key="`rec-${idx}`"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-if="parsed.practicalUse?.length">
                <p class="font-medium text-highlighted mb-1">
                  Por qué este análisis importa
                </p>
                <ul class="space-y-2 text-toned">
                  <li
                    v-for="(item, idx) in parsed.practicalUse"
                    :key="`pu-${idx}`"
                    class="flex gap-2"
                  >
                    <UIcon
                      name="i-lucide-check"
                      class="text-green-600 mt-0.5 shrink-0"
                    />
                    {{ item }}
                  </li>
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

        <!-- Citations sidebar -->
        <div class="space-y-4">
          <UCard v-if="report?.citations?.length">
            <template #header>
              <p class="font-semibold text-highlighted">
                Citas y fuentes
              </p>
            </template>
            <div class="space-y-3">
              <a
                v-for="(cite, idx) in report.citations"
                :key="`c-${idx}`"
                :href="cite.url"
                target="_blank"
                class="block p-3 rounded-lg border border-default hover:border-primary/30 hover:bg-elevated transition-colors"
              >
                <p class="text-sm font-medium text-highlighted line-clamp-2">
                  {{ cite.titulo }}
                </p>
                <p
                  v-if="cite.extracto"
                  class="text-xs text-muted mt-1 line-clamp-2"
                >
                  {{ cite.extracto }}
                </p>
                <div class="flex items-center gap-1 mt-2 text-xs text-primary">
                  <UIcon
                    name="i-lucide-external-link"
                    class="size-3"
                  />
                  Ver fuente oficial
                </div>
              </a>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <p class="font-semibold text-highlighted">
                Detalles
              </p>
            </template>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted">Fecha</span>
                <span class="text-highlighted">{{ formatDate(report?.createdAt) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted">Tokens usados</span>
                <span class="text-highlighted">{{ report?.tokensUsed || 0 }}</span>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ReportData {
  id: string
  title: string
  query: string
  content: string
  citations: Array<{ id: string, titulo: string, url: string, extracto: string }>
  tokensUsed: number
  createdAt: string
}

interface ParsedContent {
  title?: string
  summary?: string
  keyFindings?: string[]
  arguments?: Array<{ point?: string, support?: string }>
  risks?: string[]
  recommendations?: string[]
  practicalUse?: string[]
}

const route = useRoute()

const { data: report } = await useAsyncData<ReportData>(`report-${route.params.id}`, () =>
  $fetch(`/api/reports/${route.params.id}`)
)

const parsed = computed<ParsedContent | null>(() => {
  if (!report.value?.content) return null
  try {
    const raw = typeof report.value.content === 'string'
      ? JSON.parse(report.value.content)
      : report.value.content
    return raw as ParsedContent
  } catch {
    return { summary: report.value.content }
  }
})

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
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
  const p = parsed.value
  if (!p) return ''
  const lines = [
    `Reporte: ${report.value?.title}`,
    `Búsqueda: ${report.value?.query}`,
    `Fecha: ${formatDate(report.value?.createdAt)}`,
    '',
    '=== RESUMEN ===',
    p.summary || '',
    '',
  ]
  if (p.keyFindings?.length) {
    lines.push('=== HALLAZGOS CLAVE ===')
    p.keyFindings.forEach(f => lines.push(`- ${f}`))
    lines.push('')
  }
  if (p.arguments?.length) {
    lines.push('=== ARGUMENTOS ===')
    p.arguments.forEach(a => {
      lines.push(`• ${a.point}`)
      if (a.support) lines.push(`  ${a.support}`)
    })
    lines.push('')
  }
  if (p.risks?.length) {
    lines.push('=== RIESGOS ===')
    p.risks.forEach(r => lines.push(`- ${r}`))
    lines.push('')
  }
  if (p.recommendations?.length) {
    lines.push('=== RECOMENDACIONES ===')
    p.recommendations.forEach(r => lines.push(`- ${r}`))
    lines.push('')
  }
  if (report.value?.citations?.length) {
    lines.push('=== CITAS ===')
    report.value.citations.forEach(c => lines.push(`- ${c.titulo}: ${c.url}`))
  }
  return lines.join('\n')
}

const exportItems = [[
  { label: 'Descargar TXT', icon: 'i-lucide-file-text', onSelect: () => downloadFile(`reporte-${Date.now()}.txt`, buildPlainText()) },
  { label: 'Descargar JSON', icon: 'i-lucide-braces', onSelect: () => downloadFile(`reporte-${Date.now()}.json`, JSON.stringify({ ...report.value, parsed: parsed.value }, null, 2), 'application/json') },
  { label: 'Descargar DOC', icon: 'i-lucide-file', onSelect: () => downloadFile(`reporte-${Date.now()}.doc`, `<!doctype html><html><head><meta charset="utf-8"><title>${report.value?.title}</title></head><body><pre>${buildPlainText().replace(/</g, '&lt;')}</pre></body></html>`, 'application/msword') },
]]

useSeoMeta({
  title: report.value?.title ? `${report.value.title} | Jurídica` : 'Reporte | Jurídica',
  description: `Reporte de jurisprudencia: ${report.value?.query || ''}`
})
</script>
