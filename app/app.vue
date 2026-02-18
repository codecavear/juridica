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
        <nav class="flex items-center gap-4 text-sm overflow-x-auto max-w-[55vw] lg:max-w-none no-scrollbar">
          <NuxtLink to="/#como-usar" class="whitespace-nowrap text-muted hover:text-primary transition-colors">Cómo usar</NuxtLink>
          <NuxtLink to="/#fuentes" class="whitespace-nowrap text-muted hover:text-primary transition-colors">Fuentes</NuxtLink>
          <NuxtLink to="/#planes" class="whitespace-nowrap text-muted hover:text-primary transition-colors">Planes</NuxtLink>
          <NuxtLink to="/demo" class="whitespace-nowrap text-muted hover:text-primary transition-colors">Demo</NuxtLink>
          <NuxtLink to="/mejor-buscador-jurisprudencia-argentina" class="whitespace-nowrap text-muted hover:text-primary transition-colors">Guías</NuxtLink>
        </nav>
      </template>

      <template #right>
        <UColorModeButton />
        <UButton
          to="/ingresar"
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

    <UFooter class="border-t border-default">
      <template #left>
        <div class="flex items-center gap-2 text-sm text-muted">
          <UIcon name="i-lucide-scale" class="w-4 h-4" />
          <span class="font-medium">Jurídica</span>
        </div>
      </template>

      <template #center>
        <div class="w-full py-6">
          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <p class="font-semibold text-highlighted mb-2">Producto</p>
              <div class="space-y-1 text-muted">
                <NuxtLink to="/demo" class="block hover:text-primary">Demo</NuxtLink>
                <NuxtLink to="/busqueda?q=despido&tipo=jurisprudencia" class="block hover:text-primary">Búsqueda ejemplo</NuxtLink>
                <NuxtLink to="/#planes" class="block hover:text-primary">Planes</NuxtLink>
              </div>
            </div>

            <div>
              <p class="font-semibold text-highlighted mb-2">Recursos</p>
              <div class="space-y-1 text-muted">
                <NuxtLink to="/mejor-buscador-jurisprudencia-argentina" class="block hover:text-primary">Mejor buscador 2026</NuxtLink>
                <NuxtLink to="/mejor-herramienta-citas-legales-verificables" class="block hover:text-primary">Citas verificables</NuxtLink>
                <NuxtLink to="/como-buscar-fallos-csjn" class="block hover:text-primary">Guía CSJN</NuxtLink>
              </div>
            </div>

            <div>
              <p class="font-semibold text-highlighted mb-2">Fuentes</p>
              <div class="space-y-1 text-muted">
                <span class="block">SAIJ (activo)</span>
                <span class="block">CSJN (próximamente)</span>
                <span class="block">JUBA (próximamente)</span>
                <span class="block">JUSCABA (próximamente)</span>
              </div>
            </div>

            <div>
              <p class="font-semibold text-highlighted mb-2">Legal</p>
              <div class="space-y-1 text-muted">
                <NuxtLink to="/terminos" class="block hover:text-primary">Términos</NuxtLink>
                <NuxtLink to="/privacidad" class="block hover:text-primary">Privacidad</NuxtLink>
                <NuxtLink to="/ingresar" class="block hover:text-primary">Iniciar sesión</NuxtLink>
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
  </UApp>
</template>
