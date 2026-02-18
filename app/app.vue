<script setup>
// Schema.org JSON-LD for LegalService
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        'name': 'Jurídica',
        'applicationCategory': 'LegalService',
        'operatingSystem': 'Web',
        'description': 'Buscador de jurisprudencia argentina con inteligencia artificial. Consulta SAIJ, CSJN, JUBA y JUSCABA con citas jurídicas verificables.',
        'url': 'https://juridica.ar',
        'inLanguage': 'es-AR',
        'audience': {
          '@type': 'Audience',
          'audienceType': 'Abogados, estudiantes de derecho, profesionales legales'
        },
        'offers': {
          '@type': 'Offer',
          'price': '0',
          'priceCurrency': 'ARS'
        },
        'provider': {
          '@type': 'Organization',
          'name': 'Jurídica',
          'areaServed': {
            '@type': 'Country',
            'name': 'Argentina'
          }
        },
        'featureList': [
          'Búsqueda de jurisprudencia argentina',
          'Integración con SAIJ, CSJN, JUBA, JUSCABA',
          'Citas jurídicas verificables',
          'Análisis con inteligencia artificial'
        ]
      })
    }
  ]
})
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <UIcon name="i-lucide-scale" class="w-6 h-6 text-primary" />
          <span class="font-bold text-lg">Jurídica</span>
        </NuxtLink>
      </template>

      <template #center>
        <nav class="hidden lg:flex items-center gap-5 text-sm">
          <NuxtLink to="/#como-usar" class="text-muted hover:text-primary transition-colors">Cómo usar</NuxtLink>
          <NuxtLink to="/#fuentes" class="text-muted hover:text-primary transition-colors">Fuentes</NuxtLink>
          <NuxtLink to="/#planes" class="text-muted hover:text-primary transition-colors">Planes</NuxtLink>
          <NuxtLink to="/demo" class="text-muted hover:text-primary transition-colors">Demo</NuxtLink>
          <NuxtLink to="/mejor-buscador-jurisprudencia-argentina" class="text-muted hover:text-primary transition-colors">Guías</NuxtLink>
        </nav>
      </template>

      <template #right>
        <UColorModeButton />
        <UButton
          to="/login"
          color="primary"
          variant="soft"
          size="sm"
        >
          Iniciar sesión
        </UButton>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <div class="flex items-center gap-2 text-sm text-muted">
          <UIcon name="i-lucide-scale" class="w-4 h-4" />
          <span>Jurídica</span>
          <span>•</span>
          <span>© {{ new Date().getFullYear() }}</span>
        </div>
      </template>

      <template #center>
        <p class="text-xs text-muted">
          Fuentes: SAIJ, CSJN, JUBA, JUSCABA
        </p>
      </template>

      <template #right>
        <div class="flex items-center gap-2 text-sm text-muted">
          <NuxtLink to="/terminos" class="hover:text-primary">Términos</NuxtLink>
          <span>•</span>
          <NuxtLink to="/privacidad" class="hover:text-primary">Privacidad</NuxtLink>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
