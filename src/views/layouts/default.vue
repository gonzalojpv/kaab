<script setup lang="ts">
import Header from '@/views/layouts/parts/header-auth.vue'
import Footer from '@/views/layouts/parts/footer.vue'

import { useRoute } from 'vue-router'

const route2 = useRoute()
</script>

<template>
  <Header v-if="route2.meta.withHeader" />
  <router-view v-slot="{ Component, route }">
    <transition name="route" mode="out-in">
      <main id="content" :key="route.name" role="main">
        <component :is="Component" />
      </main>
    </transition>
  </router-view>
  <Footer v-if="route2.meta.withFooter" />
</template>
