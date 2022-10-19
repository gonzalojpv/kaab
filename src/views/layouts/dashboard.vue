<script setup lang="ts">
import HeaderAuth from './parts/header-auth.vue'
import SidebarAuth from './parts/sidebar-auth.vue'
import PageHeader from './parts/page-header.vue'
</script>

<template>
  <div class="min-h-full">
    <SidebarAuth />

    <div class="flex flex-1 flex-col lg:pl-64">
      <HeaderAuth />
      <main class="flex-1 pb-8">
        <PageHeader />
        <router-view v-slot="{ Component, route }">
          <transition name="route" mode="out-in">
            <main id="content" :key="route.name" role="main">
              <component :is="Component" />
            </main>
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>
