# Definir un Almacén

<VueSchoolLink
  href="https://vueschool.io/lessons/define-your-first-pinia-store"
  title="Learn how to define and use stores in Pinia"
/>

Antes de entrar en los conceptos básicos es necesario saber que un almacén se define usando `defineStore()` y que requiere el uso de un nombre **único** como primer parámetro.

```js
import { defineStore } from 'pinia'

// Puedes nombrar a a la función retornada `defineStore()` como tú quieras
// pero es mejor usar el nombre del almacén poniendo `use` delante y 
// `Store` al final (por ejemplo `useUserStore`, `useCartStore`, 
// `useProductStore`)
// El primer parámetro es el id único del almacén en toda la aplicación
export const useAlertsStore = defineStore('alerts', {
  // otras opciones...
})
```

Este _nombre_, también conocido como _id_, es obligatorio y es usado por Pinia para conectar el almacén con las herramientas de desarrollo. Nombrar a la función retornada con _use..._ es una convención entre composables para que su uso sea idiomático.

`defineStore()` acepta dos valores distintos para su segundo parámetro: una función Setup o un objeto de opciones.

## Almacenes de Opciones

Tal y como se hace en la API de opciones de Vue, podemos pasar un objeto de opciones con las propiedades `state`, `actions` y `getters`.

```js {2-10}
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

Puedes pensar en `state` como los `datos` del almacén, `getters` como las propiedades `computadas` del almacén y `actions` como los `métodos`.

Los almacenes de opciones deberían sentirse como algo intuitivo y simple para empezar.

## Almacenes con Setup

También hay otra posible sintaxis para definir los almacenes. Es parecida a la [función setup](https://vuejs.org/api/composition-api-setup.html) de la API de composición de Vue, podemos pasarle una función que defina propiedades reactivas y métodos, y que devuelva un objecto con las propiedades y métodos que queremos exponer.

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

En los _almacenes con setup_:

- `ref()` se convierte en `state`
- `computed()` se convierte en `getters`
- `function()` se convierte en `actions`

Los almacenes con setup ofrecen mucha más flexibilidad que los [almacenes de opciones](#almacenes-de-opciones) dado que puedes crear observadores en un almacén y usar libremente cualquier [composable](https://vuejs.org/guide/reusability/composables.html#composables). Sin embargo, ten en mente que usar composables puede traer más complejidad cuando se usa [SSR](../cookbook/composables.md).

## ¿Qué sintaxis debería usar?

Al igual que con las [API de composición y API de opciones de Vue](https://vuejs.org/guide/introduction.html#which-to-choose), quédate con la que te sientas más cómodo. Si no estás seguro prueba primero los [almacenes de opciones](#almacenes-de-opciones).

## Usando el almacén

Estamos _definiendo_ un almacén porque hasta que no se llame a `use...Store()` dentro de `setup()` este no se creará.

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const store = useCounterStore()

    return {
      // puedes devolver la instancia completa del almacén para usarla en el template
      store,
    }
  },
}
```

:::tip
Si aún no estás usando componentes con `setup` [aún puedes usar Pinia con _map helpers_](../cookbook/options-api.md)
:::

Puedes definir tantos almacenes como quieras y **deberías definir cada una en un archivo diferente** para sacarle el máximo provecho a Pinia (como permitir automáticamente que tu bundler divida el código y proporcione la deducción de tipos de TypeScript).

Una vez que el almacén está instanciado puede acceder a cualquier propiedad definida en `state`, `getters` y `actions` directamente en el almacén. Más adelante lo miraremos más en detalle pero el autocompletado te ayudará.

Cabe destacar que un `almacén` es un objeto envuelto en un `reactive`, por lo que no es necesario escribir `.value` después de los getters, pero tal y como las `props` en `setup` **no podemos desestructurarlo**:

```js
export default defineComponent({
  setup() {
    const store = useCounterStore()
    // ❌ Esto no va a funcionar porque se carga la reactividad
    // es lo mismo que desestructurar una prop
    const { name, doubleCount } = store

    name // "Eduardo"
    doubleCount // 0

    setTimeout(() => {
      store.increment()
    }, 1000)

    return {
      // siempre será "Eduardo"
      name,
      // siempre será 0
      doubleCount,
      // también siempre será 0
      doubleNumber: store.doubleCount,

      // ✅ esto si será reactivo
      doubleValue: computed(() => store.doubleCount),
    }
  },
})
```

Para poder extraer propiedades del almacén mientras mantenemos la reactividad es necesario usar `storeToRefs()`. Esto creará refs por cada propiedad reactiva. Esto es útil cuando solo usas el estado del almacén pero no llamas a ninguna acción. Cabe destacar que puedes desestructurar acciones directamente del almacén ya que también están vinculadas al propio almacén:

```js
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useCounterStore()
    // `name` y `doubleCount` son refs reactivas
    // Esto también creará refs para las propiedades añadidas por plugins
    // pero se saltará cualquier acción o propiedad no reactiva (sin ref/reactive)
    const { name, doubleCount } = storeToRefs(store)
    // la acción de incremento puede ser extraída
    const { increment } = store

    return {
      name,
      doubleCount,
      increment,
    }
  },
})
```
