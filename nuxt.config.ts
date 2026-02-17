// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { ssr: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // App metadata
  app: {
    head: {
      title: 'Jurídica - Buscador de Jurisprudencia Argentina con IA',
      htmlAttrs: {
        lang: 'es-AR'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Jurisprudencia argentina con IA. Buscá fallos en SAIJ, CSJN, JUBA y JUSCABA con citas verificables y links oficiales.' },
        { name: 'keywords', content: 'jurisprudencia argentina, búsqueda de fallos, SAIJ, CSJN, JUBA, derecho argentino, inteligencia artificial legal, legaltech, abogados, citas verificables' },
        { name: 'author', content: 'Jurídica' },
        { name: 'robots', content: 'index, follow' },
        { name: 'theme-color', content: '#6366f1' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Jurídica' },
        { property: 'og:title', content: 'Jurídica - Buscador de Jurisprudencia Argentina con IA' },
        { property: 'og:description', content: 'Buscador de jurisprudencia argentina con IA. Consulta SAIJ, CSJN, JUBA y JUSCABA con citas verificables.' },
        { property: 'og:locale', content: 'es_AR' },
        { property: 'og:image', content: 'https://juridica.ar/og-image.png' },
        // Twitter Cards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Jurídica - Buscador de Jurisprudencia Argentina con IA' },
        { name: 'twitter:description', content: 'Buscador de jurisprudencia argentina con IA. Citas verificables de SAIJ, CSJN, JUBA y JUSCABA.' },
        { name: 'twitter:image', content: 'https://juridica.ar/og-image.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'canonical', href: 'https://juridica.ar' }
      ],
      script: [
        {
          src: 'https://umami.codecave.ar/script.js',
          async: true,
          'data-website-id': '6a85c908-0517-4ca6-9f86-de60b996fdba'
        }
      ]
    }
  },

  // Runtime config
  runtimeConfig: {
    // Server-only
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
    // Public
    public: {
      appName: 'Jurídica'
    }
  }
})
