<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Terminos y Condiciones
        </h1>
        <p class="mt-2 text-sm text-gray-600">
          Ultima actualizacion: {{ new Date().toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 prose prose-slate max-w-none">
        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            1. Aceptacion de los Terminos
          </h2>
          <p class="text-gray-700">
            Al acceder y utilizar Juridica.ar, aceptas estar sujeto a estos terminos y condiciones de uso. Si no estas de acuerdo con alguno de estos terminos, no debes utilizar este servicio.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            2. Descripcion del Servicio
          </h2>
          <p class="text-gray-700 mb-3">
            Juridica.ar es un buscador de jurisprudencia argentina potenciado por inteligencia artificial que proporciona:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Busqueda de fallos judiciales de fuentes publicas (SAIJ, CSJN, JUBA, JUSCABA)</li>
            <li>Resumen y analisis de jurisprudencia mediante IA</li>
            <li>Citas verificables con enlaces a fuentes oficiales</li>
            <li>Exportacion de reportes en multiples formatos</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            3. Uso del Servicio
          </h2>
          <p class="text-gray-700 mb-3">
            Al utilizar Juridica.ar, te comprometes a:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Utilizar el servicio unicamente para fines legales y legitimos</li>
            <li>No realizar busquedas automatizadas que puedan afectar el rendimiento del sistema</li>
            <li>No intentar acceder a areas restringidas o manipular el servicio</li>
            <li>Respetar los derechos de propiedad intelectual de terceros</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            4. Limitacion de Responsabilidad
          </h2>
          <p class="text-gray-700 mb-3">
            Juridica.ar es una herramienta de asistencia en la busqueda de jurisprudencia. El usuario reconoce que:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Los resultados son generados por IA y deben ser verificados por profesionales</li>
            <li>El servicio se proporciona "tal cual" sin garantias de ningun tipo</li>
            <li>No somos responsables por decisiones tomadas basadas en la informacion proporcionada</li>
            <li>Las fuentes oficiales son las unicas referencias validas para uso legal formal</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            5. Propiedad Intelectual
          </h2>
          <p class="text-gray-700">
            Los contenidos originales de Juridica.ar (diseno, codigo, marca) son propiedad de sus creadores. Los fallos y documentos judiciales son de dominio publico y pertenecen a sus respectivas fuentes oficiales.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            6. Modificaciones
          </h2>
          <p class="text-gray-700">
            Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios seran efectivos inmediatamente despues de su publicacion en esta pagina.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            7. Ley Aplicable
          </h2>
          <p class="text-gray-700">
            Estos terminos se rigen por las leyes de la Republica Argentina. Cualquier disputa sera resuelta en los tribunales competentes de la Ciudad Autonoma de Buenos Aires.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            8. Contacto
          </h2>
          <p class="text-gray-700">
            Para consultas sobre estos terminos, puedes contactarnos a traves de nuestro sitio web en juridica.ar
          </p>
        </section>
      </div>

      <!-- Back to home -->
      <div class="mt-8 text-center">
        <UButton
          to="/"
          variant="outline"
          size="lg"
        >
          <UIcon
            name="i-lucide-arrow-left"
            class="mr-2"
          />
          Volver al inicio
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'Terminos y Condiciones | Juridica',
  description: 'Terminos y condiciones de uso del buscador de jurisprudencia argentina Juridica.ar',
  robots: 'index, follow'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://juridica.ar/terminos' }
  ]
})
</script>
