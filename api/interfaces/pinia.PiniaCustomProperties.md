---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / PiniaCustomProperties

# Interfaz: PiniaCustomProperties<Id, S, G, A\> {#interface-piniacustomproperties-id-s-g-a}

[pinia](../modules/pinia.md).PiniaCustomProperties

Interfaz a extender por el usuario cuando agrega propiedades a través de plugins.

## Tipado de los parámetros {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` = `string` |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) = [`StateTree`](../modules/pinia.md#statetree) |
| `G` | [`_GettersTree`](../modules/pinia.md#_getterstree)<`S`\> |
| `A` | [`_ActionsTree`](../modules/pinia.md#_actionstree) |

## Accesores {#accessors}

### route {#route}

• `get` **route**(): `RouteLocationNormalized`

#### Retorna {#returns}

`RouteLocationNormalized`

• `set` **route**(`value`): `void`

#### Parámetros {#parameters}

| Nombre | Tipo |
| :------ | :------ |
| `value` | `RouteLocationNormalizedLoaded` \| `Ref`<`RouteLocationNormalizedLoaded`\> |

#### Retorna {#returns-1}

`void`
