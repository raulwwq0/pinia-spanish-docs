---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación API](../index.md) / [pinia](../modules/pinia.md) / MutationType

# Enumeración: MutationType {#enumeration-mutationtype}

[pinia](../modules/pinia.md).MutationType

Posibles tipos de SubscriptionCallback

## Enumeración de Miembros {#enumeration-members}

### direct {#direct}

• **direct** = ``"direct"``

Mutación directa del estado:

- `store.name = 'new name'`
- `store.$state.name = 'new name'`
- `store.list.push('new item')`

___

### patchFunction

• **patchFunction** = ``"patch function"``

Mutar el estado con `$patch` y una función

- `store.$patch(state => state.name = 'newName')`

___

### patchObject

• **patchObject** = ``"patch object"``

Mutar el estado con `$patch` y un objeto

- `store.$patch({ name: 'newName' })`
