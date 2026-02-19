<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { loggedIn } = useUserSession()

// Redirect if not logged in
if (!loggedIn.value) {
  await navigateTo('/ingresar')
}

const { data: profile, status } = await useFetch('/api/user/profile')

const planColors: Record<string, string> = {
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

function searchPercentage(): number {
  if (!profile.value) return 0
  const limit = profile.value.plan.limits.searchesPerDay
  if (limit === -1) return 0 // unlimited
  return Math.min(100, Math.round((profile.value.usage.searchesToday / limit) * 100))
}

function reportPercentage(): number {
  if (!profile.value) return 0
  const limit = profile.value.plan.limits.reportsPerMonth
  if (limit === -1) return 0 // unlimited
  if (limit === 0) return 100 // no reports allowed
  return Math.min(100, Math.round((profile.value.usage.reportsThisMonth / limit) * 100))
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-12">
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
      <!-- Header -->
      <div class="flex items-center gap-4 mb-8">
        <UAvatar
          :src="profile.user.avatar || undefined"
          :alt="profile.user.name || 'Usuario'"
          size="xl"
        />
        <div>
          <h1 class="text-2xl font-bold text-highlighted">
            {{ profile.user.name }}
          </h1>
          <p class="text-muted">
            {{ profile.user.email }}
          </p>
          <div class="flex items-center gap-2 mt-1">
            <UBadge
              :color="(planColors[profile.plan.current] as any) || 'neutral'"
              variant="subtle"
              size="sm"
            >
              <UIcon
                :name="planIcons[profile.plan.current] || 'i-lucide-user'"
                class="mr-1"
              />
              Plan {{ profile.plan.label }}
            </UBadge>
            <span class="text-xs text-dimmed">
              Miembro desde {{ formatDate(profile.user.createdAt) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Usage -->
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-highlighted flex items-center gap-2">
          <UIcon name="i-lucide-bar-chart-3" />
          Uso de tu cuenta
        </h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <!-- Searches today -->
          <UCard>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-search"
                    class="text-primary"
                  />
                  <span class="font-medium text-highlighted">Búsquedas hoy</span>
                </div>
                <span class="text-sm font-mono text-muted">
                  {{ profile.usage.searchesToday }}
                  <template v-if="profile.plan.limits.searchesPerDay !== -1">
                    / {{ profile.plan.limits.searchesPerDay }}
                  </template>
                  <template v-else>
                    <UIcon
                      name="i-lucide-infinity"
                      class="inline w-4 h-4"
                    />
                  </template>
                </span>
              </div>
              <UProgress
                v-if="profile.plan.limits.searchesPerDay !== -1"
                :value="searchPercentage()"
                :color="searchPercentage() >= 90 ? 'error' : searchPercentage() >= 70 ? 'warning' : 'primary'"
                size="sm"
              />
              <p
                v-else
                class="text-xs text-success"
              >
                Búsquedas ilimitadas
              </p>
            </div>
          </UCard>

          <!-- Reports this month -->
          <UCard>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon
                    name="i-lucide-file-text"
                    class="text-primary"
                  />
                  <span class="font-medium text-highlighted">Reportes IA este mes</span>
                </div>
                <span class="text-sm font-mono text-muted">
                  {{ profile.usage.reportsThisMonth }}
                  <template v-if="profile.plan.limits.reportsPerMonth === -1">
                    <UIcon
                      name="i-lucide-infinity"
                      class="inline w-4 h-4"
                    />
                  </template>
                  <template v-else>
                    / {{ profile.plan.limits.reportsPerMonth }}
                  </template>
                </span>
              </div>
              <UProgress
                v-if="profile.plan.limits.reportsPerMonth > 0"
                :value="reportPercentage()"
                :color="reportPercentage() >= 90 ? 'error' : reportPercentage() >= 70 ? 'warning' : 'primary'"
                size="sm"
              />
              <p
                v-else-if="profile.plan.limits.reportsPerMonth === 0"
                class="text-xs text-dimmed"
              >
                Disponible desde plan Básico
              </p>
              <p
                v-else
                class="text-xs text-success"
              >
                Reportes ilimitados
              </p>
            </div>
          </UCard>
        </div>

        <!-- Stats -->
        <UCard>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <UIcon
                name="i-lucide-trending-up"
                class="text-muted"
              />
              <span class="text-sm text-muted">Total de búsquedas realizadas</span>
            </div>
            <span class="text-lg font-bold text-highlighted">{{ profile.usage.totalSearches }}</span>
          </div>
        </UCard>

        <!-- Upgrade CTA -->
        <UCard
          v-if="profile.plan.current === 'free'"
          class="bg-primary/5 border-primary/20"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="font-semibold text-highlighted">
                ¿Necesitás más búsquedas?
              </p>
              <p class="text-sm text-muted mt-1">
                Pasá al plan Básico: 30 búsquedas/día + 5 reportes IA/mes
              </p>
            </div>
            <UButton
              to="/#planes"
              color="primary"
              size="sm"
            >
              Ver planes
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Account -->
      <div class="mt-8 space-y-4">
        <h2 class="text-lg font-semibold text-highlighted flex items-center gap-2">
          <UIcon name="i-lucide-settings" />
          Cuenta
        </h2>

        <UCard>
          <div class="space-y-3">
            <div class="flex items-center justify-between py-1">
              <span class="text-sm text-muted">Email</span>
              <span class="text-sm font-medium text-highlighted">{{ profile.user.email }}</span>
            </div>
            <USeparator />
            <div class="flex items-center justify-between py-1">
              <span class="text-sm text-muted">Método de login</span>
              <UBadge
                variant="subtle"
                color="neutral"
                size="xs"
              >
                {{ profile.user.provider === 'google' ? 'Google' : 'Magic Link' }}
              </UBadge>
            </div>
            <USeparator />
            <div class="flex items-center justify-between py-1">
              <span class="text-sm text-muted">Miembro desde</span>
              <span class="text-sm text-highlighted">{{ formatDate(profile.user.createdAt) }}</span>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </div>
</template>
