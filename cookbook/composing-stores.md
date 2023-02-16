# Almacenes de composición %{#composing-stores}%

Componer almacenes consiste en tener almacenes que se utilicen mutuamente, y esto está soportado en Pinia. Hay una regla a seguir:

Si **dos o más almacenes se utilizan entre sí**, no pueden crear un bucle infinito a través de _getters_ o _acciones_. No pueden **ambos** leer directamente el estado del otro en su función de configuración:

```js
const useX = defineStore('x', () => {
  const y = useY()

  // ❌ Esto no es posible porque y también intenta leer x.name
  y.name

  function doSomething() {
    // ✅ Leer y propiedades computadas o acciones
    const yName = y.name
    // ...
  }

  return {
    name: ref('I am X'),
  }
})

const useY = defineStore('y', () => {
  const x = useX()

  // ❌ Esto no es posible porque x también intenta leer y.name
  x.name

  function doSomething() {
    // ✅ Leer x propiedades computadas o acciones
    const xName = x.name
    // ...
  }

  return {
    name: ref('I am Y'),
  }
})
```

## Almacenes anidados %{#nested-stores}%

Ten en cuenta que si un almacén utiliza otro almacén, puedes importar directamente y llamar a la función `useStore()` dentro de _acciones_ y _getters_. Entonces puedes interactuar con el almacén como lo harías desde dentro de un componente Vue. Ver [Getters Compartidos](#shared-getters) y [Acciones Compartidas](#shared-actions).

Cuando se trata de _establecer almacenes_, simplemente puedes usar una de los almacenes **en la parte superior** de la función del almacén:

```ts
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', () => {
  const user = useUserStore()

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${state.list.length} items in your cart. It costs ${state.price}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  return { summary, purchase }
})
```

## Getters Compartidos %{#shared-getters}%

Puedes simplemente llamar a `useOtherStore()` dentro de un _getter_:

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  getters: {
    summary(state) {
      const user = useUserStore()

      return `Hi ${user.name}, you have ${state.list.length} items in your cart. It costs ${state.price}.`
    },
  },
})
```

## Acciones Compartidas %{#shared-actions}%

Lo mismo ocurre con las _acciones_:

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        // otra acción
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```

Como las acciones pueden ser asíncronas, asegúrate que **todas las llamadas a `useStore()` aparezcan antes de cualquier `await`**. De lo contrario, esto puede llevar a usar una instancia incorrecta de pinia _en aplicaciones SSR_:

```js{7-8,11-13}
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      // ✅ llamada en la parte superior de la acción antes de 
      // cualquier `await`
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        // ❌ llamada después de una sentencia `await`
        const otherStore = useOtherStore()
        // otra acción
        this.emptyCart()
      } catch (err) {
        displayError(err)
      }
    },
  },
})
```
