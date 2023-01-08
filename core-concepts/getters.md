# Getters {#getters}

<VueSchoolLink
  href="https://vueschool.io/lessons/getters-in-pinia"
  title="Learn all about getters in Pinia"
/>

Los getters son exactamente el equivalente de los [valores computados](https://vuejs.org/guide/essentials/computed.html) para el estado de un almacén. Pueden estar definidos con la propiedad `getters`en `defineStore()`. Primero reciben el estado como primer parámetro **para fomentar** el uso de funciones de flecha:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

La mayoría del tiempo, los getters solo dependerán del estado. Sin embargo, puede que necesiten usar otros getters. Debido a esto, podemos acceder a _toda la instancia del almacén_ a través de `this` cuando definimos una función regular, **pero es necesario definir el tipo del valor retornado (en TypeScript)**. Esto es debido a una conocida limitación en TypeScript y **no afecta a getters definidos con funciones de flecha ni a getters que no usan `this`**:

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // deduce automáticamente el tipo como número
    doubleCount(state) {
      return state.count * 2
    },
    // el tipo retornado **tiene que** estar explícitamente puesto
    doublePlusOne(): number {
      // autocompletado y tipado para todo el almacén ✨
      return this.doubleCount + 1
    },
  },
})
```

Entonces puedes acceder al getter directamente desde la instancia del almacén:

```vue
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>

<script>
export default {
  setup() {
    const store = useCounterStore()

    return { store }
  },
}
</script>
```

## Acceder a otros getters {#accessing-other-getters}

Como en las propiedades computadas, puedes combinar multiples getters. Accede a cualquier otro getter con `this`. Incluso si no quieres usar TypeScript puedes pedir sugerencias a tu IDE para tipos con [JSDoc](https://jsdoc.app/tags-returns.html):

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // el tipo es deducido automáticamente porque no estamos 
    // usando `this`
    doubleCount: (state) => state.count * 2,
    // aquí necesitamos añadir el tipo nosotros (usando JSDoc en 
    // JS). También podemos usar esto para documentar el getter
    /**
     * Devuelve el valor del contador multiplicado por dos más uno.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
  },
})
```

## Pasar argumentos a los getters {#passing-arguments-to-getters}

Los _getters_ son solo propiedades _computadas_ detrás de cámaras, así que no es posible pasarles ningún parámetro. Sin embargo, puedes retornar una función desde el _getter_ para aceptar cualquier argumento:

```js
export const useStore = defineStore('main', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

y usarlos en un componente:

```vue
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

Cabe aclarar que cuando hacemos esto **los getters ya no se almacenan en caché**, son simplemente funciones que puedes invocar. Sin embargo puede almacenar en caché algunos resultados dentro del propio getter, lo cual no es muy común pero debería demostrar un mayor rendimiento:

```js
export const useStore = defineStore('main', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

## Acceder a getters de otros almacenes {#accessing-other-stores-getters}

Para usar getters de otros almacenes puedes _usarlos_ directamente dentro del _getter_:

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

## Uso con `setup()` {#usage-with-setup}

Puedes acceder directamente a cualquier getter como una propiedad del almacén (exactamente igual que las propiedades del estado):

```js
export default {
  setup() {
    const store = useCounterStore()

    store.count = 3
    store.doubleCount // 6
  },
}
```

## Uso con la API de Opciones {#usage-with-the-options-api}

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-getters-in-the-options-api"
  title="Access Pinia Getters via the Options API"
/>

Para los próximos ejemplos puedes suponer que el siguiente almacén fue creado:

```js
// Ruta de ejemplo:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
})
```

### Con `setup()` {#with-setup}

Dado que la API de composición no es para todo el mundo, el hook `setup()` puede hacer que trabajar con Pinia sea más fácil con la API de opciones. ¡No necesitas funciones map helper adicionales!

```js
import { useCounterStore } from '../stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
}
```

### Sin `setup()` {#without-setup}

Puedes usar la misma función `mapState()` usada en la [sección anterior del estado](./state.md#options-api) para mapear los getters:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // da acceso a this.doubleCount dentro del componente
    // igual que leerlo desde store.doubleCount
    ...mapState(useCounterStore, ['doubleCount']),
    // igual que lo de arriba pero registrándolo como this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCount',
      // también puedes escribir una función que de acceso al almacén
      double: (store) => store.doubleCount,
    }),
  },
}
```
