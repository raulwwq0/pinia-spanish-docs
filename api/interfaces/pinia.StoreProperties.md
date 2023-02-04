---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / StoreProperties

# Interfaz: StoreProperties<Id\> {#interface-storeproperties-id}

[pinia](../modules/pinia.md).StoreProperties

Propiedades de un almacén.

## Tipado de los parámetros {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |

## Jerarquía {#hierarchy}

- **`StoreProperties`**

  ↳ [`_StoreWithState`](pinia._StoreWithState.md)

## Propiedades {#properties}

### $id {#id}

• **$id**: `Id`

Identificador único del almacén

___

### \_customProperties {#customproperties}

• **\_customProperties**: `Set`<`string`\>

Usado por el plugin de devtools para obtener propiedades añadidas con plugins. Eliminado en producción. Puede ser usado por el usuario para añadir llaves de propiedades del almacén que deberían mostrarse en devtools.
