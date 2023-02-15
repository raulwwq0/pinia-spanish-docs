---
editLink: false
---

[Documentación de la API](../index.md) / [@pinia/nuxt](../modules/pinia_nuxt.md) / ModuleOptions

# Interfaz: ModuleOptions %{#interface-moduleoptions}%

[@pinia/nuxt](../modules/pinia_nuxt.md).ModuleOptions

## Propiedades %{#Properties}%

### autoImports %{#Properties-autoImports}%

• `Optional` **autoImports**: (`string` \| [`string`, `string`])[]

Array de imports automáticos para ser añadidos al archivo nuxt.config.js. 

**`Example`**

```js
autoImports: [
 // importa `defineStore` automáticamente
 'defineStore',
 // importa `defineStore` como `definePiniaStore` automáticamente
 ['defineStore', 'definePiniaStore',
]
```

___

### disableVuex %{#Properties-disableVuex}%

• `Optional` **disableVuex**: `boolean`

Pinia deshabilita Vuex por defecto, pon esta opción a `false` para evitarlo
y poder usar Pinia junto con Vuex (solo Nuxt 2)

**`Default`**

`true`
