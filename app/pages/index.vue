<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <UPageHero
      title="Jurídica"
      description="Buscador de jurisprudencia argentina con IA. Citas verificables, siempre."
      :ui="{ title: 'text-4xl sm:text-5xl' }"
    >
      <template #links>
        <div class="w-full max-w-2xl mx-auto mt-8">
          <form @submit.prevent="search" class="flex flex-col sm:flex-row gap-3">
            <UInput
              v-model="query"
              placeholder="Buscar fallos, leyes, doctrina..."
              size="xl"
              icon="i-lucide-search"
              class="flex-1"
              :ui="{ base: 'w-full' }"
            />
            <UButton
              type="submit"
              size="xl"
              :loading="loading"
              :disabled="!query.trim()"
            >
              Buscar
            </UButton>
          </form>
          
          <!-- Quick filters -->
          <div class="flex flex-wrap gap-2 mt-4 justify-center">
            <UBadge
              v-for="tipo in tiposDocumento"
              :key="tipo.value"
              :color="selectedTipo === tipo.value ? 'primary' : 'neutral'"
              variant="subtle"
              class="cursor-pointer"
              @click="selectedTipo = tipo.value"
            >
              {{ tipo.label }}
            </UBadge>
          </div>
        </div>
      </template>
    </UPageHero>

    <!-- Results Section -->
    <UPageSection v-if="results.length > 0 || hasSearched">
      <div class="max-w-4xl mx-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold">
            {{ results.length }} resultados
            <span class="text-muted">para "{{ lastQuery }}"</span>
          </h2>
        </div>

        <div v-if="results.length === 0 && hasSearched" class="text-center py-12">
          <UIcon name="i-lucide-search-x" class="text-4xl text-muted mb-4" />
          <p class="text-muted">No se encontraron resultados para "{{ lastQuery }}"</p>
        </div>

        <div v-else class="space-y-4">
          <UCard
            v-for="result in results"
            :key="result.id"
            class="hover:ring-1 hover:ring-primary/50 transition-all"
          >
            <div class="flex items-start gap-4">
              <UIcon
                :name="getIconForTipo(result.tipo)"
                class="text-2xl text-primary mt-1 shrink-0"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <UBadge :color="getColorForTipo(result.tipo)" variant="subtle" size="xs">
                    {{ result.tipo }}
                  </UBadge>
                  <span v-if="result.fecha" class="text-xs text-muted">
                    {{ formatDate(result.fecha) }}
                  </span>
                </div>
                <h3 class="font-medium text-lg leading-tight mb-2">
                  {{ result.titulo }}
                </h3>
                <p v-if="result.tribunal" class="text-sm text-muted mb-2">
                  {{ result.tribunal }}
                  <span v-if="result.jurisdiccion"> · {{ result.jurisdiccion }}</span>
                </p>
                <p v-if="result.sumario" class="text-sm text-muted line-clamp-2">
                  {{ result.sumario }}
                </p>
                <div class="flex gap-2 mt-3">
                  <UButton
                    :to="result.url"
                    target="_blank"
                    size="xs"
                    variant="soft"
                    trailing-icon="i-lucide-external-link"
                  >
                    Ver en SAIJ
                  </UButton>
                  <UButton
                    v-if="result.pdfUrl"
                    :to="result.pdfUrl"
                    target="_blank"
                    size="xs"
                    variant="ghost"
                    color="neutral"
                    trailing-icon="i-lucide-file-text"
                  >
                    PDF
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UPageSection>

    <!-- Features Section (shown when no search) -->
    <UPageSection v-else>
      <div class="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-shield-check" class="text-2xl text-primary" />
              <h3 class="font-semibold">Citas verificables</h3>
            </div>
          </template>
          <p class="text-sm text-muted">
            Cada resultado incluye link directo a la fuente oficial. 
            Nunca más sanciones por citas falsas.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-database" class="text-2xl text-primary" />
              <h3 class="font-semibold">Multi-fuente</h3>
            </div>
          </template>
          <p class="text-sm text-muted">
            Buscá en SAIJ, CSJN, JUBA y JUSCABA desde un solo lugar. 
            Sin cambiar entre páginas.
          </p>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center gap-3">
              <UIcon name="i-lucide-sparkles" class="text-2xl text-primary" />
              <h3 class="font-semibold">IA que ayuda</h3>
            </div>
          </template>
          <p class="text-sm text-muted">
            Generá reportes de jurisprudencia con análisis de argumentos.
            Siempre con fuentes verificables.
          </p>
        </UCard>
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
interface SearchResult {
  id: string
  tipo: string
  titulo: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  sumario?: string
  url: string
  pdfUrl?: string
}

const query = ref('')
const selectedTipo = ref('jurisprudencia')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const hasSearched = ref(false)
const lastQuery = ref('')

const tiposDocumento = [
  { value: 'jurisprudencia', label: 'Jurisprudencia' },
  { value: 'legislacion', label: 'Legislación' },
  { value: 'doctrina', label: 'Doctrina' },
  { value: 'todo', label: 'Todo' }
]

async function search() {
  if (!query.value.trim()) return
  
  loading.value = true
  hasSearched.value = true
  lastQuery.value = query.value
  
  try {
    const data = await $fetch('/api/search', {
      params: {
        q: query.value,
        tipo: selectedTipo.value,
        limit: 20
      }
    })
    results.value = data.results
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

function getIconForTipo(tipo: string): string {
  const icons: Record<string, string> = {
    fallo: 'i-lucide-gavel',
    sumario: 'i-lucide-file-text',
    ley: 'i-lucide-scroll',
    decreto: 'i-lucide-stamp',
    legislacion: 'i-lucide-landmark',
    doctrina: 'i-lucide-book-open',
    dictamen: 'i-lucide-file-check'
  }
  return icons[tipo] || 'i-lucide-file'
}

function getColorForTipo(tipo: string): string {
  const colors: Record<string, string> = {
    fallo: 'primary',
    sumario: 'info',
    ley: 'success',
    decreto: 'warning',
    doctrina: 'secondary'
  }
  return colors[tipo] || 'neutral'
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateStr
  }
}
</script>
