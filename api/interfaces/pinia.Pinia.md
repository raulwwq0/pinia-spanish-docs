---
sidebar: "auto"
editLink: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / Pinia

# Interfaz: Pinia %{#interface-pinia}%

[pinia](../modules/pinia.md).Pinia

Cada aplicación debe poseer su propia pinia para poder crear almacenes

## Jerarquía %{#Hierarchy}%

- **`Pinia`**

  ↳ [`TestingPinia`](pinia_testing.TestingPinia.md)

## Propiedades %{#Properties}%

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

___

### state %{#Properties-state}%

• **state**: `Ref`<`Record`<`string`, [`StateTree`](../modules/pinia.md#statetree)\>\>

estado raíz

## Métodos %{#Methods}%

### use %{#Methods-use}%

▸ **use**(`plugin`): [`Pinia`](pinia.Pinia.md)

Añade un plugin de almacén para extender a cada almacén

#### Parámetros %{#Methods-use-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `plugin` | [`PiniaPlugin`](pinia.PiniaPlugin.md) | plugin de almacén por añadir |

#### Retorna %{#Methods-use-Returns}%

[`Pinia`](pinia.Pinia.md)
