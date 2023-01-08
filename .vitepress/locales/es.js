export default {
  vitepressConfig: {
    title: 'Pinia',
    lang: 'es-ES',
    description: 'El Almacén de Vue que te gustará usar',
  },
  themeConfig: {
    label: 'Español',
    selectText: 'Idiomas',
    editLinkText: 'Sugerir cambios a esta página',
    lastUpdated: 'Última actualización',

    nav: [
      { text: 'Guía', link: '/introduction.html' },
      { text: 'API', link: 'https://pinia.vuejs.org/api/' },
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
      // catch-all fallback
      '/': [
        {
          text: 'Introducción',
          children: [
            {
              text: '¿Qué es Pinia?',
              link: '/introduction.html',
            },
            {
              text: 'Cómo empezar',
              link: '/getting-started.html',
            },
          ],
        },
        {
          text: 'Conceptos básicos',
          children: [
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
          text: 'Renderización del lado del servidor (Server-Side Rendering o SSR)',
          children: [
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
          link: '/cookbook/',
          children: [
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
              text: 'Migración desde v0/v1 to v2',
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
