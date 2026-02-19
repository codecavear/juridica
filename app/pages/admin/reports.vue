<template>
  <UDashboardPanel>
    <template #header>
      <UDashboardNavbar title="Reportes IA" />
    </template>

    <template #body>
      <div class="p-6">
        <UEmpty
          icon="i-lucide-file-text"
          title="Próximamente"
          description="Reportes IA generados por usuarios"
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
