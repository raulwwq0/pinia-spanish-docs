# Introducción

<VueSchoolLink
  href="https://vueschool.io/lessons/introduction-to-pinia"
  title="Comienza con Pinia"
/>

Pinia [comenzó](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e) como un experimento para rediseñar el como se vería una Store de Vue con [Composition API](https://github.com/vuejs/composition-api) allá por noviembre de 2019. Desde entonces, los principios básicos se han mantenido igual, pero Pinia funciona para Vue 2 y Vue 3 **y no es necesario hacer uso de Composition API**. La API es igual para ambos excepto para _instalarlo_ y _SSR_, y esta documentación se enfoca en Vue 3 **con notas sobre Vue 2** cuando sea necesario ¡para que pueda ser leído por usuarios de Vue 2 y Vue 3!

## ¿Por qué debería usar Pinia?

Pinia es una librería de stores para Vue que te permite compartir el estado entre los distintos componentes/páginas. Si estás familiarizado con Composition API probablemente estarás pensando que ya puedes compartir un estado global con un simple `export const state = reactive({})`. Esto es cierto para aplicaciones de una sola página (SPA) pero **expone to aplicación a [vulnerabilidades de seguridad](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)** si es renderizada en el lado del servidor. Pero incluso en aplicaciones de una sola página pequeñas obtienes mucho al usar Pinia:

- Soporte para las Herramientas de Desarrollo
  - Una línea del tiempo para seguir acciones o mutaciones
  - Las Stores aparecen en los componentes donde son usadas
  - Permite volver a un punto anterior y depurar fácilmente
- Sustitución de módulos en caliente
  - Modifica tus stores sin recargar la página
  - Mantén cualquier estado existente mientras desarrollas
- Plugins: amplía las características de Pinia con plugins
- Soporte apropiado para TypeScript o **auto-completado** para usuarios de JS
- Soporte para Renderización del Lado del Servidor (SSR)

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

## Ejemplos básicos

Así es como como se ve usar Pinia en términos de API (asegurate de mirar [Como Empezar](./getting-started.md) para instrucciones más detalladas). Tienes que empezar creando una store:

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // también se puede definir como
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```
Y luego _úsala_ en un componente:

```js
import { useCounterStore } from '@/stores/counter'

export default {
  setup() {
    const counter = useCounterStore()

    counter.count++
    // con auto-completado ✨
    counter.$patch({ count: counter.count + 1 })
    // o usando un método en su lugar
    counter.increment()
  },
}
```
Incluso puedes usar una función (parecida al `setup()` de un componente) para definir una Store para casos más avanzados de uso:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

Si aún no manejas `setup()` y Composition API no te preocupes, Pinia también soporta un set similar a [_map helpers_ como Vuex](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper). Define stores como antes pero luego usa `mapStores()`, `mapState()` o `mapActions()`:

```js {22,24,28}
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

const useUserStore = defineStore('user', {
  // ...
})

export default {
  computed: {
    // otras propiedades computadas
    // ...
    // da acceso a this.counterStore y this.userStore
    ...mapStores(useCounterStore, useUserStore),
    // da acceso de lectura a this.count y this.double
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // da acceso a this.increment()
    ...mapActions(useCounterStore, ['increment']),
  },
}
```

Encotrarás más información sobre cada _map helper_ en los conceptos básicos.

## Por qué _Pinia_

Pinia (pronunciado `/piːnjʌ/`, como "peenya" en inglés) es la palabra más cercana a _piña_ válida para el nombre de un paquete. Una piña es en realidad un grupo de flores individuales que unen para crear una fruta. Es parecido a las stores, cada una se crea individualmente pero al final están todas conectadas. También es una deliciosa fruta tropical originaria de Sudamérica.

## Un ejemplo más realista

Aquí tienes un ejemplo más complejo del API que estarás usando con Pinia **con tipos incluso en JavaScript**. Para algunas personas esto debería bastar para empezar sin continuar leyendo, pero recomendamos mirar el resto de la documentación o incluso saltarse este ejemplo y volver cuando se haya leído todos los _Conceptos Básicos_.

```js
import { defineStore } from 'pinia'

export const useTodos = defineStore('todos', {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    // el tipo número será deducido automáticamente
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // ¡auto-completado! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // llama a otros getters con auto-completado ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // cualquier cantidad de argumentos, devuelve o no una promesa
    addTodo(text) {
      // puedes mutar el estado directamente
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
```

## Comparación con Vuex

Pinia comenzó como una aproximación de como sería la próxima versión de Vuex, incorporando muchas ideas de las discusiones del equipo principal para Vuex 5. Finalmente nos dimos cuenta que Pinia ya implementaba gran parte de lo que queríamos en Vuex 5 y se decidió convertirlo en la nueva recomendación en su lugar.

Comparado con Vuex, Pinia proporciona una API más simple con menos decoraciones, ofrece API siguiendo el estilo de Composition API y, lo más importante, tiene una sólida deducción de tipos cuando es usado con TypeScript.

### RFCs

Initially Pinia didn't go through any RFC process. I tested out ideas based on my experience developing applications, reading other people's code, working for clients who use Pinia, and answering questions on Discord.
This allowed me to provide a solution that works and is adapted to a variety of cases and application sizes. I used to publish often and made the library evolve while keeping its core API the same.

Now that Pinia has become the default state management solution, it is subject to the same RFC process as other core libraries in the Vue ecosystem and its API has entered a stable state.

### Comparación con Vuex 3.x/4.x

> Vuex 3.x es Vuex para Vue 2 mientras que Vuex 4.x es para Vue 3

La API de Pinia es muy diferente a la de Vuex ≤4, concretamente:

- Las _mutaciones_ ya no existen. A veces era percibidas como **_demasiado_ verbosas**. Inicialmente traían integración con las herramientas de desarrollo, pero ya no es un problema.
- No hay necesidad de crear wrappers personalizados para soportar TypeScript, ya que todo está tipado y la API está diseñada para aprovechar la deducción de tipos de TS tanto como sea posible.
- No más cadenas mágicas para inyectar, importar funciones o llamarlas, ¡disfruta del auto-completado!

- No need to dynamically add stores, they are all dynamic by default and you won't even notice. Note you can still manually use a store to register it whenever you want but because it is automatic you don't need to worry about it.
- No more nested structuring of _modules_. You can still nest stores implicitly by importing and _using_ a store inside another but Pinia offers a flat structuring by design while still enabling ways of cross composition among stores. **You can even have circular dependencies of stores**.
- No _namespaced modules_. Given the flat architecture of stores, "namespacing" stores is inherent to how they are defined and you could say all stores are namespaced.

For more detailed instructions on how to convert an existing Vuex ≤4 project to use Pinia, see the [Migration from Vuex Guide](./cookbook/migration-vuex.md).
