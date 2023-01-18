# Renderizado del Lado del Servidor (SSR) {#server-side-rendering-ssr}

:::tip
Si estás usando **Nuxt.js,** necesitas leer [**estas instrucciones**](./nuxt.md) en lugar de estas.
:::

La creación de almacenes con Pinia debería funcionar de forma inmediata para SSR siempre y cuando llame a sus funciones `useStore()` en la parte superior de las funciones `setup`, `getters` y `acciones`:

```js
export default defineComponent({
  setup() {
    // esto funciona porque pinia sabe que aplicación está ejecutándose
    // dentro de `setup()`
    const main = useMainStore()
    return { main }
  },
})
```

## Usar el almacén fuera de `setup()` {#using-the-store-outside-of-setup}

Si necesitas usar el almacén en algún otro lugar, necesitas pasar la instancia de `pinia` [que fue pasada a la aplicación](#install-the-plugin) a la llamada de la función `useStore()`:

```js
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

router.beforeEach((to) => {
  // ✅ Esto funcionará si te aseguras que usas el almacén
  // correcto en la aplicación que está siendo ejecutada
  const main = useMainStore(pinia)

  if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})
```

Pinia se añadirá convenientemente como `$pinia` a tu aplicación para que puedas usarla en funciones como `serverPrefetch()`:

```js
export default {
  serverPrefetch() {
    const store = useStore(this.$pinia)
  },
}
```

## Hidratación del Estado {#state-hydration}

Para hidratar en estado inicial, necesitas asegurarte que el estado raíz este incluido en algún lugar del HTML para que Pinia lo recoja más adelante. Dependiendo de para que uses SSR, **deberás escapar el estado por razones de seguridad**. Recomendamos usar [@nuxt/devalue](https://github.com/nuxt-contrib/devalue) que es el usado por Nuxt.js:

```js
import devalue from '@nuxt/devalue'
import { createPinia } from 'pinia'
// recupera el estado raíz del lado del servidor
const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)

// después de renderizar la página, el estado raíz es construido y puede ser
// leído directamente en `pinia.state.value`.

// serializa, escapa (MUY importante si el contenido del estado pude ser cambiado)
// por el usuario, que casi siempre es el caso), y ponlo en algún lugar de la
// página, por ejemplo, como una variable global.
devalue(pinia.state.value)
```

Dependiendo de para que uses SSR, deberás poner una variable de _estado inicial_ que será serializada en el HTML. También deberás protegerte contra ataques XSS. Por ejemplo, con [vite-ssr](https://github.com/frandiox/vite-ssr) puedes usar la [opción `transformState`](https://github.com/frandiox/vite-ssr#state-serialization) y `@nuxt/devalue`:

```js
import devalue from '@nuxt/devalue'

export default viteSSR(
  App,
  {
    routes,
    transformState(state) {
      return import.meta.env.SSR ? devalue(state) : state
    },
  },
  ({ initialState }) => {
    // ...
    if (import.meta.env.SSR) {
      // esto será convertido a string y puesto en window.__INITIAL_STATE__
      initialState.pinia = pinia.state.value
    } else {
      // en el lado del cliente, restauramos el estado
      pinia.state.value = initialState.pinia
    }
  }
)
```

Puedes usar [otras alternativas](https://github.com/nuxt-contrib/devalue#see-also) a `@nuxt/devalue` dependiendo de lo que necesites, por ejemplo, si puedes serializar y parsear tu estado con `JSON.stringify()`/`JSON.parse()`, **puedes mejorar mucho tu rendimiento**.

Adapta esta estrategia a tu entorno. Asegúrate de hidratar el estado de pinia antes de llamar a cualquier función `useStore()` en el lado del cliente. Por ejemplo, si serializamos el estado dentro de una etiqueta `<script>` para hacerlo accesible globalmente en el lado del cliente a través de `window.__pinia`, podemos escribir esto:

```js
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// debe ser establecido por el usuario
if (isClient) {
  pinia.state.value = JSON.parse(window.__pinia)
}
```
