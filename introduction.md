# Introducción %{#introduction}%

<VueSchoolLink
  href="https://vueschool.io/lessons/introduction-to-pinia"
  title="Comienza con Pinia"
/>

Pinia [comenzó](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e) como un experimento para rediseñar el como se vería un almacén de Vue con la [API de composición](https://github.com/vuejs/composition-api) allá por noviembre de 2019. Desde entonces, los principios básicos se han mantenido igual, pero Pinia funciona para Vue 2 y Vue 3 **y no es necesario hacer uso de la API de composición**. La API es igual para ambos excepto para _instalarlo_ y _SSR_, y esta documentación se enfoca en Vue 3 **con notas sobre Vue 2** cuando sea necesario ¡para que pueda ser leído por usuarios de Vue 2 y Vue 3!

## ¿Por qué debería usar Pinia? %{#why-should-i-use-pinia}%

Pinia es una librería de almacenes para Vue que te permite compartir el estado entre los distintos componentes/páginas. Si estás familiarizado con la API de composición probablemente estarás pensando que ya puedes compartir un estado global con un simple `export const state = reactive({})`. Esto es cierto para aplicaciones de una sola página (SPA) pero **expone to aplicación a [vulnerabilidades de seguridad](https://vuejs.org/guide/scaling-up/ssr.html#cross-request-state-pollution)** si es renderizada en el lado del servidor. Pero incluso en aplicaciones de una sola página pequeñas obtienes mucho al usar Pinia:

- Soporte para las Herramientas de Desarrollo
  - Una línea del tiempo para seguir acciones o mutaciones
  - Los almacenes aparecen en los componentes donde son usadas
  - Permite volver a un punto anterior y depurar fácilmente
- Sustitución de módulos en caliente
  - Modifica tus almacenes sin recargar la página
  - Mantén cualquier estado existente mientras desarrollas
- Plugins: amplía las características de Pinia con plugins
- Soporte apropiado para TypeScript o **autocompletado** para usuarios de JS
- Soporte para Renderizado del Lado del Servidor (SSR)

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

## Ejemplos básicos %{#basic-example}%

Así es como se ve usar Pinia en términos de API (asegúrate de mirar el [Cómo Empezar](./getting-started.md) para instrucciones más detalladas). Tienes que empezar creando un almacén:

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

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

counter.count++
// con autocompletado ✨
counter.$patch({ count: counter.count + 1 })
// o usando una acción en su lugar
counter.increment()
</script>

<template>
  <!-- Accede al estado desde el almacén directamente -->
  <div>Current Count: {{ counter.count }}</div>
</template>
```

Incluso puedes usar una función (parecida al `setup()` de un componente) para definir un almacén para casos más avanzados de uso:

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

Si aún no manejas `setup()` y la API de composición no te preocupes, Pinia también soporta un set similar a [_map helpers_ como Vuex](https://vuex.vuejs.org/guide/state.html#the-mapstate-helper). Define almacenes como antes pero luego usa `mapStores()`, `mapState()` o `mapActions()`:

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

export default defineComponent({
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
})
```

Podrás encontrar más información sobre cada _map helper_ en los conceptos básicos.

## Por qué _Pinia_ %{#why-pinia}%

Pinia (pronunciado `/piːnjʌ/`, como "peenya" en inglés) es la palabra más cercana a _piña_ válida para el nombre de un paquete. Una piña es en realidad un grupo de flores individuales que unen para crear una fruta. Es parecido a los almacenes, cada una se crea individualmente pero al final están todas conectadas. También es una deliciosa fruta tropical originaria de Sudamérica.

## Un ejemplo más realista %{#a-more-realistic-example}%

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
      // ¡autocompletado! ✨
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
        // llama a otros getters con autocompletado ✨
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

## Comparación con Vuex %{#comparison-with-vuex}%

Pinia comenzó como una aproximación de como sería la próxima versión de Vuex, incorporando muchas ideas de las discusiones del equipo principal para Vuex 5. Finalmente nos dimos cuenta que Pinia ya implementaba gran parte de lo que queríamos en Vuex 5 y se decidió convertirlo en la nueva recomendación en su lugar.

Comparado con Vuex, Pinia proporciona una API más simple con menos decoraciones, ofrece API siguiendo el estilo de la API de composición y, lo más importante, tiene una sólida deducción de tipos cuando es usado con TypeScript.

### RFCs %{#rfcs}%

Inicialmente Pinia no pasó por ningún proceso de RFC. He probado ideas basadas en mi experiencia desarrollando aplicaciones, leyendo el código de otras personas, trabajando para clientes que usan Pinia y respondiendo preguntas en Discord. Esto me permitió ofrecer una solución que funciona y está adaptada a una variedad de casos y tamaños de aplicaciones. A veces solía publicar y hacía que la librería evolucionase mientras mantenía su API central a la vez.

Ahora que Pinia se ha convertido en la solución para manejar el estado por defecto está sujeto a los mismos procesos RFC del resto de librerías principales del ecosistema de Vue y su API ha entrado en un estado estable.

### Comparación con Vuex 3.x/4.x %{#comparison-with-vuex-3-x-4-x}%

> Vuex 3.x es Vuex para Vue 2 mientras que Vuex 4.x es para Vue 3

La API de Pinia es muy diferente a la de Vuex ≤4, concretamente:

- Las _mutaciones_ ya no existen. A veces era percibidas como **_demasiado_ verbosas**. Inicialmente traían integración con las herramientas de desarrollo, pero ya no es un problema.
- No hay necesidad de crear wrappers personalizados para soportar TypeScript, ya que todo está tipado y la API está diseñada para aprovechar la deducción de tipos de TS tanto como sea posible.
- No más cadenas mágicas para inyectar, importar funciones o llamarlas, ¡disfruta del autocompletado!
- No es necesario añadir almacenes dinámicamente, todas son dinámicas por defecto y sin que te enteres. Cabe aclarar que puedes usar un almacén para registrarla cuando quieras, pero al ser automático no tienes que preocuparte por ello.
- Se acabó el estructuramiento anidado de _módulos_. Aún puedes anidar almacenes implícitamente si lo importas y lo _usas_ dentro de otro, pero Pinia ofrece un un diseño de estructuramiento plano a la vez que permite la composición cruzada entre almacenes. **Incluso puedes tener dependencias circulares de almacenes**.
- Sin _módulos con espacio de nombre_. Dada la arquitectura plana de los almacenes, los "almacenes con espacio de nombre" es heredado de la forma en que se definen y se podría decir que todos los almacenes tienen un espacio de nombre.

Para más instrucciones más detallas sobre como convertir un proyecto existente con Vuex ≤4 para usar Pinia mira la [Guía de Migración desde Vuex ≤4](./cookbook/migration-vuex.md)
