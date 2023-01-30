---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingPinia

# Interfaz: TestingPinia {#interface-testingpinia}

[@pinia/testing](../modules/pinia_testing.md).TestingPinia

Instancia de Pinia diseñada específicamente para pruebas. Extiende una instancia 
`Pinia` normal con propiedades específicas de prueba.

## Jerarquía {#hierarchy}

- [`Pinia`](pinia.Pinia.md)

  ↳ **`TestingPinia`**

## Propiedades {#properties}

### app {#app}

• **app**: `App`<`any`\>

App usada por Pinia

___

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

#### Heredado de {#inherited-from}

[Pinia](pinia.Pinia.md).[install](pinia.Pinia.md#install)

___

### state {#state}

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado raíz

#### Heredado de {#inherited-from-1}

[Pinia](pinia.Pinia.md).[state](pinia.Pinia.md#state)

## Métodos {#methods}

### use {#use}

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Añade un plugin de almacén para extender cada almacén

#### Parámetros {#parameters-1}

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | plugin de almacén para añadir |

#### Retorna {#returns-1}

[`Pinia`](pinia.Pinia.md)

#### Heredado de {#inherited-from-2}

[Pinia](pinia.Pinia.md).[use](pinia.Pinia.md#use)
