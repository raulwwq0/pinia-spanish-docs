## Instalación

<VueMasteryLogoLink for="pinia-cheat-sheet">
</VueMasteryLogoLink>

Instala `pinia` con tu gestor de paquetes favorito:

```bash
yarn add pinia
# o con npm
npm install pinia
```

:::tip

Si tu aplicación está usando Vue<2.7 también necesitarás instalar la API de composición: `@vue/composition-api`. Si estás usando Nuxt tienes que seguir [estas instrucciones](/ssr/nuxt.md).
:::

Si estás usando Vue CLI puedes darle una oportunidad a este [**plugin no oficial**](https://github.com/wobsoriano/vue-cli-plugin-pinia)

Crea una instancia de Pinia (la raíz del almacén) y pásasela a la aplicación como si fuese un plugin:

```js {2,5-6,8}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

Si estás usando Vue 2 tendrás que instalar un plugin e inyectar la `pinia` creada en la raíz de la aplicación:

```js {1,3-4,12}
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // otras opciones...
  // ...
  // cabe destacar que la misma instancia de  `pinia` puede ser
  // usada en múltiples aplicaciones de Vue en la misma página
  pinia,
})
```

Esto también añade soporte para las herramientas de desarrollo. En Vue 3 algunas características como volver para atrás y editar no están todavía disponibles porque vue-devtools no muestra las APIs necesarias aún pero las herramientas de desarrollo tienen muchas más características y la experiencia de desarrollo está a otro nivel. En Vue 2, Pinia usa la ya existente interfaz para Vuex (y por tanto no se pueden usar a la vez).

## ¿Qué es un Almacén?

Un almacén (como Pinia) es una entidad que contiene el estado y la lógica de negocio que no está vinculada al árbol de componentes. En otras palabras, **contiene el estado global**. Es como si fuese un componente que está siempre ahí y todos los demás pueden leerlo y escribirlo. Tiene **tres conceptos**, el [estado](./core-concepts/state.md), [getters](./core-concepts/getters.md) y [acciones](./core-concepts/actions.md) y es seguro afirmar que estos conceptos son equivalentes a `datos`, `propiedades computadas` y `métodos` de los componentes.

## ¿Cuándo debería usar un Almacén?

Un almacén debería contener datos que pudiesen ser accesibles a lo largo de una aplicación. Esto incluye los datos que son usados en muchos sitios, como por ejemplo información del usuario que se está mostrando en la barra de navegación, así como datos que necesiten ser conservados entre páginas, como por ejemplo un formulario muy complejos con muchos pasos.

Por otro lado, deberías evitar incluir en el almacén datos que pueden ser guardados en un componente, como por ejemplo la visibilidad de un elemento de una página concreta.

No todas las aplicaciones necesitan acceso a un estado global, pero si la tuya lo necesita Pinia hará tu vida más sencilla.
