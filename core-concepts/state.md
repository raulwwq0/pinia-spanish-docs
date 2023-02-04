# Estado %{#state}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-state-from-a-pinia-store"
  title="Learn all about state in Pinia"
/>

La mayoría del tiempo el estado es la parte central de tu almacén. La gente suele empezar a veces por definir el estado que representa su aplicación. En Pinia, el estado es definido como una función que retorna el estado inicial. Esto permite a Pinia trabajar tanto en el lado del cliente como en el del servidor. 

```js
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  // las funciones de flecha son recomendadas para una deducción de tipos completa
  state: () => {
    return {
      // todas estas propiedades tendrán su tipo deducido automáticamente
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

:::tip
Si estás usando Vue 2, los datos creados en `state` seguirán las mismas reglas que el `data` en una instancia de Vue, por eso el objeto estado tiene que ser plano y necesitas llamar a `Vue.set()` cuando **añadas nuevas** propiedades a él. **Mira también: [Vue#data](https://v2.vuejs.org/v2/api/#data)**.
:::

## TypeScript %{#typescript}%

No necesitas hacer mucho para poder hacer tu estado compatible con TS: asegúrate de que [`strict`](https://www.typescriptlang.org/tsconfig#strict) o, al menos, [`noImplicitThis`](https://www.typescriptlang.org/tsconfig#noImplicitThis) estén habilitados y !Pinia deducirá los tipos de tu estado automáticamente! Sin embargo, hay pocas veces donde deberás proporcionárselo manualmente con algún casting.

```ts
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // para las listas inicialmente vacías
      userList: [] as UserInfo[],
      // para datos que no están cargados aún
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```
Si prefieres puedes definir el estado con una interfaz y tipar el valor retornado de `state()`:

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

## Acceder al `estado` %{#accessing-the-state}%

Por defecto, puedes leer y escribir en el estado directamente accediendo a él a través la instancia del `almacén`:

```js
const store = useStore()

store.count++
```

Cabe aclarar que no puedes añadir una nueva propiedad al estado **si no está definida en `state()`**, tiene que contener el estado inicial, por ejemplo: no podemos hacer `store.secondCount = 2` si `secondCount` no está definido en `state()`.

## Restablecer el estado %{#resetting-the-state}%

Puedes restablecer el estado a su valor inicial llamando al método `$reset()` del almacén:

```js
const store = useStore()

store.$reset()
```

### Uso con la API de Opciones %{#usage-with-the-options-api}%

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-state-in-the-options-api"
  title="Access Pinia State via the Options API"
/>

Para los siguientes ejemplos supón que hemos creado el siguiente almacén:

```js
// Ruta de ejemplo:
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
})
```

Si no estás usando el API de composición y estás usando `propiedades computadas`, `métodos`, ..., puede usar `mapState()` para mapear las propiedades del estado como propiedades computadas de solo lectura:

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // da acceso a this.count dentro del componente
    // igual que leerlo desde store.count
    ...mapState(useCounterStore, ['count'])
    // lo mismo de arriba pero registrándolo como this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // también puedes escribir una función que tenga acceso al almacén
      double: store => store.count * 2,
      // para que tenga acceso a `this`, pero no será tipado correctamente...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```

#### Estado modificable %{#modifiable-state}%

Si quieres poder escribir en estas propiedades de estado (por ejemplo, si tienes un formulario), puedes utilizar `mapWritableState()` en su lugar. Ten en cuenta que no puedes pasar una función como con `mapState()`:

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // da acceso a this.count dentro del componente y permite modificarlo
    // this.count++
    // igual que leerlo desde store.count
    ...mapWritableState(useCounterStore, ['count'])
    // lo mismo de arriba pero registrándolo como this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

:::tip
No necesitas `mapWritableState()` para colecciones como arrays a no ser que estés sustituyendo el array al completo con `cartItems = []`, `mapState()` te sigue permitiendo llamar métodos en tus colecciones.
:::

## Mutar el estado %{#mutating-the-state}%

Aparte de mutar directamente el almacén con `store.count++`, también puedes llamar al método `$patch`. Te permite aplicar múltiples cambios a la vez con un objeto `estado` parcial:

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

Sin embargo, algunas mutaciones son muy difíciles o costosas de aplicar con esta sintaxis: cualquier modificación a una colección (por ejemplo: añadir, borrar, unir un elemento desde un array) requiere que crees una nueva colección. Debido a esto, el método `$patch` también acepta una función para agrupar este tipo de mutaciones que son difíciles de aplicar con un objeto de parche:

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

La principal diferencia aquí es que `$patch()` te permite agrupar multiples cambios en una sola entrada en las herramientas de desarrollo. Cabe aclarar que **ambas formas, cambios directo al `estado` y `$patch()` aparecen en las herramientas de desarrollo** y pueden ser movidas en el tiempo (aún no es posible en Vue 3).

## Reemplazar el `estado` %{#replacing-the-state}%

**No puedes reemplazar como tal** el estado de un almacén ya que rompería la reactividad. Pero puedes _parchearlo_:

```js
// esto no reemplaza `$state`
store.$state = { count: 24 }
// internamente llama a `$patch()`:
store.$patch({ count: 24 })
```

También puedes **establecer el estado inicial** de toda tu aplicación con cambiar el `estado` de la instancia de `pinia`. Esto se usa en [SSR para hidratación](../ssr/#state-hydration).

```js
pinia.state.value = {}
```

## Suscribirse al estado %{#subscribing-to-the-state}%

Puedes observar el estado y sus cambios a través del método `$subscribe()` de un almacén, similar al [método subscribe](https://vuex.vuejs.org/api/#subscribe) de Vuex. Las ventajas de usar `$subscribe()` sobre un `watch()` común es que las _suscripciones_ se activarán solo después de los _parches_ (por ejemplo cuando usas la versión en función de lo anterior).

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // igual que cartStore.$id
  mutation.storeId // 'cart'
  // solo disponible cuando mutation.type === 'patch object'
  mutation.payload // objeto de parche pasado a cartStore.$patch()

  // guarda todo el estado en el almacenamiento local cuando cambie
  localStorage.setItem('cart', JSON.stringify(state))
})
```

Por defecto, las _suscripciones de estado_ están vinculada con el componente donde se añaden (si el almacén está dentro del `setup()` de un componente). Esto significa que se borrará automáticamente cuando se desmonte el componente. Si también quieres mantenerlas una vez se desmonte el componente tienes que pasarle `{ detached: true }` como segundo parámetro para separar la _suscripción de estado_ del componente actual:

```vue
<script setup>
const someStore = useSomeStore()

// esta suscripción se mantendrá incluso después 
// de desmontar el componente
someStore.$subscribe(callback, { detached: true })
</script>
```

:::tip
Puedes _observar_ todo el estado en la instancia de `pinia` con un solo `watch()`:

```js
watch(
  pinia.state,
  (state) => {
    // almacena todo el estado en el almacenamiento local cuando cambie
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```

:::
