---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[API Documentation](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingOptions

# Interfaz: TestingOptions

[@pinia/testing](../modules/pinia_testing.md).TestingOptions

## Propiedades

### createSpy

• `Opcional` **createSpy**: (`fn?`: (...`args`: `any`[]) => `any`) => (...`args`: `any`[]) => `any`

#### Tipado de la declaración

▸ (`fn?`): (...`args`: `any`[]) => `any`

Función utilizada para crear un espía para las acciones y `$patch()`. Pre-configurado con `jest.fn()` en proyectos jest o `vi.fn()` en proyectos vitest. 

##### Parámetros

| Nombre | Tipo |
| :------ | :------ |
| `fn?` | (...`args`: `any`[]) => `any` |

##### Retorna

`fn`

▸ (...`args`): `any`

##### Parámetros

| Nombre | Tipo |
| :------ | :------ |
| `...args` | `any`[] |

##### Retorna

`any`

___

### fakeApp

• `Opcional` **fakeApp**: `boolean`

Crea una aplicación vacía y llama a `app.use(pinia)` con la pinia de prueba 
creada. Esto permite el uso de plugins mientras se realizan pruebas unitarias
ya que los plugins **esperarán a que pinia se instale para poder ejecutarse**.
Por defecto es false.

___

### initialState

• `Opcional` **initialState**: [`StateTree`](../modules/pinia.md#statetree)

Permite definir un estado inicial parcial para todos tus almacenes. Este estado se aplica después de que un almacén es creado, lo que le permite establecer sólo unas pocas propiedades que se requieren en tu prueba.

___

### plugins

• `Opcional` **plugins**: [`PiniaPlugin`](pinia.PiniaPlugin.md)[]

Plugins a instalar antes del plugin de pruebas. Añade cualquier plugin utilizado en 
tu aplicación que se utilizará durante las pruebas.

___

### stubActions

• `Opcional` **stubActions**: `boolean`

Cuando se establece en false, las acciones sólo son espiadas, aún así se ejecutarán. Cuando 
se establece en true, las acciones serán reemplazadas por espías, en lo que resulta que tu código 
no se ejecute. Por defecto es true. NOTA: al proveer `createSpy()`,
este **solo** hará que el argumento `fn` sea `undefined`. Aún tienes que
manejar esto en `createSpy()`.

___

### stubPatch

• `Opcional` **stubPatch**: `boolean`

Cuando se establece en true, llamadas a `$patch`  no cambiarán el estado. Por defecto es
false. NOTA: al proveer `createSpy()`, este **solo** hará que el argumento `fn` 
sea `undefined`. Aún tienes que manejar esto en `createSpy()`.
