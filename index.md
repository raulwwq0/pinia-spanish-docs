---
layout: home

title: Pinia
titleTemplate: El almacén intuitivo para Vue.js

hero: 
  name: Pinia
  text: El almacén intuitivo para Vue.js
  tagline: Tipado Seguro, Extensible, y diseñado para ser Modular. Incluso olvida que estas usando un almacén.
  image:
    src: /logo.svg
    alt: Pinia
  actions:
    - theme: brand
      text: Comenzar
      link: /introduction
    - theme: alt
      text: Demo
      link: https://stackblitz.com/github/piniajs/example-vue-3-vite
    - theme: cta vueschool
      text: Mira un video de introducción
      link: https://vueschool.io/lessons/introduction-to-pinia?friend=vuerouter&utm_source=pinia&utm_medium=link&utm_campaign=homepage
    - theme: cta vue-mastery
      text: Obtén la Cheat Sheet de Pinia
      link: https://www.vuemastery.com/pinia?coupon=PINIA-DOCS&via=eduardo

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
---

<script setup>
import HomeSponsors from './.vitepress/theme/components/HomeSponsors.vue'
import './.vitepress/theme/styles/home-links.css'
</script>

<HomeSponsors />
