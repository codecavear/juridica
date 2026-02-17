<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-white to-slate-50 py-16 lg:py-24">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#74acdf]/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <UBadge color="primary" variant="subtle" size="lg" class="mb-6">
          <UIcon name="i-lucide-target" class="mr-1" />
          Solución especializada
        </UBadge>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
          {{ page.heroTitle }}
        </h1>

        <p class="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          {{ page.heroSubtitle }}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton size="xl" color="primary">
            <UIcon name="i-lucide-rocket" class="mr-2" />
            {{ page.cta.primary }}
          </UButton>
          <UButton size="xl" variant="outline" color="neutral">
            {{ page.cta.secondary }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Beneficios clave
          </h2>
        </div>

        <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div
            v-for="benefit in page.benefits"
            :key="benefit.title"
            class="bg-slate-50 rounded-2xl p-6 lg:p-8 hover:shadow-lg transition-shadow"
          >
            <div class="w-14 h-14 bg-[#74acdf]/20 rounded-xl flex items-center justify-center mb-5">
              <UIcon :name="benefit.icon" class="text-3xl text-[#74acdf]" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ benefit.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Plan recomendado para vos
          </h2>
        </div>

        <div
          class="bg-white rounded-2xl p-8 shadow-xl"
          :class="page.pricing.highlighted ? 'border-2 border-[#74acdf]' : 'border border-gray-200'"
        >
          <div class="text-center mb-6">
            <UBadge v-if="page.pricing.highlighted" color="primary" variant="solid" size="md" class="mb-4">
              Recomendado
            </UBadge>
            <h3 class="text-2xl font-bold text-gray-900">{{ page.pricing.plan }}</h3>
          </div>

          <div class="text-center mb-8">
            <span class="text-5xl font-bold text-gray-900">{{ page.pricing.price }}</span>
            <span class="text-gray-500">/mes</span>
          </div>

          <ul class="space-y-4 mb-8">
            <li
              v-for="feature in page.pricing.features"
              :key="feature"
              class="flex items-center gap-3 text-gray-600"
            >
              <UIcon name="i-lucide-check" class="text-green-500 shrink-0" />
              {{ feature }}
            </li>
          </ul>

          <UButton block size="xl" color="primary">
            {{ page.cta.primary }}
          </UButton>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
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
              base: 'border-b border-gray-200 last:border-b-0'
            }
          }"
        />
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-[#74acdf]">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-6">
          Empezá a buscar jurisprudencia de verdad
        </h2>
        <p class="text-lg text-white/90 mb-8">
          Sin tarjeta de crédito. Sin alucinaciones. Solo fuentes verificables.
        </p>
        <UButton size="xl" color="white" variant="solid" class="text-blue-600 font-semibold">
          <UIcon name="i-lucide-rocket" class="mr-2" />
          {{ page.cta.primary }}
        </UButton>
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
import { solutionPages } from '~/data/seo-content'

const route = useRoute()
const slug = route.params.slug as string

const page = computed(() => solutionPages[slug])

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
  ogType: 'website',
  ogLocale: 'es_AR',
  twitterCard: 'summary_large_image',
  twitterTitle: page.value.metaTitle,
  twitterDescription: page.value.metaDescription
})

// Canonical URL
useHead({
  link: [
    { rel: 'canonical', href: `https://juridica.ar/soluciones/${slug}` }
  ]
})

// FAQ items for accordion
const faqItems = computed(() => 
  page.value.faqs.map((faq, index) => ({
    label: faq.question,
    content: faq.answer,
    value: `faq-${index}`
  }))
)

// Schema.org JSON-LD
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.value.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `Jurídica - ${page.value.pricing.plan}`,
        description: page.value.metaDescription,
        brand: {
          '@type': 'Brand',
          name: 'Jurídica'
        },
        offers: {
          '@type': 'Offer',
          price: page.value.pricing.price.replace(/[^0-9]/g, ''),
          priceCurrency: 'ARS',
          availability: 'https://schema.org/InStock'
        }
      })
    }
  ]
})
</script>
