---
sidebar: "auto"
editLink: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationDirect

# Interfaz: SubscriptionCallbackMutationDirect %{#interface-subscriptioncallbackmutationdirect}%

[pinia](../modules/pinia.md).SubscriptionCallbackMutationDirect

Contexto pasado a un callback de suscripción cuando se muta directamente el estado de 
un almacén con `store.someState = newValue` o `store.$state.someState =
newValue`.

##  Jerarquía %{#Hierarchy}%

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationDirect`**

## Propiedades %{#Properties}%

### events %{#Properties-events}%

• **events**: `DebuggerEvent`

🔴 SOLO PARA DESARROLLO, NO usar para código de producción. Diferentes llamadas de mutación. Viene de
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging y permite realizar un rastreo de las mutaciones 
en devtools y plugins **sólo durante el desarrollo**.

#### Sobrescribe %{#Properties-events-Overrides}%

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[events](pinia._SubscriptionCallbackMutationBase.md#events)

___

### storeId %{#Properties-storeId}%

• **storeId**: `string`

`id` del almacén que realiza la mutación.

#### Heredado de %{#Properties-storeId-Inherited-from}%

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

___

### type %{#Properties-type}%

• **type**: [`direct`](../enums/pinia.MutationType.md#direct)

Tipo de mutación.

#### Sobrescribe %{#Properties-type-Overrides}%

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
