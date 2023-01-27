<script setup lang="ts">
import ProductForm from '@/components/ProductForm/index.vue'

import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const productStore = useProductStore()

const { getProduct } = storeToRefs(productStore)

onMounted(() => {
  if (route.params.productId) {
    productStore.fetchProduct(String(route.params.productId))
  }
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <ProductForm :product="getProduct" />
  </div>
</template>
