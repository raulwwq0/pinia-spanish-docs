# HMR (Sustitución de módulos en caliente) {#hmr-hot-module-replacement}

Pinia soporta el reemplazo de módulos en caliente para que puedas editar tus almacenes e interactuar con ellas directamente en tu aplicación sin recargar la página, permitiéndote mantener el estado existente, añadir o incluso eliminar estados, acciones y getters.

Por el momento, sólo [Vite](https://vitejs.dev/) está oficialmente soportado, pero cualquier bundler que implemente la especificación `import.meta.hot` debería funcionar (por ejemplo, [webpack](https://webpack.js.org/api/module-variables/#importmetawebpackhot) parece utilizar `import.meta.webpackHot` en lugar de `import.meta.hot`).
Debes añadir este fragmento de código junto a cualquier declaración de almacén. Digamos que tienes tres almacenes: `auth.js`, `cart.js`, y `chat.js`, tendrás que añadir (y adaptar) esto después de la creación de la _definición del almacén_:

```js
// auth.js
import { defineStore, acceptHMRUpdate } from 'pinia'

const useAuth = defineStore('auth', {
  // opciones...
})

// asegúrate de pasar la definición del almacén correcto, `useAuth` en este caso.
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}
```
