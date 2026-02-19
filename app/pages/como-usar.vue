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
              name="i-lucide-lightbulb"
              class="mr-1"
            />
            Como usar
          </UBadge>

          <h1 class="text-4xl sm:text-5xl font-bold text-highlighted mb-6 tracking-tight">
            Como funciona Juridica
          </h1>

          <p class="text-lg text-muted max-w-2xl mx-auto">
            Investigacion juridica mas rapida con fuentes verificables. En 3 pasos: escribis, Juridica ordena, validas y usas.
          </p>
        </div>
      </div>
    </section>

    <!-- Los 3 pasos (expandidos) -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-12">
          <!-- Paso 1 -->
          <div class="bg-slate-50 rounded-2xl p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <UBadge
                  color="primary"
                  variant="solid"
                  size="lg"
                >
                  1
                </UBadge>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-highlighted mb-2">
                  Escribi tu consulta
                </h2>
                <p class="text-muted">
                  En lenguaje natural, como trabajas todos los dias. Sin sintaxis especial ni operadores booleanos.
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <p class="font-semibold text-highlighted mb-3">
                  Ejemplos de consultas:
                </p>
                <div class="space-y-2">
                  <UCard class="bg-white">
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-search"
                        class="text-primary"
                      />
                      <code class="text-sm text-muted">"despido sin causa justa"</code>
                    </div>
                  </UCard>
                  <UCard class="bg-white">
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-search"
                        class="text-primary"
                      />
                      <code class="text-sm text-muted">"prescripcion accion civil"</code>
                    </div>
                  </UCard>
                  <UCard class="bg-white">
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-search"
                        class="text-primary"
                      />
                      <code class="text-sm text-muted">"alimentos cuota actualizacion"</code>
                    </div>
                  </UCard>
                  <UCard class="bg-white">
                    <div class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-search"
                        class="text-primary"
                      />
                      <code class="text-sm text-muted">"responsabilidad medica mala praxis"</code>
                    </div>
                  </UCard>
                </div>
              </div>

              <div>
                <p class="font-semibold text-highlighted mb-3">
                  Filtra por tipo de documento:
                </p>
                <div class="flex flex-wrap gap-2">
                  <UBadge
                    color="primary"
                    variant="subtle"
                  >
                    <UIcon
                      name="i-lucide-gavel"
                      class="mr-1"
                    />
                    Jurisprudencia (activo)
                  </UBadge>
                  <UBadge
                    color="neutral"
                    variant="subtle"
                    class="opacity-50"
                  >
                    <UIcon
                      name="i-lucide-scroll"
                      class="mr-1"
                    />
                    Legislacion (proximamente)
                  </UBadge>
                  <UBadge
                    color="neutral"
                    variant="subtle"
                    class="opacity-50"
                  >
                    <UIcon
                      name="i-lucide-book-open"
                      class="mr-1"
                    />
                    Doctrina (proximamente)
                  </UBadge>
                </div>
              </div>
            </div>
          </div>

          <!-- Paso 2 -->
          <div class="bg-slate-50 rounded-2xl p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <UBadge
                  color="primary"
                  variant="solid"
                  size="lg"
                >
                  2
                </UBadge>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-highlighted mb-2">
                  Juridica busca y ordena
                </h2>
                <p class="text-muted">
                  El motor prioriza resultados relevantes, busca en fuentes oficiales y te muestra enlaces verificables.
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <UCard class="bg-white">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-database"
                    class="text-primary text-xl mt-1"
                  />
                  <div>
                    <p class="font-semibold text-highlighted mb-1">
                      Busqueda en SAIJ
                    </p>
                    <p class="text-sm text-muted">
                      Sistema Argentino de Informacion Juridica (activo hoy). Proximas fuentes: CSJN, JUBA, JUSCABA.
                    </p>
                  </div>
                </div>
              </UCard>

              <UCard class="bg-white">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-sparkles"
                    class="text-primary text-xl mt-1"
                  />
                  <div>
                    <p class="font-semibold text-highlighted mb-1">
                      Orden por relevancia
                    </p>
                    <p class="text-sm text-muted">
                      IA prioriza resultados mas pertinentes segun tu consulta. Los mas utiles aparecen primero.
                    </p>
                  </div>
                </div>
              </UCard>

              <UCard class="bg-white">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-shield-check"
                    class="text-green-500 text-xl mt-1"
                  />
                  <div>
                    <p class="font-semibold text-highlighted mb-1">
                      Fuente oficial verificable
                    </p>
                    <p class="text-sm text-muted">
                      Cada resultado incluye enlace directo al documento original en la fuente oficial.
                    </p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>

          <!-- Paso 3 -->
          <div class="bg-slate-50 rounded-2xl p-8">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <UBadge
                  color="primary"
                  variant="solid"
                  size="lg"
                >
                  3
                </UBadge>
              </div>
              <div>
                <h2 class="text-2xl font-bold text-highlighted mb-2">
                  Valida y usa en tu escrito
                </h2>
                <p class="text-muted">
                  Con respaldo documental real, link verificable y reporte de IA para orientarte mas rapido.
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <UCard class="bg-white">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-external-link"
                    class="text-primary text-xl mt-1"
                  />
                  <div>
                    <p class="font-semibold text-highlighted mb-1">
                      Link verificable
                    </p>
                    <p class="text-sm text-muted">
                      Accede al documento completo en la fuente oficial. Valida antes de citar.
                    </p>
                  </div>
                </div>
              </UCard>

              <UCard class="bg-white">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-file-text"
                    class="text-primary text-xl mt-1"
                  />
                  <div>
                    <p class="font-semibold text-highlighted mb-1">
                      Reporte con IA
                    </p>
                    <p class="text-sm text-muted">
                      Resumen inteligente para orientarte mas rapido en cada tema. Siempre valida la fuente.
                    </p>
                  </div>
                </div>
              </UCard>

              <UCard class="bg-white">
                <div class="flex items-start gap-3">
                  <UIcon
                    name="i-lucide-download"
                    class="text-primary text-xl mt-1"
                  />
                  <div>
                    <p class="font-semibold text-highlighted mb-1">
                      Exporta resultados
                    </p>
                    <p class="text-sm text-muted">
                      Descarga en Word, TXT, Markdown o JSON (segun plan). Integra directo en tu workflow.
                    </p>
                  </div>
                </div>
              </UCard>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tips para mejores consultas -->
    <section class="py-16 bg-slate-50 border-y border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-highlighted mb-8 text-center">
          Tips para escribir mejores consultas
        </h2>

        <div class="grid sm:grid-cols-2 gap-6">
          <UCard>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-600"
                />
              </div>
              <div>
                <p class="font-semibold text-highlighted mb-1">
                  Se especifico
                </p>
                <p class="text-sm text-muted">
                  "despido discriminatorio por embarazo" es mejor que solo "despido"
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-600"
                />
              </div>
              <div>
                <p class="font-semibold text-highlighted mb-1">
                  Usa terminos tecnicos
                </p>
                <p class="text-sm text-muted">
                  "prescripcion adquisitiva" en vez de "cuando te quedas con una propiedad"
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-600"
                />
              </div>
              <div>
                <p class="font-semibold text-highlighted mb-1">
                  Combina conceptos
                </p>
                <p class="text-sm text-muted">
                  "daños punitivos responsabilidad civil derecho consumidor"
                </p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                <UIcon
                  name="i-lucide-check"
                  class="text-green-600"
                />
              </div>
              <div>
                <p class="font-semibold text-highlighted mb-1">
                  Proba variaciones
                </p>
                <p class="text-sm text-muted">
                  Si no encontras resultados, reformula con sinonimos o conceptos relacionados
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- FAQ Mini -->
    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-highlighted mb-8 text-center">
          Preguntas frecuentes
        </h2>

        <UAccordion :items="faqItems" />
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-[#74acdf]">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Proba Juridica gratis
        </h2>
        <p class="text-lg text-white/90 mb-8">
          3 busquedas por dia. Sin tarjeta. Links verificables.
        </p>
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
          Comenzar ahora
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const faqItems = [
  {
    label: '¿Necesito cuenta para usar Juridica?',
    content: 'Podes probar sin cuenta. Para guardar busquedas, historial y reportes ilimitados necesitas registrarte (gratis).'
  },
  {
    label: '¿Es gratis?',
    content: 'Si. El plan gratuito incluye 3 busquedas por dia y 1 reporte de IA por mes. Para mas volumen, mira los planes pagos.'
  },
  {
    label: '¿Puedo exportar resultados?',
    content: 'Si. Planes pagos permiten exportar a Word, TXT, Markdown y JSON. Plan gratuito incluye visualizacion online.'
  },
  {
    label: '¿Como valido que un resultado es real?',
    content: 'Cada resultado tiene un enlace directo a la fuente oficial (SAIJ, CSJN, etc.). Siempre valida antes de citar en tu escrito.'
  }
]

useSeoMeta({
  title: 'Como usar Juridica - Guia completa',
  description: 'Aprende a usar Juridica en 3 pasos: escribi tu consulta, Juridica busca y ordena, valida y usa. Tips para mejores busquedas.',
  ogTitle: 'Como usar Juridica - Guia completa',
  ogDescription: 'Guia paso a paso para usar Juridica. Busca jurisprudencia argentina con IA y fuentes verificables.',
  ogImage: 'https://juridica.ar/og-image.png',
  ogUrl: 'https://juridica.ar/como-usar',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://juridica.ar/como-usar' }
  ]
})
</script>
