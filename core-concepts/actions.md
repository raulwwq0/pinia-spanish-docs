# Acciones {#actions}

<VueSchoolLink
  href="https://vueschool.io/lessons/synchronous-and-asynchronous-actions-in-pinia"
  title="Learn all about actions in Pinia"
/>

Las acciones son el equivalente de los [métodos](https://v3.vuejs.org/guide/data-methods.html#methods) en los componentes. Pueden ser definidos con la propiedad `actions` en `defineStore()` y **son perfectas para definir lógica de negocio**:

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    // como dependemos de `this`, no podemos usar funciones de flecha
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

Como los [getters](./getters.md), las acciones obtienen acceso a _toda la instancia del almacén_ a través de `this` con **soporte de tipado completo (y autocompletado ✨)**. **Al contrario que los getters, las `acciones` pueden ser asíncronas**, ¡puedes usar `await` dentro de acciones que son llamadas por cada API o incluso otras acciones! Aquí tienes un ejemplo usando [Mande](https://github.com/posva/mande). Cabe aclarar que no importa la librería que uses siempre y cuando obtengas una `promesa`, incluso puedes usar la función nativa `fetch` (sólo en navegadores):

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // deja al componente formulario mostrar el error
        return error
      }
    },
  },
})
```

También eres libre de poner cuantos argumentos quieras y no devolver nada. Cuando llames a las acciones ¡todo será deducido automáticamente!

Las acciones son llamadas cómo los métodos:

```js
export default defineComponent({
  setup() {
    const store = useCounterStore()
    // llama a la acción como un método del almacén
    store.randomizeCounter()

    return {}
  },
})
```

## Acceder a acciones de otros almacenes {#accessing-other-stores-actions}

Para usar otro almacén puedes _usarlo_ directamente dentro de la _acción_:

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

## Uso con `setup()` {#usage-with-setup}

Puedes llamar directamente a cualquier acción como un método del almacén:

```js
export default {
  setup() {
    const store = useCounterStore()

    store.randomizeCounter()
  },
}
```

## Uso con la API de Opciones {#usage-with-the-options-api}

<VueSchoolLink
  href="https://vueschool.io/lessons/access-pinia-actions-in-the-options-api"
  title="Access Pinia Getters via the Options API"
/>

Para los siguientes ejemplos, puedes asumir que se ha creado el siguiente almacén:

```js
// Ruta de ejemplo:
// ./src/stores/counter.js

import { defineStore } from 'pinia',

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  }
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
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    },
  },
}
```

### Sin `setup()` {#without-setup}

Si prefieres no usar la API de composición puedes usar el helper `mapActions()` para mapear las propiedades de las acciones como métodos en tus componentes:

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    // da acceso a this.increment() dentro del componente
    // al igual que llamarlo desde store.increment()
    ...mapActions(useCounterStore, ['increment'])
    // lo mismo de arriba pero registrándolo como this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
```

## Suscribirse a acciones {#subscribing-to-actions}

Es posible observar acciones y sus resultados con `store.$onAction()`. La callback que se le pasa es ejecutada antes que la propia acción. `after` se encarga de manejar las promesas y te permite ejecutar una función después de resolver la acción. De forma similar, `onError` te permite ejecutar una función si la acción lanza un error o es rechazada. Estos son útiles para seguir errores en tiempo de ejecución, parecido a [este tip en la documentación de Vue](https://v3.vuejs.org/guide/tooling/deployment.html#tracking-runtime-errors).

Aquí tienes un ejemplo de los registros antes de ejecutar acciones y después de que sean resueltas/rechazadas.

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // nombre de la acción
    store, // instancia del almacén, igual que `someStore`
    args, // array de parámetros pasados a la acción
    after, // hook para cuando la acción devuelva o se resuelva
    onError, // hook por si la acción lanza un error o es rechazada
  }) => {
    // una variable compartida para esta llamada de acción específica
    const startTime = Date.now()
    // esto se activará antes de que una acción en el `almacén` sea ejecutada
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // esto se activará si la acción es exitosa y tras haber terminado su 
    // ejecución y espera por cualquier promesa retornada
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // esto se activará si la acción lanza un error o devuelve una promesa 
    // rechazada
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// eliminar el listener manualmente
unsubscribe()
```

Por defecto, las _suscripciones a acciones_ están enlazadas al componente donde son añadidas (si el almacén está dentro de un `setup()` de un componente). Esto significa que se eliminarán automáticamente cuando el componente sea desmontado. Si también quieres mantenerlas después de que el componente sea desmontado, pasa `true` como segundo parámetro para _separar_ la _suscripción de la acción_ de su componente actual:

```js
export default {
  setup() {
    const someStore = useSomeStore()

    // esta suscripción se mantendrá incluso tras desmontar el componente
    someStore.$onAction(callback, true)

    // ...
  },
}
```
