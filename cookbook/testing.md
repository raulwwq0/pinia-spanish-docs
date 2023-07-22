# Probar almacenes %{#testing-stores}%

Los almacenes, por su diseño, se utilizarán en muchos lugares y pueden hacer que las pruebas sean mucho más difíciles de lo que deberían. Afortunadamente, esto no tiene por qué ser así. Tenemos que tener cuidado de tres cosas al probar almacenes:

- La instancia `pinia`: Los almacenes no pueden funcionar sin ella
- `actions`: La mayoría de las veces contienen la lógica más compleja del almacén. ¿No sería bueno si pudieran burlarse de ellos por defecto?
- Plugins: Si dependes de plugins, tendrás que instalarlos también para las pruebas

Dependiendo de qué o cómo se realicen las pruebas, debemos ocuparnos de estos tres aspectos de forma diferente:

- [Probar almacenes](#testing-stores)
  - [Pruebas unitarias de un almacén](#unit-testing-a-store)
  - [Componentes de las pruebas unitarias](#unit-testing-components)
    - [Estado inicial](#initial-state)
    - [Personalizar el comportamiento de las acciones](#customizing-behavior-of-actions)
    - [Especificación de la función createSpy](#specifying-the-createspy-function)
    - [Simular getters](#mocking-getters)
    - [Plugins de Pinia](#pinia-plugins)
  - [Pruebas E2E](#e2e-tests)
  - [Componentes de pruebas unitarias (Vue 2)](#unit-test-components-vue-2)

## Pruebas unitarias de un almacén %{#unit-testing-a-store}%

Para probar unitariamente un almacén, la parte más importante es crear una instancia de `pinia`:

```js
// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from '../src/stores/counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // crea una Pinia nueva y la activa para que se elija automáticamente
    // por cualquier llamada a useStore() sin tener que pasarla:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('increments', () => {
    const counter = useCounterStore()
    expect(counter.n).toBe(0)
    counter.increment()
    expect(counter.n).toBe(1)
  })

  it('increments by amount', () => {
    const counter = useCounterStore()
    counter.increment(10)
    expect(counter.n).toBe(10)
  })
})
```

Si tienes algún plugin del almacén, hay una cosa importante que debes saber: **los plugins no se utilizarán hasta que `pinia` esté instalado en una aplicación**. Esto se puede solucionar creando una aplicación vacía o una falsa:

```js
import { setActivePinia, createPinia } from 'pinia'
import { createApp } from 'vue'
import { somePlugin } from '../src/stores/plugin'

// mismo código que arriba...

// no es necesario crear una aplicación por prueba
const app = createApp({})
beforeEach(() => {
  const pinia = createPinia().use(somePlugin)
  app.use(pinia)
  setActivePinia(pinia)
})
```

## Componentes de las pruebas unitarias %{#unit-testing-components}%

Esto se puede lograr con `createTestingPinia()`, que devuelve una instancia pinia diseñada para ayudar a los componentes de pruebas unitarias.

Empieza instalando `@pinia/testing`:

```shell
npm i -D @pinia/testing
```

Y asegúrese de crear una pinia de prueba en sus pruebas cuando monte un componente:

```js
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
// importar cualquier almacén con la que desees interactuar en las pruebas
import { useSomeStore } from '@/stores/myStore'

const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia()],
  },
})

const store = useSomeStore() // ¡utiliza la pinia de pruebas!

// el estado puede manipularse directamente
store.name = 'my new name'
// también se puede hacer a través de patch
store.$patch({ name: 'new name' })
expect(store.name).toBe('new name')

// las acciones están bloqueadas por defecto, lo que significa que no ejecutan su código por defecto.
// Consulta más abajo para personalizar este comportamiento.
store.someAction()

expect(store.someAction).toHaveBeenCalledTimes(1)
expect(store.someAction).toHaveBeenLastCalledWith()
```

Ten en cuenta que si utilizas Vue 2, `@vue/test-utils` requiere una [configuración ligeramente diferente](#componentes-de-pruebas-unitarias-vue-2).

### Estado inicial %{#initial-state}%

Puede establecer el estado inicial de **todos sus almacenes** al crear una pinia de pruebas pasando un objeto `initialState`. Este objeto será utilizado por la pinia de pruebas para _parchear_ los almacenes cuando sean creados. Digamos que quieres inicializar el estado de este almacén:

```ts
import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 0 }),
  // ...
})
```

Dado que el almacén se llama _"counter"_, es necesario añadir un objeto coincidente a `initialState`:

```ts
// en alguna parte de tu prueba
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        initialState: {
          counter: { n: 20 }, // iniciar el counter en 20 en lugar de 0
        },
      }),
    ],
  },
})

const store = useSomeStore() // ¡utiliza la pinia de pruebas!
store.n // 20
```

### Personalizar el comportamiento de las acciones %{#customizing-behavior-of-actions}%

`createTestingPinia`  extrae todas las acciones del almacén a menos que se indique lo contrario. Esto le permite probar tus componentes y almacenes por separado.

Si deseas revertir este comportamiento y ejecutar normalmente sus acciones durante las pruebas, especifique `stubActions: false` al llamar a `createTestingPinia`:

```js
const wrapper = mount(Counter, {
  global: {
    plugins: [createTestingPinia({ stubActions: false })],
  },
})

const store = useSomeStore()

// Ahora esta llamada EJECUTARÁ la implementación definida por el almacén
store.someAction()

// ...pero sigue envuelto con un espía, así que puedes inspeccionar las llamadas
expect(store.someAction).toHaveBeenCalledTimes(1)
```

### Especificación de la función createSpy %{#specifying-the-createspy-function}%

Cuando se utiliza Jest, o vitest con `globals: true`, `createTestingPinia` automáticamente las acciones stubs usan la funciones espía en base a framework de pruebas existente (`jest.fn` o `vitest.fn`). Si estás utilizando un framework diferente, tendrás que proporcionar una opción [createSpy](/api/interfaces/pinia_testing.TestingOptions.html#createspy):

```js
import sinon from 'sinon'

createTestingPinia({
  createSpy: sinon.spy, // usa el espía de sinon para envolver acciones
})
```

Puede encontrar más ejemplos en [las pruebas del paquete de pruebas](https://github.com/vuejs/pinia/blob/v2/packages/testing/src/testing.spec.ts).

### Simular getters %{#mocking-getters}%

Por defecto, cualquier getter se calculará como un uso normal, pero puedes forzar manualmente un valor estableciendo el getter a lo que quieras:

```ts
import { defineStore } from 'pinia'
import { createTestingPinia } from '@pinia/testing'

const useCounterStore = defineStore('counter', {
  state: () => ({ n: 1 }),
  getters: {
    double: (state) => state.n * 2,
  },
})

const pinia = createTestingPinia()
const counter = useCounterStore(pinia)

counter.double = 3 // 🪄 los getters sólo se pueden escribir en las pruebas

// establecer a undefined para restablecer el comportamiento por defecto
// @ts-expect-error: generalmente es un número
counter.double = undefined
counter.double // 2 (=1 x 2)
```

### Plugins de Pinia %{#pinia-plugins}%

Si tienes algún plugin de pinia, asegúrate de pasarlo cuando llames a `createTestingPinia()` para que se apliquen correctamente. **No los añadas con `testingPinia.use(MyPlugin)`** como lo harías con una pinia normal:

```js
import { createTestingPinia } from '@pinia/testing'
import { somePlugin } from '../src/stores/plugin'

// dentro de alguna prueba
const wrapper = mount(Counter, {
  global: {
    plugins: [
      createTestingPinia({
        stubActions: false,
        plugins: [somePlugin],
      }),
    ],
  },
})
```

## Pruebas E2E %{#e2e-tests}%

Cuando se trata de pinia, no necesitas cambiar nada para las pruebas e2e, ¡ese es todo el punto de las pruebas e2e! Tal vez podría probar las peticiones HTTP, pero eso está mucho más allá del alcance de esta guía 😄.

## Componentes de pruebas unitarias (Vue 2) %{#unit-test-components-vue-2}%

Cuando utilices [Vue Test Utils 1](https://v1.test-utils.vuejs.org/), instala Pinia en un `localVue`:

```js
import { PiniaVuePlugin } from 'pinia'
import { createLocalVue, mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

const localVue = createLocalVue()
localVue.use(PiniaVuePlugin)

const wrapper = mount(Counter, {
  localVue,
  pinia: createTestingPinia(),
})

const store = useSomeStore() // ¡utiliza la pinia de pruebas!
```
