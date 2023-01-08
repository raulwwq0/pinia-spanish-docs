# Migración desde 0.x (v1) a v2

¡A partir de la versión `2.0.0-rc.4`, pinia soporta tanto Vue 2 como Vue 3! Esto significa que todas las nuevas actualizaciones se aplicarán a esta versión 2 para que tanto los usuarios de Vue 2 como los de Vue 3 puedan beneficiarse de ella. Si estás usando Vue 3, esto no cambia nada para ti ya que ya estabas usando el rc y puedes revisar [CHANGELOG](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md) para una explicación detallada de todo lo que cambió. ¡Si no, **esta guía es para ti**!

## Depreciaciones

Echemos un vistazo a todos los cambios que necesitas aplicar a tu código. En primer lugar, asegúrese de que ya está ejecutando la última versión 0.x para ver cualquier depreciacion:

```shell
npm i 'pinia@^0.x.x'
# o con yarn
yarn add 'pinia@^0.x.x'
```

Si estás usando ESLint, considera usar [este plugin](https://github.com/gund/eslint-plugin-deprecation) para encontrar todos los usos obsoletos. De lo contrario, deberías poder verlos tal y como aparecen cruzados. Estas son las APIs que estaban obsoletas y que fueron eliminadas:

- `createStore()` becomes `defineStore()`
- In subscriptions, `storeName` becomes `storeId`
- `PiniaPlugin` was renamed `PiniaVuePlugin` (Pinia plugin for Vue 2)
- `$subscribe()` no longer accepts a _boolean_ as second parameter, pass an object with `detached: true` instead.
- Pinia plugins no longer directly receive the `id` of the store. Use `store.$id` instead.

## Breaking changes

After removing these, you can upgrade to v2 with:

```shell
npm i 'pinia@^2.x.x'
# or with yarn
yarn add 'pinia@^2.x.x'
```

And start updating your code.

### Generic Store type

Added in [2.0.0-rc.0](https://github.com/vuejs/pinia/blob/v2/packages/pinia/CHANGELOG.md#200-rc0-2021-07-28)

Replace any usage of the type `GenericStore` with `StoreGeneric`. This is the new generic store type that should accept any kind of store. If you were writing functions using the type `Store` without passing its generics (e.g. `Store<Id, State, Getters, Actions>`), you should also use `StoreGeneric` as the `Store` type without generics creates an empty store type.

```diff
-function takeAnyStore(store: Store) {}
+function takeAnyStore(store: StoreGeneric) {}

-function takeAnyStore(store: GenericStore) {}
+function takeAnyStore(store: StoreGeneric) {}
```

## `DefineStoreOptions` for plugins

If you were writing plugins, using TypeScript, and extending the type `DefineStoreOptions` to add custom options, you should rename it to `DefineStoreOptionsBase`. This type will apply to both setup and options stores.

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

## `PiniaStorePlugin` was renamed

The type `PiniaStorePlugin` was renamed to `PiniaPlugin`.

```diff
-import { PiniaStorePlugin } from 'pinia'
+import { PiniaPlugin } from 'pinia'

-const piniaPlugin: PiniaStorePlugin = () => {
+const piniaPlugin: PiniaPlugin = () => {
   // ...
 }
```

**Note this change can only be done after upgrading to the latest version of Pinia without deprecations**.

## `@vue/composition-api` version

Since pinia now relies on `effectScope()`, you must use at least the version `1.1.0` of `@vue/composition-api`:

```shell
npm i @vue/composition-api@latest
# or with yarn
yarn add @vue/composition-api@latest
```

## webpack 4 support

If you are using webpack 4 (Vue CLI uses webpack 4), you might encounter an error like this:

```
ERROR  Failed to compile with 18 errors

 error  in ./node_modules/pinia/dist/pinia.mjs

Can't import the named export 'computed' from non EcmaScript module (only default export is available)
```

This is due to the modernization of dist files to support native ESM modules in Node.js. Files are now using the extension `.mjs` and `.cjs` to let Node benefit from this. To fix this issue you have two possibilities:

- If you are using Vue CLI 4.x, upgrade your dependencies. This should include the fix below.
  - If upgrading is not possible for you, add this to your `vue.config.js`:
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
- If you are manually handling webpack, you will have to let it know how to handle `.mjs` files:
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

## Devtools

Pinia v2 no longer hijacks Vue Devtools v5, it requires Vue Devtools v6. Find the download link on the [Vue Devtools documentation](https://devtools.vuejs.org/guide/installation.html#chrome) for the **beta channel** of the extension.

## Nuxt

If you are using Nuxt, pinia has now it's dedicated Nuxt package 🎉. Install it with:

```shell
npm i @pinia/nuxt
# or with yarn
yarn add @pinia/nuxt
```

Also make sure to **update your `@nuxtjs/composition-api` package**.

Then adapt your `nuxt.config.js` and your `tsconfig.json` if you are using TypeScript:

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

It is also recommended to give [the dedicated Nuxt section](../ssr/nuxt.md) a read.
