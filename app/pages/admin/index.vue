<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Dashboard">
        <template #right>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-refresh-cw"
            @click="refresh"
          >
            Actualizar
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <!-- Stats Cards -->
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-lg bg-primary/10">
                <UIcon
                  name="i-lucide-users"
                  class="size-6 text-primary"
                />
              </div>
              <div>
                <p class="text-2xl font-bold">
                  {{ stats.totalUsers }}
                </p>
                <p class="text-sm text-muted">
                  Usuarios
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-lg bg-success/10">
                <UIcon
                  name="i-lucide-search"
                  class="size-6 text-success"
                />
              </div>
              <div>
                <p class="text-2xl font-bold">
                  {{ stats.totalSearches }}
                </p>
                <p class="text-sm text-muted">
                  Búsquedas
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-lg bg-secondary/10">
                <UIcon
                  name="i-lucide-file-text"
                  class="size-6 text-secondary"
                />
              </div>
              <div>
                <p class="text-2xl font-bold">
                  {{ stats.totalReports }}
                </p>
                <p class="text-sm text-muted">
                  Reportes IA
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-lg bg-warning/10">
                <UIcon
                  name="i-lucide-credit-card"
                  class="size-6 text-warning"
                />
              </div>
              <div>
                <p class="text-2xl font-bold">
                  {{ stats.paidUsers }}
                </p>
                <p class="text-sm text-muted">
                  Suscriptores
                </p>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Recent Searches -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">
                  Búsquedas recientes
                </h3>
                <UButton
                  to="/admin/searches"
                  variant="link"
                  size="xs"
                >
                  Ver todas
                </UButton>
              </div>
            </template>
            <div class="space-y-3">
              <div
                v-for="search in recentSearches"
                :key="search.id"
                class="flex items-center justify-between py-2 border-b border-default last:border-0"
              >
                <div>
                  <p class="font-medium truncate max-w-xs">
                    {{ search.query }}
                  </p>
                  <p class="text-xs text-muted">
                    {{ search.tipo }} • {{ formatDate(search.createdAt) }}
                  </p>
                </div>
                <UBadge
                  :color="search.resultsCount > 0 ? 'success' : 'error'"
                  variant="subtle"
                  size="xs"
                >
                  {{ search.resultsCount }} resultados
                </UBadge>
              </div>
              <p
                v-if="recentSearches.length === 0"
                class="text-muted text-sm text-center py-4"
              >
                Sin búsquedas todavía
              </p>
            </div>
          </UCard>

          <!-- Recent Users -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">
                  Usuarios recientes
                </h3>
                <UButton
                  to="/admin/users"
                  variant="link"
                  size="xs"
                >
                  Ver todos
                </UButton>
              </div>
            </template>
            <div class="space-y-3">
              <div
                v-for="user in recentUsers"
                :key="user.id"
                class="flex items-center justify-between py-2 border-b border-default last:border-0"
              >
                <div class="flex items-center gap-3">
                  <UAvatar
                    :alt="user.name || user.email"
                    size="sm"
                  />
                  <div>
                    <p class="font-medium">
                      {{ user.name || 'Sin nombre' }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ user.email }}
                    </p>
                  </div>
                </div>
                <UBadge
                  :color="getPlanColor(user.plan)"
                  variant="subtle"
                  size="xs"
                >
                  {{ user.plan }}
                </UBadge>
              </div>
              <p
                v-if="recentUsers.length === 0"
                class="text-muted text-sm text-center py-4"
              >
                Sin usuarios todavía
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const stats = ref({
  totalUsers: 0,
  totalSearches: 0,
  totalReports: 0,
  paidUsers: 0
})

const recentSearches = ref<Array<{
  id: string
  query: string
  tipo: string
  resultsCount: number
  createdAt: string
}>>([])

const recentUsers = ref<Array<{
  id: string
  email: string
  name: string | null
  plan: string
  createdAt: string
}>>([])

async function refresh() {
  try {
    const data = await $fetch('/api/admin/stats')
    stats.value = data.stats
    recentSearches.value = data.recentSearches
    recentUsers.value = data.recentUsers
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getPlanColor(plan: string) {
  const colors: Record<string, 'neutral' | 'info' | 'secondary' | 'warning'> = {
    free: 'neutral',
    basico: 'info',
    pro: 'secondary',
    estudio: 'warning'
  }
  return colors[plan] || 'neutral'
}

onMounted(() => {
  refresh()
})
</script>
