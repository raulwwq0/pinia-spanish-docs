# Uso sin `setup()`. %{#usage-without-setup}%

Pinia puede usarse incluso si no estás usando la API de composición (si estás usando Vue <2.7, todavía necesitas instalar el plugin `@vue/composition-api`). Aunque te recomendamos que pruebes la API de composición y la aprendas, puede que aún no sea el momento para ti y tu equipo, puede que estés en proceso de migrar una aplicación, o cualquier otra razón. Hay algunas funciones:

- [mapStores](#dando-acceso-a-todo-el-almacen)
- [mapState](../core-concepts/state.md#usage-with-the-options-api)
- [mapWritableState](../core-concepts/state.md#modifiable-state)
- ⚠️ [mapGetters](../core-concepts/getters.md#without-setup) (sólo para facilitar la migración, utiliza `mapState()` en su lugar)
- [mapActions](../core-concepts/actions.md#without-setup)

## Dando acceso a todo el almacén %{#giving-access-to-the-whole-store}%

Si necesitas acceder a casi todo desde el almacén, puede que sea demasiado mapear cada una de las propiedades del almacén... En su lugar, puedes acceder a todo el almacén con `mapStores()`:

```js
import { mapStores } from 'pinia'

// dados dos almacenes con los siguientes ids
const useUserStore = defineStore('user', {
  // ...
})
const useCartStore = defineStore('cart', {
  // ...
})

export default {
  computed: {
    // ten en cuenta que no estamos pasando un array, sólo un almacén después de la otro
    // cada almacén será accesible como su id + 'Store'
    ...mapStores(useCartStore, useUserStore)
  },

  methods: {
    async buyStuff() {
      // ¡usalos en cualquier lugar!
      if (this.userStore.isAuthenticated()) {
        await this.cartStore.buy()
        this.$router.push('/purchased')
      }
    },
  },
}
```

Por defecto, Pinia añadirá el sufijo `"Store"` al `id` de cada almacén. Puedes personalizar este comportamiento llamando a `setMapStoreSuffix()`:

```js
import { createPinia, setMapStoreSuffix } from 'pinia'

// eliminar completamente el sufijo: this.user, this.cart
setMapStoreSuffix('')
// this.user_store, this.cart_store (está bien, no te juzgaré)
setMapStoreSuffix('_store')
export const pinia = createPinia()
```

## TypeScript %{#typescript}%

Por defecto, todos los helpers de mapas soportan el autocompletado y no necesitas hacer nada. Si llamas a `setMapStoreSuffix()` para cambiar el sufijo `"Store"`, tendrás que añadirlo también en algún lugar de un fichero TS o de su fichero `global.d.ts`. El lugar más conveniente sería el mismo lugar donde se llama a `setMapStoreSuffix()`:

```ts
import { createPinia, setMapStoreSuffix } from 'pinia'

setMapStoreSuffix('') // eliminar completamente el sufijo
export const pinia = createPinia()

declare module 'pinia' {
  export interface MapStoresCustomization {
    // Ajústalo al mismo valor que el anterior
    suffix: ''
  }
}
```

:::warning
Si estás usando un archivo de declaración TypeScript (como `global.d.ts`), asegúrate de `importar 'pinia'` al principio del mismo para exponer todos los tipos existentes.
:::
