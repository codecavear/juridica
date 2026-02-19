<template>
  <UDashboardPage>
    <UDashboardPanel>
      <UDashboardNavbar title="Búsquedas">
        <template #right>
          <USelect
            v-model="filterTipo"
            :items="tipoOptions"
            placeholder="Filtrar por tipo"
            size="sm"
            class="w-48"
          />
        </template>
      </UDashboardNavbar>

      <UDashboardPanelContent>
        <UTable
          :data="filteredSearches"
          :columns="columns"
        >
          <template #tipo-cell="{ row }">
            <UBadge
              :color="getTipoColor(row.original.tipo)"
              variant="subtle"
              size="xs"
            >
              {{ row.original.tipo }}
            </UBadge>
          </template>
          <template #resultsCount-cell="{ row }">
            <span :class="row.original.resultsCount > 0 ? 'text-green-500' : 'text-red-500'">
              {{ row.original.resultsCount }}
            </span>
          </template>
          <template #createdAt-cell="{ row }">
            {{ formatDate(row.original.createdAt) }}
          </template>
        </UTable>

        <div
          v-if="searches.length === 0"
          class="text-center py-12"
        >
          <UIcon
            name="i-lucide-search"
            class="w-12 h-12 text-muted mx-auto mb-4"
          />
          <p class="text-muted">
            No hay búsquedas registradas
          </p>
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

interface Search {
  id: string
  query: string
  tipo: string
  resultsCount: number
  ipAddress: string | null
  createdAt: string
}

const filterTipo = ref('')
const searches = ref<Search[]>([])

const tipoOptions = [
  { label: 'Todos', value: '' },
  { label: 'Jurisprudencia', value: 'jurisprudencia' },
  { label: 'Legislación', value: 'legislacion' },
  { label: 'Doctrina', value: 'doctrina' }
]

const columns = [
  { key: 'query', label: 'Consulta' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'resultsCount', label: 'Resultados' },
  { key: 'ipAddress', label: 'IP' },
  { key: 'createdAt', label: 'Fecha' }
]

const filteredSearches = computed(() => {
  if (!filterTipo.value) return searches.value
  return searches.value.filter(s => s.tipo === filterTipo.value)
})

function getTipoColor(tipo: string) {
  const colors: Record<string, string> = {
    jurisprudencia: 'blue',
    legislacion: 'green',
    doctrina: 'purple',
    todo: 'neutral'
  }
  return colors[tipo] || 'neutral'
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

async function loadSearches() {
  try {
    const data = await $fetch('/api/admin/searches')
    searches.value = data
  } catch (error) {
    console.error('Error loading searches:', error)
  }
}

onMounted(() => {
  loadSearches()
})
</script>
