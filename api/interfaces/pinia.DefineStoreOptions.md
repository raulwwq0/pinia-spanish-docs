---
sidebar: "auto"
editLink: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptions

# Interfaz: DefineStoreOptions<Id, S, G, A\> %{#interface-definestoreoptions-id-s-g-a}%

[pinia](../modules/pinia.md).DefineStoreOptions

Parámetro de opciones de `defineStore()` para almacenes de opciones. Puede extenderse para aumentar los almacenes con el API de plugins.

**`Vea`**

[DefineStoreOptionsBase](pinia.DefineStoreOptionsBase.md).

## Tipado de los parámetros %{#Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Jerarquía %{#Hierarchy}%

- [`DefineStoreOptionsBase`](pinia.DefineStoreOptionsBase.md)<`S`, [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>\>

  ↳ **`DefineStoreOptions`**

## Propiedades %{#Properties}%

### actions %{#Properties-actions}%

• `Opcional` **actions**: `A` & `ThisType`<`A` & `UnwrapRef`<`S`\> & [`_StoreWithState`](pinia._StoreWithState.md)<`Id`, `S`, `G`, `A`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\>

Objecto opcional de acciones.

___

### getters %{#Properties-getters}%

• `Opcional` **getters**: `G` & `ThisType`<`UnwrapRef`<`S`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\> & [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\>

Objecto opcional de getters.

___

### id %{#Properties-id}%

• **id**: `Id`

Código de string único para identificar el almacén en la aplicación.

___

### state %{#Properties-state}%

• `Opcional` **state**: () => `S`

#### Tipado de la declaración %{#Properties-state-Type-declaration}%

▸ (): `S`

Función para crear un nuevo estado. **Debe ser una función de flecha** para asegurar
tipado correcto.

##### Retorna %{#Properties-state-Type-declaration-Returns}%

`S`

## Métodos %{#Methods}%

### hydrate %{#Methods-hydrate}%

▸ `Opcional` **hydrate**(`storeState`, `initialState`): `void`

Permite hidratar el almacén durante el SSR cuando se utilizan estados complejos (como refs que sólo existen del lado del cliente) en la definición del almacén y copiar el valor de `pinia.state` no es suficiente.

**`Ejemplo`**

Si en tu `state` utilizas `customRef`s, `computed`s, o `ref`s que tienen un valor diferente en el Servidor y en el Cliente, es necesario que los hidrates manualmente. Por ejemplo, una ref personalizada que se almacena en el almacenamiento local:

```ts
const useStore = defineStore('main', {
  state: () => ({
    n: useLocalStorage('key', 0)
  }),
  hydrate(storeState, initialState) {
    // @ts-expect-error: https://github.com/microsoft/TypeScript/issues/43826
    storeState.n = useLocalStorage('key', 0)
  }
})
```

#### Parámetros %{#Methods-hydrate-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `storeState` | `UnwrapRef`<`S`\> | el estado actual en el almacén |
| `initialState` | `UnwrapRef`<`S`\> | initialState |

#### Returns %{#Methods-hydrate-Returns}%

`void`
