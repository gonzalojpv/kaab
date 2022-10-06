<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'

import { useHead } from '@vueuse/head'

// useHead({
//       title: 'Default title',
//       meta: [
//         {
//           name: 'description',
//           content: 'This is a DEFAULT description',
//         },
//         {
//           name: 'other-stuff',
//           content: 'This is some OTHER stuff',
//         },
//       ],
//     })
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
