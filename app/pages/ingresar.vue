<script setup lang="ts">
const open = ref(true)

watch(open, (v) => {
  if (!v) navigateTo('/')
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <LoginModal v-model:open="open" />
  </div>
</template>
