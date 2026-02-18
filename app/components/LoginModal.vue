<script setup lang="ts">
const isOpen = defineModel<boolean>('open', { default: false })

const email = ref('')
const loading = ref(false)
const sent = ref(false)
const error = ref('')

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
          <h2 class="text-2xl font-bold text-highlighted">Ingresar a Jurídica</h2>
          <p class="text-sm text-muted mt-2">Te enviamos un magic link por email para entrar sin contraseña</p>
        </div>

        <div v-if="sent" class="space-y-3 text-center">
          <UAlert color="success" variant="soft" title="Link enviado" description="Revisá tu correo (y spam)." />
          <p class="text-sm text-muted">Enviado a: <span class="font-medium text-highlighted">{{ email }}</span></p>
          <UButton variant="ghost" color="neutral" @click="sent = false">Usar otro email</UButton>
        </div>

        <form v-else class="space-y-4" @submit.prevent="requestMagicLink">
          <UFormField label="Email" required>
            <UInput v-model="email" type="email" placeholder="tu@email.com" icon="i-lucide-mail" size="lg" />
          </UFormField>

          <p v-if="error" class="text-sm text-error">{{ error }}</p>

          <UButton type="submit" block size="lg" :loading="loading" :disabled="!email">
            Enviar magic link
          </UButton>
        </form>
      </div>
    </template>
  </UModal>
</template>
