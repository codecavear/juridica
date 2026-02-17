<template>
  <div class="min-h-screen bg-slate-50">
    <section class="py-14 border-b border-slate-200 bg-white">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBadge color="primary" variant="subtle" class="mb-4">
          <UIcon name="i-lucide-flask-conical" class="mr-1" />
          Demo
        </UBadge>
        <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Así se ve un resultado en Jurídica
        </h1>
        <p class="text-gray-600 max-w-3xl">
          Ejemplo realista de búsqueda + lectura rápida + reporte IA con citas verificables.
          Todo orientado a que puedas decidir rápido si un fallo te sirve.
        </p>
      </div>
    </section>

    <section class="py-10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-6">
        <!-- Resultado principal -->
        <div class="lg:col-span-3 space-y-4">
          <UCard class="border-[#74acdf]/30 shadow-sm">
            <template #header>
              <div class="flex flex-wrap items-center gap-2">
                <UBadge color="primary" variant="soft">Jurisprudencia</UBadge>
                <span class="text-xs text-gray-600">CSJN · 12/03/2023</span>
                <UBadge color="success" variant="subtle">Fuente verificable</UBadge>
              </div>
            </template>

            <h2 class="text-xl font-bold text-gray-900 mb-2">
              Despido por abandono de trabajo: exigencia de intimación fehaciente previa
            </h2>

            <p class="text-sm text-gray-600 mb-3">
              Tribunal: Corte Suprema de Justicia de la Nación · Jurisdicción: Nacional
            </p>

            <p class="text-gray-700 leading-relaxed">
              La sentencia reafirma que el abandono de trabajo (art. 244 LCT) requiere
              constitución en mora e intimación clara al reintegro. Sin ese paso,
              el distracto puede considerarse injustificado.
            </p>

            <template #footer>
              <div class="flex flex-wrap gap-2">
                <UButton color="primary" variant="soft" trailing-icon="i-lucide-external-link" to="https://www.saij.gob.ar" target="_blank">
                  Ver fuente oficial
                </UButton>
                <UButton color="neutral" variant="outline" icon="i-lucide-bookmark">
                  Guardar en favoritos
                </UButton>
              </div>
            </template>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <p class="font-semibold text-gray-900">Por qué este fallo importa</p>
                <UBadge color="warning" variant="subtle">Uso práctico</UBadge>
              </div>
            </template>
            <ul class="space-y-2 text-sm text-gray-700">
              <li class="flex gap-2"><UIcon name="i-lucide-check" class="text-green-600 mt-0.5" /> Útil para contestar despido con causa por abandono</li>
              <li class="flex gap-2"><UIcon name="i-lucide-check" class="text-green-600 mt-0.5" /> Refuerza necesidad de intimación previa válida</li>
              <li class="flex gap-2"><UIcon name="i-lucide-check" class="text-green-600 mt-0.5" /> Citable en escritos con link oficial verificable</li>
            </ul>
          </UCard>
        </div>

        <!-- Panel IA -->
        <div class="lg:col-span-2 space-y-4">
          <UCard class="border-purple-200 bg-purple-50/40">
            <template #header>
              <div class="flex items-center justify-between">
                <p class="font-semibold text-gray-900">Reporte IA (demo)</p>
                <UBadge color="info" variant="subtle">gpt-4.1-mini</UBadge>
              </div>
            </template>

            <div class="space-y-3 text-sm">
              <div>
                <p class="font-medium text-gray-900">Resumen</p>
                <p class="text-gray-700">El criterio exige intimación fehaciente para configurar abandono. Si no existe, aumenta la probabilidad de despido injustificado.</p>
              </div>

              <div>
                <p class="font-medium text-gray-900">Riesgos detectados</p>
                <ul class="list-disc ml-5 text-gray-700 space-y-1">
                  <li>Telegrama ambiguo o no recibido</li>
                  <li>Plazo de reintegro irrazonable</li>
                </ul>
              </div>

              <div>
                <p class="font-medium text-gray-900">Recomendación</p>
                <p class="text-gray-700">Verificar constancias de notificación y secuencia de intimaciones antes de cerrar estrategia procesal.</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <template #header>
              <p class="font-semibold text-gray-900">Citas del reporte</p>
            </template>
            <div class="space-y-2 text-sm">
              <a href="https://www.saij.gob.ar" target="_blank" class="block p-2 rounded-lg border border-slate-200 hover:border-[#74acdf] hover:bg-slate-50">
                CSJN, abandono de trabajo e intimación previa
              </a>
              <a href="https://www.saij.gob.ar" target="_blank" class="block p-2 rounded-lg border border-slate-200 hover:border-[#74acdf] hover:bg-slate-50">
                Art. 244 LCT - criterios de aplicación
              </a>
            </div>
          </UCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Demo de resultados | Jurídica',
  description: 'Demostración de cómo se ve un resultado de jurisprudencia y un reporte IA con citas verificables en Jurídica.'
})
</script>
