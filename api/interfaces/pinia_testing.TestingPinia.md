---
editLink: false
---

[Documentación de la API](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingPinia

# Interfaz: TestingPinia %{#interface-testingpinia}%

[@pinia/testing](../modules/pinia_testing.md).TestingPinia

Instancia de Pinia diseñada específicamente para pruebas. Extiende una instancia 
`Pinia` normal con propiedades específicas de prueba.

## Jerarquía %{#Hierarchy}%

- [`Pinia`](pinia.Pinia.md)

  ↳ **`TestingPinia`**

## Propiedades %{#Properties}%

### app %{#Properties-app}%

• **app**: `App`<`any`\>

App usada por Pinia

___

### install %{#Properties-install}%

• **install**: (`app`: `App`<`any`\>) => `void`

#### Tipado de la declaración %{#Properties-install-Type-declaration}%

▸ (`app`): `void`

##### Parámetros %{#Properties-install-Type-declaration-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `app` | `App`<`any`\> |

##### Retorna %{#Properties-install-Type-declaration-Returns}%

`void`

#### Heredado de  %{#Properties-install-Inherited-from}%

[Pinia](pinia.Pinia.md).[install](pinia.Pinia.md#install)

___

### state %{#Properties-state}%

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado raíz

#### Heredado de %{#Properties-state-Inherited-from}%

[Pinia](pinia.Pinia.md).[state](pinia.Pinia.md#state)

## Métodos %{#Methods}% 

### use %{#Methods-use}%

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Añade un plugin de almacén para extender cada almacén

#### Parámetros %{#Methods-use-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | plugin de almacén para añadir |

#### Retorna %{#Methods-use-Returns}%

[`Pinia`](pinia.Pinia.md)

#### Heredado de %{#Methods-use-Inherited-from}%

[Pinia](pinia.Pinia.md).[use](pinia.Pinia.md#use)
