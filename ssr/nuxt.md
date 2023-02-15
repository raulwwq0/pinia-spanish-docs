# Nuxt.js %{#nuxt-js}%

Usar Pinia con [Nuxt.js](https://nuxtjs.org/) es más fácil debido a que Nuxt tiene en cuenta muchas cosas cuando hablamos de _renderizado del lado del servidor_. Por ejemplo, **no necesitas preocuparte sobre serialización ni ataques XSS**. Pinia soporta Nuxt Bridge y Nuxt 3. Para soporte directo con Nuxt 2, [mira más abajo](#nuxt-2-without-bridge).

## Instalación %{#installation}%

```bash
yarn add pinia @pinia/nuxt
# o con npm
npm install pinia @pinia/nuxt
```

:::tip 
Si estás usando npm puede que te encuentres con el error _ERESOLVE unable to resolve dependency tree_. En ese caso, añade lo siguiente a tu `package.json`:

```js
"overrides": { 
  "vue": "latest"
}
```
:::

Proporcionamos un _módulo_ para manejar todo por ti, solo necesitas añadirlo a `modules` en tu archivo `nuxt.config.js`:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... otras opciones
  modules: [
    // ...
    '@pinia/nuxt',
  ],
})
```

Y eso es todo, ¡usa tu almacén como siempre!

## Usar el almacén fuera de `setup()` %{#using-the-store-outside-of-setup}%

Si quieres usar un almacén fuera de `setup()`, recuerda pasar el objeto de `pinia` a `useStore()`. Lo hemos añadido [al contexto](https://nuxtjs.org/docs/2.x/internals-glossary/context) para que tengas acceso a el en `asyncData()` y `fetch()`:

```js
import { useStore } from '~/stores/myStore'

export default {
  asyncData({ $pinia }) {
    const store = useStore($pinia)
  },
}
```

Como con `onServerPrefetch()`, no necesitas hacer nada especial si quieres llamar a una acción de un almacén en `asyncData()`:

```vue
<script setup>
const store = useStore()
const { data } = await useAsyncData('user', () => store.fetchUser())
</script>
```

## Importaciones automáticas %{#auto-imports}%

Por defecto `@pinia/nuxt` expone una sola importación automática: `usePinia()`, que es similar a `getActivePinia()` pero funciona mejor con Nuxt. Puedes añadir importaciones automáticas para facilitarte la vida:

```js
// nuxt.config.js
export default defineNuxtConfig({
  // ... otras opciones
  modules: [
    // ...
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // importa automáticamente `defineStore`
          'defineStore', // import { defineStore } from 'pinia'
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
})
```

## Nuxt 2 sin bridge %{#nuxt-2-without-bridge}%

Pinia soporta Nuxt 2 hasta `@pinia/nuxt` v0.2.1. Asegúrate de instalar también [`@nuxtjs/composition-api`](https://composition-api.nuxtjs.org/) junto con `pinia`:

```bash
yarn add pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
# o con npm
npm install pinia @pinia/nuxt@0.2.1 @nuxtjs/composition-api
```

Suministramos un _módulo_ para manejar todo por ti, solo necesitas añadirlo a `buildModules` en tu archivo `nuxt.config.js`:

```js
// nuxt.config.js
export default {
  // ... otras opciones
  buildModules: [
    // solo Nuxt 2:
    // https://composition-api.nuxtjs.org/getting-started/setup#quick-start
    '@nuxtjs/composition-api/module',
    '@pinia/nuxt',
  ],
}
```

### TypeScript %{#typescript}%

Si estás usando Nuxt 2 (`@pinia/nuxt` < 0.3.0) con TypeScript o tienes un `jsconfig.json`, deberás añadir también los tipos para `context.pinia`:

```json
{
  "types": [
    // ...
    "@pinia/nuxt"
  ]
}
```

Esto también asegurará que tengas autocompletado 😉 .

### Usar Pinia junto con Vuex %{#using-pinia-alongside-vuex}%

Es recomendable **evitar usar Pinia y Vuex a la vez**, pero si necesitas usar ambos tendrás que decirle a pinia que no lo deshabilite:

```js
// nuxt.config.js
export default {
  buildModules: [
    '@nuxtjs/composition-api/module',
    ['@pinia/nuxt', { disableVuex: false }],
  ],
  // ... otras opciones
}
```
