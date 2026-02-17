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
        <NuxtLink to="/">
          <AppLogo class="w-auto h-6 shrink-0" />
        </NuxtLink>

        <TemplateMenu />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-simple-icons-nuxtdotjs" />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          Built with Nuxt UI • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <UButton
          to="https://github.com/nuxt-ui-templates/starter"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
