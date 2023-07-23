# Definir un Almacén %{#defining-a-store}%

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

## Almacenes de Opciones %{#option-stores}%

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

## Almacenes de Configuración %{#setup-stores}%

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

Los almacenes con setup ofrecen mucha más flexibilidad que los [almacenes de opciones](#option-stores) dado que puedes crear observadores en un almacén y usar libremente cualquier [composable](https://vuejs.org/guide/reusability/composables.html#composables). Sin embargo, ten en mente que usar composables puede traer más complejidad cuando se usa [SSR](../cookbook/composables.md).

Los almacenes con setup también pueden depender de propiedades _proporcionadas_ globalmente como el Router o la Ruta. Cualquier propiedad [proporcionada a nivel de App](https://vuejs.org/api/application.html#app-provide) puede ser accedida desde el almacén usando `inject()`, tal y como se hace en los componentes:

```ts
import { inject } from 'vue'
import { useRoute } from 'vue-router'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // esto asume que `app.provide('appProvided', 'value')` fue llamado
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

:::warning
No devuelvas propiedades como `useRoute()` o `appProvided` (del ejemplo anterior) ya que no pertenecen al almacén y puedes acceder a ellas directamente desde los componentes con `useRoute()` e `inject('appProvided')`.
:::

## ¿Qué sintaxis debería usar? %{#what-syntax-should-i-pick}%

Al igual que con las [API de composición y API de opciones de Vue](https://vuejs.org/guide/introduction.html#which-to-choose), quédate con la que te sientas más cómodo. Si no estás seguro prueba primero los [almacenes de opciones](#option-stores).

## Usando el almacén %{#using-the-store}%

Estamos _definiendo_ un almacén porque este no se creará hasta que no se llame a `use...Store()` dentro del `<script setup>` de un componente (o dentro de `setup()` **como cualquier composable**).

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

// accede a la variable `store` desde cualquier lugar
// del componente ✨
const store = useCounterStore()
</script>
```

:::tip
Si aún no estás usando componentes con `setup` [aún puedes usar Pinia con _map helpers_](../cookbook/options-api.md)
:::

Puedes definir tantos almacenes como quieras y **deberías definir cada una en un archivo diferente** para sacarle el máximo provecho a Pinia (como permitir automáticamente que tu bundler divida el código y proporcione la deducción de tipos de TypeScript).

Una vez que el almacén está instanciado puede acceder a cualquier propiedad definida en `state`, `getters` y `actions` directamente en el almacén. Más adelante lo miraremos más en detalle pero el autocompletado te ayudará.

Cabe destacar que un `almacén` es un objeto envuelto en un `reactive`, por lo que no es necesario escribir `.value` después de los getters, pero tal y como las `props` en `setup` **no podemos desestructurarlo**:

```vue
<script setup>
const store = useCounterStore()
// ❌ Esto no funcionará porque rompe la reactividad
// es igual que desestructurar desde `props`
const { name, doubleCount } = store // [!aviso del código]
name // siempre será "Eduardo" // [!aviso del código]
doubleCount // siempre será 0 // [!aviso del código]

setTimeout(() => {
  store.increment()
}, 1000)

// ✅ este será reactivo
// 💡 pero también puedes usar `store.doubleCount` directamente
const doubleValue = computed(() => store.doubleCount)
</script>
```


## Desestructurar desde un Almacén %{#destructuring-from-a-store}%

Para poder extraer propiedades del almacén mientras mantenemos la reactividad es necesario usar `storeToRefs()`. Esto creará refs por cada propiedad reactiva. Esto es útil cuando solo usas el estado del almacén pero no llamas a ninguna acción. Cabe destacar que puedes desestructurar acciones directamente del almacén ya que también están vinculadas al propio almacén:

```vue
<script setup>
import { storeToRefs } from 'pinia'

const store = useCounterStore()
// `name` y `doubleCount` son refs reactivas
// Esto también extraerá refs para las propiedades añadidas por plugins
// pero se saltará cualquier acción o propiedad no reactiva (sin ref/reactive)
const { name, doubleCount } = storeToRefs(store)
// la acción de incremento puede ser desestructurada
const { increment } = store
</script>
```
