<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-white to-slate-50 py-16 lg:py-24">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#74acdf]/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBadge color="success" variant="subtle" size="lg" class="mb-6">
          <UIcon name="i-lucide-shield-check" class="mr-1" />
          Guía de verificación
        </UBadge>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          {{ page.heroTitle }}
        </h1>

        <p class="text-lg sm:text-xl text-gray-600">
          {{ page.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-12 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article class="prose prose-lg prose-slate max-w-none">
          <template v-for="(block, index) in page.content" :key="index">
            <h2 v-if="block.type === 'h2'" class="text-2xl font-bold text-gray-900 mt-10 mb-4">
              {{ block.text }}
            </h2>
            <p v-else-if="block.type === 'p'" class="text-gray-600 leading-relaxed mb-6">
              {{ block.text }}
            </p>
            <ul v-else-if="block.type === 'list'" class="space-y-3 mb-6">
              <li
                v-for="item in block.items"
                :key="item"
                class="flex items-start gap-3 text-gray-600"
              >
                <UIcon name="i-lucide-check-circle" class="text-green-500 mt-1 shrink-0" />
                <span>{{ item }}</span>
              </li>
            </ul>
            <div
              v-else-if="block.type === 'callout'"
              class="bg-green-50 border-l-4 border-green-500 rounded-r-xl p-6 my-8"
            >
              <div class="flex gap-3">
                <UIcon name="i-lucide-shield-check" class="text-green-500 text-xl shrink-0" />
                <p class="text-gray-700 font-medium">{{ block.text }}</p>
              </div>
            </div>
          </template>
        </article>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes
          </h2>
        </div>

        <UAccordion
          :items="faqItems"
          :ui="{
            item: {
              base: 'bg-white rounded-xl mb-3 shadow-sm border border-gray-100'
            }
          }"
        />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-gradient-to-r from-green-600 to-[#74acdf]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
          Empezá a usar citas verificables
        </h2>
        <p class="text-lg text-white/90 mb-8">
          Cada resultado con link directo a la fuente oficial. Sin alucinaciones.
        </p>
        <NuxtLink to="/">
          <UButton size="xl" color="white" variant="solid" class="text-green-600 font-semibold">
            <UIcon name="i-lucide-shield-check" class="mr-2" />
            Probar Jurídica gratis
          </UButton>
        </NuxtLink>
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
import { guidePages } from '~/data/seo-content'

const page = guidePages['mejor-herramienta-citas-legales-verificables']

// SEO Meta
useSeoMeta({
  title: page.metaTitle,
  description: page.metaDescription,
  ogTitle: page.metaTitle,
  ogDescription: page.metaDescription,
  ogType: 'article',
  ogLocale: 'es_AR',
  twitterCard: 'summary_large_image',
  twitterTitle: page.metaTitle,
  twitterDescription: page.metaDescription
})

// Canonical URL
useHead({
  link: [
    { rel: 'canonical', href: 'https://juridica.ar/mejor-herramienta-citas-legales-verificables' }
  ]
})

// FAQ items for accordion
const faqItems = page.faqs.map((faq, index) => ({
  label: faq.question,
  content: faq.answer,
  value: `faq-${index}`
}))

// Schema.org JSON-LD
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.metaTitle,
        description: page.metaDescription,
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
          '@id': 'https://juridica.ar/mejor-herramienta-citas-legales-verificables'
        }
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    }
  ]
})
</script>
