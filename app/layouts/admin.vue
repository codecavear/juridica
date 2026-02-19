<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
    >
      <template #header="{ collapsed }">
        <NuxtLink
          to="/admin"
          class="flex items-center gap-2 px-2"
        >
          <UIcon
            name="i-lucide-scale"
            class="size-6 text-primary"
          />
          <span
            v-if="!collapsed"
            class="font-bold"
          >Jurídica Admin</span>
        </NuxtLink>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :items="navItems"
          orientation="vertical"
          :ui="{ link: collapsed ? 'justify-center' : undefined }"
        />
      </template>

      <template #footer="{ collapsed }">
        <UButton
          to="/"
          :icon="collapsed ? 'i-lucide-arrow-left' : undefined"
          :label="collapsed ? undefined : 'Volver al sitio'"
          color="neutral"
          variant="ghost"
          block
        />
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardGroup>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const navItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Dashboard',
    icon: 'i-lucide-layout-dashboard',
    to: '/admin'
  },
  {
    label: 'Usuarios',
    icon: 'i-lucide-users',
    to: '/admin/users'
  },
  {
    label: 'Búsquedas',
    icon: 'i-lucide-search',
    to: '/admin/searches'
  },
  {
    label: 'Reportes',
    icon: 'i-lucide-file-text',
    to: '/admin/reports'
  },
  {
    label: 'Suscripciones',
    icon: 'i-lucide-credit-card',
    to: '/admin/subscriptions'
  }
])
</script>
