<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero -->
    <section class="relative bg-gradient-to-b from-white to-slate-50 py-16 lg:py-24 border-b border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <UBadge
            color="primary"
            variant="subtle"
            size="lg"
            class="mb-6"
          >
            <UIcon
              name="i-lucide-tag"
              class="mr-1"
            />
            Precios
          </UBadge>

          <h1 class="text-4xl sm:text-5xl font-bold text-highlighted mb-6 tracking-tight">
            Planes para cada necesidad
          </h1>

          <p class="text-lg text-muted max-w-2xl mx-auto">
            Precios simples en ARS para profesional independiente o estudio juridico. Sin sorpresas.
          </p>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-16 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <!-- Free Plan -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col">
            <div class="mb-6">
              <h3 class="text-lg font-bold text-highlighted">
                Gratis
              </h3>
              <p class="text-sm text-muted mt-1">
                Para siempre
              </p>
            </div>
            <div class="mb-6">
              <span class="text-4xl font-bold text-highlighted">$0</span>
              <span class="text-muted">/mes</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                3 busquedas por dia
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                1 reporte IA/mes
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                Acceso a SAIJ
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                Links verificables
              </li>
            </ul>
            <UButton
              to="/busqueda?q=despido&tipo=jurisprudencia"
              block
              variant="outline"
              color="neutral"
              size="lg"
            >
              Comenzar gratis
            </UButton>
          </div>

          <!-- Básico Plan -->
          <div class="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col">
            <div class="mb-6">
              <h3 class="text-lg font-bold text-highlighted">
                Basico
              </h3>
              <p class="text-sm text-muted mt-1">
                Para independientes
              </p>
            </div>
            <div class="mb-6">
              <span class="text-4xl font-bold text-highlighted">$5,990</span>
              <span class="text-muted">/mes</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                20 busquedas por dia
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                SAIJ hoy + nuevas fuentes al activarse
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                10 reportes IA/mes
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                Exportar a Word
              </li>
            </ul>
            <UButton
              block
              variant="soft"
              color="primary"
              size="lg"
              @click="openLogin()"
            >
              Elegir Basico
            </UButton>
          </div>

          <!-- Pro Plan -->
          <div class="bg-white rounded-2xl p-6 border-2 border-[#74acdf] flex flex-col relative">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <UBadge
                color="primary"
                variant="solid"
                size="sm"
              >
                Mas popular
              </UBadge>
            </div>
            <div class="mb-6">
              <h3 class="text-lg font-bold text-highlighted">
                Pro
              </h3>
              <p class="text-sm text-muted mt-1">
                Para profesionales activos
              </p>
            </div>
            <div class="mb-6">
              <span class="text-4xl font-bold text-highlighted">$14,990</span>
              <span class="text-muted">/mes</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                100 busquedas por dia
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                Mayor cobertura de fuentes oficiales
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                Exportes TXT, DOC, Markdown y JSON
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                30 reportes IA/mes
              </li>
              <li class="flex items-start gap-2 text-sm text-muted">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-500 mt-0.5 shrink-0"
                />
                Guardado e historial de consultas
              </li>
            </ul>
            <UButton
              block
              color="primary"
              size="lg"
              @click="openLogin()"
            >
              Elegir Pro
            </UButton>
          </div>

          <!-- Estudio Plan -->
          <div class="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 flex flex-col text-white">
            <div class="mb-6">
              <h3 class="text-lg font-bold">
                Estudio
              </h3>
              <p class="text-sm text-gray-300 mt-1">
                Para estudios juridicos
              </p>
            </div>
            <div class="mb-6">
              <span class="text-4xl font-bold">$24,990</span>
              <span class="text-gray-300">/mes</span>
            </div>
            <ul class="space-y-3 mb-8 flex-1">
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <UIcon
                  name="i-lucide-check"
                  class="text-[#74acdf] mt-0.5 shrink-0"
                />
                500 busquedas por dia
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <UIcon
                  name="i-lucide-check"
                  class="text-[#74acdf] mt-0.5 shrink-0"
                />
                Hasta 5 usuarios
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <UIcon
                  name="i-lucide-check"
                  class="text-[#74acdf] mt-0.5 shrink-0"
                />
                300 reportes IA/mes
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <UIcon
                  name="i-lucide-check"
                  class="text-[#74acdf] mt-0.5 shrink-0"
                />
                Acceso API
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-300">
                <UIcon
                  name="i-lucide-check"
                  class="text-[#74acdf] mt-0.5 shrink-0"
                />
                Soporte prioritario
              </li>
            </ul>
            <UButton
              block
              variant="solid"
              class="bg-[#74acdf] hover:bg-[#5a9cd0] text-highlighted font-semibold"
              size="lg"
              @click="openLogin()"
            >
              Contactar ventas
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabla comparativa -->
    <section class="py-16 bg-slate-50 border-y border-slate-200">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-highlighted mb-8 text-center">
          Comparacion detallada
        </h2>

        <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-slate-50 border-b border-gray-200">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-highlighted">
                    Caracteristica
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-highlighted">
                    Gratis
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-highlighted">
                    Basico
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-highlighted bg-primary/5">
                    Pro
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-highlighted">
                    Estudio
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Busquedas por dia
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    3
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    20
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted bg-primary/5">
                    100
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    500
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Reportes IA/mes
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    1
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    10
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted bg-primary/5">
                    30
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    300
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Fuentes disponibles
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    SAIJ
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    SAIJ + nuevas
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted bg-primary/5">
                    Todas
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Todas
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Exportar resultados
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-x"
                      class="text-gray-300 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Word
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted bg-primary/5">
                    Word, TXT, MD, JSON
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Word, TXT, MD, JSON
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Historial de busquedas
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-x"
                      class="text-gray-300 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-x"
                      class="text-gray-300 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-center bg-primary/5">
                    <UIcon
                      name="i-lucide-check"
                      class="text-green-500 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-check"
                      class="text-green-500 inline"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Usuarios
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    1
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    1
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted bg-primary/5">
                    1
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Hasta 5
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Acceso API
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-x"
                      class="text-gray-300 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-x"
                      class="text-gray-300 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-center bg-primary/5">
                    <UIcon
                      name="i-lucide-x"
                      class="text-gray-300 inline"
                    />
                  </td>
                  <td class="px-6 py-4 text-center">
                    <UIcon
                      name="i-lucide-check"
                      class="text-green-500 inline"
                    />
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 text-sm text-muted">
                    Soporte
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Email
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Email
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted bg-primary/5">
                    Email
                  </td>
                  <td class="px-6 py-4 text-sm text-center text-highlighted">
                    Prioritario
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- Cupon -->
    <section class="py-16 bg-white">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-[#74acdf]/10 to-blue-500/10 rounded-2xl p-8 text-center">
          <UIcon
            name="i-lucide-ticket"
            class="text-4xl text-primary mx-auto mb-4"
          />
          <h2 class="text-2xl font-bold text-highlighted mb-3">
            ¿Tenes un codigo de descuento?
          </h2>
          <p class="text-muted mb-6">
            Aplica tu cupon al registrarte para activar beneficios especiales.
          </p>
          <UButton
            size="lg"
            color="primary"
            variant="soft"
            @click="openLogin()"
          >
            Aplicar cupon
          </UButton>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 bg-slate-50 border-y border-slate-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-highlighted mb-8 text-center">
          Preguntas frecuentes sobre planes
        </h2>

        <UAccordion :items="faqItems" />
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-[#74acdf]">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Empeza gratis, escala cuando lo necesites
        </h2>
        <p class="text-lg text-white/90 mb-8">
          Sin compromiso. Cambia o cancela en cualquier momento.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <UButton
            to="/busqueda?q=despido&tipo=jurisprudencia"
            size="xl"
            color="neutral"
            variant="solid"
            class="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
          >
            <UIcon
              name="i-lucide-rocket"
              class="mr-2"
            />
            Probar gratis
          </UButton>
          <UButton
            size="xl"
            variant="outline"
            class="border-white text-white hover:bg-white/10"
            @click="openLogin()"
          >
            Ver planes pagos
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const showLoginModal = ref(false)
const openLogin = inject<() => void>('openLogin', () => {
  showLoginModal.value = true
})

const faqItems = [
  {
    label: '¿Puedo cambiar de plan?',
    content: 'Si. Podes cambiar de plan en cualquier momento desde tu perfil. Los cambios aplican en el proximo ciclo de facturacion.'
  },
  {
    label: '¿Hay compromiso minimo?',
    content: 'No. Los planes son mensuales y podes cancelar cuando quieras. Sin penalidades ni periodos minimos.'
  },
  {
    label: '¿Aceptan Mercado Pago?',
    content: 'Si. Aceptamos tarjeta de credito/debito via Mercado Pago. Tambien transferencia bancaria para plan Estudio.'
  },
  {
    label: '¿Que pasa si me paso del limite de busquedas?',
    content: 'Podes seguir usando Juridica pero con limite de busquedas del plan gratuito hasta el proximo ciclo. O actualiza tu plan al instante.'
  },
  {
    label: '¿Los reportes de IA se acumulan?',
    content: 'No. Los reportes de IA son mensuales y se renuevan cada mes. Usa los que necesites durante el periodo.'
  },
  {
    label: '¿El plan Estudio incluye factura A?',
    content: 'Si. Emitimos factura A para estudios juridicos inscriptos. Contactanos para coordinar facturacion.'
  }
]

useSeoMeta({
  title: 'Precios - Planes desde $0 para abogados y estudios juridicos',
  description: 'Planes de Juridica: Gratis ($0), Basico ($5,990), Pro ($14,990) y Estudio ($24,990). Precios en ARS. Sin compromiso. Cambia o cancela cuando quieras.',
  ogTitle: 'Precios de Juridica - Desde $0/mes',
  ogDescription: 'Planes para abogados y estudios juridicos. Desde gratis hasta plan Estudio con API. Precios en ARS.',
  ogImage: 'https://juridica.ar/og-image.png',
  ogUrl: 'https://juridica.ar/planes',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://juridica.ar/planes' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Juridica',
        'description': 'Buscador de jurisprudencia argentina con IA',
        'offers': [
          {
            '@type': 'Offer',
            'name': 'Plan Gratis',
            'price': '0',
            'priceCurrency': 'ARS'
          },
          {
            '@type': 'Offer',
            'name': 'Plan Basico',
            'price': '5990',
            'priceCurrency': 'ARS'
          },
          {
            '@type': 'Offer',
            'name': 'Plan Pro',
            'price': '14990',
            'priceCurrency': 'ARS'
          },
          {
            '@type': 'Offer',
            'name': 'Plan Estudio',
            'price': '24990',
            'priceCurrency': 'ARS'
          }
        ]
      })
    }
  ]
})
</script>
