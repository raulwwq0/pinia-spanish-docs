import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const META_URL = 'https://es-pinia.vercel.app/'
export const META_TITLE = 'Pinia 🍍'
export const META_DESCRIPTION =
  'Almacén intuitivo, con tipado seguro, ligero y flexible para Vue'

export const esConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  description: META_DESCRIPTION,
  head: [
    ['meta', { property: 'og:url', content: META_URL }],
    ['meta', { property: 'og:description', content: META_DESCRIPTION }],
    ['meta', { property: 'twitter:url', content: META_URL }],
    ['meta', { property: 'twitter:title', content: META_TITLE }],
    ['meta', { property: 'twitter:description', content: META_DESCRIPTION }],
  ],

  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/pinia/edit/v2/packages/docs/:path',
      text: 'Sugerir cambios a esta página',
    },

    outlineTitle: 'En esta página',

    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente',
    },

    nav: [
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Guía',
        link: '/core-concepts/',
        activeMatch: '^/core-concepts/',
      },
      { text: 'API', link: '/api/', activeMatch: '^/api/' },
      { text: 'Manual', link: '/cookbook/', activeMatch: '^/cookbook/' },
      {
        text: 'Enlaces',
        items: [
          {
            text: 'Discusiones',
            link: 'https://github.com/vuejs/pinia/discussions',
          },
          {
            text: 'Changelog',
            link: 'https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md',
          },
        ],
      },
    ],

    sidebar: {
      '/api/': [
        {
          text: 'Paquetes',
          items: [
            { text: 'pinia', link: '/api/modules/pinia.html' },
            { text: '@pinia/nuxt', link: '/api/modules/pinia_nuxt.html' },
            {
              text: '@pinia/testing',
              link: '/api/modules/pinia_testing.html',
            },
          ],
        },
      ],
      // catch-all fallback
      '/': [
        {
          text: 'Introducción',
          items: [
            {
              text: '¿Qué es Pinia?',
              link: '/introduction.html',
            },
            {
              text: 'Primeros Pasos',
              link: '/getting-started.html',
            },
          ],
        },
        {
          text: 'Conceptos básicos',
          items: [
            { text: 'Definir un Almacén', link: '/core-concepts/' },
            { text: 'Estado', link: '/core-concepts/state.html' },
            { text: 'Getters', link: '/core-concepts/getters.html' },
            { text: 'Acciones', link: '/core-concepts/actions.html' },
            { text: 'Plugins', link: '/core-concepts/plugins.html' },
            {
              text: 'Almacenes fuera de componentes',
              link: '/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: 'Renderizado del lado del servidor (SSR)',
          items: [
            {
              text: 'Vue y Vite',
              link: '/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/ssr/nuxt.html',
            },
          ],
        },
        {
          text: 'Manual',
          collapsible: true,
          collapsed: false,
          items: [
            {
              text: 'Índice',
              link: '/cookbook/',
            },
            {
              text: 'Migración desde Vuex ≤4',
              link: '/cookbook/migration-vuex.html',
            },
            {
              text: 'Sustitución de módulos en caliente',
              link: '/cookbook/hot-module-replacement.html',
            },
            {
              text: 'Testing',
              link: '/cookbook/testing.html',
            },
            {
              text: 'Uso sin setup()',
              link: '/cookbook/options-api.html',
            },
            {
              text: 'Componiendo Almacenes',
              link: '/cookbook/composing-stores.html',
            },
            {
              text: 'Migración desde v0/v1 a v2',
              link: '/cookbook/migration-v1-v2.html',
            },
            {
              text: 'Tratando con composables',
              link: '/cookbook/composables.html',
            },
          ],
        },
      ],
    },
  },
}
