<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { loggedIn, clear } = useUserSession()

// Redirect if not logged in
if (!loggedIn.value) {
  await navigateTo('/')
}

const { data: profile, status } = await useFetch('/api/user/profile')

// Fetch recent activity (searches + reports)
interface ActivitySearch {
  id: string
  query: string
  tipo: string
  resultsCount: number
  createdAt: string
  type: 'search'
}

interface ActivityReport {
  id: string
  title: string
  query: string
  createdAt: string
  type: 'report'
}

interface ActivityData {
  searches: ActivitySearch[]
  reports: ActivityReport[]
}

const { data: activity, status: activityStatus } = await useFetch<ActivityData>('/api/user/activity', {
  default: () => ({ searches: [], reports: [] })
})

const loadingActivity = computed(() => activityStatus.value === 'pending')
const activityTab = ref('searches')

// Slideover for viewing reports
const slideoverOpen = ref(false)
const selectedReport = ref<any>(null)
const loadingReport = ref(false)

async function openReport(reportId: string) {
  slideoverOpen.value = true
  loadingReport.value = true
  selectedReport.value = null
  try {
    selectedReport.value = await $fetch(`/api/reports/${reportId}`)
  } catch {
    selectedReport.value = null
  } finally {
    loadingReport.value = false
  }
}

const parsedReportContent = computed(() => {
  if (!selectedReport.value?.content) return null
  try {
    const raw = typeof selectedReport.value.content === 'string'
      ? JSON.parse(selectedReport.value.content)
      : selectedReport.value.content
    return raw
  } catch {
    return { summary: selectedReport.value.content }
  }
})

const planColors: Record<string, 'neutral' | 'primary' | 'warning' | 'success'> = {
  free: 'neutral',
  basico: 'primary',
  pro: 'warning',
  estudio: 'success'
}

const planIcons: Record<string, string> = {
  free: 'i-lucide-user',
  basico: 'i-lucide-zap',
  pro: 'i-lucide-crown',
  estudio: 'i-lucide-building-2'
}

const planDescriptions: Record<string, string> = {
  free: 'Acceso básico gratuito',
  basico: 'Más búsquedas y reportes IA',
  pro: 'Funcionalidades avanzadas para profesionales',
  estudio: 'Ideal para estudios jurídicos y equipos'
}

const isPremium = computed(() => {
  if (!profile.value) return false
  return ['pro', 'estudio'].includes(profile.value.plan.current)
})

const searchPercentage = computed(() => {
  if (!profile.value) return 0
  const limit = profile.value.plan.limits.searchesPerDay
  if (limit === -1) return 0
  return Math.min(100, Math.round((profile.value.usage.searchesToday / limit) * 100))
})

const reportPercentage = computed(() => {
  if (!profile.value) return 0
  const limit = profile.value.plan.limits.reportsPerMonth
  if (limit === -1) return 0
  if (limit === 0) return 100
  return Math.min(100, Math.round((profile.value.usage.reportsThisMonth / limit) * 100))
})

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function formatRelativeDate(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Hace un momento'
  if (diffMins < 60) return `Hace ${diffMins} min`
  if (diffHours < 24) return `Hace ${diffHours}h`
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  return formatDate(date)
}

function getTipoColor(tipo: string): 'info' | 'success' | 'secondary' | 'neutral' {
  const colors: Record<string, 'info' | 'success' | 'secondary' | 'neutral'> = {
    jurisprudencia: 'info',
    legislacion: 'success',
    doctrina: 'secondary',
    todo: 'neutral'
  }
  return colors[tipo] || 'neutral'
}

async function handleLogout() {
  await clear()
  await navigateTo('/')
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <!-- Loading -->
    <div
      v-if="status === 'pending'"
      class="flex justify-center py-20"
    >
      <UIcon
        name="i-lucide-loader-2"
        class="text-3xl text-muted animate-spin"
      />
    </div>

    <template v-else-if="profile">
      <!-- Profile Header Card -->
      <UCard class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center gap-6">
          <!-- Avatar & Basic Info -->
          <div class="flex items-center gap-4 flex-1">
            <UAvatar
              :src="profile.user.avatar || undefined"
              :alt="profile.user.name || 'Usuario'"
              size="3xl"
              class="ring-4 ring-offset-2 ring-offset-default"
              :class="isPremium ? 'ring-warning' : 'ring-muted/30'"
            />
            <div class="flex-1">
              <h1 class="text-2xl font-bold text-highlighted">
                {{ profile.user.name || 'Usuario' }}
              </h1>
              <p class="text-muted">
                {{ profile.user.email }}
              </p>
              <p class="text-xs text-dimmed mt-1">
                Miembro desde {{ formatDate(profile.user.createdAt) }}
              </p>
            </div>
          </div>

          <!-- Plan Badge (Prominent for Premium) -->
          <div class="sm:text-right">
            <div
              v-if="isPremium"
              class="inline-flex flex-col items-center gap-2 px-6 py-4 rounded-xl"
              :class="profile.plan.current === 'estudio' ? 'bg-success/10 border border-success/20' : 'bg-warning/10 border border-warning/20'"
            >
              <UIcon
                :name="planIcons[profile.plan.current]"
                class="size-8"
                :class="profile.plan.current === 'estudio' ? 'text-success' : 'text-warning'"
              />
              <span class="font-bold text-lg text-highlighted">Plan {{ profile.plan.label }}</span>
              <span class="text-xs text-muted">{{ planDescriptions[profile.plan.current] }}</span>
              <span class="text-xs text-muted mt-1">
                Vence: {{ profile.plan.expiresAt ? formatDate(profile.plan.expiresAt) : 'Nunca' }}
              </span>
            </div>
            <div
              v-else
              class="inline-flex flex-col items-center gap-2"
            >
              <UBadge
                :color="planColors[profile.plan.current]"
                variant="subtle"
                size="lg"
                class="px-4 py-2"
              >
                <UIcon
                  :name="planIcons[profile.plan.current]"
                  class="mr-2 size-4"
                />
                Plan {{ profile.plan.label }}
              </UBadge>
              <span class="text-xs text-muted">
                Vence: Nunca
              </span>
              <UButton
                to="/#planes"
                variant="ghost"
                color="primary"
                size="xs"
              >
                Mejorar plan
              </UButton>
            </div>
          </div>
        </div>
      </UCard>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Content (2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Usage Stats -->
          <div>
            <h2 class="text-lg font-semibold text-highlighted flex items-center gap-2 mb-4">
              <UIcon name="i-lucide-bar-chart-3" />
              Uso de tu cuenta
            </h2>

            <div class="grid sm:grid-cols-2 gap-4">
              <!-- Searches today -->
              <UCard>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="p-2 rounded-lg bg-primary/10">
                        <UIcon
                          name="i-lucide-search"
                          class="text-primary size-5"
                        />
                      </div>
                      <span class="font-medium text-highlighted">Búsquedas hoy</span>
                    </div>
                    <span class="text-xl font-bold text-highlighted">
                      {{ profile.usage.searchesToday }}
                    </span>
                  </div>
                  <div v-if="profile.plan.limits.searchesPerDay !== -1">
                    <UProgress
                      :model-value="searchPercentage"
                      :color="searchPercentage >= 90 ? 'error' : searchPercentage >= 70 ? 'warning' : 'primary'"
                      size="sm"
                    />
                    <p class="text-xs text-muted mt-1">
                      de {{ profile.plan.limits.searchesPerDay }} disponibles
                    </p>
                  </div>
                  <p
                    v-else
                    class="text-xs text-success flex items-center gap-1"
                  >
                    <UIcon
                      name="i-lucide-infinity"
                      class="size-4"
                    />
                    Búsquedas ilimitadas
                  </p>
                </div>
              </UCard>

              <!-- Reports this month -->
              <UCard>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="p-2 rounded-lg bg-secondary/10">
                        <UIcon
                          name="i-lucide-file-text"
                          class="text-secondary size-5"
                        />
                      </div>
                      <span class="font-medium text-highlighted">Reportes IA</span>
                    </div>
                    <span class="text-xl font-bold text-highlighted">
                      {{ profile.usage.reportsThisMonth }}
                    </span>
                  </div>
                  <div v-if="profile.plan.limits.reportsPerMonth > 0">
                    <UProgress
                      :model-value="reportPercentage"
                      :color="reportPercentage >= 90 ? 'error' : reportPercentage >= 70 ? 'warning' : 'secondary'"
                      size="sm"
                    />
                    <p class="text-xs text-muted mt-1">
                      de {{ profile.plan.limits.reportsPerMonth }} este mes
                    </p>
                  </div>
                  <p
                    v-else-if="profile.plan.limits.reportsPerMonth === 0"
                    class="text-xs text-dimmed"
                  >
                    Disponible desde plan Básico
                  </p>
                  <p
                    v-else
                    class="text-xs text-success flex items-center gap-1"
                  >
                    <UIcon
                      name="i-lucide-infinity"
                      class="size-4"
                    />
                    Reportes ilimitados
                  </p>
                </div>
              </UCard>
            </div>

            <!-- Total Stats -->
            <UCard class="mt-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="p-2 rounded-lg bg-muted/50">
                    <UIcon
                      name="i-lucide-trending-up"
                      class="text-muted size-5"
                    />
                  </div>
                  <span class="text-muted">Total de búsquedas realizadas</span>
                </div>
                <span class="text-2xl font-bold text-highlighted">{{ profile.usage.totalSearches.toLocaleString('es-AR') }}</span>
              </div>
            </UCard>
          </div>

          <!-- Recent Activity -->
          <div>
            <h2 class="text-lg font-semibold text-highlighted flex items-center gap-2 mb-4">
              <UIcon name="i-lucide-history" />
              Actividad reciente
            </h2>

            <UCard :ui="{ body: 'p-0' }">
              <!-- Loading -->
              <div
                v-if="loadingActivity"
                class="flex justify-center py-8"
              >
                <UIcon
                  name="i-lucide-loader-2"
                  class="text-xl text-muted animate-spin"
                />
              </div>

              <template v-else>
                <!-- Tabs -->
                <div class="flex border-b border-default">
                  <button
                    class="flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    :class="activityTab === 'searches' ? 'text-primary border-b-2 border-primary' : 'text-muted hover:text-default'"
                    @click="activityTab = 'searches'"
                  >
                    <UIcon
                      name="i-lucide-search"
                      class="size-4"
                    />
                    Búsquedas
                    <UBadge
                      v-if="activity?.searches.length"
                      variant="subtle"
                      color="neutral"
                      size="xs"
                    >
                      {{ activity.searches.length }}
                    </UBadge>
                  </button>
                  <button
                    class="flex-1 px-4 py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    :class="activityTab === 'reports' ? 'text-secondary border-b-2 border-secondary' : 'text-muted hover:text-default'"
                    @click="activityTab = 'reports'"
                  >
                    <UIcon
                      name="i-lucide-file-text"
                      class="size-4"
                    />
                    Reportes IA
                    <UBadge
                      v-if="activity?.reports.length"
                      variant="subtle"
                      color="neutral"
                      size="xs"
                    >
                      {{ activity.reports.length }}
                    </UBadge>
                  </button>
                </div>

                <!-- Searches Tab -->
                <div
                  v-if="activityTab === 'searches'"
                  class="p-4"
                >
                  <UEmpty
                    v-if="!activity?.searches.length"
                    icon="i-lucide-search-x"
                    title="Sin búsquedas"
                    description="Tus búsquedas recientes aparecerán aquí"
                    class="py-6"
                  />
                  <div
                    v-else
                    class="divide-y divide-default"
                  >
                    <div
                      v-for="search in activity.searches"
                      :key="search.id"
                      class="py-3 first:pt-0 last:pb-0"
                    >
                      <div class="flex items-start justify-between gap-4">
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-highlighted truncate">
                            {{ search.query }}
                          </p>
                          <div class="flex items-center gap-2 mt-1">
                            <UBadge
                              :color="getTipoColor(search.tipo)"
                              variant="subtle"
                              size="xs"
                            >
                              {{ search.tipo }}
                            </UBadge>
                            <span class="text-xs text-dimmed">
                              {{ formatRelativeDate(search.createdAt) }}
                            </span>
                          </div>
                        </div>
                        <UButton
                          :to="`/busqueda?q=${encodeURIComponent(search.query)}&tipo=${search.tipo}`"
                          variant="ghost"
                          size="xs"
                        >
                          <UIcon
                            name="i-lucide-repeat"
                            class="size-4 mr-1"
                          />
                          Buscar de nuevo
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Reports Tab -->
                <div
                  v-if="activityTab === 'reports'"
                  class="p-4"
                >
                  <UEmpty
                    v-if="!activity?.reports.length"
                    icon="i-lucide-file-x"
                    title="Sin reportes"
                    description="Tus reportes IA aparecerán aquí"
                    class="py-6"
                  />
                  <div
                    v-else
                    class="divide-y divide-default"
                  >
                    <div
                      v-for="report in activity.reports"
                      :key="report.id"
                      class="py-3 first:pt-0 last:pb-0"
                    >
                      <div class="flex items-start justify-between gap-4">
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-highlighted truncate">
                            {{ report.title }}
                          </p>
                          <span class="text-xs text-dimmed">
                            {{ formatRelativeDate(report.createdAt) }}
                          </span>
                        </div>
                        <UButton
                          variant="ghost"
                          size="xs"
                          @click="openReport(report.id)"
                        >
                          <UIcon
                            name="i-lucide-eye"
                            class="size-4 mr-1"
                          />
                          Ver reporte
                        </UButton>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </UCard>
          </div>
        </div>

        <!-- Sidebar (1 col) -->
        <div class="space-y-6">
          <!-- Upgrade CTA for Free Users -->
          <UCard
            v-if="profile.plan.current === 'free'"
            class="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
          >
            <div class="text-center space-y-4">
              <div class="inline-flex p-3 rounded-full bg-primary/10">
                <UIcon
                  name="i-lucide-rocket"
                  class="size-8 text-primary"
                />
              </div>
              <div>
                <p class="font-bold text-highlighted text-lg">
                  Potenciá tu búsqueda
                </p>
                <p class="text-sm text-muted mt-1">
                  Accedé a más búsquedas, reportes IA y funcionalidades avanzadas
                </p>
              </div>
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-sm text-muted">
                  <UIcon
                    name="i-lucide-check"
                    class="text-success size-4"
                  />
                  <span>30 búsquedas por día</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted">
                  <UIcon
                    name="i-lucide-check"
                    class="text-success size-4"
                  />
                  <span>5 reportes IA por mes</span>
                </div>
                <div class="flex items-center gap-2 text-sm text-muted">
                  <UIcon
                    name="i-lucide-check"
                    class="text-success size-4"
                  />
                  <span>Filtros avanzados</span>
                </div>
              </div>
              <UButton
                to="/#planes"
                color="primary"
                block
              >
                Ver planes
                <UIcon
                  name="i-lucide-arrow-right"
                  class="ml-1"
                />
              </UButton>
            </div>
          </UCard>

          <!-- Account Info -->
          <div>
            <h2 class="text-lg font-semibold text-highlighted flex items-center gap-2 mb-4">
              <UIcon name="i-lucide-settings" />
              Cuenta
            </h2>

            <UCard>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted">Email</span>
                  <span class="text-sm font-medium text-highlighted truncate max-w-[180px]">{{ profile.user.email }}</span>
                </div>
                <USeparator />
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted">Login</span>
                  <UBadge
                    variant="subtle"
                    color="neutral"
                    size="xs"
                  >
                    <UIcon
                      :name="profile.user.provider === 'google' ? 'i-simple-icons-google' : 'i-lucide-mail'"
                      class="mr-1 size-3"
                    />
                    {{ profile.user.provider === 'google' ? 'Google' : 'Email' }}
                  </UBadge>
                </div>
                <USeparator />
                <div class="flex items-center justify-between">
                  <span class="text-sm text-muted">Plan actual</span>
                  <UBadge
                    :color="planColors[profile.plan.current]"
                    variant="subtle"
                    size="xs"
                  >
                    {{ profile.plan.label }}
                  </UBadge>
                </div>
              </div>
            </UCard>
          </div>

          <!-- Logout Button -->
          <UButton
            variant="soft"
            color="error"
            block
            icon="i-lucide-log-out"
            @click="handleLogout"
          >
            Cerrar sesión
          </UButton>
        </div>
      </div>
    </template>
  </div>

  <!-- Report Slideover -->
  <USlideover
    v-model:open="slideoverOpen"
    :title="selectedReport?.title || 'Reporte'"
    :description="selectedReport ? 'Búsqueda: ' + selectedReport.query : ''"
  >
    <template #body>
      <!-- Loading -->
      <div
        v-if="loadingReport"
        class="flex items-center justify-center py-12"
      >
        <UIcon
          name="i-lucide-loader-2"
          class="animate-spin size-6 text-muted"
        />
      </div>

      <!-- Report content -->
      <div
        v-else-if="parsedReportContent"
        class="space-y-5 text-sm"
      >
        <div v-if="parsedReportContent.summary">
          <p class="font-medium text-highlighted mb-1">
            Resumen
          </p>
          <p class="text-toned whitespace-pre-line">
            {{ parsedReportContent.summary }}
          </p>
        </div>

        <div v-if="parsedReportContent.keyFindings?.length">
          <p class="font-medium text-highlighted mb-1">
            Hallazgos clave
          </p>
          <ul class="list-disc ml-5 text-toned space-y-1">
            <li
              v-for="(item, idx) in parsedReportContent.keyFindings"
              :key="`k-${idx}`"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="parsedReportContent.arguments?.length">
          <p class="font-medium text-highlighted mb-1">
            Argumentos
          </p>
          <div class="space-y-2">
            <div
              v-for="(arg, idx) in parsedReportContent.arguments"
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

        <div v-if="parsedReportContent.risks?.length">
          <p class="font-medium text-highlighted mb-1">
            Riesgos
          </p>
          <ul class="list-disc ml-5 text-toned space-y-1">
            <li
              v-for="(item, idx) in parsedReportContent.risks"
              :key="`r-${idx}`"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="parsedReportContent.recommendations?.length">
          <p class="font-medium text-highlighted mb-1">
            Recomendaciones
          </p>
          <ul class="list-disc ml-5 text-toned space-y-1">
            <li
              v-for="(item, idx) in parsedReportContent.recommendations"
              :key="`rec-${idx}`"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="parsedReportContent.practicalUse?.length">
          <p class="font-medium text-highlighted mb-1">
            Por qué este análisis importa
          </p>
          <ul class="space-y-2 text-toned">
            <li
              v-for="(item, idx) in parsedReportContent.practicalUse"
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

        <!-- Citations -->
        <div v-if="selectedReport?.citations?.length">
          <p class="font-medium text-highlighted mb-2">
            Citas y fuentes
          </p>
          <div class="space-y-2">
            <a
              v-for="(cite, idx) in selectedReport.citations"
              :key="`c-${idx}`"
              :href="cite.url"
              target="_blank"
              class="block p-2 rounded-lg border border-default hover:border-primary/30 text-xs"
            >
              <p class="font-medium text-highlighted line-clamp-1">
                {{ cite.titulo }}
              </p>
              <div class="flex items-center gap-1 mt-1 text-primary">
                <UIcon
                  name="i-lucide-external-link"
                  class="size-3"
                />
                Ver fuente
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div
        v-else
        class="text-center py-12 text-muted"
      >
        No se pudo cargar el reporte.
      </div>
    </template>

    <template #footer>
      <div class="flex items-center justify-between w-full">
        <p class="text-xs text-dimmed">
          {{ selectedReport ? formatRelativeDate(selectedReport.createdAt) : '' }}
        </p>
        <div class="flex gap-2">
          <UButton
            v-if="selectedReport"
            :to="`/reporte/${selectedReport.id}`"
            variant="outline"
            color="neutral"
            size="sm"
          >
            Abrir completo
          </UButton>
          <UButton
            v-if="selectedReport"
            :to="`/busqueda?q=${encodeURIComponent(selectedReport.query || '')}`"
            color="primary"
            size="sm"
          >
            Repetir búsqueda
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>
