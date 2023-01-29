---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingPinia

# Interface: TestingPinia

[@pinia/testing](../modules/pinia_testing.md).TestingPinia

Instancia de Pinia diseñada específicamente para pruebas. Extiende una instancia 
`Pinia` normal con propiedades específicas de prueba.

## Jerarquía

- [`Pinia`](pinia.Pinia.md)

  ↳ **`TestingPinia`**

## Propiedades

### app

• **app**: `App`<`any`\>

App usada por Pinia

___

### install

• **install**: (`app`: `App`<`any`\>) => `void`

#### Declaración del tipo

▸ (`app`): `void`

##### Parámetros

| Name | Type |
| :------ | :------ |
| `app` | `App`<`any`\> |

##### Retorna

`void`

#### Heredado de

[Pinia](pinia.Pinia.md).[install](pinia.Pinia.md#install)

___

### state

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado raíz

#### Heredado de

[Pinia](pinia.Pinia.md).[state](pinia.Pinia.md#state)

## Métodos

### use

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Añade un plugin de almacén para extender cada almacén

#### Parámetros

| Name | Type | Description |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | plugin de almacén para añadir |

#### Retorna

[`Pinia`](pinia.Pinia.md)

#### Heredado de

[Pinia](pinia.Pinia.md).[use](pinia.Pinia.md#use)
