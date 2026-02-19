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
              name="i-lucide-database"
              class="mr-1"
            />
            Fuentes oficiales
          </UBadge>

          <h1 class="text-4xl sm:text-5xl font-bold text-highlighted mb-6 tracking-tight">
            Fuentes juridicas verificables
          </h1>

          <p class="text-lg text-muted max-w-2xl mx-auto">
            Juridica centraliza fuentes oficiales de jurisprudencia argentina. Empeza hoy con SAIJ y suma nuevas bases a medida que se habilitan.
          </p>
        </div>
      </div>
    </section>

    <!-- Fuentes activas -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="flex items-center gap-2 mb-4">
            <UBadge
              color="success"
              variant="solid"
            >
              Activo
            </UBadge>
            <h2 class="text-2xl font-bold text-highlighted">
              Fuentes disponibles hoy
            </h2>
          </div>
          <p class="text-muted">
            Consulta estas bases de datos ahora mismo.
          </p>
        </div>

        <div class="space-y-6">
          <!-- SAIJ -->
          <UCard class="border-2 border-green-200 bg-green-50/30">
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-scale"
                    class="text-2xl text-green-600"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-bold text-highlighted">
                      SAIJ
                    </h3>
                    <UBadge
                      color="success"
                      variant="solid"
                      size="sm"
                    >
                      Activo
                    </UBadge>
                  </div>
                  <p class="text-sm text-muted mb-3">
                    Sistema Argentino de Informacion Juridica
                  </p>
                  <p class="text-muted mb-4">
                    Base de datos oficial del Ministerio de Justicia y Derechos Humanos de la Nacion. Incluye legislacion nacional, jurisprudencia federal, provincial y doctrina seleccionada.
                  </p>
                </div>
              </div>

              <div class="grid sm:grid-cols-2 gap-4">
                <div class="bg-white rounded-lg p-4">
                  <p class="font-semibold text-highlighted mb-2 text-sm">
                    Cobertura
                  </p>
                  <ul class="space-y-1 text-sm text-muted">
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="text-green-500"
                      />
                      Jurisprudencia federal
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="text-green-500"
                      />
                      Jurisprudencia provincial
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="text-green-500"
                      />
                      Legislacion nacional
                    </li>
                    <li class="flex items-center gap-2">
                      <UIcon
                        name="i-lucide-check"
                        class="text-green-500"
                      />
                      Doctrina seleccionada
                    </li>
                  </ul>
                </div>

                <div class="bg-white rounded-lg p-4">
                  <p class="font-semibold text-highlighted mb-2 text-sm">
                    Enlace oficial
                  </p>
                  <UButton
                    to="http://www.saij.gob.ar"
                    target="_blank"
                    size="sm"
                    variant="soft"
                    color="primary"
                    trailing-icon="i-lucide-external-link"
                  >
                    Visitar saij.gob.ar
                  </UButton>
                  <p class="text-xs text-muted mt-3">
                    Fuente oficial verificable para cada resultado
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Fuentes próximas -->
    <section class="py-16 bg-slate-50 border-y border-slate-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="flex items-center gap-2 mb-4">
            <UBadge
              color="warning"
              variant="subtle"
            >
              Proximamente
            </UBadge>
            <h2 class="text-2xl font-bold text-highlighted">
              Proximas fuentes en desarrollo
            </h2>
          </div>
          <p class="text-muted">
            Estamos integrando nuevas bases de datos oficiales. Te avisamos cuando esten listas.
          </p>
        </div>

        <div class="space-y-6">
          <!-- CSJN -->
          <UCard class="opacity-80">
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-building-2"
                    class="text-2xl text-slate-600"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-bold text-highlighted">
                      CSJN
                    </h3>
                    <UBadge
                      color="warning"
                      variant="subtle"
                      size="sm"
                    >
                      Proximamente
                    </UBadge>
                  </div>
                  <p class="text-sm text-muted mb-3">
                    Corte Suprema de Justicia de la Nacion
                  </p>
                  <p class="text-muted mb-4">
                    Base de datos oficial de la Corte Suprema. Incluye fallos completos, sumarios y votos desde 1863 hasta la actualidad.
                  </p>
                </div>
              </div>

              <div class="bg-slate-50 rounded-lg p-4">
                <p class="font-semibold text-highlighted mb-2 text-sm">
                  Que va a cubrir
                </p>
                <ul class="space-y-1 text-sm text-muted">
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-gavel"
                      class="text-primary"
                    />
                    Fallos completos de CSJN
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-file-text"
                      class="text-primary"
                    />
                    Sumarios y votos individuales
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-calendar"
                      class="text-primary"
                    />
                    Archivo historico desde 1863
                  </li>
                </ul>
              </div>
            </div>
          </UCard>

          <!-- JUBA -->
          <UCard class="opacity-80">
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-landmark"
                    class="text-2xl text-slate-600"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-bold text-highlighted">
                      JUBA
                    </h3>
                    <UBadge
                      color="warning"
                      variant="subtle"
                      size="sm"
                    >
                      Proximamente
                    </UBadge>
                  </div>
                  <p class="text-sm text-muted mb-3">
                    Jurisprudencia de la Provincia de Buenos Aires
                  </p>
                  <p class="text-muted mb-4">
                    Base oficial de la Suprema Corte de Justicia de Buenos Aires. Cubre tribunales provinciales de todas las instancias y fueros.
                  </p>
                </div>
              </div>

              <div class="bg-slate-50 rounded-lg p-4">
                <p class="font-semibold text-highlighted mb-2 text-sm">
                  Cobertura provincial
                </p>
                <ul class="space-y-1 text-sm text-muted">
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-building"
                      class="text-primary"
                    />
                    Suprema Corte de Buenos Aires
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-scale"
                      class="text-primary"
                    />
                    Camaras y tribunales provinciales
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-briefcase"
                      class="text-primary"
                    />
                    Todos los fueros (civil, comercial, penal, laboral, familia)
                  </li>
                </ul>
              </div>
            </div>
          </UCard>

          <!-- JUSCABA -->
          <UCard class="opacity-80">
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <div class="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-building"
                    class="text-2xl text-slate-600"
                  />
                </div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-bold text-highlighted">
                      JUSCABA
                    </h3>
                    <UBadge
                      color="warning"
                      variant="subtle"
                      size="sm"
                    >
                      Proximamente
                    </UBadge>
                  </div>
                  <p class="text-sm text-muted mb-3">
                    Justicia de la Ciudad Autonoma de Buenos Aires
                  </p>
                  <p class="text-muted mb-4">
                    Base oficial del Tribunal Superior de Justicia de CABA. Incluye jurisprudencia del fuero local y de la justicia nacional con asiento en CABA.
                  </p>
                </div>
              </div>

              <div class="bg-slate-50 rounded-lg p-4">
                <p class="font-semibold text-highlighted mb-2 text-sm">
                  Alcance CABA
                </p>
                <ul class="space-y-1 text-sm text-muted">
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-landmark"
                      class="text-primary"
                    />
                    Tribunal Superior de Justicia CABA
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-scale"
                      class="text-primary"
                    />
                    Justicia nacional con asiento en CABA
                  </li>
                  <li class="flex items-center gap-2">
                    <UIcon
                      name="i-lucide-map-pin"
                      class="text-primary"
                    />
                    Fuero contencioso administrativo y tributario local
                  </li>
                </ul>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Como elegimos fuentes -->
    <section class="py-16 bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-highlighted mb-8 text-center">
          Como elegimos fuentes
        </h2>

        <div class="grid sm:grid-cols-3 gap-6">
          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-shield-check"
                  class="text-2xl text-green-600"
                />
              </div>
              <p class="font-semibold text-highlighted mb-2">
                Solo fuentes oficiales
              </p>
              <p class="text-sm text-muted">
                Organismos publicos verificables: Ministerio de Justicia, Corte Suprema, Supremas Cortes provinciales.
              </p>
            </div>
          </UCard>

          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-link"
                  class="text-2xl text-blue-600"
                />
              </div>
              <p class="font-semibold text-highlighted mb-2">
                Enlaces verificables
              </p>
              <p class="text-sm text-muted">
                Cada resultado tiene link directo al documento original. Sin intermediarios.
              </p>
            </div>
          </UCard>

          <UCard>
            <div class="text-center">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-refresh-cw"
                  class="text-2xl text-purple-600"
                />
              </div>
              <p class="font-semibold text-highlighted mb-2">
                Actualizadas regularmente
              </p>
              <p class="text-sm text-muted">
                Sincronizacion periodica para mantener jurisprudencia al dia.
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Falta una fuente -->
    <section class="py-16 bg-slate-50 border-y border-slate-200">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <UIcon
            name="i-lucide-mail"
            class="text-3xl text-primary"
          />
        </div>
        <h2 class="text-2xl font-bold text-highlighted mb-4">
          ¿Falta una fuente que necesitas?
        </h2>
        <p class="text-muted mb-8">
          Estamos agregando nuevas bases de datos oficiales. Si necesitas cobertura de una fuente especifica, escribinos.
        </p>
        <UButton
          to="mailto:hola@juridica.ar?subject=Solicitud de nueva fuente"
          size="lg"
          color="primary"
          variant="soft"
          trailing-icon="i-lucide-send"
        >
          Sugerir fuente
        </UButton>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-[#74acdf]">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Empeza a buscar en SAIJ hoy
        </h2>
        <p class="text-lg text-white/90 mb-8">
          Gratis. Sin tarjeta. Con enlaces verificables.
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
useSeoMeta({
  title: 'Fuentes juridicas oficiales - SAIJ, CSJN, JUBA, JUSCABA',
  description: 'Juridica centraliza fuentes oficiales de jurisprudencia argentina: SAIJ (activo), CSJN, JUBA y JUSCABA (proximamente). Enlaces verificables.',
  ogTitle: 'Fuentes juridicas oficiales - Juridica',
  ogDescription: 'Consulta SAIJ, CSJN, JUBA y JUSCABA desde un solo lugar. Fuentes oficiales verificables.',
  ogImage: 'https://juridica.ar/og-image.png',
  ogUrl: 'https://juridica.ar/fuentes',
  twitterCard: 'summary_large_image'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://juridica.ar/fuentes' }
  ]
})
</script>
