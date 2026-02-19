<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { loggedIn, user, clear } = useUserSession()
const showLoginModal = ref(false)

// Provide openLogin to child components
provide('openLogin', () => { showLoginModal.value = true })

const items: NavigationMenuItem[] = [
  { label: 'Cómo usar', to: '/#como-usar', exact: true },
  { label: 'Fuentes', to: '/#fuentes', exact: true },
  { label: 'Planes', to: '/#planes', exact: true },
  { label: 'Demo', to: '/demo', exact: true },
  { label: 'Guías', to: '/mejor-buscador-jurisprudencia-argentina', exact: true }
]

async function logout() {
  await clear()
  await navigateTo('/')
}
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

    <UNavigationMenu :items="items" />

    <template #right>
      <div
        v-if="loggedIn"
        class="flex items-center gap-2"
      >
        <NuxtLink
          to="/perfil"
          class="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <UAvatar
            v-if="user?.avatar"
            :src="user.avatar"
            :alt="user?.name || 'Usuario'"
            size="sm"
          />
          <span class="text-sm font-medium text-highlighted hidden sm:inline">{{ user?.name }}</span>
        </NuxtLink>
      </div>
      <UButton
        v-else
        color="primary"
        variant="soft"
        size="sm"
        @click="showLoginModal = true"
      >
        Iniciar sesión
      </UButton>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="-mx-2.5"
      />
    </template>
  </UHeader>

  <UMain>
    <slot />
  </UMain>

  <UFooter class="border-t border-default">
    <template #left>
      <div class="flex items-center gap-2 text-sm text-muted">
        <UIcon
          name="i-lucide-scale"
          class="w-4 h-4"
        />
        <span class="font-medium">Jurídica</span>
      </div>
    </template>

    <template #center>
      <div class="w-full py-6">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
          <div>
            <p class="font-semibold text-highlighted mb-2">
              Producto
            </p>
            <div class="space-y-1 text-muted">
              <NuxtLink
                to="/demo"
                class="block hover:text-primary"
              >Demo</NuxtLink>
              <NuxtLink
                to="/busqueda?q=despido&tipo=jurisprudencia"
                class="block hover:text-primary"
              >Búsqueda ejemplo</NuxtLink>
              <NuxtLink
                to="/#planes"
                class="block hover:text-primary"
              >Planes</NuxtLink>
            </div>
          </div>

          <div>
            <p class="font-semibold text-highlighted mb-2">
              Recursos
            </p>
            <div class="space-y-1 text-muted">
              <NuxtLink
                to="/mejor-buscador-jurisprudencia-argentina"
                class="block hover:text-primary"
              >Mejor buscador 2026</NuxtLink>
              <NuxtLink
                to="/mejor-herramienta-citas-legales-verificables"
                class="block hover:text-primary"
              >Citas verificables</NuxtLink>
              <NuxtLink
                to="/como-buscar-fallos-csjn"
                class="block hover:text-primary"
              >Guía CSJN</NuxtLink>
            </div>
          </div>

          <div>
            <p class="font-semibold text-highlighted mb-2">
              Fuentes
            </p>
            <div class="space-y-1 text-muted">
              <span class="block">SAIJ (activo)</span>
              <span class="block">CSJN (próximamente)</span>
              <span class="block">JUBA (próximamente)</span>
              <span class="block">JUSCABA (próximamente)</span>
            </div>
          </div>

          <div>
            <p class="font-semibold text-highlighted mb-2">
              Legal
            </p>
            <div class="space-y-1 text-muted">
              <NuxtLink
                to="/terminos"
                class="block hover:text-primary"
              >Términos</NuxtLink>
              <NuxtLink
                to="/privacidad"
                class="block hover:text-primary"
              >Privacidad</NuxtLink>
              <button
                class="block hover:text-primary"
                @click="showLoginModal = true"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #right>
      <div class="text-xs text-muted">
        © {{ new Date().getFullYear() }} Jurídica
      </div>
    </template>
  </UFooter>

  <LoginModal v-model:open="showLoginModal" />
</template>
