---
editLink: false
---

[API Documentation](../index.md) / [pinia](../modules/pinia.md) / SubscriptionCallbackMutationPatchObject

# Interfaz: SubscriptionCallbackMutationPatchObject<S\> %{#interface-subscriptioncallbackmutationpatchobject-s}%

[pinia](../modules/pinia.md).SubscriptionCallbackMutationPatchObject

Contexto pasado a un callback de suscripción cuando `store.$patch()` es llamado
con un objeto.

## Tipado de los parámetros %{#Type-parameters}%

| Nombre |
| :------ |
| `S` |

## Jerarquía %{#Hierarchy}%

- [`_SubscriptionCallbackMutationBase`](pinia._SubscriptionCallbackMutationBase.md)

  ↳ **`SubscriptionCallbackMutationPatchObject`**

## Propiedades %{#Properties}%

### events %{#Properties-events}%

• **events**: `DebuggerEvent`[]

🔴 SOLO PARA DESARROLLO, NO usar para código de producción. Diferentes llamadas de mutación. Viene de
https://vuejs.org/guide/extras/reactivity-in-depth.html#reactivity-debugging y permite realizar un rastreo de las mutaciones 
en devtools y plugins **sólo durante el desarrollo**.


#### Sobrescribe %{#Properties-events-Overrides}%

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[events](pinia._SubscriptionCallbackMutationBase.md#events)

___

### payload %{#Properties-payload}%

• **payload**: [`_DeepPartial`](../modules/pinia.md#_deeppartial)<`S`\>

Objeto pasado a `store.$patch()`.

___

### storeId %{#Properties-storeId}%

• **storeId**: `string`

`id` del almacén que realiza la mutación.

#### Heredado de %{#Properties-storeId-Inherited-from}%

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[storeId](pinia._SubscriptionCallbackMutationBase.md#storeid)

___

### type %{#Properties-type}%

• **type**: [`patchObject`](../enums/pinia.MutationType.md#patchobject)

Tipo de mutación.

#### Sobrescribe %{#Properties-type-Overrides}%

[_SubscriptionCallbackMutationBase](pinia._SubscriptionCallbackMutationBase.md).[type](pinia._SubscriptionCallbackMutationBase.md#type)
