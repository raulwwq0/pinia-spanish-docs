---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / \_SubscriptionCallbackMutationBase

# Interfaz: \_SubscriptionCallbackMutationBase {#interfaz-subscriptioncallbackmutationbase}

[pinia](../modules/pinia.md)._SubscriptionCallbackMutationBase

Tipo base para el contexto pasado a un callback de suscripción. Tipo interno.

## Jerarquía {#hierarchy}

- **`_SubscriptionCallbackMutationBase`**

  ↳ [`SubscriptionCallbackMutationDirect`](pinia.SubscriptionCallbackMutationDirect.md)

  ↳ [`SubscriptionCallbackMutationPatchFunction`](pinia.SubscriptionCallbackMutationPatchFunction.md)

  ↳ [`SubscriptionCallbackMutationPatchObject`](pinia.SubscriptionCallbackMutationPatchObject.md)

## Propiedades {#properties}

### events {#events}

• `Optional` **events**: `DebuggerEvent` \| `DebuggerEvent`[]

🔴 DEV SOLAMENTE, NO usar para código de producción. Diferentes llamadas de mutación. Viene de
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging y permite realizar un rastreo de mutaciones en
devtools y plugins **sólo durante el desarrollo**.
___

### storeId {#storeid}

• **storeId**: `string`

`id` del almacén que realiza la mutación.

___

### type {#type}

• **type**: [`MutationType`](../enums/pinia.MutationType.md)

Tipo de mutación.
