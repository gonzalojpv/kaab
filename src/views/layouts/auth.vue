<script setup lang="ts">
import HeaderLogo from './parts/header-logo.vue'
</script>

<template>
  <HeaderLogo />
  <main id="content" role="main">
    <div class="content-space-1 space-xl-3 container">
      <router-view />
    </div>
  </main>
</template>
