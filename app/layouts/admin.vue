<template>
  <UDashboardLayout>
    <UDashboardSidebar>
      <template #header>
        <NuxtLink to="/admin" class="flex items-center gap-2 px-2">
          <UIcon name="i-lucide-scale" class="w-6 h-6 text-primary" />
          <span class="font-bold">Jurídica Admin</span>
        </NuxtLink>
      </template>

      <UDashboardSidebarLinks :links="links" />

      <template #footer>
        <div class="px-4 py-2">
          <UButton to="/" variant="ghost" color="neutral" block>
            <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
            Volver al sitio
          </UButton>
        </div>
      </template>
    </UDashboardSidebar>

    <slot />
  </UDashboardLayout>
</template>

<script setup lang="ts">
const links = [
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
]
</script>
