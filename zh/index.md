---
layout: home

title: Pinia
titleTemplate: The intuitive store for Vue.js

# TODO: translate text and tagline

hero:
  name: Pinia
  text: The intuitive store for Vue.js
  tagline: Type Safe, Extensible, and Modular by design. Forget you are even using a store.
  image:
    src: /logo.svg
    alt: Pinia
  actions:
    - theme: brand
      text: 开始使用
      link: /zh/introduction
    - theme: alt
      text: Demo 演示
      link: https://stackblitz.com/github/piniajs/example-vue-3-vite

features:
  - title: 💡 所见即所得
    details: 与组件类似的 Store。其 API 的设计旨在让你编写出更易组织的 store。
  - title: 🔑 类型安全
    details: 类型可自动推断，即使在 JavaScript 中亦可为你提供自动补全功能！
  - title: ⚙️ 开发工具支持
    details: 不管是 Vue 2 还是 Vue 3，支持 Vue devtools 钩子的 Pinia 都能给你更好的开发体验。
  - title: 🔌 可扩展性
    details: 可通过事务、同步本地存储等方式扩展 Pinia，以响应 store 的变更。
  - title: 🏗 模块化设计
    details: 可构建多个 Store 并允许你的打包工具自动拆分它们。
  - title: 📦 极致轻量化
    details: Pinia 大小只有 1kb 左右，你甚至可能忘记它的存在！
---

<script setup>
import HomeSponsors from '../.vitepress/theme/components/HomeSponsors.vue'
</script>

<HomeSponsors />
