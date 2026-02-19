<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-white to-slate-50 py-20 lg:py-32">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-[#74acdf]/10 rounded-full blur-3xl" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <UBadge
            color="primary"
            variant="subtle"
            size="lg"
            class="mb-6"
          >
            <UIcon
              name="i-lucide-sparkles"
              class="mr-1"
            />
            Potenciado por IA
          </UBadge>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-highlighted mb-6 tracking-tight">
            Jurisprudencia argentina en minutos
            <span class="block text-[#74acdf]">con fuentes verificables</span>
          </h1>

          <p class="text-base sm:text-lg text-muted max-w-2xl mx-auto mb-10">
            Menos tiempo buscando. Más tiempo argumentando mejor.
          </p>
        </div>

        <!-- Search Box -->
        <div class="max-w-3xl mx-auto">
          <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 border border-gray-100">
            <form
              class="flex flex-col sm:flex-row gap-4"
              @submit.prevent="search"
            >
              <UInput
                v-model="query"
                placeholder="Buscar fallos, leyes, doctrina..."
                size="xl"
                icon="i-lucide-search"
                class="flex-1"
                :ui="{ base: 'w-full' }"
              />
              <UButton
                type="submit"
                size="xl"
                color="primary"
                :loading="loading"
                :disabled="!query.trim()"
                class="sm:px-8"
              >
                <UIcon
                  name="i-lucide-search"
                  class="mr-2"
                />
                Buscar
              </UButton>
            </form>

            <!-- Quick filters -->
            <div class="flex flex-wrap gap-2 mt-5 justify-center">
              <UBadge
                v-for="tipo in tiposDocumento"
                :key="tipo.value"
                :color="selectedTipo === tipo.value ? 'primary' : 'neutral'"
                :variant="selectedTipo === tipo.value ? 'solid' : 'subtle'"
                size="md"
                :class="tipo.enabled ? 'cursor-pointer transition-all hover:scale-105' : 'opacity-50 cursor-not-allowed'"
                @click="tipo.enabled && (selectedTipo = tipo.value)"
              >
                <UIcon
                  :name="tipo.icon"
                  class="mr-1"
                />
                {{ tipo.label }}
                <span
                  v-if="!tipo.enabled"
                  class="ml-1 text-[10px]"
                >(próx.)</span>
              </UBadge>
            </div>
          </div>

          <p class="text-center text-sm text-muted mt-4">
            <UIcon
              name="i-lucide-shield-check"
              class="text-green-500 mr-1"
            />
            Gratis para empezar · Sin tarjeta · Enlace verificable a fuente oficial
          </p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section
      v-if="!hasSearched"
      id="como-usar"
      class="py-12 bg-white border-y border-slate-100"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-highlighted mb-2">
            Cómo usar Jurídica
          </h2>
          <p class="text-muted">
            En 3 pasos: escribís, Jurídica ordena, validás y usás en tu escrito
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-4">
          <UCard>
            <div class="flex items-start gap-3">
              <UBadge
                color="primary"
                variant="soft"
              >
                1
              </UBadge>
              <div>
                <p class="font-semibold text-highlighted">
                  Escribí tu consulta
                </p>
                <p class="text-sm text-muted mt-1">
                  En lenguaje natural, como trabajás todos los días.
                </p>
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="flex items-start gap-3">
              <UBadge
                color="primary"
                variant="soft"
              >
                2
              </UBadge>
              <div>
                <p class="font-semibold text-highlighted">
                  Jurídica busca y ordena
                </p>
                <p class="text-sm text-muted mt-1">
                  Prioriza resultados relevantes y muestra fuente oficial verificable.
                </p>
              </div>
            </div>
          </UCard>
          <UCard>
            <div class="flex items-start gap-3">
              <UBadge
                color="primary"
                variant="soft"
              >
                3
              </UBadge>
              <div>
                <p class="font-semibold text-highlighted">
                  Validá y usá en tu escrito
                </p>
                <p class="text-sm text-muted mt-1">
                  Con respaldo documental real y menos fricción operativa.
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section
      v-if="results.length > 0 || hasSearched"
      class="py-16 bg-white"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-highlighted">
            {{ results.length }} resultados
            <span class="text-muted font-normal">para "{{ lastQuery }}"</span>
          </h2>
          <UButton
            variant="ghost"
            color="neutral"
            size="sm"
            @click="clearSearch"
          >
            <UIcon
              name="i-lucide-x"
              class="mr-1"
            />
            Limpiar
          </UButton>
        </div>

        <div
          v-if="results.length === 0 && hasSearched"
          class="text-center py-16"
        >
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon
              name="i-lucide-search-x"
              class="text-3xl text-dimmed"
            />
          </div>
          <p class="text-muted text-lg">
            No se encontraron resultados para "{{ lastQuery }}"
          </p>
          <p class="text-muted text-sm mt-2">
            Probá con otros términos o cambiá el filtro
          </p>
        </div>

        <div
          v-else
          class="space-y-4"
        >
          <UCard
            v-for="result in results"
            :key="result.id"
            class="bg-white border border-slate-200 hover:shadow-lg hover:border-[#74acdf]/30 transition-all duration-200"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-[#74acdf]/10 flex items-center justify-center shrink-0">
                <UIcon
                  :name="getIconForTipo(result.tipo)"
                  class="text-2xl text-[#74acdf]"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2">
                  <UBadge
                    :color="getColorForTipo(result.tipo)"
                    variant="subtle"
                    size="sm"
                  >
                    {{ result.tipo }}
                  </UBadge>
                  <span
                    v-if="result.fecha"
                    class="text-xs text-muted"
                  >
                    {{ formatDate(result.fecha) }}
                  </span>
                </div>
                <h3 class="font-semibold text-lg text-highlighted leading-tight mb-2">
                  {{ result.titulo }}
                </h3>
                <p
                  v-if="result.tribunal"
                  class="text-sm text-muted mb-2"
                >
                  <UIcon
                    name="i-lucide-building-2"
                    class="mr-1"
                  />
                  {{ result.tribunal }}
                  <span
                    v-if="result.jurisdiccion"
                    class="text-dimmed"
                  > · {{ result.jurisdiccion }}</span>
                </p>
                <p
                  v-if="result.sumario"
                  class="text-sm text-muted line-clamp-2"
                >
                  {{ result.sumario }}
                </p>
                <div class="flex gap-2 mt-4">
                  <UButton
                    :to="result.url !== '#' ? result.url : undefined"
                    :target="result.url !== '#' ? '_blank' : undefined"
                    :disabled="result.url === '#'"
                    size="sm"
                    color="primary"
                    variant="soft"
                    trailing-icon="i-lucide-external-link"
                  >
                    Ver fuente oficial
                  </UButton>
                  <UButton
                    v-if="result.pdfUrl"
                    :to="result.pdfUrl"
                    target="_blank"
                    size="sm"
                    variant="ghost"
                    color="neutral"
                    trailing-icon="i-lucide-file-text"
                  >
                    PDF
                  </UButton>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Providers Section -->
    <section
      v-if="!hasSearched"
      id="fuentes"
      class="py-16 bg-slate-50 border-y border-slate-200/70"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <h2 class="text-2xl sm:text-3xl font-bold text-highlighted mb-3">
            Fuentes jurídicas disponibles
          </h2>
          <p class="text-muted">
            Empezá hoy con SAIJ y sumá nuevas fuentes oficiales a medida que se habilitan.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 gap-4">
          <UCard>
            <div class="space-y-3">
              <div>
                <UBadge
                  color="success"
                  variant="soft"
                >
                  Activo
                </UBadge>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-elevated ring ring-inset ring-accented flex items-center justify-center">
                  <UIcon
                    name="i-lucide-scale"
                    class="text-primary"
                  />
                </div>
                <div>
                  <p class="font-semibold text-highlighted">
                    SAIJ
                  </p>
                  <p class="text-sm text-muted mt-0.5">
                    Sistema Argentino de Información Jurídica
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <UCard class="opacity-70">
            <div class="space-y-3">
              <div>
                <UBadge
                  color="warning"
                  variant="subtle"
                >
                  Próximamente
                </UBadge>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-elevated ring ring-inset ring-accented flex items-center justify-center">
                  <UIcon
                    name="i-lucide-building-2"
                    class="text-primary"
                  />
                </div>
                <div>
                  <p class="font-semibold text-highlighted">
                    CSJN
                  </p>
                  <p class="text-sm text-muted mt-0.5">
                    Corte Suprema de Justicia de la Nación
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <UCard class="opacity-70">
            <div class="space-y-3">
              <div>
                <UBadge
                  color="warning"
                  variant="subtle"
                >
                  Próximamente
                </UBadge>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-elevated ring ring-inset ring-accented flex items-center justify-center">
                  <UIcon
                    name="i-lucide-landmark"
                    class="text-primary"
                  />
                </div>
                <div>
                  <p class="font-semibold text-highlighted">
                    JUBA
                  </p>
                  <p class="text-sm text-muted mt-0.5">
                    Jurisprudencia de la Provincia de Buenos Aires
                  </p>
                </div>
              </div>
            </div>
          </UCard>

          <UCard class="opacity-70">
            <div class="space-y-3">
              <div>
                <UBadge
                  color="warning"
                  variant="subtle"
                >
                  Próximamente
                </UBadge>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-elevated ring ring-inset ring-accented flex items-center justify-center">
                  <UIcon
                    name="i-lucide-building"
                    class="text-primary"
                  />
                </div>
                <div>
                  <p class="font-semibold text-highlighted">
                    JUSCABA
                  </p>
                  <p class="text-sm text-muted mt-0.5">
                    Justicia de la Ciudad Autónoma de Buenos Aires
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      v-if="!hasSearched"
      class="py-20 bg-white"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-highlighted mb-4">
            ¿Por qué Jurídica?
          </h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            Diseñada para abogados y estudios que necesitan velocidad con respaldo documental
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-shield-check"
                class="text-3xl text-green-600"
              />
            </div>
            <h3 class="text-xl font-bold text-highlighted mb-3">
              Citas verificables
            </h3>
            <p class="text-muted leading-relaxed">
              Cada resultado incluye enlace directo a la fuente oficial.
              Verificás rápido y reducís riesgo de citar información no chequeada.
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 bg-[#74acdf]/20 rounded-xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-database"
                class="text-3xl text-[#74acdf]"
              />
            </div>
            <h3 class="text-xl font-bold text-highlighted mb-3">
              Multi-fuente
            </h3>
            <p class="text-muted leading-relaxed">
              Centralizá la investigación en una sola experiencia.
              Hoy con SAIJ activo y nuevas fuentes oficiales en despliegue progresivo.
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <UIcon
                name="i-lucide-sparkles"
                class="text-3xl text-purple-600"
              />
            </div>
            <h3 class="text-xl font-bold text-highlighted mb-3">
              Inteligencia Artificial
            </h3>
            <p class="text-muted leading-relaxed">
              Obtené un resumen con Inteligencia Artificial para orientarte más rápido en cada tema.
              Siempre con referencias verificables para validar antes de citar.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section
      v-if="!hasSearched"
      id="planes"
      class="py-20 bg-slate-50"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <UBadge
            color="primary"
            variant="subtle"
            size="lg"
            class="mb-4"
          >
            Planes
          </UBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-highlighted mb-4">
            Elegí el plan que necesites
          </h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            Precios simples en ARS para profesional independiente o estudio jurídico
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                3 búsquedas por día
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
                Básico
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
                20 búsquedas por día
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
              @click="openLogin()"
              block
              variant="soft"
              color="primary"
              size="lg"
            >
              Elegir Básico
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
                Más popular
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
                100 búsquedas por día
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
              @click="openLogin()"
              block
              color="primary"
              size="lg"
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
                Para estudios jurídicos
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
                500 búsquedas por día
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
              @click="openLogin()"
              block
              variant="solid"
              class="bg-[#74acdf] hover:bg-[#5a9cd0] text-highlighted font-semibold"
              size="lg"
            >
              Contactar ventas
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Recursos y guías -->
    <section
      v-if="!hasSearched"
      class="py-14 bg-white border-y border-slate-100"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between gap-4 mb-6">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-highlighted">
              Recursos para empezar
            </h2>
            <p class="text-muted">
              Guías prácticas, comparativas y demo del producto.
            </p>
          </div>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
            <p class="font-semibold text-highlighted mb-2">
              Demo interactiva
            </p>
            <p class="text-sm text-muted mb-4">
              Mirá cómo se ve un resultado real con AI summary.
            </p>
            <UButton
              to="/demo"
              size="sm"
              variant="soft"
              color="primary"
            >
              Ver demo
            </UButton>
          </UCard>

          <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
            <p class="font-semibold text-highlighted mb-2">
              Mejor buscador 2026
            </p>
            <p class="text-sm text-muted mb-4">
              Comparativa para elegir herramienta jurídica en Argentina.
            </p>
            <UButton
              to="/mejor-buscador-jurisprudencia-argentina"
              size="sm"
              variant="soft"
              color="primary"
            >
              Leer guía
            </UButton>
          </UCard>

          <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
            <p class="font-semibold text-highlighted mb-2">
              Citas verificables
            </p>
            <p class="text-sm text-muted mb-4">
              Cómo evitar citas inventadas y reducir riesgo profesional.
            </p>
            <UButton
              to="/mejor-herramienta-citas-legales-verificables"
              size="sm"
              variant="soft"
              color="primary"
            >
              Leer guía
            </UButton>
          </UCard>

          <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
            <p class="font-semibold text-highlighted mb-2">
              Guía CSJN
            </p>
            <p class="text-sm text-muted mb-4">
              Paso a paso para buscar fallos de la Corte Suprema.
            </p>
            <UButton
              to="/como-buscar-fallos-csjn"
              size="sm"
              variant="soft"
              color="primary"
            >
              Ver paso a paso
            </UButton>
          </UCard>
        </div>
      </div>
    </section>

    <!-- FAQ legal-trust -->
    <section
      v-if="!hasSearched"
      class="py-16 bg-slate-50 border-y border-slate-100"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-highlighted mb-2">
            Preguntas frecuentes
          </h2>
          <p class="text-muted">
            Precisión, citabilidad y privacidad en investigación jurídica.
          </p>
        </div>
        <UAccordion :items="homeFaqItems" />
      </div>
    </section>

    <!-- CTA Section -->
    <section
      v-if="!hasSearched"
      class="py-20 bg-gradient-to-r from-blue-600 to-[#74acdf]"
    >
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">
          Investigá mejor, argumentá con respaldo
        </h2>
        <p class="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Probá Jurídica gratis y validá cada resultado con fuente oficial antes de citar.
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
            Comenzar gratis
          </UButton>
          <UButton
            to="/demo"
            size="xl"
            variant="outline"
            class="border-white text-white hover:bg-white/10"
          >
            <UIcon
              name="i-lucide-play"
              class="mr-2"
            />
            Ver demo
          </UButton>
        </div>
        <p class="text-white/80 text-sm mt-5">
          ¿Preferís mensajería? WhatsApp y Telegram en roadmap cercano.
        </p>
      </div>
    </section>

    <!-- Footer is in default layout -->
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { loggedIn } = useUserSession()
const showLoginModal = ref(false)
const openLogin = inject<() => void>('openLogin', () => { showLoginModal.value = true })

// Auto-open login modal if coupon in URL and not logged in
onMounted(() => {
  if (route.query.cupon && !loggedIn.value) {
    openLogin()
  }
})

interface SearchResult {
  id: string
  tipo: string
  titulo: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  sumario?: string
  url: string
  pdfUrl?: string
}

interface ApiSearchResult {
  uuid: string
  type: string
  titulo?: string
  caratula?: string
  fecha?: string
  tribunal?: string
  jurisdiccion?: string
  texto?: string
  url?: string
}

const query = ref('')
const selectedTipo = ref('jurisprudencia')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const hasSearched = ref(false)
const lastQuery = ref('')

const tiposDocumento = [
  { value: 'jurisprudencia', label: 'Jurisprudencia', icon: 'i-lucide-gavel', enabled: true },
  { value: 'legislacion', label: 'Legislación', icon: 'i-lucide-scroll', enabled: false },
  { value: 'doctrina', label: 'Doctrina', icon: 'i-lucide-book-open', enabled: false },
  { value: 'todo', label: 'Todo', icon: 'i-lucide-layers', enabled: false }
]

const homeFaqItems = [
  {
    label: '¿Puedo citar directamente lo que devuelve Jurídica?',
    content: 'Usalo como base de investigación y validá siempre la fuente oficial enlazada antes de citar en un escrito.'
  },
  {
    label: '¿Jurídica inventa fallos o citas?',
    content: 'No. Jurídica prioriza resultados con referencia verificable a fuente oficial.'
  },
  {
    label: '¿Qué pasa con la privacidad de mis búsquedas?',
    content: 'Tus consultas no se publican y se procesan para entregar resultados y mejorar la experiencia de uso.'
  },
  {
    label: '¿Necesito tarjeta para probar?',
    content: 'No. Podés empezar gratis.'
  }
]

async function search() {
  if (!query.value.trim()) return

  loading.value = true
  hasSearched.value = true
  lastQuery.value = query.value

  try {
    await navigateTo({
      path: '/busqueda',
      query: {
        q: query.value,
        tipo: selectedTipo.value
      }
    })
  } catch (error) {
    console.error('Search error:', error)
    results.value = []
  } finally {
    loading.value = false
  }
}

function clearSearch() {
  query.value = ''
  results.value = []
  hasSearched.value = false
  lastQuery.value = ''
}

function getIconForTipo(tipo: string): string {
  const icons: Record<string, string> = {
    fallo: 'i-lucide-gavel',
    sumario: 'i-lucide-file-text',
    ley: 'i-lucide-scroll',
    decreto: 'i-lucide-stamp',
    legislacion: 'i-lucide-landmark',
    doctrina: 'i-lucide-book-open',
    dictamen: 'i-lucide-file-check'
  }
  return icons[tipo] || 'i-lucide-file'
}

function getColorForTipo(tipo: string): string {
  const colors: Record<string, string> = {
    fallo: 'primary',
    sumario: 'info',
    ley: 'success',
    decreto: 'warning',
    doctrina: 'secondary'
  }
  return colors[tipo] || 'neutral'
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch {
    return dateStr
  }
}
</script>
