---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / DefineStoreOptionsBase

# Interfaz: DefineStoreOptionsBase<S, Store\> {#interface-definestoreoptionsbase-s-store}

[pinia](../modules/pinia.md).DefineStoreOptionsBase

Opciones pasadas a `defineStore()` que son comunes entre options y setup. 
Extiende esta interfaz si deseas añadir opciones personalizadas a ambos tipos de almacenes.

## Tipado de los parámetros {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) |
| `Store` | `Store` |

## Jerarquía {#hierarchy}

- **`DefineStoreOptionsBase`**

  ↳ [`DefineStoreOptions`](pinia.DefineStoreOptions.md)

  ↳ [`DefineSetupStoreOptions`](pinia.DefineSetupStoreOptions.md)
