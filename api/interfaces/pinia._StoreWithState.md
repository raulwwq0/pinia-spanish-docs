---
editLink: false
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / \_StoreWithState

# Interfaz: \_StoreWithState<Id, S, G, A\> %{#interface-storewithstate-id-s-g-a}%

[pinia](../modules/pinia.md)._StoreWithState

Almacén base con estado y funciones. No debe utilizarse directamente.

## Tipado de los parámetros %{#Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Jerarquía %{#Hierarchy}%

- [`StoreProperties`](pinia.StoreProperties.md)<`Id`\>

  ↳ **`_StoreWithState`**

## Propiedades %{#Properties}%

### $id %{#Properties-$id}%

• **$id**: `Id`

Identificador único del almacén

#### Heredado de %{#Properties-$id-Inherited-from}%

[StoreProperties](pinia.StoreProperties.md).[$id](pinia.StoreProperties.md#$id)

___

### $state %{#Properties-$state}%

• **$state**: `UnwrapRef`<`S`\> & [`PiniaCustomStateProperties`](pinia.PiniaCustomStateProperties.md)<`S`\>

Estado del almacén. Al establecerlo se llamará internamente a `$patch()` para actualizar el estado.

___

### \_customProperties %{#Properties-_customProperties}%

• **\_customProperties**: `Set`<`string`\>

Usado por el plugin devtools para obtener propiedades añadidas con plugins. Eliminado
en producción. Puede ser usado por el usuario para añadir claves de propiedades del almacén
que deberían mostrarse en devtools.

#### Heredado de %{#Properties-_customProperties-Inherited-from}%

[StoreProperties](pinia.StoreProperties.md).[_customProperties](pinia.StoreProperties.md#_customproperties)

## Methods %{#Methods}%

### $dispose %{#Methods-$dispose}%

▸ **$dispose**(): `void`

Detiene el alcance del efecto asociado al almacén y lo elimina del registro.
Los plugins pueden sobrescribir este método para limpiar cualquier efecto añadido.
Por ejemplo, el plugin devtools deja de mostrar los almacenes desechados desde devtools.
Nota: esto no borra el estado del almacén, si quieres hacerlo tienes que hacerlo manualmente con `delete pinia.state.value[store.$id]`. Si no quieres y el almacén vuelve a ser usado de nuevo se volverá a usar el estado anterior.

#### Returns %{#Methods-$dispose-Returns}%

`void`

___

### $onAction %{#Methods-$onAction}%

▸ **$onAction**(`callback`, `detached?`): () => `void`

Establece un callback cada vez que una acción está a punto de ser 
invocada. El callback recibe un objeto con toda la información relevante
de la acción invocada:
- `store`: el almacén sobre el que se invoca
- `name`: El nombre de la acción
- `args`: Los parámetros pasados a la acción

Además de esto, recibe dos funciones que permiten establecer un callback
una vez que la acción finaliza o cuando falla.

También devuelve una función para eliminar el callback. Ten en cuenta que al llamar a
`store.$onAction()` dentro de un componente, se limpiará automáticamente
cuando el componente sea desmontado a menos que `detached` sea true.

**`Ejemplo`**

```js
store.$onAction(({ after, onError }) => {
  // Aquí puedes compartir variables entre todos los hooks así como
  // establecer observadores y limpiarlos
 after((resolvedValue) => {
  // puede ser usado para limpiar efectos secundarios
  // `resolvedValue` es el valor retornado por la acción, si es una
  // Promesa, será el valor resuelto en vez de la Promesa
 })
 onError((error) => {
  // puede ser usado para pasar errores
 })
})
```

#### Parameters %{#Methods-$onAction-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `callback` | [`StoreOnActionListener`](../modules/pinia.md#storeonactionlistener)<`Id`, `S`, `G`, `A`\> | callback llamado antes de cada acción |
| `detached?` | `boolean` | desvincular la suscripción del contexto desde el que se llama a esta opción |

#### Returns %{#Methods-$onAction-Returns}%

`fn`

función que elimina el observador

▸ (): `void`

Establece un callback cada vez que una acción está a punto de ser 
invocada. El callback recibe un objeto con toda la información relevante
de la acción invocada:
- `store`: el almacén sobre el que se invoca
- `name`: El nombre de la acción
- `args`: Los parámetros pasados a la acción

Además de esto, recibe dos funciones que permiten establecer un callback
una vez que la acción finaliza o cuando falla.

También devuelve una función para eliminar el callback. Ten en cuenta que al llamar a
`store.$onAction()` dentro de un componente, se limpiará automáticamente
cuando el componente sea desmontado a menos que `detached` sea true.

**`Ejemplo`**

```js
store.$onAction(({ after, onError }) => {
  // Aquí puedes compartir variables entre todos los hooks así como
  // establecer observadores y limpiarlos
 after((resolvedValue) => {
  // puede ser usado para limpiar efectos secundarios
  // `resolvedValue` es el valor retornado por la acción, si es una
  // Promesa, será el valor resuelto en vez de la Promesa
 })
 onError((error) => {
  // puede ser usado para pasar errores
 })
})
```

##### Retorna %{#Methods-$onAction-Returns-Returns}%

`void`

función que elimina el observador

___

### $patch %{#Methods-$patch}%

▸ **$patch**(`partialState`): `void`

Aplica un patch de estado al estado actual. Permite pasar valores anidados

#### Parámetros %{#Methods-$patch-Parameters}% 

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `partialState` | [`_DeepPartial`](../modules/pinia.md#_deeppartial)<`UnwrapRef`<`S`\>\> | patch para aplicar al estado |

#### Retorna %{#Methods-$patch-Returns}%

`void`

▸ **$patch**<`F`\>(`stateMutator`): `void`

Agrupa múltiples cambios en una función. Útil cuando se mutan objetos como 
Sets o arrays y aplicar un patch a un objeto no es práctico, por ejemplo, añadir 
a un array. La función pasada a `$patch()` **debe ser síncrona**.

#### Tipado de los parámetros %{#Methods-$patch-Type-parameters}%

| Nombre | Tipo |
| :------ | :------ |
| `F` | extiende (`state`: `UnwrapRef`<`S`\>) => `any` |

#### Parámetros %{#Methods-$patch-Parameters_1}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `stateMutator` | `ReturnType`<`F`\> extiende `Promise`<`any`\> ? `never` : `F` | función que muta `state`, no puede ser async |

#### Retorna %{#Methods-$patch-Returns_1}%

`void`

___

### $reset %{#Methods-$reset}%

▸ **$reset**(): `void`

Reinicia el almacén a su estado inicial mediante la construcción de un nuevo objeto de estado.
TODO: hacer esto solo para almacenes de opciones

#### Retorna %{#Methods-$reset-Returns}%

`void`

___

### $subscribe %{#Methods-$subscribe}%

▸ **$subscribe**(`callback`, `options?`): () => `void`

Establece un callback que se llamará cada vez que cambie el estado. También devuelve una función para eliminar el callback. Ten en cuenta
que cuando se llama a `store.$subscribe()` dentro de un componente, se limpiará automáticamente cuando el 
componente se desmonte a menos que `detached` sea true.

#### Parámetros %{#Methods-$subscribe-Parameters}%

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `callback` | [`SubscriptionCallback`](../modules/pinia.md#subscriptioncallback)<`S`\> | callback pasado al observador |
| `options?` | { `detached?`: `boolean`  } & `WatchOptions`<`boolean`\> | opciones de `watch` + `detached` para desvincular la suscripción del contexto (normalmente un componente) desde el que se llama. Ten en cuenta que la opción `flush` no afecta a las llamadas a `store.$patch()`. |

#### Retorna %{#Methods-$subscribe-Returns}%

`fn`

función que elimina el observador

▸ (): `void`

Establece un callback que se llamará cada vez que cambie el estado. También devuelve una función para eliminar el callback. Ten en cuenta
que cuando se llama a `store.$subscribe()` dentro de un componente, se limpiará automáticamente cuando el 
componente se desmonte a menos que `detached` sea true.

##### Retorna %{#Methods-$subscribe-Returns-Returns}%

`void`

función que elimina el observador
