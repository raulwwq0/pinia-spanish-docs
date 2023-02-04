---
sidebar: "auto"
editLinks: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / [@pinia/testing](../modules/pinia_testing.md) / TestingOptions

# Interfaz: TestingOptions {#interface-testingoptions}

[@pinia/testing](../modules/pinia_testing.md).TestingOptions

## Propiedades {#properties}

### createSpy {#createspy}

• `Opcional` **createSpy**: (`fn?`: (...`args`: `any`[]) => `any`) => (...`args`: `any`[]) => `any`

#### Tipado de la declaración {#type-declaration}

▸ (`fn?`): (...`args`: `any`[]) => `any`

Función utilizada para crear un espía para las acciones y `$patch()`. Pre-configurado con `jest.fn()` en proyectos jest o `vi.fn()` en proyectos vitest. 

##### Parámetros {#parameters}

| Nombre | Tipo |
| :------ | :------ |
| `fn?` | (...`args`: `any`[]) => `any` |

##### Retorna {#returns}

`fn`

▸ (...`args`): `any`

##### Parámetros {#parameters-1}

| Nombre | Tipo |
| :------ | :------ |
| `...args` | `any`[] |

##### Retorna {#returns-1}

`any`

___

### fakeApp {#fakeapp}

• `Opcional` **fakeApp**: `boolean`

Crea una aplicación vacía y llama a `app.use(pinia)` con la pinia de prueba 
creada. Esto permite el uso de plugins mientras se realizan pruebas unitarias
ya que los plugins **esperarán a que pinia se instale para poder ejecutarse**.
Por defecto es false.

___

### initialState {#initialstate}

• `Opcional` **initialState**: [`StateTree`](../modules/pinia.md#statetree)

Permite definir un estado inicial parcial para todos tus almacenes. Este estado se aplica después de que un almacén es creado, lo que le permite establecer sólo unas pocas propiedades que se requieren en tu prueba.

___

### plugins {#plugins}

• `Opcional` **plugins**: [`PiniaPlugin`](pinia.PiniaPlugin.md)[]

Plugins a instalar antes del plugin de pruebas. Añade cualquier plugin utilizado en 
tu aplicación que se utilizará durante las pruebas.

___

### stubActions {#stubactions}

• `Opcional` **stubActions**: `boolean`

Cuando se establece en false, las acciones sólo son espiadas, aún así se ejecutarán. Cuando 
se establece en true, las acciones serán reemplazadas por espías, en lo que resulta que tu código 
no se ejecute. Por defecto es true. NOTA: al proveer `createSpy()`,
este **solo** hará que el argumento `fn` sea `undefined`. Aún tienes que
manejar esto en `createSpy()`.

___

### stubPatch {#stubpatch}

• `Opcional` **stubPatch**: `boolean`

Cuando se establece en true, llamadas a `$patch`  no cambiarán el estado. Por defecto es
false. NOTA: al proveer `createSpy()`, este **solo** hará que el argumento `fn` 
sea `undefined`. Aún tienes que manejar esto en `createSpy()`.
