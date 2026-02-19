<script setup lang="ts">
const isOpen = defineModel<boolean>('open', { default: false })
const route = useRoute()

const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

// Read OAuth error from query params
const oauthError = computed(() => {
  const errorParam = route.query.error
  if (!errorParam) return ''
  
  const errorMessages: Record<string, string> = {
    oauth_error: 'Error al iniciar sesión con Google. Intentá de nuevo.',
    oauth_failed: 'No se pudo completar el inicio de sesión.',
    db_unavailable: 'Base de datos no disponible. Intentá más tarde.',
    user_creation_failed: 'No se pudo crear tu cuenta. Contactá a soporte.'
  }
  
  return errorMessages[errorParam as string] || 'Error desconocido. Intentá de nuevo.'
})

async function requestMagicLink() {
  if (!email.value) return
  loading.value = true
  error.value = ''

  try {
    await $fetch('/api/auth/magic-link/request', {
      method: 'POST',
      body: { email: email.value }
    })
    sent.value = true
  } catch (e: any) {
    error.value = e?.data?.message || 'No se pudo enviar el link'
  } finally {
    loading.value = false
  }
}

watch(isOpen, (open) => {
  if (!open) {
    setTimeout(() => {
      sent.value = false
      error.value = ''
      email.value = ''
    }, 250)
  }
})
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'sm:max-w-md' }">
    <template #content>
      <div class="p-6 space-y-5">
        <div class="text-center">
          <div class="flex justify-center mb-3">
            <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <UIcon name="i-lucide-scale" class="text-2xl text-primary" />
            </div>
          </div>
          <h2 class="text-2xl font-bold text-highlighted">Ingresar a Jurídica</h2>
          <p class="text-sm text-muted mt-1">Accedé a búsquedas ilimitadas y reportes con IA</p>
        </div>

        <!-- OAuth Error Alert -->
        <UAlert v-if="oauthError" color="error" variant="soft" :title="oauthError" />

        <!-- Google OAuth -->
        <UButton
          block
          size="xl"
          color="neutral"
          variant="outline"
          to="/auth/google"
          external
        >
          <template #leading>
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </template>
          Continuar con Google
        </UButton>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-default" />
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-3 bg-default text-muted">o</span>
          </div>
        </div>

        <!-- Magic link success state -->
        <div v-if="sent" class="space-y-3 text-center">
          <UAlert color="success" variant="soft" title="Link enviado" description="Revisá tu correo (y spam)." />
          <p class="text-sm text-muted">Enviado a: <span class="font-medium text-highlighted">{{ email }}</span></p>
          <UButton variant="ghost" color="neutral" @click="sent = false">Usar otro email</UButton>
        </div>

        <!-- Magic link form -->
        <form v-else class="space-y-4" @submit.prevent="requestMagicLink">
          <UFormField label="Email" required>
            <UInput v-model="email" type="email" placeholder="tu@email.com" icon="i-lucide-mail" size="lg" class="w-full" />
          </UFormField>

          <p v-if="error" class="text-sm text-error">{{ error }}</p>

          <UButton type="submit" block size="lg" :loading="loading" :disabled="!email">
            <template #leading>
              <UIcon name="i-lucide-wand-sparkles" />
            </template>
            Enviar magic link
          </UButton>

          <p class="text-xs text-center text-dimmed">
            Te enviamos un link por email para entrar sin contraseña
          </p>
        </form>
      </div>
    </template>
  </UModal>
</template>
