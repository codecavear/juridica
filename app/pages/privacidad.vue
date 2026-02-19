<template>
  <div class="min-h-screen bg-slate-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Politica de Privacidad
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
            1. Informacion que Recopilamos
          </h2>
          <p class="text-gray-700 mb-3">
            En Juridica.ar recopilamos la siguiente informacion:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Informacion de cuenta:</strong> Email, nombre (cuando te registras via Google OAuth)</li>
            <li><strong>Consultas de busqueda:</strong> Las busquedas que realizas y los reportes generados</li>
            <li><strong>Datos de uso:</strong> Paginas visitadas, tiempo de navegacion (via Umami Analytics, sin cookies)</li>
            <li><strong>Datos tecnicos:</strong> IP anonimizada, tipo de navegador, dispositivo (para analytics y seguridad)</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            2. Como Usamos tu Informacion
          </h2>
          <p class="text-gray-700 mb-3">
            Utilizamos la informacion recopilada para:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Proporcionar y mejorar el servicio de busqueda de jurisprudencia</li>
            <li>Guardar tus busquedas y reportes generados</li>
            <li>Gestionar tu suscripcion y uso del servicio</li>
            <li>Comunicarnos contigo sobre actualizaciones del servicio</li>
            <li>Analizar el uso del sitio para mejorar la experiencia (sin cookies de terceros)</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            3. Compartir Informacion
          </h2>
          <p class="text-gray-700 mb-3">
            No vendemos tu informacion personal. Podemos compartir datos limitados con:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Proveedores de servicios:</strong> Google OAuth (autenticacion), Anthropic/OpenAI (procesamiento de busquedas con IA)</li>
            <li><strong>Analytics:</strong> Umami (analytics sin cookies, GDPR compliant, datos anonimizados)</li>
            <li><strong>Obligaciones legales:</strong> Si es requerido por ley o para proteger nuestros derechos</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            4. Cookies y Tecnologias Similares
          </h2>
          <p class="text-gray-700">
            Juridica.ar utiliza cookies minimas y esenciales para el funcionamiento del servicio (autenticacion). Para analytics usamos Umami, que NO utiliza cookies y es totalmente GDPR compliant. No utilizamos cookies de terceros para publicidad o tracking.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            5. Seguridad de los Datos
          </h2>
          <p class="text-gray-700">
            Implementamos medidas de seguridad tecnicas y organizativas para proteger tu informacion personal. Sin embargo, ningun sistema es 100% seguro y no podemos garantizar la seguridad absoluta de los datos transmitidos por internet.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            6. Tus Derechos
          </h2>
          <p class="text-gray-700 mb-3">
            Tienes derecho a:
          </p>
          <ul class="list-disc pl-6 text-gray-700 space-y-2">
            <li>Acceder a tu informacion personal</li>
            <li>Rectificar datos incorrectos</li>
            <li>Solicitar la eliminacion de tu cuenta y datos</li>
            <li>Exportar tus busquedas y reportes</li>
            <li>Oponerte al procesamiento de tus datos</li>
          </ul>
          <p class="text-gray-700 mt-3">
            Para ejercer estos derechos, contactanos a traves de nuestro sitio web.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            7. Retencion de Datos
          </h2>
          <p class="text-gray-700">
            Conservamos tu informacion mientras tu cuenta este activa o sea necesario para proporcionar el servicio. Puedes solicitar la eliminacion de tu cuenta en cualquier momento desde tu perfil.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            8. Cambios a esta Politica
          </h2>
          <p class="text-gray-700">
            Podemos actualizar esta politica de privacidad ocasionalmente. Te notificaremos sobre cambios significativos publicando la nueva politica en esta pagina y actualizando la fecha de "ultima actualizacion".
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            9. Contacto
          </h2>
          <p class="text-gray-700">
            Para consultas sobre esta politica de privacidad o el manejo de tus datos, puedes contactarnos a traves de nuestro sitio web en juridica.ar
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">
            10. Cumplimiento Legal
          </h2>
          <p class="text-gray-700">
            Esta politica de privacidad cumple con la Ley de Proteccion de Datos Personales (Ley 25.326) de la Republica Argentina y el Reglamento General de Proteccion de Datos (GDPR) de la Union Europea.
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
  title: 'Politica de Privacidad | Juridica',
  description: 'Politica de privacidad y proteccion de datos personales de Juridica.ar',
  robots: 'index, follow'
})

useHead({
  link: [
    { rel: 'canonical', href: 'https://juridica.ar/privacidad' }
  ]
})
</script>
