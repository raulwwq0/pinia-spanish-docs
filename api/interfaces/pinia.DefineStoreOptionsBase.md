---
sidebar: "auto"
editLink: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsBase

# Interface: DefineStoreOptionsBase<S, Store\>

[pinia](../modules/pinia.md).DefineStoreOptionsBase

Options passed to `defineStore()` that are common between option and setup
stores. Extend this interface if you want to add custom options to both kinds
of stores.

## Type parameters %{#Type-parameters}%

| Name | Type |
| :------ | :------ |
| `S` | extends [`StateTree`](../modules/pinia.md#statetree) |
| `Store` | `Store` |

## Hierarchy %{#Hierarchy}%

- **`DefineStoreOptionsBase`**

  ↳ [`DefineStoreOptions`](pinia.DefineStoreOptions.md)

  ↳ [`DefineSetupStoreOptions`](pinia.DefineSetupStoreOptions.md)
