<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-white to-slate-50 py-16 lg:py-24">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#74acdf]/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <UBadge color="neutral" variant="subtle" size="lg" class="mb-6">
          <UIcon name="i-lucide-git-compare" class="mr-1" />
          Comparación
        </UBadge>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          {{ page.heroTitle }}
        </h1>

        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
          {{ page.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Comparison Table Section -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Comparación de funcionalidades
          </h2>
        </div>

        <div class="bg-slate-50 rounded-2xl overflow-hidden">
          <!-- Header -->
          <div class="grid grid-cols-3 bg-gray-900 text-white">
            <div class="p-4 font-semibold">Característica</div>
            <div class="p-4 font-semibold text-center bg-[#74acdf]">
              <div class="flex items-center justify-center gap-2">
                <UIcon name="i-lucide-scale" />
                Jurídica
              </div>
            </div>
            <div class="p-4 font-semibold text-center">{{ page.competitor }}</div>
          </div>

          <!-- Rows -->
          <div
            v-for="(row, index) in page.comparison"
            :key="row.feature"
            class="grid grid-cols-3 border-b border-gray-200 last:border-b-0"
            :class="index % 2 === 0 ? 'bg-white' : 'bg-slate-50'"
          >
            <div class="p-4 text-gray-700 font-medium">{{ row.feature }}</div>
            <div class="p-4 text-center">
              <span v-if="row.juridica === true" class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <UIcon name="i-lucide-check" class="text-green-600 text-lg" />
              </span>
              <span v-else-if="row.juridica === false" class="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                <UIcon name="i-lucide-x" class="text-red-600 text-lg" />
              </span>
              <span v-else class="text-sm text-gray-700 font-medium">{{ row.juridica }}</span>
            </div>
            <div class="p-4 text-center">
              <span v-if="row.competitor === true" class="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                <UIcon name="i-lucide-check" class="text-green-600 text-lg" />
              </span>
              <span v-else-if="row.competitor === false" class="inline-flex items-center justify-center w-8 h-8 bg-red-100 rounded-full">
                <UIcon name="i-lucide-x" class="text-red-600 text-lg" />
              </span>
              <span v-else class="text-sm text-gray-500">{{ row.competitor }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Jurídica Section -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Por qué elegir Jurídica
          </h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="reason in page.whyJuridica"
            :key="reason.title"
            class="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div class="flex gap-4">
              <div class="w-10 h-10 bg-[#74acdf]/20 rounded-lg flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-check-circle" class="text-xl text-[#74acdf]" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">{{ reason.title }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ reason.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Verdict Section -->
    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 lg:p-12 text-center">
          <UIcon name="i-lucide-scale" class="text-5xl text-[#74acdf] mb-6" />
          <h2 class="text-2xl font-bold text-white mb-4">Nuestro veredicto</h2>
          <p class="text-lg text-gray-300 leading-relaxed">
            {{ page.verdict }}
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-[#74acdf]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
          Probá Jurídica gratis
        </h2>
        <p class="text-lg text-white/90 mb-8">
          5 búsquedas diarias sin costo. Sin tarjeta de crédito.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="xl" color="white" variant="solid" class="text-blue-600 font-semibold">
            <UIcon name="i-lucide-rocket" class="mr-2" />
            Empezar gratis
          </UButton>
          <NuxtLink to="/">
            <UButton size="xl" variant="outline" class="border-white text-white hover:bg-white/10">
              Ver más funcionalidades
            </UButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-[#74acdf] rounded-xl flex items-center justify-center">
              <UIcon name="i-lucide-scale" class="text-2xl text-white" />
            </div>
            <span class="text-xl font-bold text-white">Jurídica</span>
          </div>
          <div class="flex gap-8 text-sm">
            <NuxtLink to="/" class="hover:text-white transition-colors">Inicio</NuxtLink>
            <a href="#" class="hover:text-white transition-colors">Términos</a>
            <a href="#" class="hover:text-white transition-colors">Privacidad</a>
          </div>
          <p class="text-sm">
            © {{ new Date().getFullYear() }} Jurídica. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { comparisonPages } from '~/data/seo-content'

const route = useRoute()
const slug = route.params.slug as string

const page = computed(() => comparisonPages[slug])

// 404 if page doesn't exist
if (!page.value) {
  throw createError({
    statusCode: 404,
    message: 'Página no encontrada'
  })
}

// SEO Meta
useSeoMeta({
  title: page.value.metaTitle,
  description: page.value.metaDescription,
  ogTitle: page.value.metaTitle,
  ogDescription: page.value.metaDescription,
  ogType: 'article',
  ogLocale: 'es_AR',
  twitterCard: 'summary_large_image',
  twitterTitle: page.value.metaTitle,
  twitterDescription: page.value.metaDescription
})

// Canonical URL
useHead({
  link: [
    { rel: 'canonical', href: `https://juridica.ar/comparar/${slug}` }
  ]
})

// Schema.org JSON-LD for comparison
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.value.metaTitle,
        description: page.value.metaDescription,
        author: {
          '@type': 'Organization',
          name: 'Jurídica'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Jurídica',
          url: 'https://juridica.ar'
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://juridica.ar/comparar/${slug}`
        }
      })
    }
  ]
})
</script>
