---
editLink: false
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / StoreProperties

# Interfaz: StoreProperties<Id\> %{#interface-storeproperties-id}%

[pinia](../modules/pinia.md).StoreProperties

Propiedades de un almacén.

## Tipado de los parámetros %{#Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |

## Jerarquía %{#Hierarchy}%

- **`StoreProperties`**

  ↳ [`_StoreWithState`](pinia._StoreWithState.md)

## Propiedades %{#Properties}%

### $id %{#Properties-$id}%

• **$id**: `Id`

Identificador único del almacén

___

### \_customProperties %{#Properties-_customProperties}%

• **\_customProperties**: `Set`<`string`\>

Usado por el plugin de devtools para obtener propiedades añadidas con plugins. Eliminado en producción. Puede ser usado por el usuario para añadir llaves de propiedades del almacén que deberían mostrarse en devtools.
