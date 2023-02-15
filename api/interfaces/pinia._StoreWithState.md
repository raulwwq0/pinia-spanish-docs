---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [pinia](../modules/pinia.md) / \_StoreWithState

# Interfaz: \_StoreWithState<Id, S, G, A\> {#interface-storewithstate-id-s-g-a}

[pinia](../modules/pinia.md)._StoreWithState

Almacén base con estado y funciones. No debe utilizarse directamente.

## Tipado de los parámetros {#type-parameters}

| Nombre | Tipo |
| :------ | :------ |
| `Id` | extiende `string` |
| `S` | extiende [`StateTree`](../modules/pinia.md#statetree) |
| `G` | `G` |
| `A` | `A` |

## Jerarquía {#hierarchy}

- [`StoreProperties`](pinia.StoreProperties.md)<`Id`\>

  ↳ **`_StoreWithState`**

## Propiedades {#properties}

### $id {#id}

• **$id**: `Id`

Identificador único del almacén

#### Heredado de {#inherited-from}

[StoreProperties](pinia.StoreProperties.md).[$id](pinia.StoreProperties.md#$id)

___

### $state {#state}

• **$state**: `UnwrapRef`<`S`\> & [`PiniaCustomStateProperties`](pinia.PiniaCustomStateProperties.md)<`S`\>

Estado del almacén. Establecerlo reemplazará todo el estado.

___

### \_customProperties {#customproperties}

• **\_customProperties**: `Set`<`string`\>

Usado por el plugin devtools para obtener propiedades añadidas con plugins. Eliminado
en producción. Puede ser usado por el usuario para añadir claves de propiedades del almacén
que deberían mostrarse en devtools.

#### Heredado de {#inherited-from-1}

[StoreProperties](pinia.StoreProperties.md).[_customProperties](pinia.StoreProperties.md#_customproperties)

## Methods {#methods}

### $dispose {#dispose}

▸ **$dispose**(): `void`

Detiene el alcance del efecto asociado al almacén y lo elimina del registro.
Los plugins pueden sobrescribir este método para limpiar cualquier efecto añadido.
Por ejemplo, el plugin devtools deja de mostrar los almacenes desechados desde devtools.

#### Returns {#returns}

`void`

___

### $onAction {#onaction}

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

#### Parameters {#parameters}

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `callback` | [`StoreOnActionListener`](../modules/pinia.md#storeonactionlistener)<`Id`, `S`, `G`, `A`\> | callback llamado antes de cada acción |
| `detached?` | `boolean` | desvincular la suscripción del contexto desde el que se llama a esta opción |

#### Returns {#returns-1}

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

##### Retorna {#returns-2}

`void`

función que elimina el observador

___

### $patch {#patch}

▸ **$patch**(`partialState`): `void`

Aplica un patch de estado al estado actual. Permite pasar valores anidados

#### Parámetros {#parameters-1} 

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `partialState` | [`_DeepPartial`](../modules/pinia.md#_deeppartial)<`UnwrapRef`<`S`\>\> | patch para aplicar al estado |

#### Retorna {#returns-3}

`void`

▸ **$patch**<`F`\>(`stateMutator`): `void`

Agrupa múltiples cambios en una función. Útil cuando se mutan objetos como 
Sets o arrays y aplicar un patch a un objeto no es práctico, por ejemplo, añadir 
a un array. La función pasada a `$patch()` **debe ser síncrona**.

#### Tipado de los parámetros {#type-parameters-1}

| Nombre | Tipo |
| :------ | :------ |
| `F` | extiende (`state`: `UnwrapRef`<`S`\>) => `any` |

#### Parámetros {#parameters-2}

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `stateMutator` | `ReturnType`<`F`\> extiende `Promise`<`any`\> ? `never` : `F` | función que muta `state`, no puede ser async |

#### Retorna {#returns-4}

`void`

___

### $reset {#reset}

▸ **$reset**(): `void`

Reinicia el almacén a su estado inicial mediante la construcción de un nuevo objeto de estado.
TODO: hacer esto solo para almacenes de opciones

#### Retorna {#returns-5}

`void`

___

### $subscribe {#subscribe}

▸ **$subscribe**(`callback`, `options?`): () => `void`

Establece un callback que se llamará cada vez que cambie el estado. También devuelve una función para eliminar el callback. Ten en cuenta
que cuando se llama a `store.$subscribe()` dentro de un componente, se limpiará automáticamente cuando el 
componente se desmonte a menos que `detached` sea true.

#### Parámetros {#parameters-3}

| Nombre | Tipo | Descripción |
| :------ | :------ | :------ |
| `callback` | [`SubscriptionCallback`](../modules/pinia.md#subscriptioncallback)<`S`\> | callback pasado al observador |
| `options?` | { `detached?`: `boolean`  } & `WatchOptions`<`boolean`\> | opciones de `watch` + `detached` para desvincular la suscripción del contexto (normalmente un componente) desde el que se llama. Ten en cuenta que la opción `flush` no afecta a las llamadas a `store.$patch()`. |

#### Retorna {#returns-6}

`fn`

función que elimina el observador

▸ (): `void`

Establece un callback que se llamará cada vez que cambie el estado. También devuelve una función para eliminar el callback. Ten en cuenta
que cuando se llama a `store.$subscribe()` dentro de un componente, se limpiará automáticamente cuando el 
componente se desmonte a menos que `detached` sea true.

##### Retorna {#returns-7}

`void`

función que elimina el observador
