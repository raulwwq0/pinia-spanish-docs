---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / \_StoreOnActionListenerContext

# Interfaz: \_StoreOnActionListenerContext<Store, ActionName, A\>  {#interface-storeonactionlistenercontext-store-actionname-a}

[pinia](../modules/pinia.md)._StoreOnActionListenerContext

Tipo real para [StoreOnActionListenerContext](../modules/pinia.md#storeonactionlistenercontext). Existe con fines de 
refactorización. Sólo para uso interno. Sólo para uso **interno**

## Tipado de los parámetros {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `Store` | `Store` |
| `ActionName` | extiende `string` |
| `A` | `A` |

## Propiedades {#properties}

### after {#after}

• **after**: (`callback`: `A` extiende `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` : () => `void`) => `void`

#### Tipado de la declaración {#type-declaration}

▸ (`callback`): `void`

Establece un hook una vez finalizada la acción. Recibe el valor de retorno 
de la acción, si es una Promise, se desenvolverá.

##### Parámetros {#parameters}

| Nombre | Tipo |
| :------ | :------ |
| `callback` | `A` extiende `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? (`resolvedReturn`: [`_Awaited`](../modules/pinia.md#_awaited)<`ReturnType`<`A`[`ActionName`]\>\>) => `void` : () => `void` |

##### Retorna {#returns}

`void`

___

### args {#args}

• **args**: `A` extiende `Record`<`ActionName`, [`_Method`](../modules/pinia.md#_method)\> ? `Parameters`<`A`[`ActionName`]\> : `unknown`[]

Parámetros pasados a la acción

___

### name {#name}

• **name**: `ActionName`

Nombre de la acción

___

### onError {#onerror}

• **onError**: (`callback`: (`error`: `unknown`) => `void`) => `void`

#### Tipado de la declaración {#type-declaration-1}

▸ (`callback`): `void`

Establece un hook si la acción falla. Retorna `false` para capturar el error y 
evitar que se propague.

##### Parámetros {#parameters-1}

| Nombre | Tipo |
| :------ | :------ |
| `callback` | (`error`: `unknown`) => `void` |

##### Retorna {#returns-1}

`void`

___

### store {#store}

• **store**: `Store`

Almacén que está invocando la acción
