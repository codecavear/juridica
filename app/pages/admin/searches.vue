<template>
  <UDashboardPanel>
    <template #header>
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
    </template>

    <template #body>
      <div class="p-6">
        <!-- Loading state -->
        <div
          v-if="status === 'pending'"
          class="flex justify-center py-12"
        >
          <UIcon
            name="i-lucide-loader-2"
            class="text-3xl text-muted animate-spin"
          />
        </div>

        <UTable
          v-else
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
            <span :class="row.original.resultsCount > 0 ? 'text-success' : 'text-error'">
              {{ row.original.resultsCount }}
            </span>
          </template>
          <template #createdAt-cell="{ row }">
            {{ formatDate(row.original.createdAt) }}
          </template>
        </UTable>

        <UEmpty
          v-if="searches.length === 0"
          icon="i-lucide-search"
          title="No hay búsquedas"
          description="No hay búsquedas registradas todavía"
          class="py-12"
        />
      </div>
    </template>
  </UDashboardPanel>
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

const { data: searches, status } = await useFetch<Search[]>('/api/admin/searches', {
  default: () => []
})

const tipoOptions = [
  { label: 'Todos', value: '' },
  { label: 'Jurisprudencia', value: 'jurisprudencia' },
  { label: 'Legislación', value: 'legislacion' },
  { label: 'Doctrina', value: 'doctrina' }
]

const columns = [
  { accessorKey: 'query', header: 'Consulta' },
  { accessorKey: 'tipo', header: 'Tipo' },
  { accessorKey: 'resultsCount', header: 'Resultados' },
  { accessorKey: 'ipAddress', header: 'IP' },
  { accessorKey: 'createdAt', header: 'Fecha' }
]

const filteredSearches = computed(() => {
  if (!searches.value) return []
  if (!filterTipo.value) return searches.value
  return searches.value.filter(s => s.tipo === filterTipo.value)
})

function getTipoColor(tipo: string) {
  const colors: Record<string, 'info' | 'success' | 'secondary' | 'neutral'> = {
    jurisprudencia: 'info',
    legislacion: 'success',
    doctrina: 'secondary',
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
</script>
