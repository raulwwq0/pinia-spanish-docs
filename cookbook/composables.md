# Tratando con Composables {#dealing-with-composables}

Los [Composables](https://vuejs.org/guide/reusability/composables.html#composables) son funciones que aprovechan la API de composición de Vue para encapsular y reutilizar la lógica con estado. Ya sea que escribas el tuyo propio, usa [bibliotecas externas](https://vueuse.org/) o hacer ambas cosas, puedes usar completamente el poder de Composables en tus almacenes pinia.

## Almacén de opciones {#option-stores}

Al definir un almacén de opciones, puedes llamar a un composable dentro de la propiedad `state`:

```ts
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),
})
```

Ten en cuenta que **solo puedes devolver el estado de escritura** (por ejemplo, un `ref()`). Estos son algunos ejemplos de composables que puedes usar:

- [useLocalStorage](https://vueuse.org/core/useLocalStorage/)
- [useAsyncState](https://vueuse.org/core/useAsyncState/)

Estos son algunos ejemplos de composables que no se pueden usar en almacenes de opciones (pero se pueden usar con almacenes de configuración):

- [useMediaControls](https://vueuse.org/core/useMediaControls/): expone funciones
- [useMemoryInfo](https://vueuse.org/core/useMemory/): expone datos de solo lectura
- [useEyeDropper](https://vueuse.org/core/useEyeDropper/): 
expone datos y funciones de solo lectura

## Almacenes de configuración {#setup-stores}

Por otro lado, al definir un almacén de configuración, puede usar casi cualquier composable ya que cada propiedad se distingue en estado, acción o getter:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useMediaControls } from '@vueuse/core'

export const useVideoPlayer = defineStore('video', () => {
  // no expondremos este elemento directamente
  const videoElement = ref<HTMLVideoElement>()
  const src = ref('/data/video.mp4')
  const { playing, volume, currentTime, togglePictureInPicture } =
    useMediaControls(video, { src })

  function loadVideo(element: HTMLVideoElement, src: string) {
    videoElement.value = element
    src.value = src
  }

  return {
    src,
    playing,
    volume,
    currentTime,

    loadVideo,
    togglePictureInPicture,
  }
})
```

## SSR

Cuando se trata del [Renderizado del lado del servidor](../ssr/index.md), debes realizar algunos pasos adicionales para poder usar composables dentro de tus almacenes.

En el [Almacén de opciones](#option-stores), necesitas definir una función `hydrate()`. Se llama a esta función cuando se crea una instancia del almacén en el cliente (el navegador) cuando hay un estado inicial disponible en el momento en que se crea el almacén. La razón por la que necesitamos definir esta función es porque en tal escenario, `state()` no se llama.

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: useLocalStorage('pinia/auth/login', 'bob'),
  }),

  hydrate(state, initialState) {
    // en este caso podemos ignorar completamente el estado inicial ya que
    // queremos leer el valor del navegador
    state.user = useLocalStorage('pinia/auth/login', 'bob')
  },
})
```

En los [Almacenes de configuración](#setup-stores), necesitas usar un helper llamado `skipHydrate()` en cualquier propiedad de estado que no deba tomarse del estado inicial. A diferencia de los almacenes de opciones, los almacenes de configuración no pueden simplemente _saltarse llamando a `state()`_, por lo que marcamos las propiedades que no se pueden hidratar con `skipHydrate()`. Ten en cuenta que esto solo se aplica a las propiedades reactivas modificables:

```ts
import { defineStore, skipHydrate } from 'pinia'
import { useEyeDropper, useLocalStorage } from '@vueuse/core'

export const useColorStore = defineStore('colors', () => {
  const { isSupported, open, sRGBHex } = useEyeDropper()
  const lastColor = useLocalStorage('lastColor', sRGBHex)
  // ...
  return {
    lastColor: skipHydrate(lastColor), // Ref<string>
    open, // Función
    isSupported, // boolean (ni siquiera reactivo)
  }
})
```
