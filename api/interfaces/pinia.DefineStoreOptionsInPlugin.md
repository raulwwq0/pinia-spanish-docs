---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsInPlugin

# Interfaz: DefineStoreOptionsInPlugin<Id, S, G, A\> {#interface-definestoreoptionsinplugin-id-s-g-a}

[pinia](../modules/pinia.md).DefineStoreOptionsInPlugin

`Opciones` disponibles al crear un plugin de pinia.

## Tipado de los parámetros {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Jerarquía {#hierarchy}

- `Omit`<[`DefineStoreOptions`](pinia.DefineStoreOptions.md)<`Id`, `S`, `G`, `A`\>, ``"id"`` \| ``"actions"``\>

  ↳ **`DefineStoreOptionsInPlugin`**

## Propiedades {#properties}

### actions {#actions}

• **actions**: `A`

Objeto extraído de acciones. Agregado por useStore() cuando el almacén se construye
utilizando la API de configuración, de lo contrario utiliza la que se pasa a `defineStore()`.
Por defecto es un objeto vacío si no hay acciones definidas.

___

### getters {#getters}

• `Opcional` **getters**: `G` & `ThisType`<`UnwrapRef`<`S`\> & [`_StoreWithGetters`](../modules/pinia.md#_storewithgetters)<`G`\> & [`PiniaCustomProperties`](pinia.PiniaCustomProperties.md)<`string`, [`StateTree`](../modules/pinia.md#statetree), [`_GettersTree`](../modules/pinia.md#_getterstree)<[`StateTree`](../modules/pinia.md#statetree)\>, [`_ActionsTree`](../modules/pinia.md#_actionstree)\>\> & [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\>

Objecto opcional de getters.

#### Heredado de {#inherited-from}

Omit.getters

___

### state {#state}

• `Opcional` **state**: () => `S`

#### Tipado de la declaración {#type-declaration}

▸ (): `S`

Función para crear un nuevo estado. **Debe ser una función de flecha** para asegurar
el tipado correcto.

##### Retorna {#returns}

`S`

#### Heredado de {#inherited-from-1}

Omit.state

## Métodos {#methods}

### hydrate {#hydrate}

▸ `Opcional` **hydrate**(`storeState`, `initialState`): `void`

Permite hidratar el almacén durante el SSR cuando se utilizan estados complejos (como refs sólo del lado del cliente) en la definición del almacén y copiar el valor de `pinia.state` no es suficiente.

**`Ejemplo`**

Si en tu `state`, utilizas cualquier `customRef`s, cualquier `computed`s, o cualquier `ref`s que tenga un valor diferente en el Servidor y en el Cliente, necesitas hidratarlos manualmente. por ejemplo, una ref personalizada que se almacena en el almacenamiento local:

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

#### Parámetros {#parameters}

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `storeState` | `UnwrapRef`<`S`\> | el estado actual en el almacén |
| `initialState` | `UnwrapRef`<`S`\> | initialState |

#### Returns {#returns-1}

`void`

#### Heredado de {#inherited-from-2}

Omit.hydrate
