# Uso de almacenes fuera de componentes %{#using-a-store-outside-of-a-component}%

Los almacenes de Pinia dependen de la instancia de `pinia` para compartir la misma instancia del almacén a través de todas las llamadas de la misma. La mayoría del tiempo esto funciona por defecto solo con llamar a tu función `useStore()`. Por ejemplo, en `setup()`, no necesitas hacer nada más. Pero las cosas son un poco diferentes fuera de un componente. 

Detrás de cámaras, `useStore()` _inyecta_ la instancia de `pinia` para dársela a tu `app`. Esto significa que si la instancia de `pinia` no se puede inyectar automáticamente, tendrás que proveerlo manualmente a la función `useStore()`.

Puedes solucionar esto de varias formas según el tipo de aplicación que estás escribiendo.

## Aplicaciones de una sola página (SPA) %{#single-page-applications}%

Si no estás haciendo nada de SSR (Renderizado del Lado del Servidor), cualquier llamada de `useStore()` tras instalar el plugin de pinia con `app.use(pinia)` funcionará:

```js
import { useUserStore } from '@/stores/user'
import { createApp } from 'vue'
import App from './App.vue'

// ❌  falla porque es llamada antes de que la pinia esté creada
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ funciona porque la instancia de pinia está activa
const userStore = useUserStore()
```

La forma más fácil para asegurar esto es aplicarlo siempre para _posponer_ las llamadas de `useStore()` mediante la colocación de esto dentro de funciones que siempre se ejecutarán después de la instalación de pinia.

Vamos a echar un vistazo a este ejemplo del uso de un almacén dentro de una guardia de navegación con Vue Router:

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ Dependiendo del orden de los imports esto fallará
const store = useStore()

router.beforeEach((to, from, next) => {
  // queremos usar el almacén aquí
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ Esto funcionará porque el router comienza su navegación después
  // de que el router esté instalado y pinia también lo estará
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

## Aplicaciones SSR %{#ssr-apps}%

Cuando tratas con Renderizado del Lado del Servidor, tendrás que pasar la instancia de `pinia` a `useStore()`. Esto previene que pinia comparta el estado global entre las distintas instancias de la aplicación.

Hay una sección entera dedicada a esto en la [guía de SSR](/ssr/index.md), esto es solo una pequeña explicación.
