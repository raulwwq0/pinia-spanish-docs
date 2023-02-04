---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationDirect

# Interfaz: SubscriptionCallbackMutationDirect {#interface-subscriptioncallbackmutationdirect}

[pinia](../modules/pinia.md).SubscriptionCallbackMutationDirect

Contexto pasado a un callback de suscripción cuando se muta directamente el estado de 
un almacén con `store.someState = newValue` o `store.$state.someState =
newValue`.

##  Jerarquía {#hierarchy}

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationDirect`**

## Propiedades {#properties}

### events {#events}

• **events**: `DebuggerEvent`

🔴 DEV SOLAMENTE, NO usar para código de producción. Diferentes llamadas de mutación. Viene de
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging y permite realizar un rastreo de las mutaciones 
en devtools y plugins **sólo durante el desarrollo**.

#### Sobrescribe {#overrides}

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[events](pinia._SubscriptionCallbackMutationBase.md#events)

___

### storeId {#storeid}

• **storeId**: `string`

`id` del almacén que realiza la mutación.

#### Heredado de {#inherited-from}

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

___

### type {#type}

• **type**: [`direct`](../enums/pinia.MutationType.md#direct)

Tipo de mutación.

#### Sobrescribe {#overrides-1}

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
