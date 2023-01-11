# Migración desde 0.0.7 {#migrating-from-0-0-7}

Las versiones posteriores a `0.0.7`: `0.1.0`, y `0.2.0`, vinieron con algunos cambios importantes. Esta guía te ayuda a migrar tanto si usas Vue 2 como Vue 3. El registro de cambios completos se puede encontrar en el repositorio:

- [Pinia <= 1 para Vue 2](https://github.com/vuejs/pinia/blob/v1/CHANGELOG.md)
- [Pinia >= 2 para Vue 3](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md)

Si tienes preguntas o problemas relacionados con la migración, no dudes en [abrir un debate](https://github.com/vuejs/pinia/discussions/categories/q-a) para pedir ayuda.

## No más `store.state` {#no-more-store-state}

Ya no se accede al estado del almacén a través de una propiedad `state`, se puede acceder directamente a cualquier propiedad state.

Teniendo en cuenta un almacén definido con:

```js
const useStore({
  id: 'main',
  state: () => ({ count: 0 })
})
```

Hacer

```diff
 const store = useStore()

-store.state.count++
+store.count.++
```

Puedes seguir accediendo a todo el estado del almacén con `$state` cuando lo necesites:

```diff
-store.state = newState
+store.$state = newState
```

## Renombrar las propiedades del almacén {#rename-of-store-properties}

Todas las propiedades del almacén (`id`, `patch`, `reset`, etc) llevan ahora el prefijo `$` para permitir propiedades definidas en el almacén con los mismos nombres. Tip: puedes refactorizar toda su base de código con F2 (o clic derecho + Refactorizar) en cada una de las propiedades del almacén

```diff
 const store = useStore()
-store.patch({ count: 0 })
+store.$patch({ count: 0 })

-store.reset()
+store.$reset()

-store.id
+store.$id
```

## La instancia de Pinia {#the-pinia-instance}

Ahora es necesario crear una instancia de pinia e instalarla:

Si está utilizando Vue 2 (Pinia <= 1):

```js
import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

const pinia = createPinia()
Vue.use(PiniaVuePlugin)
new Vue({
  el: '#app',
  pinia,
  // ...
})
```

Si está utilizando Vue 3 (Pinia >= 2):

```js
import { createApp } from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
```

La instancia `pinia` es la que mantiene el estado y debe **ser única por aplicación**. Consulta la sección SSR de la documentación para más detalles.

## Cambios en el SSR {#ssr-changes}

El plugin SSR `PiniaSsr` ya no es necesario y ha sido eliminado.
Con la introducción de las instancias pinia, `getRootState()` ya no es necesario y debe sustituirse por `pinia.state.value`:

Si está utilizando Vue 2 (Pinia <= 1):

```diff
// entry-server.js
-import { getRootState, PiniaSsr } from 'pinia',
+import { createPinia, PiniaVuePlugin } from 'pinia',


-// instalar plugin para usar automáticamente el contexto correcto en setup y onServerPrefetch
-Vue.use(PiniaSsr);
+Vue.use(PiniaVuePlugin)

 export default context => {
+  const pinia = createPinia()
   const app = new Vue({
     // otras opciones
+    pinia
   })

   context.rendered = () => {
     // pasar el estado al contexto
-    context.piniaState = getRootState(context.req)
+    context.piniaState = pinia.state.value
   };

-   return { app }
+   return { app, pinia }
 }
```

`setActiveReq()` y `getActiveReq()` se han sustituido por `setActivePinia()` y `getActivePinia()` respectivamente. A `setActivePinia()` sólo se le puede pasar una instancia de `pinia` creada con `createPinia()`. **Tenga en cuenta que la mayoría de las veces no utilizará directamente estas funciones**.
