---
home: true
title: Inicio
heroImage: /logo.svg
actionText: Comenzar
actionLink: /introduction.html

altActionText: Demo
altActionLink: https://stackblitz.com/github/piniajs/example-vue-3-vite

features:
  - title: 💡 Intuitivo
    details: Los almacenes son muy similares a los componentes. La API está diseñada para que puedas escribir almacenes bien organizadas.
  - title: 🔑 Tipa Seguro
    details: Los tipos se deducen, lo que significa que los almacenes te ayudan con auto-completado ¡incluso en JavaScript!
  - title: ⚙️ Soporte para las Herramientas de Desarrollo
    details: Pinia se conecta a Vue Devtools para ofrecerte una experiencia de desarrollo mejorada tanto en Vue 2 como en Vue 3.
  - title: 🔌 Ampliable
    details: Reacciona a los cambios de los almacenes para ampliar Pinia con transacciones, sincronización de almacenamiento local, etc.
  - title: 🏗 Diseño Modular
    details: Crea varios almacenes y deja que tu bundler las divida automáticamente.
  - title: 📦 Extremadamente Ligero
    details: Pinia pesa ~1.5kb, ¡ni siquiera recordarás que está ahí!
footer: MIT Licensed | Copyright © 2019-present Eduardo San Martin Morote
---

<ClientOnly>
  <ThemeToggle/>
  <!-- <TestStore/> -->
</ClientOnly>

<HomeSponsors />

<script setup>
import HomeSponsors from './.vitepress/components/HomeSponsors.vue'
import ThemeToggle from './.vitepress/components/ThemeToggle.vue'
// import TestStore from './.vitepress/components/TestStore.vue'
</script>
