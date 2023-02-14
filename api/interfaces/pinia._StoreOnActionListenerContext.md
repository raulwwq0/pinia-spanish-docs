---
sidebar: "auto"
editLink: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / \_StoreOnActionListenerContext

# Interfaz: \_StoreOnActionListenerContext<Store, ActionName, A\>  %{#interface-storeonactionlistenercontext-store-actionname-a}%

[pinia](../modules/pinia.md)._StoreOnActionListenerContext

Tipo real para [StoreOnActionListenerContext](../modules/pinia.md#storeonactionlistenercontext). Existe con fines de 
refactorización. Sólo para uso interno. Sólo para uso **interno**

## Tipado de los parámetros %{#Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Store` | `Store` |
| `ActionName` | extiende `string` |
| `A` | `A` |

## Propiedades  %{#Properties}%

### after %{#Properties-after}%

• **after**: (`callback`: `A` extiende `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` : () => `void`) => `void`

#### Tipado de la declaración %{#Properties-after-Type-declaration}%

▸ (`callback`): `void`

Establece un hook una vez finalizada la acción. Recibe el valor de retorno 
de la acción, si es una Promise, se desenvolverá.

##### Parámetros %{#Properties-after-Type-declaration-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `callback` | `A` extiende `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` : () => `void` |

##### Retorna %{#Properties-after-Type-declaration-Returns}%

`void`

___

### args %{#Properties-args}%

• **args**: `A` extiende `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? `Parameters`<`A`[`ActionName`]\> : `unknown`[]

Parámetros pasados a la acción

___

### name %{#Properties-name}%

• **name**: `ActionName`

Nombre de la acción

___

### onError %{#Properties-onError}%

• **onError**: (`callback`: (`error`: `unknown`) => `void`) => `void`

#### Tipado de la declaración %{#Properties-onError-Type-declaration}%


▸ (`callback`): `void`

Establece un hook si la acción falla. Retorna `false` para capturar el error y 
evitar que se propague.

##### Parámetros %{#Properties-onError-Type-declaration-Parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `callback` | (`error`: `unknown`) => `void` |

##### Retorna %{#Properties-onError-Type-declaration-Returns}%

`void`

___

### store %{#Properties-store}%

• **store**: `Store`

Almacén que está invocando la acción
