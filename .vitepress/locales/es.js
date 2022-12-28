export default {
  vitepressConfig: {
    title: 'Pinia',
    lang: 'es-ES',
    description: 'La store de Vue que disfrutarás usando',
  },
  themeConfig: {
    label: 'Español',
    selectText: 'Idiomas',
    editLinkText: 'Sugerir cambios a esta página',
    lastUpdated: 'Última actualización',

    nav: [
      { text: 'Guía', link: '/es/introduction.html' },
      { text: 'API', link: '/es/api/' },
      // { text: 'Config', link: '/config/' },
      // { text: 'Plugins', link: '/plugins/' },
      {
        text: 'Enlaces',
        items: [
          {
            text: 'Discusiones',
            link: 'https://github.com/vuejs/pinia/discussions',
          },
          {
            text: 'Chat',
            link: 'https://chat.vuejs.org',
          },
          {
            text: 'Twitter',
            link: 'https://twitter.com/posva',
          },
          {
            text: 'Changelog',
            link: 'https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md',
          },
        ],
      },
    ],

    sidebar: {
      '/es/api/': [
        {
          text: 'paquetes',
          children: [
            { text: 'pinia', link: '/es/api/modules/pinia.html' },
            { text: '@pinia/nuxt', link: '/es/api/modules/pinia_nuxt.html' },
            {
              text: '@pinia/testing',
              link: '/es/api/modules/pinia_testing.html',
            },
          ],
        },
      ],
      // catch-all fallback
      '/es/': [
        {
          text: 'Introducción',
          children: [
            {
              text: '¿Qué es Pinia?',
              link: '/es/introduction.html',
            },
            {
              text: 'Cómo empezar',
              link: '/es/getting-started.html',
            },
          ],
        },
        {
          text: 'Conceptos básicos',
          children: [
            { text: 'Definir una Store', link: '/es/core-concepts/' },
            { text: 'Estado', link: '/es/core-concepts/state.html' },
            { text: 'Getters', link: '/es/core-concepts/getters.html' },
            { text: 'Acciones', link: '/es/core-concepts/actions.html' },
            { text: 'Plugins', link: '/es/core-concepts/plugins.html' },
            {
              text: 'Stores fuera de componentes',
              link: '/es/core-concepts/outside-component-usage.html',
            },
          ],
        },
        {
          text: 'Renderización del lado del servidor (Server-Side Rendering o SSR)',
          children: [
            {
              text: 'Vue y Vite',
              link: '/es/ssr/',
            },
            {
              text: 'Nuxt.js',
              link: '/es/ssr/nuxt.html',
            },
          ],
        },
        {
          text: 'Cookbook',
          link: '/es/cookbook/',
          children: [
            {
              text: 'Migración desde Vuex ≤4',
              link: '/es/cookbook/migration-vuex.html',
            },
            {
              text: 'Sustitución de módulos en caliente',
              link: '/es/cookbook/hot-module-replacement.html',
            },
            {
              text: 'Testing',
              link: '/es/cookbook/testing.html',
            },
            {
              text: 'Uso sin setup()',
              link: '/es/cookbook/options-api.html',
            },
            {
              text: 'Componiendo Stores',
              link: '/es/cookbook/composing-stores.html',
            },
            {
              text: 'Migración desde v0/v1 to v2',
              link: '/es/cookbook/migration-v1-v2.html',
            },
            {
              text: 'Tratando con composables',
              link: '/es/cookbook/composables.html',
            },
          ],
        },
      ],
    },
  },
}
