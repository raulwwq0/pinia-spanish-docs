---
editLink: false
outline: [2, 3]
---

[Documentación de la API](../index.md) / pinia

# Módulo: pinia %{#module-pinia}%

## Enumeraciones %{#Enumerations}%

- [MutationType](../enums/pinia.MutationType.md)

## Interfaces %{#Interfaces}%

- [DefineSetupStoreOptions](../interfaces/pinia.DefineSetupStoreOptions.md)
- [DefineStoreOptions](../interfaces/pinia.DefineStoreOptions.md)
- [DefineStoreOptionsBase](../interfaces/pinia.DefineStoreOptionsBase.md)
- [DefineStoreOptionsInPlugin](../interfaces/pinia.DefineStoreOptionsInPlugin.md)
- [MapStoresCustomization](../interfaces/pinia.MapStoresCustomization.md)
- [Pinia](../interfaces/pinia.Pinia.md)
- [PiniaCustomProperties](../interfaces/pinia.PiniaCustomProperties.md)
- [PiniaCustomStateProperties](../interfaces/pinia.PiniaCustomStateProperties.md)
- [PiniaPlugin](../interfaces/pinia.PiniaPlugin.md)
- [PiniaPluginContext](../interfaces/pinia.PiniaPluginContext.md)
- [StoreDefinition](../interfaces/pinia.StoreDefinition.md)
- [StoreProperties](../interfaces/pinia.StoreProperties.md)
- [SubscriptionCallbackMutationDirect](../interfaces/pinia.SubscriptionCallbackMutationDirect.md)
- [SubscriptionCallbackMutationPatchFunction](../interfaces/pinia.SubscriptionCallbackMutationPatchFunction.md)
- [SubscriptionCallbackMutationPatchObject](../interfaces/pinia.SubscriptionCallbackMutationPatchObject.md)
- [\_StoreOnActionListenerContext](../interfaces/pinia._StoreOnActionListenerContext.md)
- [\_StoreWithState](../interfaces/pinia._StoreWithState.md)
- [\_SubscriptionCallbackMutationBase](../interfaces/pinia._SubscriptionCallbackMutationBase.md)

## Tipado de los Alias %{#Type-Aliases}%

### PiniaStorePlugin %{#Type-Aliases-PiniaStorePlugin}%

Ƭ **PiniaStorePlugin**: [`PiniaPlugin`](../interfaces/pinia.PiniaPlugin.md)

Plugin para extender cualquier almacén.

**`Deprecado`**

usa PiniaPlugin en su lugar

___

### StateTree %{#Type-Aliases-StateTree}%

Ƭ **StateTree**: `Record`<`string` \| `number` \| `symbol`, `any`\>

Estado genérico de un almacén.

___

### Store %{#Type-Aliases-Store}%

Ƭ **Store**<`Id`, `S`, `G`, `A`\>: [`_StoreWithState`](../interfaces/pinia._StoreWithState.md)<`Id`, `S`, `G`, `A`\> & `UnwrapRef`<`S`\> & [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> & [`_ActionsTree`](pinia.md#_actionstree) extiende `A` ? {} : `A` & [`PiniaCustomProperties`](../interfaces/pinia.PiniaCustomProperties.md)<`Id`, `S`, `G`, `A`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<`S`\>

Tipo Store para crear almacenes.

#### Tipado de los parámetros %{#Type-Aliases-Store-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` = `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) = {} |
| `G` | {} |
| `A` | {} |

___

### StoreActions %{#Type-Aliases-StoreActions}%

Ƭ **StoreActions**<`SS`\>: `SS` extiende [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, infiere A\> ? `A` : [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>

Extrae las acciones de un tipo Store. Funciona con almacenes de configuración o almacenes de opciones.

#### Tipado de los parámetros %{#Type-Aliases-StoreActions-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### StoreGeneric %{#Type-Aliases-StoreGeneric}%

Ƭ **StoreGeneric**: [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\>

Versión genérica y con tipado inseguro de Store. No falla al acceder con strings, haciendo mucho más fácil escribir funciones genéricas a las que no les importa el tipo de almacén pasado.

___

### StoreGetters %{#Type-Aliases-StoreGetters}%

Ƭ **StoreGetters**<`SS`\>: `SS` extiende [`Store`](pinia.md#store)<`string`, [`StateTree`](pinia.md#statetree), infiere G, [`_ActionsTree`](pinia.md#_actionstree)\> ? [`_StoreWithGetters`](pinia.md#_storewithgetters)<`G`\> : [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>

Extrae los getters de un tipo Store. Funciona con almacenes de configuración o almacenes de opciones.

#### Tipado de los parámetros %{#Type-Aliases-StoreGetters-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### StoreOnActionListener %{#Type-Aliases-StoreOnActionListener}%

Ƭ **StoreOnActionListener**<`Id`, `S`, `G`, `A`\>: (`context`: [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extiende `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\>) => `void`

#### Tipado de los parámetros %{#Type-Aliases-StoreOnActionListener-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

#### Tipado de la declaración %{#Type-Aliases-StoreOnActionListener-Type-declaration}%

▸ (`context`): `void`

Argumentos de `store.$onAction()`

##### Parámetros %{#Type-Aliases-StoreOnActionListener-Type-declaration-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `context` | [`StoreOnActionListenerContext`](pinia.md#storeonactionlistenercontext)<`Id`, `S`, `G`, {} extiende `A` ? [`_ActionsTree`](pinia.md#_actionstree) : `A`\> |

##### Retorna %{#Type-Aliases-StoreOnActionListener-Type-declaration-Returns}%

`void`

___

### StoreOnActionListenerContext %{#Type-Aliases-StoreOnActionListenerContext}%

Ƭ **StoreOnActionListenerContext**<`Id`, `S`, `G`, `A`\>: [`_ActionsTree`](pinia.md#_actionstree) extiende `A` ? [`_StoreOnActionListenerContext`](../interfaces/pinia._StoreOnActionListenerContext.md)<[`StoreGeneric`](pinia.md#storegeneric), `string`, [`_ActionsTree`](pinia.md#_actionstree)\> : { [Name en keyof A]: Name extiende string ? \_StoreOnActionListenerContext<Store<Id, S, G, A\>, Name, A\> : never }[keyof `A`]

Objeto de contexto pasado a las callbacks de `store.$onAction(context => {})` 
POR HACER: debería tener solo el Id, el almacén y las acciones para generar el objeto correcto.

#### Tipado de los parámetros %{#Type-Aliases-StoreOnActionListenerContext-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

___

### StoreState %{#Type-Aliases-StoreState}%

Ƭ **StoreState**<`SS`\>: `SS` extiende [`Store`](pinia.md#store)<`string`, infiere S, [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> ? `UnwrapRef`<`S`\> : [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>

Extrae el estado de un tipo Store. Funciona con almacenes de configuración o almacenes de opciones. Cabe aclarar que desenvuelve las refs.

#### Tipado de los parámetros %{#Type-Aliases-StoreState-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### SubscriptionCallback %{#Type-Aliases-SubscriptionCallback}%

Ƭ **SubscriptionCallback**<`S`\>: (`mutation`: [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\>, `state`: `UnwrapRef`<`S`\>) => `void`

#### Tipado de los parámetros %{#Type-Aliases-SubscriptionCallback-Type-parameters}%

| Nombre |
| :------ |
| `S` |

#### Tipado de la declaración %{#Type-Aliases-SubscriptionCallback-Type-declaration}%

▸ (`mutation`, `state`): `void`

Callback de una suscripción

##### Parámetros %{#Type-Aliases-SubscriptionCallback-Type-declaration-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `mutation` | [`SubscriptionCallbackMutation`](pinia.md#subscriptioncallbackmutation)<`S`\> |
| `state` | `UnwrapRef`<`S`\> |

##### Retorna %{#Type-Aliases-SubscriptionCallback-Type-declaration-Returns}%

`void`

___

### SubscriptionCallbackMutation %{#Type-Aliases-SubscriptionCallbackMutation}%

Ƭ **SubscriptionCallbackMutation**<`S`\>: [`SubscriptionCallbackMutationDirect`](../interfaces/pinia.SubscriptionCallbackMutationDirect.md) \| [`SubscriptionCallbackMutationPatchObject`](../interfaces/pinia.SubscriptionCallbackMutationPatchObject.md)<`S`\> \| [`SubscriptionCallbackMutationPatchFunction`](../interfaces/pinia.SubscriptionCallbackMutationPatchFunction.md)

Objeto de contexto pasado a una callback de una suscripción.

#### Tipado de los parámetros %{#Type-Aliases-SubscriptionCallbackMutation-Type-parameters}%

| Nombre |
| :------ |
| `S` |

___

### \_ActionsTree %{#Type-Aliases-_ActionsTree}%

Ƭ **\_ActionsTree**: `Record`<`string`, [`_Method`](pinia.md#_method)\>

Tipo de un objeto de acciones. **Solo** para uso interno.

___

### \_Awaited %{#Type-Aliases-_Awaited}%

Ƭ **\_Awaited**<`T`\>: `T` extiende ``null`` \| `undefined` ? `T` : `T` extiende `object` & { `then`: (`onfulfilled`: `F`) => `any`  } ? `F` extiende (`value`: infiere V, ...`args`: `any`) => `any` ? [`_Awaited`](pinia.md#_awaited)<`V`\> : `never` : `T`

#### Tipado de los parámetros %{#Type-Aliases-_Awaited-Type-parameters}%

| Nombre |
| :------ |
| `T` |

___

### \_DeepPartial %{#Type-Aliases-_DeepPartial}%

Ƭ **\_DeepPartial**<`T`\>: { [K en keyof T]?: \_DeepPartial<T[K]\> }

`Partial<T>` recursivo. Usado por [['$patch']](pinia.md#store).

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_DeepPartial-Type-parameters}%

| Nombre |
| :------ |
| `T` |

___

### \_ExtractActionsFromSetupStore %{#Type-Aliases-_ExtractActionsFromSetupStore}%

Ƭ **\_ExtractActionsFromSetupStore**<`SS`\>: `SS` extiende `undefined` \| `void` ? {} : [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\> extiende keyof `SS` ? `Pick`<`SS`, [`_ExtractActionsFromSetupStore_Keys`](pinia.md#_extractactionsfromsetupstore_keys)<`SS`\>\> : `never`

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_ExtractActionsFromSetupStore-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### \_ExtractActionsFromSetupStore\_Keys %{#Type-Aliases-_ExtractActionsFromSetupStore_Keys}%

Ƭ **\_ExtractActionsFromSetupStore\_Keys**<`SS`\>: keyof { [K en keyof SS como SS[K] extiende \_Method ? K : never]: any }

Tipo que permite refactorizar a través del IDE. **Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_ExtractActionsFromSetupStore_Keys-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### \_ExtractGettersFromSetupStore %{#Type-Aliases-_ExtractGettersFromSetupStore}%

Ƭ **\_ExtractGettersFromSetupStore**<`SS`\>: `SS` extiende `undefined` \| `void` ? {} : [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\> extiende keyof `SS` ? `Pick`<`SS`, [`_ExtractGettersFromSetupStore_Keys`](pinia.md#_extractgettersfromsetupstore_keys)<`SS`\>\> : `never`

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_ExtractGettersFromSetupStore-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### \_ExtractGettersFromSetupStore\_Keys %{#Type-Aliases-_ExtractGettersFromSetupStore_Keys}%

Ƭ **\_ExtractGettersFromSetupStore\_Keys**<`SS`\>: keyof { [K en keyof SS como SS[K] extiende ComputedRef ? K : never]: any }

Tipo que permite refactorizar a través del IDE. **Solo** para uso interno

#### Tipado de los parámetros  %{#Type-Aliases-_ExtractGettersFromSetupStore_Keys-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### \_ExtractStateFromSetupStore %{#Type-Aliases-_ExtractStateFromSetupStore}%

Ƭ **\_ExtractStateFromSetupStore**<`SS`\>: `SS` extiende `undefined` \| `void` ? {} : [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\> extiende keyof `SS` ? [`_UnwrapAll`](pinia.md#_unwrapall)<`Pick`<`SS`, [`_ExtractStateFromSetupStore_Keys`](pinia.md#_extractstatefromsetupstore_keys)<`SS`\>\>\> : `never`

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_ExtractStateFromSetupStore-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### \_ExtractStateFromSetupStore\_Keys %{#Type-Aliases-_ExtractStateFromSetupStore_Keys}%

Ƭ **\_ExtractStateFromSetupStore\_Keys**<`SS`\>: keyof { [K en keyof SS como SS[K] extiende \_Method \| ComputedRef ? never : K]: any }

Tipo que permite refactorizar a través del IDE. **Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_ExtractStateFromSetupStore_Keys-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

___

### \_GettersTree  %{#Type-Aliases-_GettersTree}%

Ƭ **\_GettersTree**<`S`\>: `Record`<`string`, (`state`: `UnwrapRef`<`S`\> & `UnwrapRef`<[`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<`S`\>\>) => `any` \| () => `any`\>

Tipo de un objeto de Getters que infiere el argumento. **Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_GettersTree-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `S` | extiende [`StateTree`](pinia.md#statetree) |

___

### \_MapActionsObjectReturn %{#Type-Aliases-_MapActionsObjectReturn}%

Ƭ **\_MapActionsObjectReturn**<`A`, `T`\>: { [key en keyof T]: A[T[key]] }

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_MapActionsObjectReturn-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `A` | `A` |
| `T` | extiende `Record`<`string`, keyof `A`\> |

___

### \_MapActionsReturn %{#Type-Aliases-_MapActionsReturn}%

Ƭ **\_MapActionsReturn**<`A`\>: { [key en keyof A]: A[key] }

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_MapActionsReturn-Type-parameters}%

| Nombre |
| :------ |
| `A` |

___

### \_MapStateObjectReturn %{#Type-Aliases-_MapStateObjectReturn}%

Ƭ **\_MapStateObjectReturn**<`Id`, `S`, `G`, `A`, `T`\>: { [key en keyof T]: Function }

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_MapStateObjectReturn-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `T` | extiende `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> = {} |

___

### \_MapStateReturn %{#Type-Aliases-_MapStateReturn}%

Ƭ **\_MapStateReturn**<`S`, `G`, `Keys`\>: { [key en Keys]: Function }

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_MapStateReturn-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `Keys` | extiende keyof `S` \| keyof `G` = keyof `S` \| keyof `G` |

___

### \_MapWritableStateObjectReturn %{#Type-Aliases-_MapWritableStateObjectReturn}%

Ƭ **\_MapWritableStateObjectReturn**<`S`, `T`\>: { [key en keyof T]: Object }

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_MapWritableStateObjectReturn-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `T` | extiende `Record`<`string`, keyof `S`\> |

___

### \_MapWritableStateReturn %{#Type-Aliases-_MapWritableStateReturn}%

Ƭ **\_MapWritableStateReturn**<`S`\>: { [key en keyof S]: Object }

**Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_MapWritableStateReturn-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `S` | extiende [`StateTree`](pinia.md#statetree) |

___

### \_Method %{#Type-Aliases-_Method}%

Ƭ **\_Method**: (...`args`: `any`[]) => `any`

#### Tipado de la declaración %{#Type-Aliases-_Method-Type-declaration}%


▸ (`...args`): `any`

Tipo genérico para una función que infiere argumentos y retorna el tipo. **Solo** para uso interno

##### Parámetros %{#Type-Aliases-_Method-Type-declaration-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `...args` | `any`[] |

##### Retorna %{#Type-Aliases-_Method-Type-declaration-Returns}%

`any`

___

### \_Spread  %{#Type-Aliases-_Spread}%

Ƭ **\_Spread**<`A`\>: `A` extiende [infiere L, ...(infiere R)] ? [`_StoreObject`](pinia.md#_storeobject)<`L`\> & [`_Spread`](pinia.md#_spread)<`R`\> : `unknown`

**Solo** para uso interno.

#### Tipado de los parámetros %{#Type-Aliases-_Spread-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `A` | extiende readonly `any`[] |

___

### \_StoreObject %{#Type-Aliases-_StoreObject}%

Ƭ **\_StoreObject**<`S`\>: `S` extiende [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<infiere Ids, infiere State, infiere Getters, infiere Actions\> ? { [Id en \`${Ids}${MapStoresCustomization extiende Record<"suffix", infiere Suffix extiende string\> ? Suffix : "Store"}\`]: Function } : {}

**Solo** para uso interno.

#### Tipado de los parámetros %{#Type-Aliases-_StoreObject-Type-parameters}%

| Nombre |
| :------ |
| `S` |

___

### \_StoreWithActions %{#Type-Aliases-_StoreWithActions}%

Ƭ **\_StoreWithActions**<`A`\>: { [k en keyof A]: A[k] extiende Function ? Function : never }

Almacén aumentado para acciones. **Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_StoreWithActions-Type-parameters}%

| Nombre |
| :------ |
| `A` |

___

### \_StoreWithGetters %{#Type-Aliases-_StoreWithGetters}%

Ƭ **\_StoreWithGetters**<`G`\>: { readonly [k en keyof G]: G[k] extiende Function ? R : UnwrapRef<G[k]\> }

Almacén aumentado con getters. **Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_StoreWithGetters-Type-parameters}%

| Nombre |
| :------ |
| `G` |

___

### \_UnwrapAll %{#Type-Aliases-_UnwrapAll}%

Ƭ **\_UnwrapAll**<`SS`\>: { [K en keyof SS]: UnwrapRef<SS[K]\> }

Tipo que permite refactorizar a través del IDE. **Solo** para uso interno

#### Tipado de los parámetros %{#Type-Aliases-_UnwrapAll-Type-parameters}%

| Nombre |
| :------ |
| `SS` |

## Variables %{#Variables}%

### PiniaVuePlugin %{#Variables-PiniaVuePlugin}%

• `Const` **PiniaVuePlugin**: `Plugin`

Plugin de Vue 2 que tiene que ser instalado para que pinia funcione. Cabe aclarar que **no necesitas usar este plugin si estás usando Nuxt.js**. Usa `buildModule` en su lugar: https://es-pinia.vercel.app/ssr/nuxt.html.

**`Ejemplo`**

```js
import Vue from 'vue'
import { PiniaVuePlugin, createPinia } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // ...
  pinia,
})
```

**`Parámetro`**

`Vue` importado desde 'vue'.

## Funciones %{#Functions}%

### acceptHMRUpdate %{#Functions-acceptHMRUpdate}%

▸ **acceptHMRUpdate**(`initialUseStore`, `hot`): (`newModule`: `any`) => `any`

Crea una función _accept_ para pasar a `import.meta.hot` en aplicaciones de Vite.

**`Ejemplo`**

```js
const useUser = defineStore(...)
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot))
}
```

#### Parámetros %{#Functions-acceptHMRUpdate-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `initialUseStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree)\> | retona el defineStore para actualización en caliente |
| `hot` | `any` | `import.meta.hot` |

#### Retorna %{#Functions-acceptHMRUpdate-Returns}%

`fn`

▸ (`newModule`): `any`

##### Parámetros %{#Functions-acceptHMRUpdate-Returns-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `newModule` | `any` |

##### Retorna %{#Functions-acceptHMRUpdate-Returns-Returns}%

`any`

___

### createPinia %{#Functions-createPinia}%

▸ **createPinia**(): [`Pinia`](../interfaces/pinia.Pinia.md)

Crea una instancia de Pinia para ser usada por la aplicación

#### Retorna %{#Functions-createPinia-Returns}%

[`Pinia`](../interfaces/pinia.Pinia.md)

___

### defineStore %{#Functions-defineStore}%

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`id`, `options`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Crea una función `useStore` que recupera la instancia del almacén

#### Tipado de los parámetros %{#Functions-defineStore-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) = {} |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parámetros %{#Functions-defineStore-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `id` | `Id` | id del almacén (tiene que se único) |
| `options` | `Omit`<[`DefineStoreOptions`](../interfaces/pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"``\> | opciones para definir el almacén |

#### Retorna %{#Functions-defineStore-Returns}%

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `S`, `G`, `A`\>(`options`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

Crea una función `useStore` que recupera la instancia del almacén

#### Tipado de los parámetros %{#Functions-defineStore-Type-parameters_1}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) = {} |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> = {} |
| `A` | {} |

#### Parámetros %{#Functions-defineStore-Parameters_1}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `options` | [`DefineStoreOptions`](../interfaces/pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\> | opciones para definir el almacén |

#### Retorna %{#Functions-defineStore-Returns_1}%

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\>

▸ **defineStore**<`Id`, `SS`\>(`id`, `storeSetup`, `options?`): [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

Crea una función `useStore` que recupera la instancia del almacén

#### Tipado de los parámetros %{#Functions-defineStore-Type-parameters_2}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `SS` | `SS` |

#### Parámetros %{#Functions-defineStore-Parameters_2}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `id` | `Id` | id del almacén (tiene que ser único) |
| `storeSetup` | () => `SS` | función que define al almacén |
| `options?` | [`DefineSetupStoreOptions`](../interfaces/pinia.DefineSetupStoreOptions.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\> | opciones adicionales |

#### Retorna %{#Functions-defineStore-Returns_2}%

[`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, [`_ExtractStateFromSetupStore`](pinia.md#_extractstatefromsetupstore)<`SS`\>, [`_ExtractGettersFromSetupStore`](pinia.md#_extractgettersfromsetupstore)<`SS`\>, [`_ExtractActionsFromSetupStore`](pinia.md#_extractactionsfromsetupstore)<`SS`\>\>

___

### getActivePinia %{#Functions-getActivePinia}%

▸ **getActivePinia**(): `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

Obtén la pinia que está actualmente activa si hay alguna.

#### Retorna %{#Functions-getActivePinia-Returns}%

`undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

___

### mapActions %{#Functions-mapActions}%

▸ **mapActions**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

Permite usar directamente acciones de tu almacén sin usar la API de composición (`setup()`) generando un objeto que será extendido en el campo `methods` de un componente. El valor del objeto son las acciones mientras que las claves son los nombre de los métodos resultantes.

**`Ejemplo`**

```js
export default {
  methods: {
    // otras métodos
    // useCounterStore tiene dos acciones llamadas `increment` y `setCount` 
    ...mapActions(useCounterStore, { moar: 'increment', setIt: 'setCount' })
  },

  created() {
    this.moar()
    this.setIt(2)
  }
}
```

#### Tipado de los parámetros %{#Functions-mapActions-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extiende `Record`<`string`, keyof `A`\> |

#### Parámetros %{#Functions-mapActions-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | almacén desde el que mapear |
| `keyMapper` | `KeyMapper` | objeto que define nuevos nombres para las acciones |

#### Retorna %{#Functions-mapActions-Returns}%

[`_MapActionsObjectReturn`](pinia.md#_mapactionsobjectreturn)<`A`, `KeyMapper`\>

▸ **mapActions**<`Id`, `S`, `G`, `A`\>(`useStore`, `keys`): [`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

Permite usar directamente acciones de tu almacén sin usar la API de composición (`setup()`) generando un objeto que será extendido en el campo `methods` de un componente.

**`Example`**

```js
export default {
  methods: {
    // otros métodos
    ...mapActions(useCounterStore, ['increment', 'setCount'])
  },

  created() {
    this.increment()
    this.setCount(2) // pasa el argumento como siempre
  }
}
```

#### Tipado de los parámetros %{#Functions-mapActions-Type-parameters_1}%

| Nombre | Tipos |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |

#### Parámetros %{#Functions-mapActions-Parameters_1}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | almacén desde el que mapear |
| `keys` | keyof `A`[] | array de nombre de acciones para mapear |

#### Retorna %{#Functions-mapActions-Returns_1}%

[`_MapActionsReturn`](pinia.md#_mapactionsreturn)<`A`\>

___

### mapGetters %{#Functions-mapGetters}%

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Alias para `mapState()`. Deberías usar `mapState()` en su lugar.

**`Deprecado`**

usa `mapState()` en su lugar.

#### Tipado de los parámetros %{#Functions-mapGetters-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extiende `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parámetros %{#Functions-mapGetters-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> |
| `keyMapper` | `KeyMapper` |

#### Retorna %{#Functions-mapGetters-Returns}%

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

▸ **mapGetters**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Alias para `mapState()`. Deberías usar `mapState()` en su lugar.

**`Deprecado`**

usa `mapState()` en su lugar.

#### Tipado de los parámetros %{#Functions-mapGetters-Type-parameters_1}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extiende `string` \| `number` \| `symbol` |

#### Parámetros %{#Functions-mapGetters-Parameters_1}%

| Nombre | Tipo |
| :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> |
| `keys` | readonly `Keys`[] |

#### Retorna %{#Functions-mapGetters-Returns_1}%

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

___

### mapState %{#Functions-mapState}%

▸ **mapState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

Permite usar el estado y los getters de un almacén sin usar la API de composición (`setup()`) generando un objeto que será extendido en el campo `computed` de un componente. Los valores del objeto son las propiedades del estado/getters mientras que las claves son los nombres de las propiedades computadas resultantes. Opcionalmente, puedes también pasar una función personalizada que recibirá el almacén como primer argumento. Cabe aclarar que mientras tenga acceso al componente mediante `this`, este no será tipado.

**`Ejemplo`**

```js
export default {
  computed: {
    // otras propiedades computadas
    // useCounterStore tiene una propiedad del estado llamada `count` 
    // y un getter `double`
    ...mapState(useCounterStore, {
      n: 'count',
      triple: store => store.n * 3,
      // cabe aclarar que no podemos usar funciones de flecha si
      // queremos usar `this`
      custom(store) {
        return this.someComponentValue + store.n
      },
      doubleN: 'double'
    })
  },

  created() {
    this.n // 2
    this.doubleN // 4
  }
}
```

#### Tipado de los parámetros %{#Functions-mapState-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extiende `Record`<`string`, keyof `S` \| keyof `G` \| (`store`: [`Store`](pinia.md#store)<`Id`, `S`, `G`, `A`\>) => `any`\> |

#### Parámetros %{#Functions-mapState-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | almacén desde el que mapear |
| `keyMapper` | `KeyMapper` | objeto de propiedades del estado y getters |

#### Retorna %{#Functions-mapState-Returns}%

[`_MapStateObjectReturn`](pinia.md#_mapstateobjectreturn)<`Id`, `S`, `G`, `A`, `KeyMapper`\>

▸ **mapState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): [`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

Permite usar el estado y los getters de un almacén sin usar la API de composición (`setup()`) generando un objeto que será extendido en el campo `computed` de un componente.

**`Ejemplo`**

```js
export default {
  computed: {
    // otras propiedades computadas
    ...mapState(useCounterStore, ['count', 'double'])
  },

  created() {
    this.count // 2
    this.double // 4
  }
}
```

#### Tipado de los parámetros %{#Functions-mapState-Type-parameters_1}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extiende `string` \| `number` \| `symbol` |

#### Parámetros %{#Functions-mapState-Parameters_1}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | almacén desde el que mapear |
| `keys` | readonly `Keys`[] | array de propiedades de estado o getters |

#### Retorna %{#Functions-mapState-Returns_1}%

[`_MapStateReturn`](pinia.md#_mapstatereturn)<`S`, `G`, `Keys`\>

___

### mapStores %{#Functions-mapStores}%

▸ **mapStores**<`Stores`\>(`...stores`): [`_Spread`](pinia.md#_spread)<`Stores`\>

Permite usar almacenes sin la API de composición (`setup()`) generando un objeto que será extendido en el campo `computed` de un componente. Acepta una lista de definiciones de almacenes.

**`Ejemplo`**

```js
export default {
  computed: {
    // otras propiedades computadas
    ...mapStores(useUserStore, useCartStore)
  },

  created() {
    this.userStore // almacén con id "user"
    this.cartStore // almacén con id "cart"
  }
}
```

#### Tipado de los parámetros %{#Functions-mapStores-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Stores` | extiende `any`[] |

#### Parámetros %{#Functions-mapStores-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `...stores` | [...Stores[]] | lista de almacenes para mapearlos en un objeto |

#### Retorna %{#Functions-mapStores-Returns}%

[`_Spread`](pinia.md#_spread)<`Stores`\>

___

### mapWritableState %{#Functions-mapWritableState}%

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `KeyMapper`\>(`useStore`, `keyMapper`): [`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

Igual que `mapState()` pero también crea setters computados para que el estado pueda ser modificado. Al contrario que `mapState()`, solo se pueden añadir propiedades `estado`.
added.

#### Tipado de los parámetros %{#Functions-mapWritableState-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `KeyMapper` | extiende `Record`<`string`, keyof `S`\> |

#### Parámetros %{#Functions-mapWritableState-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | almacén desde el que mapear |
| `keyMapper` | `KeyMapper` | objeto de propiedades estado |

#### Retorna %{#Functions-mapWritableState-Returns}%

[`_MapWritableStateObjectReturn`](pinia.md#_mapwritablestateobjectreturn)<`S`, `KeyMapper`\>

▸ **mapWritableState**<`Id`, `S`, `G`, `A`, `Keys`\>(`useStore`, `keys`): { [K in Keys]: Object }

Permite usar el estado y los getters de un almacén sin usar la API de composición (`setup()`) generando un objeto que será extendido en el campo `computed` de un componente.

#### Tipado de los parámetros %{#Functions-mapWritableState-Type-parameters_1}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](pinia.md#statetree) |
| `G` | extiende [`_GettersTree`](pinia.md#_getterstree)<`S`\> |
| `A` | `A` |
| `Keys` | extends `string` \| `number` \| `symbol` |

#### Parámetros %{#Functions-mapWritableState-Parameters_1}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `useStore` | [`StoreDefinition`](../interfaces/pinia.StoreDefinition.md)<`Id`, `S`, `G`, `A`\> | almacén desde el que mapear |
| `keys` | readonly `Keys`[] | array of state properties |

#### Retorna %{#Functions-mapWritableState-Returns_1}%

{ [K in Keys]: Object }
___

### setActivePinia %{#Functions-setActivePinia}%

▸ **setActivePinia**(`pinia`): `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

Establece o desactiva la pinia activa. Usado en SSR e internamente cuando se llaman a acciones y getters.

#### Parámetros %{#Functions-setActivePinia-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `pinia` | `undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md) | Instancia de Pinia |

#### Retorna %{#Functions-setActivePinia-Returns}%

`undefined` \| [`Pinia`](../interfaces/pinia.Pinia.md)

___

### setMapStoreSuffix %{#Functions-setMapStoreSuffix}%

▸ **setMapStoreSuffix**(`suffix`): `void`

Cambia es sufijo añadido por `mapStores()`. Puede ser establecido a un string vacío. Por defecto es `"Store"`. Asegúrate de extender la interfaz MapStoresCustomization si estás usando TypeScript.

#### Parámetros %{#Functions-setMapStoreSuffix-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `suffix` | `string` | sufijo nuevo |

#### Retorna %{#Functions-setMapStoreSuffix-Returns}%

`void`

___

### skipHydrate %{#Functions-skipHydrate}%

▸ **skipHydrate**<`T`\>(`obj`): `T`

Le dice a Pinia que se salte el proceso de hidratación de un objeto dado. Esto es útil en almacenes de configuración (solo) cuando retornes un objet de estados en el almacén pero este no es realmente estado. Por ejemplo, retornar una instancia del router en un almacén de configuración.

#### Tipado de los parámetros %{#Functions-skipHydrate-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `T` | `any` |

#### Parámetros %{#Functions-skipHydrate-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `obj` | `T` | objeto destino |

#### Retorna %{#Functions-skipHydrate-Returns}%

`T`

obj

___

### storeToRefs %{#Functions-storeToRefs}%

▸ **storeToRefs**<`SS`\>(`store`): `ToRefs`<[`StoreState`](pinia.md#storestate)<`SS`\> & [`StoreGetters`](pinia.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<[`StoreState`](pinia.md#storestate)<`SS`\>\>\>

Crea un objeto de referencias con todo el estado, getters y propiedades de estado añadidas por un plugin del almacén. Parecido a `toRefs()` pero diseñado específicamente para los almacenes de Pinia, por lo que los métodos y propiedades no reactivas son ignorados completamente.

#### Tipado de los parámetros %{#Functions-storeToRefs-Type-parameters}%

| Nombre | Tipos |
| :------ | :------ |
| `SS` | extiende [`_StoreWithState`](../interfaces/pinia._StoreWithState.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & [`StateTree`](pinia.md#statetree) & [`_StoreWithGetters`](pinia.md#_storewithgetters)<[`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>\> & [`PiniaCustomProperties`](../interfaces/pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](pinia.md#statetree), [`_GettersTree`](pinia.md#_getterstree)<[`StateTree`](pinia.md#statetree)\>, [`_ActionsTree`](pinia.md#_actionstree), `SS`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<[`StateTree`](pinia.md#statetree), `SS`\> |

#### Parámetros %{#Functions-storeToRefs-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `store` | `SS` | almacén del que se quiere extraer las refs |

#### Retorna %{#Functions-storeToRefs-Returns}%

`ToRefs`<[`StoreState`](pinia.md#storestate)<`SS`\> & [`StoreGetters`](pinia.md#storegetters)<`SS`\> & [`PiniaCustomStateProperties`](../interfaces/pinia.PiniaCustomStateProperties.md)<[`StoreState`](pinia.md#storestate)<`SS`\>\>\>
