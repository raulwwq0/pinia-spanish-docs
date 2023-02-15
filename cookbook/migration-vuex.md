# Migración desde Vuex ≤4 %{#migrating-from-vuex-4}%

Aunque la estructura de los almacenes de Vuex y Pinia es diferente, gran parte de la lógica puede ser reutilizada. Esta guía sirve para ayudarte a través del proceso y señalar algunos líos comunes que pueden aparecer.

## Preparación %{#preparation}%

Primero, siga la [Guía de introducción](../getting-started.md) para instalar Pinia.

## Reestructuración de Módulos a Almacén %{#restructuring-modules-to-stores}%

Vuex tiene el concepto de un único almacén con múltiples _módulos_. Opcionalmente, estos módulos pueden tener namespaced e incluso anidarse entre sí.

La forma más fácil de hacer la transición de ese concepto para usar con Pinia es que cada módulo que usó anteriormente ahora es un _almacén_. Cada almacén requiere de un `id` que es similar a un namespace en Vuex. Esto significa que cada almacén tiene un namespaced por diseño. Los módulos anidados también pueden convertirse cada uno en su propio almacén. Los almacenes que dependen unos de otros simplemente importarán el otro almacén.

La forma en que elijas reestructurar tus módulos Vuex en los almacenes Pinia depende completamente de tí, pero aquí hay una sugerencia:

```bash
# Ejemplo de Vuex (asumiendo módulos con namespaced)
src
└── store
    ├── index.js           # Inicializa Vuex, importa módulos
    └── modules
        ├── module1.js     # 'module1' namespace
        └── nested
            ├── index.js   # 'nested' namespace, importa 'module2' y 'module3'
            ├── module2.js # 'nested/module2' namespace
            └── module3.js # 'nested/module3' namespace

# Pinia equivalente, ten en cuenta que los identificadores coinciden con los espacios de nombres anteriores
src
└── stores
    ├── index.js          # (Opcional) Inicializa Pinia, no importa almacenes.
    ├── module1.js        # 'module1' id
    ├── nested-module2.js # 'nestedModule2' id
    ├── nested-module3.js # 'nestedModule3' id
    └── nested.js         # 'nested' id
```

Esto crea una estructura plana para los almacenes, pero también conserva el namespacing anterior con `id`s equivalentes. Si tenía algunos estados/getters/acciones/mutaciones en la raíz del almacén (en el archivo `store/index.js` de Vuex), es posible que desees crear otro almacén llamada algo así como `root` que contenga toda esa información.

El directorio para Pinia se llama generalmente `stores` en lugar de `store`. Esto es para enfatizar que Pinia utiliza múltiples almacenes, en lugar de un único almacén en Vuex.

Para proyectos grandes es posible que desee hacer esta conversión módulo por módulo en lugar de convertir todo a la vez. En realidad se puede mezclar Pinia y Vuex juntos durante la migración por lo que este enfoque también puede funcionar y es otra razón para nombrar el directorio Pinia `stores` en su lugar.

## Conversión de un solo módulo %{#converting-a-single-module}%

Aquí hay un ejemplo completo del antes y el después de convertir un módulo Vuex a un almacén Pinia, ver más abajo para una guía paso a paso. El ejemplo Pinia utiliza un almacén de opciones como la estructura es más similar a Vuex:

```ts
// Módulo Vuex en el 'auth/user' namespace
import { Module } from 'vuex'
import { api } from '@/api'
import { RootState } from '@/types' // si se utiliza una definición de tipo Vuex

interface State {
  firstName: string
  lastName: string
  userId: number | null
}

const storeModule: Module<State, RootState> = {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    userId: null
  },
  getters: {
    firstName: (state) => state.firstName,
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // combinar con algunos estados de otros módulos
    fullUserDetails: (state, getters, rootState, rootGetters) => {
      return {
        ...state,
        fullName: getters.fullName,
        // leer el estado de otro módulo llamado `auth`
        ...rootState.auth.preferences,
        // leer un getter de un módulo con un namespaced llamado `email` anidado bajo `auth`
        ...rootGetters['auth/email'].details
      }
    }
  },
  actions: {
    async loadUser ({ state, commit }, id: number) {
      if (state.userId !== null) throw new Error('Already logged in')
      const res = await api.user.load(id)
      commit('updateUser', res)
    }
  },
  mutations: {
    updateUser (state, payload) {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
      state.userId = payload.userId
    },
    clearUser (state) {
      state.firstName = ''
      state.lastName = ''
      state.userId = null
    }
  }
}

export default storeModule
```

```ts
// Almacén Pinia
import { defineStore } from 'pinia'
import { useAuthPreferencesStore } from './auth-preferences'
import { useAuthEmailStore } from './auth-email'
import vuexStore from '@/store' // para una conversión gradual, consulta fullUserDetails

interface State {
  firstName: string
  lastName: string
  userId: number | null
}

export const useAuthUserStore = defineStore('authUser', {
  // convertir a una función
  state: (): State => ({
    firstName: '',
    lastName: '',
    userId: null
  }),
  getters: {
    // firstName getter eliminado, ya no es necesario
    fullName: (state) => `${state.firstName} ${state.lastName}`,
    loggedIn: (state) => state.userId !== null,
    // debes definir el tipo de devolución debido al uso de `this`
    fullUserDetails (state): FullUserDetails {
      // importar de otros almacenes
      const authPreferencesStore = useAuthPreferencesStore()
      const authEmailStore = useAuthEmailStore()
      return {
        ...state,
        // otros getters ahora en `this`
        fullName: this.fullName,
        ...authPreferencesStore.$state,
        ...authEmailStore.details
      }

      // alternativa si todavía hay otros módulos en Vuex
      // return {
      //   ...state,
      //   fullName: this.fullName,
      //   ...vuexStore.state.auth.preferences,
      //   ...vuexStore.getters['auth/email'].details
      // }
    }
  },
  actions: {
    // sin contexto como primer argumento, usa `this` en su lugar
    async loadUser (id: number) {
      if (this.userId !== null) throw new Error('Already logged in')
      const res = await api.user.load(id)
      this.updateUser(res)
    },
    // las mutaciones ahora pueden convertirse en acciones, en lugar de `state` como primer argumento, usa `this`
    updateUser (payload) {
      this.firstName = payload.firstName
      this.lastName = payload.lastName
      this.userId = payload.userId
    },
    // restablecer fácilmente el estado usando `$reset`
    clearUser () {
      this.$reset()
    }
  }
})
```

Desglosemos lo anterior en pasos:

1. Añade un `id` requerido para el almacén, puedes mantenerlo igual que el namespace anterior. También se recomienda asegurarse de que el `id` está en _camelCase_ ya que hace que sea más fácil de usar con `mapStores()`.
2. Convertir `state` en una función si aún no lo era
3. Convertir `getters`
    1. Elimina cualquier getter que devuelva estado con el mismo nombre (por ejemplo, `firstName: (state) => state.firstName`), no son necesarios ya que puedes acceder a cualquier estado directamente desde la instancia del almacén
    2. Si necesitas acceder a otros getters, están en `this` en lugar de utilizar el segundo argumento. Recuerda que si tú estas usando `this` entonces tendrás que utilizar una función regular en lugar de una función de flecha. Ten en cuenta también que tendrás que especificar un tipo de retorno debido a las limitaciones de TS, ver [aquí](../core-concepts/getters.md#accessing-other-getters) para más detalles
    3. Si utilizas argumentos `rootState` o `rootGetters`, reemplázalos importando directamente el otro almacén, o si todavía existen en Vuex, accede a ellos directamente desde Vuex.
4. Convertir `actions`
    1. Elimina el primer argumento `context` de cada acción. Todo debe ser accesible desde `this` en su lugar
    2. Si usas otros almacenes, impórtalos directamente o accede a ellos en Vuex, igual que para los getters
5. Convertir `mutations`
    1. Las mutaciones ya no existen. En su lugar, se pueden convertir en `actions`, o simplemente asignar directamente el almacén dentro de sus componentes (por ejemplo, `userStore.firstName = 'First'`)
    2. Si se convierte a acciones, elimina el primer argumento `state` y sustituya la asignación por `this`
    3. Una mutación común es restablecer el estado a su estado inicial. Esta funcionalidad está integrada en el método `$reset` del almacén. Ten en cuenta que esta funcionalidad sólo existe para el almacén de opciones

Como puedes ver, la mayor parte de su código puede reutilizarse. La seguridad tipográfica también debería ayudarte a identificar qué hay que cambiar si se te escapa algo.

## Uso dentro de los componentes %{#usage-inside-components}%

Ahora que tu módulo Vuex se ha convertido en un almacén de Pinia, cualquier componente u otro archivo que utilice ese módulo necesita ser actualizado también.

Si estabas usando asistentes `map` de Vuex, merece la pena mirar la [Utilización sin la guía setup()](./options-api.md) ya que la mayoría de esos asistentes pueden reutilizarse.

Si estabas usando `useStore` entonces importa el nuevo almacén directamente y accede al estado en él. Por ejemplo:

```ts
// Vuex
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()

    const firstName = computed(() => store.state.auth.user.firstName)
    const fullName = computed(() => store.getters['auth/user/fullName'])

    return {
      firstName,
      fullName
    }
  }
})
```

```ts
// Pinia
import { defineComponent, computed } from 'vue'
import { useAuthUserStore } from '@/stores/auth-user'

export default defineComponent({
  setup () {
    const authUserStore = useAuthUserStore()

    const firstName = computed(() => authUserStore.firstName)
    const fullName = computed(() => authUserStore.fullName)

    return {
      // también puede acceder a todo el almacén en su componente retornandolo
      authUserStore,
      firstName,
      fullName
    }
  }
})
```

## Uso fuera de los componentes %{#usage-outside-components}%

Actualizar el uso fuera de los componentes debería ser sencillo siempre y cuando tengas cuidado de _no usar un almacén fuera de las funciones_. Aquí hay un ejemplo de uso del almacén en un guardia de navegación Vue Router:

```ts
// Vuex
import vuexStore from '@/store'

router.beforeEach((to, from, next) => {
  if (vuexStore.getters['auth/user/loggedIn']) next()
  else next('/login')
})
```

```ts
// Pinia
import { useAuthUserStore } from '@/stores/auth-user'

router.beforeEach((to, from, next) => {
  // ¡Debe utilizarse dentro de la función!
  const authUserStore = useAuthUserStore()
  if (authUserStore.loggedIn) next()
  else next('/login')
})
```

Más información [aquí](../core-concepts/outside-component-usage.md).

## Uso avanzado de Vuex %{#advanced-vuex-usage}%

En el caso de que tu almacén Vuex utiliza algunas de las características más avanzadas que ofrece, aquí tienes una guía sobre cómo lograr lo mismo en Pinia. Algunos de estos puntos ya están cubiertos en [este resumen comparativo](../introduction.md#comparison-with-vuex-3-x-4-x).

### Módulos dinámicos %{#dynamic-modules}%

No es necesario registrar módulos dinámicamente en Pinia. Los almacenes son dinámicos por diseño y sólo se registran cuando se necesitan. Si un almacén nunca se utiliza, nunca será "registrado".

### Sustitución de módulos en caliente %{#hot-module-replacement}%

Sustitución de módulos en caliente también es compatible, pero tendrá que ser sustituido, consulte la [Guía Sustitución de módulos en caliente](./hot-module-replacement.md).

### Plugins %{#plugins}%

Si utilizas un plugin público de Vuex, compruebe si existe una alternativa Pinia. Si no, tendrás que escribir el tuyo propio o evaluar si el plugin sigue siendo necesario.

Si has escrito un plugin propio, es probable que puedas actualizarlo para que funcione con Pinia. Consulta la [Guía de plugins](../core-concepts/plugins.md).
