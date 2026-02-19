<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Suscripciones" />
    </template>

    <template #body>
      <div class="p-6">
        <UEmpty
          icon="i-lucide-credit-card"
          title="Próximamente"
          description="Gestión de suscripciones y planes"
          class="py-20"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>
