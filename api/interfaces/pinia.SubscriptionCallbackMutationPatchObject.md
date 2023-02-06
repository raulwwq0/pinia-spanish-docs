---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchObject

# Interfaz: SubscriptionCallbackMutationPatchObject<S\> {#interface-subscriptioncallbackmutationpatchobject-s}

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchObject

Contexto pasado a un callback de suscripción cuando `store.$patch()` es llamado
con un objeto.

## Tipado de los parámetros {#type-parameters}

| Nombre |
| :------ |
| `S` |

## Jerarquía {#hierarchy}

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchObject`**

## Propiedades {#properties}

### events {#events}

• **events**: `DebuggerEvent`[]

🔴 SOLO PARA DESARROLLO, NO usar para código de producción. Diferentes llamadas de mutación. Viene de
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging y permite realizar un rastreo de las mutaciones 
en devtools y plugins **sólo durante el desarrollo**.


#### Sobrescribe {#overrides}

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[events](pinia._SubscriptionCallbackMutationBase.md#events)

___

### payload {#payload}

• **payload**: [`_DeepPartial`](../modules/pinia.md#_deeppartial)<`S`\>

Objeto pasado a `store.$patch()`.

___

### storeId {#storeid}

• **storeId**: `string`

`id` del almacén que realiza la mutación.

#### Heredado de {#inherited-from}

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

___

### type {#type}

• **type**: [`patchObject`](../enums/pinia.MutationType.md#patchobject)

Tipo de mutación.

#### Sobrescribe {#overrides-1}

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
