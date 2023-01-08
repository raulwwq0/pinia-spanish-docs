# Migración desde 0.x (v1) a v2 {#migrating-from-0-x-v1-to-v2}

¡A partir de la versión `2.0.0-rc.4`, pinia soporta tanto Vue 2 como Vue 3! Esto significa que todas las nuevas actualizaciones se aplicarán a esta versión 2 para que tanto los usuarios de Vue 2 como los de Vue 3 puedan beneficiarse de ella. Si estás usando Vue 3, esto no cambia nada para ti ya que ya estabas usando el rc y puedes revisar [CHANGELOG](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md) para una explicación detallada de todo lo que cambió. ¡Si no, **esta guía es para ti**!

## Depreciaciones {#deprecations}

Echemos un vistazo a todos los cambios que necesitas aplicar a tu código. En primer lugar, asegúrese de que ya está ejecutando la última versión 0.x para ver cualquier depreciacion:

```shell
npm i 'pinia@^0.x.x'
# o con yarn
yarn add 'pinia@^0.x.x'
```

Si estás usando ESLint, considera usar [este plugin](https://github.com/gund/eslint-plugin-deprecation) para encontrar todos los usos obsoletos. De lo contrario, deberías poder verlos tal y como aparecen cruzados. Estas son las APIs que estaban obsoletas y que fueron eliminadas:

- `createStore()` se convierte en `defineStore()`
- En suscripciones, `storeName` se convierte en `storeId`
- `PiniaPlugin` pasó a llamarse `PiniaVuePlugin` (Plugin Pinia para Vue 2)
- `$subscribe()` ya no acepta un _boolean_ como segundo parámetro, En su lugar, pasa un objeto con `detached: true`.
- Los plugins de Pinia ya no reciben directamente el `id` del almacén. Utiliza `store.$id` en su lugar.

## Cambios importantes {#breaking-changes}

Después de eliminar estos, puedes actualizar a la v2 con:

```shell
npm i 'pinia@^2.x.x'
# o con yarn
yarn add 'pinia@^2.x.x'
```

Y empieza a actualizar tu código.

### Tipo de almacén genérico {#generic-store-type}

Agregado en [2.0.0-rc.0](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md#200-rc0-2021-07-28)

Sustituya cualquier uso del tipo `GenericStore` por `StoreGeneric`. Este es el nuevo tipo de almacén genérico que debería aceptar cualquier tipo de almacén. Si estabas escribiendo funciones usando el tipo `Store` sin pasar sus genéricos (por ejemplo `Store<Id, State, Getters, Actions>`), deberías usar también `StoreGeneric` ya que el tipo `Store` sin genéricos crea un tipo store vacío.

```diff
-function takeAnyStore(store: Store) {}
+function takeAnyStore(store: StoreGeneric) {}

-function takeAnyStore(store: GenericStore) {}
+function takeAnyStore(store: StoreGeneric) {}
```

## `DefineStoreOptions` para plugins {#definestoreoptions-for-plugins}

Si estuvieras escribiendo plugins, usando TypeScript, y extendiendo el tipo `DefineStoreOptions` para añadir opciones personalizadas, deberías renombrarlo a `DefineStoreOptionsBase`. Este tipo se aplicará tanto a los almacenes de configuración como a los de opciones.

```diff
 declare module 'pinia' {
-  export interface DefineStoreOptions<S, Store> {
+  export interface DefineStoreOptionsBase<S, Store> {
     debounce?: {
       [k in keyof StoreActions<Store>]?: number
     }
   }
 }
```

## `PiniaStorePlugin` ha cambiado de nombre {#piniastoreplugin-was-renamed}

El tipo `PiniaStorePlugin` ha cambiado de nombre a `PiniaPlugin`.

```diff
-import { PiniaStorePlugin } from 'pinia'
+import { PiniaPlugin } from 'pinia'

-const piniaPlugin: PiniaStorePlugin = () => {
+const piniaPlugin: PiniaPlugin = () => {
   // ...
 }
```

**Tenga en cuenta que este cambio sólo se puede hacer después de actualizar a la última versión de Pinia sin depreciaciones**.

## Versión `@vue/composition-api` {#vue-composition-api-version}

Como pinia depende ahora de `effectScope()`, debes usar al menos la versión `1.1.0` de `@vue/composition-api`:

```shell
npm i @vue/composition-api@latest
# o con yarn
yarn add @vue/composition-api@latest
```

## soporte con webpack 4 {#webpack-4-support}

Si estás usando webpack 4 (Vue CLI usa webpack 4), puedes encontrar un error como este:

```
ERROR  Failed to compile with 18 errors

 error  in ./node_modules/pinia/dist/pinia.mjs

Can't import the named export 'computed' from non EcmaScript module (only default export is available)
```

Esto se debe a la modernización de los archivos dist para soportar módulos ESM nativos en Node.js.  Los archivos utilizan ahora la extensión `.mjs` y `.cjs` para que Node se beneficie de ello. Para solucionar este problema tienes dos posibilidades:

- Si estás utilizando Vue CLI 4.x, actualiza sus dependencias. Esto debería incluir la siguiente corrección.
  - Si la actualización no es posible para ti, añade esto a `vue.config.js`:
    ```js
    // vue.config.js
    module.exports = {
      configureWebpack: {
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto',
            },
          ],
        },
      },
    }
    ```
- Si estás manejando manualmente webpack, tendrás que hacerle saber cómo manejar los archivos `.mjs`:
  ```js
  // webpack.config.js
  module.exports = {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  }
  ```

## Devtools {#devtools}

Pinia v2 ya no utiliza Vue Devtools v5, se requiere Vue Devtools v6. Encuentra el enlace de descarga en la [documentación de Vue Devtools](https://devtools.vuejs.org/guide/installation.html#chrome) para el **canal beta** de la extensión.

## Nuxt

Si estás utilizando Nuxt, pinia tiene ahora su paquete Nuxt específico 🎉. Instálalo con:

```shell
npm i @pinia/nuxt
# o con yarn
yarn add @pinia/nuxt
```

Asegúrate también de **actualizar tu paquete `@nuxtjs/composition-api`**.

Luego adapta tu `nuxt.config.js` y tu `tsconfig.json` si estás usando TypeScript:

```diff
 // nuxt.config.js
 module.exports {
   buildModules: [
     '@nuxtjs/composition-api/module',
-    'pinia/nuxt',
+    '@pinia/nuxt',
   ],
 }
```

```diff
 // tsconfig.json
 {
   "types": [
     // ...
-    "pinia/nuxt/types"
+    "@pinia/nuxt"
   ]
 }
```

También se recomienda leer [la sección dedicada a Nuxt](../ssr/nuxt.md).
