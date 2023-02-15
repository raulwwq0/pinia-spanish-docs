---
editLink: false
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / MutationType

# Enumeración: MutationType %{#enumeration-mutationtype}%

[pinia](../modules/pinia.md).MutationType

Posibles tipos de SubscriptionCallback

## Enumeración de Miembros %{#Enumeration-Members}%

### direct %{#Enumeration-Members-direct}%

• **direct** = ``"direct"``

Mutación directa del estado:

- `store.name = 'new name'`
- `store.$state.name = 'new name'`
- `store.list.push('new item')`

___

### patchFunction %{#Enumeration-Members-patchFunction}%

• **patchFunction** = ``"patch function"``

Mutar el estado con `$patch` y una función

- `store.$patch(state => state.name = 'newName')`

___

### patchObject %{#Enumeration-Members-patchObject}%

• **patchObject** = ``"patch object"``

Mutar el estado con `$patch` y un objeto

- `store.$patch({ name: 'newName' })`
