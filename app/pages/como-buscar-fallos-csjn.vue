<template>
  <div class="min-h-screen bg-default">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-white to-slate-50 py-16 lg:py-24">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#74acdf]/10 rounded-full blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBadge
          color="secondary"
          variant="subtle"
          size="lg"
          class="mb-6"
        >
          <UIcon
            name="i-lucide-landmark"
            class="mr-1"
          />
          Tutorial
        </UBadge>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-highlighted mb-6 tracking-tight leading-tight">
          {{ page.heroTitle }}
        </h1>

        <p class="text-lg sm:text-xl text-muted">
          {{ page.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Content Section -->
    <section class="py-12 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article class="prose prose-lg prose-slate max-w-none">
          <template
            v-for="(block, index) in page.content"
            :key="index"
          >
            <h2
              v-if="block.type === 'h2'"
              class="text-2xl font-bold text-highlighted mt-10 mb-4"
            >
              {{ block.text }}
            </h2>
            <p
              v-else-if="block.type === 'p'"
              class="text-muted leading-relaxed mb-6"
            >
              {{ block.text }}
            </p>
            <ul
              v-else-if="block.type === 'list'"
              class="space-y-3 mb-6"
            >
              <li
                v-for="item in block.items"
                :key="item"
                class="flex items-start gap-3 text-muted"
              >
                <UIcon
                  name="i-lucide-arrow-right"
                  class="text-[#74acdf] mt-1 shrink-0"
                />
                <span>{{ item }}</span>
              </li>
            </ul>
            <div
              v-else-if="block.type === 'callout'"
              class="bg-purple-50 border-l-4 border-purple-500 rounded-r-xl p-6 my-8"
            >
              <div class="flex gap-3">
                <UIcon
                  name="i-lucide-info"
                  class="text-purple-500 text-xl shrink-0"
                />
                <p class="text-toned font-medium">
                  {{ block.text }}
                </p>
              </div>
            </div>
          </template>
        </article>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-default">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-highlighted mb-4">
            Preguntas frecuentes sobre la CSJN
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
    <section class="py-16 bg-gradient-to-r from-purple-600 to-[#74acdf]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
          Buscá fallos de la CSJN más fácil
        </h2>
        <p class="text-lg text-white/90 mb-8">
          Jurídica incluye la base completa de la Corte Suprema con búsqueda inteligente.
        </p>
        <NuxtLink to="/">
          <UButton
            size="xl"
            color="white"
            variant="solid"
            class="text-purple-600 font-semibold"
          >
            <UIcon
              name="i-lucide-search"
              class="mr-2"
            />
            Buscar en la CSJN
          </UButton>
        </NuxtLink>
      </div>
    </section>
    <!-- Footer is in default layout -->
  </div>
</template>

<script setup lang="ts">
import { guidePages } from '~/data/seo-content'

const page = guidePages['como-buscar-fallos-csjn']

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
    { rel: 'canonical', href: 'https://juridica.ar/como-buscar-fallos-csjn' }
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
        '@type': 'HowTo',
        'name': page.metaTitle,
        'description': page.metaDescription,
        'step': [
          {
            '@type': 'HowToStep',
            'name': 'Identificar la fuente',
            'text': 'Determinar si el fallo está en el sitio de la CSJN o en otras bases de datos'
          },
          {
            '@type': 'HowToStep',
            'name': 'Usar términos de búsqueda correctos',
            'text': 'Buscar por número de expediente, carátula o nombre del fallo'
          },
          {
            '@type': 'HowToStep',
            'name': 'Verificar la fuente',
            'text': 'Confirmar que el fallo es oficial y está actualizado'
          }
        ]
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': page.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      })
    }
  ]
})
</script>
