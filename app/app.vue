<script setup>
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
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
