<script setup lang="ts">
import ProductList from '@/components/ProductList/index.vue'
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Products</h1>
        <p class="mt-2 text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat
          felis vehicula class ultricies mollis dictumst, aenean non a in donec
          nulla.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <router-link :to="{ name: 'product.new' }" class="btn">
          Add Product
        </router-link>
      </div>
    </div>
    <ProductList />
  </div>
</template>
