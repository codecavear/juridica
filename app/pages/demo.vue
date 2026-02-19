<template>
  <div class="min-h-screen bg-default">
    <section class="py-14 border-b border-default bg-default">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <UBadge
          color="primary"
          variant="subtle"
          class="mb-4"
        >
          <UIcon
            name="i-lucide-flask-conical"
            class="mr-1"
          />
          Demo
        </UBadge>
        <h1 class="text-3xl sm:text-4xl font-bold text-highlighted mb-3">
          Así se ve un resultado en Jurídica
        </h1>
        <p class="text-muted max-w-3xl">
          Ejemplo realista de búsqueda + reporte IA con citas verificables.
          Todo orientado a que puedas decidir rápido si un fallo te sirve.
        </p>
      </div>
    </section>

    <section class="py-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Search header -->
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold text-highlighted">
              Resultados de búsqueda
            </h2>
            <p class="text-muted">
              4 resultados para "despido por abandono de trabajo"
            </p>
          </div>
          <div class="flex items-center gap-2">
            <UButton
              variant="outline"
              color="neutral"
              icon="i-lucide-save"
              disabled
            >
              Guardar
            </UButton>
            <UButton
              to="/"
              color="primary"
              variant="soft"
              icon="i-lucide-search"
            >
              Hacer nueva búsqueda
            </UButton>
          </div>
        </div>

        <div class="grid lg:grid-cols-5 gap-6">
          <!-- AI Report (left, same as prod) -->
          <div class="lg:col-span-2 min-h-0">
            <UCard
              class="lg:sticky lg:top-24"
              :ui="{ body: 'max-h-[68vh] overflow-y-auto pr-1' }"
            >
              <template #header>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <h3 class="font-semibold text-highlighted">
                      Análisis Inteligencia Artificial
                    </h3>
                    <UBadge
                      color="primary"
                      variant="soft"
                      size="sm"
                    >
                      1/3 restantes
                    </UBadge>
                  </div>
                  <UBadge
                    color="info"
                    variant="subtle"
                  >
                    gpt-4.1-mini
                  </UBadge>
                </div>
              </template>

              <div class="space-y-4 text-sm">
                <div>
                  <p class="font-medium text-highlighted mb-1">
                    Título
                  </p>
                  <p class="text-toned">
                    Despido por abandono de trabajo: exigencia de intimación fehaciente previa
                  </p>
                </div>

                <div>
                  <p class="font-medium text-highlighted mb-1">
                    Resumen
                  </p>
                  <p class="text-toned">
                    La jurisprudencia uniforme exige que el abandono de trabajo (art. 244 LCT) requiere constitución en mora e intimación clara al reintegro. Sin ese paso, el distracto puede considerarse injustificado y generar indemnización completa.
                  </p>
                </div>

                <div>
                  <p class="font-medium text-highlighted mb-1">
                    Hallazgos clave
                  </p>
                  <ul class="list-disc ml-5 text-toned space-y-1">
                    <li>La intimación previa es requisito ineludible para configurar abandono</li>
                    <li>El plazo de reintegro debe ser razonable (generalmente 48hs hábiles)</li>
                    <li>La carga probatoria recae sobre el empleador</li>
                  </ul>
                </div>

                <div>
                  <p class="font-medium text-highlighted mb-1">
                    Argumentos
                  </p>
                  <div class="space-y-2">
                    <div class="border-l-2 border-primary/30 pl-3">
                      <p class="text-toned font-medium">
                        Sin intimación fehaciente no hay abandono
                      </p>
                      <p class="text-muted text-xs mt-0.5">
                        Art. 244 LCT requiere constitución en mora previa como requisito de validez
                      </p>
                    </div>
                    <div class="border-l-2 border-primary/30 pl-3">
                      <p class="text-toned font-medium">
                        Telegrama ambiguo invalida la intimación
                      </p>
                      <p class="text-muted text-xs mt-0.5">
                        Debe indicar claramente plazo, consecuencias y lugar de reintegro
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p class="font-medium text-highlighted mb-1">
                    Riesgos
                  </p>
                  <ul class="list-disc ml-5 text-toned space-y-1">
                    <li>Telegrama ambiguo o no recibido</li>
                    <li>Plazo de reintegro irrazonable</li>
                    <li>Falta de constancia de recepción</li>
                  </ul>
                </div>

                <div>
                  <p class="font-medium text-highlighted mb-1">
                    Recomendaciones
                  </p>
                  <ul class="list-disc ml-5 text-toned space-y-1">
                    <li>Verificar constancias de notificación y secuencia de intimaciones</li>
                    <li>Confirmar que el plazo otorgado sea razonable</li>
                    <li>Revisar si existieron causas que justifiquen la ausencia del trabajador</li>
                  </ul>
                </div>
              </div>

              <template #footer>
                <p class="text-xs text-dimmed">
                  Resultado orientativo. Validá siempre con fuentes oficiales antes de presentar escritos.
                </p>
              </template>
            </UCard>
          </div>

          <!-- Results (right, same as prod) -->
          <div class="lg:col-span-3 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-highlighted">
                Fuentes oficiales
              </h3>
              <UBadge
                color="neutral"
                variant="soft"
              >
                4 fuentes
              </UBadge>
            </div>

            <!-- Result 1 -->
            <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
              <div class="flex items-start gap-4">
                <div class="w-11 h-11 rounded-xl bg-elevated ring ring-inset ring-accented flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-gavel"
                    class="text-xl text-primary"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <UBadge
                      color="primary"
                      variant="subtle"
                      size="sm"
                    >
                      Jurisprudencia
                    </UBadge>
                    <UBadge
                      color="success"
                      variant="soft"
                      size="sm"
                    >
                      Importancia 92
                    </UBadge>
                    <span class="text-xs text-muted">12 mar 2023</span>
                  </div>

                  <h4 class="font-semibold text-lg text-highlighted mb-2">
                    Despido por abandono de trabajo: exigencia de intimación fehaciente previa
                  </h4>

                  <p class="text-sm text-muted mb-2">
                    Corte Suprema de Justicia de la Nación
                    <span class="text-dimmed"> · Nacional</span>
                  </p>

                  <p class="text-sm text-toned line-clamp-3">
                    La sentencia reafirma que el abandono de trabajo (art. 244 LCT) requiere constitución en mora e intimación clara al reintegro. Sin ese paso, el distracto puede considerarse injustificado.
                  </p>

                  <div class="flex gap-2 mt-4">
                    <UButton
                      to="https://www.saij.gob.ar"
                      target="_blank"
                      size="sm"
                      color="primary"
                      variant="soft"
                      trailing-icon="i-lucide-external-link"
                    >
                      Ver fuente oficial
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Result 2 -->
            <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
              <div class="flex items-start gap-4">
                <div class="w-11 h-11 rounded-xl bg-elevated ring ring-inset ring-accented flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-file-text"
                    class="text-xl text-primary"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <UBadge
                      color="info"
                      variant="subtle"
                      size="sm"
                    >
                      Sumario
                    </UBadge>
                    <UBadge
                      color="neutral"
                      variant="soft"
                      size="sm"
                    >
                      Importancia 78
                    </UBadge>
                    <span class="text-xs text-muted">5 ago 2022</span>
                  </div>

                  <h4 class="font-semibold text-lg text-highlighted mb-2">
                    Plazo razonable de reintegro en casos de abandono
                  </h4>

                  <p class="text-sm text-muted mb-2">
                    Cámara Nacional de Apelaciones del Trabajo, Sala V
                    <span class="text-dimmed"> · Nacional</span>
                  </p>

                  <p class="text-sm text-toned line-clamp-3">
                    Se establece que el plazo otorgado para el reintegro debe ser razonable, considerando las circunstancias del caso. Un plazo de 24 horas fue considerado insuficiente.
                  </p>

                  <div class="flex gap-2 mt-4">
                    <UButton
                      to="https://www.saij.gob.ar"
                      target="_blank"
                      size="sm"
                      color="primary"
                      variant="soft"
                      trailing-icon="i-lucide-external-link"
                    >
                      Ver fuente oficial
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Result 3 -->
            <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
              <div class="flex items-start gap-4">
                <div class="w-11 h-11 rounded-xl bg-elevated ring ring-inset ring-accented flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-scroll"
                    class="text-xl text-primary"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <UBadge
                      color="success"
                      variant="subtle"
                      size="sm"
                    >
                      Legislación
                    </UBadge>
                    <UBadge
                      color="neutral"
                      variant="soft"
                      size="sm"
                    >
                      Importancia 85
                    </UBadge>
                  </div>

                  <h4 class="font-semibold text-lg text-highlighted mb-2">
                    Art. 244 LCT — Abandono de trabajo
                  </h4>

                  <p class="text-sm text-muted mb-2">
                    Ley de Contrato de Trabajo 20.744
                    <span class="text-dimmed"> · Nacional</span>
                  </p>

                  <p class="text-sm text-toned line-clamp-3">
                    El abandono del trabajo como acto de incumplimiento del trabajador sólo se configurará previa constitución en mora, mediante intimación hecha en forma fehaciente a que se reintegre al trabajo.
                  </p>

                  <div class="flex gap-2 mt-4">
                    <UButton
                      to="https://www.saij.gob.ar"
                      target="_blank"
                      size="sm"
                      color="primary"
                      variant="soft"
                      trailing-icon="i-lucide-external-link"
                    >
                      Ver fuente oficial
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Result 4 -->
            <UCard class="hover:ring-1 hover:ring-primary/30 transition-all">
              <div class="flex items-start gap-4">
                <div class="w-11 h-11 rounded-xl bg-elevated ring ring-inset ring-accented flex items-center justify-center shrink-0">
                  <UIcon
                    name="i-lucide-gavel"
                    class="text-xl text-primary"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex flex-wrap items-center gap-2 mb-2">
                    <UBadge
                      color="primary"
                      variant="subtle"
                      size="sm"
                    >
                      Jurisprudencia
                    </UBadge>
                    <UBadge
                      color="neutral"
                      variant="soft"
                      size="sm"
                    >
                      Importancia 71
                    </UBadge>
                    <span class="text-xs text-muted">20 nov 2021</span>
                  </div>

                  <h4 class="font-semibold text-lg text-highlighted mb-2">
                    Carga probatoria del empleador en abandono de trabajo
                  </h4>

                  <p class="text-sm text-muted mb-2">
                    Cámara Nacional de Apelaciones del Trabajo, Sala II
                    <span class="text-dimmed"> · Nacional</span>
                  </p>

                  <p class="text-sm text-toned line-clamp-3">
                    Corresponde al empleador acreditar que cursó la intimación fehaciente y que el trabajador no se reintegró dentro del plazo otorgado. La ausencia de prueba de la intimación torna injustificado el despido.
                  </p>

                  <div class="flex gap-2 mt-4">
                    <UButton
                      to="https://www.saij.gob.ar"
                      target="_blank"
                      size="sm"
                      color="primary"
                      variant="soft"
                      trailing-icon="i-lucide-external-link"
                    >
                      Ver fuente oficial
                    </UButton>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
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
