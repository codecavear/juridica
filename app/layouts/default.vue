<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { loggedIn, user, clear } = useUserSession()
const showLoginModal = ref(false)

// Provide openLogin to child components
provide('openLogin', () => {
  showLoginModal.value = true
})

const items: NavigationMenuItem[] = [
  { label: 'Cómo usar', to: '/como-usar', exact: true },
  { label: 'Fuentes', to: '/fuentes', exact: true },
  { label: 'Precio', to: '/planes', exact: true },
  { label: 'Demo', to: '/demo', exact: true },
  { label: 'Guías', to: '/mejor-buscador-jurisprudencia-argentina', exact: true }
]

const footerColumns = [{
  label: 'Producto',
  children: [{
    label: 'Demo',
    to: '/demo'
  }, {
    label: 'Precio',
    to: '/planes'
  }, {
    label: 'Búsqueda ejemplo',
    to: '/busqueda?q=despido&tipo=jurisprudencia'
  }]
}, {
  label: 'Recursos',
  children: [{
    label: 'Mejor buscador 2026',
    to: '/mejor-buscador-jurisprudencia-argentina'
  }, {
    label: 'Citas verificables',
    to: '/mejor-herramienta-citas-legales-verificables'
  }, {
    label: 'Guía CSJN',
    to: '/como-buscar-fallos-csjn'
  }]
}, {
  label: 'Fuentes',
  children: [{
    label: 'SAIJ (activo)'
  }, {
    label: 'CSJN (próximamente)'
  }, {
    label: 'JUBA (próximamente)'
  }, {
    label: 'JUSCABA (próximamente)'
  }]
}, {
  label: 'Legal',
  children: [{
    label: 'Términos',
    to: '/terminos'
  }, {
    label: 'Privacidad',
    to: '/privacidad'
  }, {
    label: 'Contacto',
    to: 'mailto:hola@juridica.ar'
  }]
}]
</script>

<template>
  <UHeader title="Jurídica">
    <template #left>
      <NuxtLink
        to="/"
        class="flex items-center gap-2"
      >
        <UIcon
          name="i-lucide-scale"
          class="w-6 h-6 text-primary"
        />
        <span class="font-bold text-lg">Jurídica</span>
      </NuxtLink>
    </template>

    <template #right>
      <UNavigationMenu
        :items="items"
        variant="link"
        class="hidden lg:block"
      />

      <NuxtLink
        v-if="loggedIn"
        to="/perfil"
        class="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <UAvatar
          v-if="user?.avatar"
          :src="user.avatar"
          :alt="user?.name || 'Usuario'"
          size="sm"
        />
        <span class="text-sm font-medium text-highlighted hidden lg:inline">{{ user?.name }}</span>
      </NuxtLink>
      <UButton
        v-else
        color="primary"
        variant="soft"
        size="sm"
        @click="showLoginModal = true"
      >
        Ingresar
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
      <div class="mt-4 pt-4 border-t border-default">
        <NuxtLink
          v-if="loggedIn"
          to="/perfil"
          class="flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-elevated transition-colors"
        >
          <UAvatar
            v-if="user?.avatar"
            :src="user.avatar"
            :alt="user?.name || 'Usuario'"
            size="sm"
          />
          <UIcon
            v-else
            name="i-lucide-user"
            class="size-5 text-muted"
          />
          <span class="text-sm font-medium text-highlighted">{{ user?.name || 'Mi perfil' }}</span>
        </NuxtLink>
        <UButton
          v-else
          color="primary"
          variant="soft"
          block
          @click="showLoginModal = true"
        >
          Ingresar
        </UButton>
      </div>
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <USeparator
    icon="i-lucide-scale"
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #top>
      <UContainer>
        <UFooterColumns :columns="footerColumns" />
      </UContainer>
    </template>

    <template #left>
      <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} Jurídica · Jurisprudencia argentina con IA
      </p>
    </template>

    <template #right>
      <UButton
        to="mailto:hola@juridica.ar"
        icon="i-lucide-mail"
        aria-label="Email"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://x.com/codecavear"
        target="_blank"
        icon="i-simple-icons-x"
        aria-label="X"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>

  <LoginModal v-model:open="showLoginModal" />
</template>
