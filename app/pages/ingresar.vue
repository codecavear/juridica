<script setup lang="ts">
const route = useRoute()
const open = ref(true)
const authError = computed(() => {
  const error = route.query.error as string
  if (!error) return null
  const messages: Record<string, string> = {
    db_unavailable: 'Error de conexión. Intentá de nuevo.',
    oauth_failed: 'Error al crear tu cuenta. Intentá de nuevo.',
    oauth_error: 'Error con Google. Intentá de nuevo.',
    user_creation_failed: 'No se pudo crear tu cuenta. Intentá de nuevo.'
  }
  return messages[error] || 'Error de autenticación. Intentá de nuevo.'
})

watch(open, (v) => {
  if (!v) navigateTo('/')
})
</script>

<template>
  <div class="min-h-screen bg-default">
    <div
      v-if="authError"
      class="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4"
    >
      <UAlert
        color="error"
        variant="soft"
        :title="authError"
        icon="i-lucide-alert-circle"
        :close-button="{ onClick: () => navigateTo('/ingresar') }"
      />
    </div>
    <LoginModal v-model:open="open" />
  </div>
</template>
