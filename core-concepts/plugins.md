# Plugins {#plugins}

Los almacenes de Pinia pueden ser completamente extensibles gracias a una API de bajo nivel. Aquí tienes una lista de cosas que puedes hacer:

- Añadir nuevas propiedades a los almacenes
- Añadir nuevas opciones cuando defines almacenes
- Añadir nuevos métodos a los almacenes
- Envolver métodos existentes
- Cambiar o incluso cancelar acciones
- Implementar efectos secundarios como [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 
- Aplicar solo a almacenes específicos

Los plugins son añadidos a la instancia de pinia con `pinia.use()`. El ejemplo más sencillo es añadir una propiedad estática a todos los almacenes mediante el retorno de un objeto:

```js
import { createPinia } from 'pinia'

// añadir una propiedad llamada `secret` a todos los almacenes creados después 
// de que este plugin este instalado. Esto puede estar en otro archivo 
// diferente
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// le damos el plugin a pinia
pinia.use(SecretPiniaPlugin)

// en otro archivo
const store = useStore()
store.secret // 'the cake is a lie'
```

Esto es útil para añadir objetos globales como router, modal o toast managers.

## Introducción {#introduction}

Un plugin de Pinia es una función que opcionalmente retorna propiedades para ser añadidas a un almacén. Toma un argumento opcional, un _contexto_:

```js
export function myPiniaPlugin(context) {
  context.pinia // el almacén creado con `createPinia()`
  context.app // la aplicación actual creada con `createApp()` (solo Vue 3)
  context.store // el almacén aumentado por el plugin
  context.options // el objeto de opciones que define al almacén pasado por `defineStore()`
  // ...
}
```

Esta función es pasada a `pinia` con `pinia.use()`:

```js
pinia.use(myPiniaPlugin)
```

Los plugins son solo aplicadas a almacenes creados **después de los propios plugins, y después de que `pinia` sea pasada a la aplicación**, de lo contrario no serán aplicados.

## Aumentar un Almacén {#augmenting-a-store}

Puedes añadir propiedades a cualquier almacén solo retornando un objeto de estas mismas en un plugin:

```js
pinia.use(() => ({ hello: 'world' }))
```

También puedes colocar la propiedad directamente en la `store` pero **si es posible usa la versión retornada para que pueda ser seguida automáticamente por las herramientas de desarrollo**:

```js
pinia.use(({ store }) => {
  store.hello = 'world'
})
```

Cualquier propiedad _retornada_ por un plugin será automáticamente seguido por las herramientas de desarrollo para hacer que `hello` sea visible en las herramientas de desarrollo. Asegúrate de añadirlo a `store._customProperties` **solo en modo de desarrollo** si quieres depurarlo en las herramientas de desarrollo:

```js
// del ejemplo anterior
pinia.use(({ store }) => {
  store.hello = 'world'
  // asegúrate que tu bundler maneje esto. webpack y vite deberían hacerlo por defecto
  if (process.env.NODE_ENV === 'development') {
    // añade cualquier clave que crees al almacén
    store._customProperties.add('hello')
  }
})
```

Cabe aclarar que cualquier almacén está envuelto con [`reactive`](https://v3.vuejs.org/api/basic-reactivity.html#reactive), por lo que desenvuelve automáticamente cualquier Ref (`ref()`, `computed()`, ...) que este contiene:

```js
const sharedRef = ref('shared')
pinia.use(({ store }) => {
  // cada almacén tiene sus propias propiedades `hello`
  store.hello = ref('secret')
  // se desenvuelven automáticamente
  store.hello // 'secret'

  // todos los almacenes comparten el valor de la propiedad `shared`
  store.shared = sharedRef
  store.shared // 'shared'
})
```

Por eso se puede acceder a todas las propiedades computadas sin .value y por eso son reactivas.

### Añadir nuevo estado {#adding-new-state}

Si quieres añadir nuevas propiedades de estado a un almacén o propiedades que están hechas para ser usadas durante la hidratación, **tendrás que añadirlas en dos lugares**:

- En `store` para que puedas acceder a ella con `store.myState`
- En `store.$state` para que pueda ser usada en las devtools y **ser serializada durante SSR**

Además de eso, seguramente tendrás que usar un `ref()` (u otra API reactiva) para poder compartir el valor entre los distintos accesos:

```js
import { toRef, ref } from 'vue'

pinia.use(({ store }) => {
  // para manejar correctamente SSR, necesitarás estar seguro de no
  // sobrescribir un valor existente
  if (!Object.prototype.hasOwnProperty(store.$state, 'hasError')) {
    // hasError está definido en el plugin, por lo que cada almacén tiene
    // sus propias propiedades de estado
    const hasError = ref(false)
    // establecer la variable en `$state` le permitirá ser serializada
    // durante SSR
    store.$state.hasError = hasError
  }
  // necesitamos transferir el ref del estado al almacén, así ambos
  // accesos: store.hasError y store.$state.hasError funcionarán y
  // compartirán la misma variable
  // Mira https://vuejs.org/api/reactivity-utilities.html#toref
  store.hasError = toRef(store.$state, 'hasError')

  // en este caso es mejor no devolver `hasError` debido a que
  // será mostrada igualmente en la sección `estado` en las 
  // herramientas de desarrollo y si la retornamos, las 
  // herramientas de desarrollo la mostrarán dos veces.
})
```

Cabe aclarar que los cambios o adiciones al estado que ocurren en un plugin (esto incluye la llamada a `store.$patch()`) se realizan antes de que el almacén este activo y por tanto **no dispara ninguna suscripción**.

:::warning
Si estas usando **Vue 2**, Pinia esta sujeto a las [mismas advertencias de reactividad](https://v2.vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) como Vue. Necesitarás usar `Vue.set()` (Vue 2.7) o `set()` (desde `@vue/composition-api` para Vue <2.7) para cuando crees nuevas propiedades de estado como `secret` y `hasError`:

```js
import { set, toRef } from '@vue/composition-api'
pinia.use(({ store }) => {
  if (!Object.prototype.hasOwnProperty(store.$state, 'hello')) {
    const secretRef = ref('secret')
    // Si los datos están pensado para ser usados durante SSR
    // deberás colocarlos en la propiedad `$state` para que
    // se serialicen y se usen durante la hidratación
    set(store.$state, 'secret', secretRef)
  }
  // ponlos directamente en el almacén también para que puedas
  // acceder a estos de las dos formas: `store.$state.secret` 
  // / `store.secret`
  set(store, 'secret', toRef(store.$state, 'secret'))
  store.secret // 'secret'
})
```

:::

## Añadir nuevas propiedades externas {#adding-new-external-properties}

Cuando añadas nuevas propiedades externas, instancias de clase que vengan de otras librerías o simplemente cosas que no sean reactivas, deberás envolverlos en el objeto con `markRaw()` antes de pasárselos a pinia. Aquí tienes un ejemplo añadiendo el router a todos los almacén:

```js
import { markRaw } from 'vue'
// adapta esto según donde esté tu router
import { router } from './router'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})
```

## Llamar a `$subscribe` dentro de plugins {#calling-subscribe-inside-plugins}

También puedes usar [store.$subscribe](./state.md#subscribing-to-the-state) y [store.$onAction](./actions.md#subscribing-to-actions) dentro de plugins:

```ts
pinia.use(({ store }) => {
  store.$subscribe(() => {
    // reacciona a cambios del almacén
  })
  store.$onAction(() => {
    // reacciona a acciones del almacén
  })
})
```

## Añadir nuevas opciones {#adding-new-options}

Es posible crear nuevas opciones cuando definas almacenes para luego consumirlas desde los plugins. Por ejemplo, puedes crear una opción `debounce` que te permita retrasar cualquier acción:

```js
defineStore('search', {
  actions: {
    searchContacts() {
      // ...
    },
  },

  // Esto será leído por un plugin más adelante
  debounce: {
    // retrasa la acción searchContact durante 300ms
    searchContacts: 300,
  },
})
```

Entonces el plugin puede leer la opción para envolver las acciones y reemplazar las originales:

```js
// usa cualquier librería de retrasos
import debounce from 'lodash/debounce'

pinia.use(({ options, store }) => {
  if (options.debounce) {
    // estamos sobrescribiendo las acciones con las nuevas
    return Object.keys(options.debounce).reduce((debouncedActions, action) => {
      debouncedActions[action] = debounce(
        store[action],
        options.debounce[action]
      )
      return debouncedActions
    }, {})
  }
})
```

Cabe aclara que las opciones personalizadas son pasadas como tercer argumento cuando se usa la sintaxis de configuración:

```js
defineStore(
  'search',
  () => {
    // ...
  },
  {
  // Esto será leído por un plugin más adelante
    debounce: {
    // retrasa la acción searchContact durante 300ms
      searchContacts: 300,
    },
  }
)
```

## TypeScript {#typescript}

Todo lo mostrado arriba puede ser hecho con soporte de tipado, así que no necesitas usar nunca más ni `any` ni `@ts-ignore`.

### Tipar plugins {#typing-plugins}

Un plugin de Pinia puede ser tipado de la siguiente forma:

```ts
import { PiniaPluginContext } from 'pinia'

export function myPiniaPlugin(context: PiniaPluginContext) {
  // ...
}
```

### Tipar nuevas propiedades de almacenes {#typing-new-store-properties}

Cuando añadas nuevas propiedades al almacén, deberías hacer uso de la interfaz `PiniaCustomProperties`.

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // usando un setter podemos permitir el uso de strings y refs
    set hello(value: string | Ref<string>)
    get hello(): string

    // también puedes definir valores simples
    simpleNumber: number
  }
}
```

Puede ser escrito y leído de forma segura:

```ts
pinia.use(({ store }) => {
  store.hello = 'Hola'
  store.hello = ref('Hola')

  store.simpleNumber = Math.random()
  // @ts-expect-error: no hemos tipado esto correctamente
  store.simpleNumber = ref(Math.random())
})
```

`PiniaCustomProperties` es un tipo genérico que te permite referenciar propiedades de un almacén. Imagina el siguiente ejemplo donde copiaremos las opciones iniciales como `$options` (esto solo funcionaría en almacenes de opciones):

```ts
pinia.use(({ options }) => ({ $options: options }))
```

Podemos tipar esto adecuadamente usando los 4 tipos genéricos de `PiniaCustomProperties`:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomProperties<Id, S, G, A> {
    $options: {
      id: Id
      state?: () => S
      getters?: G
      actions?: A
    }
  }
}
```

:::tip
Cuando extiendes los tipos en genéricos, estos deben ser nombrados **exactamente como en el código fuente**. `Id` no puede ser llamado `id` o `I`, y `S` no puede ser llamado `Estado`. Aquí tienes lo que significa cada letra:

- S: Estado (State)
- G: Getters
- A: Acciones
- SS: Almacenes de configuración / Almacenes (Setup Store / Store)

:::

### Tipar nuevo estado {#typing-new-state}

Cuando añades nuevas propiedades (a ambos sitios, el `almacén` and `almacén.$state`), necesitar añadir el tipo a `PiniaCustomStateProperties` en su lugar. A diferencia de `PiniaCustomProperties`, solo recibe el `Estado` genérico:

```ts
import 'pinia'

declare module 'pinia' {
  export interface PiniaCustomStateProperties<S> {
    hello: string
  }
}
```

### Tipar nuevas opciones de creación {#typing-new-creation-options}

Al crear nuevas opciones para `defineStore()`, debe extender la `DefineStoreOptionsBase`. A diferencia de `PiniaCustomProperties`, sólo expone dos genéricos: el Estado y el tipo de Almacén, lo que le permite limitar lo que se puede definir. Por ejemplo, puede utilizar los nombres de las acciones:

```ts
import 'pinia'

declare module 'pinia' {
  export interface DefineStoreOptionsBase<S, Store> {
    // permite definir un número de ms para cada una de las acciones
    debounce?: Partial<Record<keyof StoreActions<Store>, number>>
  }
}
```

:::tip
También hay un tipo `StoreGetters` para extraer los _getters_ del tipo Almacén. También puedes extender las opciones de los _almacenes de configuración_ o _almacenes de opciones_ **solo** extendiendo los tipos `DefineStoreOptions` y `DefineSetupStoreOptions` respectivamente.
:::

## Nuxt.js {#nuxt-js}

Cuando [usas pinia junto con Nuxt](../ssr/nuxt.md), primero tendrás que crear un [plugin de Nuxt](https://nuxtjs.org/docs/2.x/directory-structure/plugins). Esto te dará acceso a la instancia de `pinia`:

```ts
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // reacciona a cambios en el almacén
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Cabe aclara que esto se tiene que tipar si usas TS
  return { creationTime: new Date() }
}

export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
})
```

Cabe aclarar que el ejemplo de arriba está usando TypeScript, tienes que eliminar las anotaciones de tipos `PiniaPluginContext` y `Plugin` junto con sus imports si estás usando un archivo `.js`.

### Nuxt.js 2 {#nuxt-js-2}

Si estás usando Nuxt.js 2, los tipos son un poco diferentes:

```ts
// plugins/myPiniaPlugin.ts
import { PiniaPluginContext } from 'pinia'
import { Plugin } from '@nuxt/types'

function MyPiniaPlugin({ store }: PiniaPluginContext) {
  store.$subscribe((mutation) => {
    // reacciona a cambios en el almacén
    console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}.`)
  })

  // Cabe aclara que esto se tiene que tipar si usas TS
  return { creationTime: new Date() }
}

const myPlugin: Plugin = ({ $pinia }) => {
  $pinia.use(MyPiniaPlugin)
}

export default myPlugin
```
