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
    '/': { prerender: true }
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
      title: 'Jurídica - Jurisprudencia argentina con IA',
      meta: [
        { name: 'description', content: 'Buscador de jurisprudencia argentina con inteligencia artificial. Fuentes oficiales, citas verificables.' },
        { name: 'theme-color', content: '#6366f1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ]
    }
  },

  // Runtime config
  runtimeConfig: {
    // Server-only
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    // Public
    public: {
      appName: 'Jurídica'
    }
  }
})
