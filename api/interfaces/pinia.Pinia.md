---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / Pinia

# Interfaz: Pinia {#interface-pinia}

[pinia](../modules/pinia.md).Pinia

Cada aplicación debe poseer su propia pinia para poder crear almacenes

## Jerarquía {#hierarchy}

- **`Pinia`**

  ↳ [`TestingPinia`](pinia_testing.TestingPinia.md)

## Propiedades {#properties}

### install {#install}

• **install**: (`app`: `App`<`any`\>) => `void`

#### Tipado de la declaración {#type-declaration}

▸ (`app`): `void`

##### Parámetros {#parameters}

| Nombre | Tipo |
| :------ | :------ |
| `app` | `App`<`any`\> |

##### Retorna {#returns}

`void`

___

### state {#state}

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado raíz

## Métodos {#methods}

### use {#use}

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Añade un plugin de almacén para extender a cada almacén

#### Parámetros {#parameters-1}

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | plugin de almacén por añadir |

#### Retorna {#returns-1}

[`Pinia`](pinia.Pinia.md)
