---
sidebar: "auto"
editLink: false
sidebarDepth: 3
---

[Documentación de la API](../index.md) / @pinia/testing

# Módulo: @pinia/testing %{#module-pinia-testing}%

## Interfaces %{#Interfaces}%

-   [TestingOptions](../interfaces/pinia_testing.TestingOptions.md)
-   [TestingPinia](../interfaces/pinia_testing.TestingPinia.md)

## Funciones %{#Functions}%

### createTestingPinia %{#Functions-createTestingPinia}%

▸ **createTestingPinia**(`options?`): [`TestingPinia`](../interfaces/pinia_testing.TestingPinia.md)

Crea una instancia de pinia diseñada para test unitarios que **requiere simular**
los almacenes. Por defecto, **todas las acciones son simuladas** y por tanto
no se ejecutan. Esto te permite hacer test unitarios a tu almacén y componentes
de forma separada. Puedes cambiar esto con la opción `stubActions`. Si estás usando
jest, son reemplazadas con `jest.fn()`, de lo contrario deberás proporcionar
tu propia opción `createSpy`.

#### Parámetros %{#Functions-createTestingPinia-Parameters}%

| Nombre    | Tipo                                                              | Descripción                                       |
| :-------- | :---------------------------------------------------------------- | :------------------------------------------------ |
| `options` | [`TestingOptions`](../interfaces/pinia_testing.TestingOptions.md) | opciones para configurar los almacenes de pruebas |

#### Retorna %{#Functions-createTestingPinia-Returns}%

[`TestingPinia`](../interfaces/pinia_testing.TestingPinia.md)

una instancia de pinia aumentada