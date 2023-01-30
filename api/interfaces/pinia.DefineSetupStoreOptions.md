---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / DefineSetupStoreOptions

# Interfaz: DefineSetupStoreOptions<Id, S, G, A\> {#interface-definesetupstoreoptions-id-s-g-a}

[pinia](../modules/pinia.md).DefineSetupStoreOptions

Parámetro de opciones de `defineStore()` para almacenes del tipo setup. Puede extenderse para
aumentar los almacenes con el API de plugins.

**`See`**

[DefineStoreOptionsBase](pinia.DefineStoreOptionsBase.md).

## Tipado de la declaración {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Jerarquía {#hierarchy}

- [`DefineStoreOptionsBase`](pinia.DefineStoreOptionsBase.md)<`S`, [`Store`](../modules/pinia.md#store)<`Id`, `S`, `G`, `A`\>\>

  ↳ **`DefineSetupStoreOptions`**

## Propiedades {#properties}

### actions {#actions}

• `Opcional` **actions**: `A`

Acciones extraídas. Añadidas por useStore(). NO DEBEN ser añadidas por el usuario al crear la tienda. Puede usarse en plugins para obtener la lista de acciones en un almacén definido con una función de tipo setup. Ten en cuenta que esto siempre se define.
