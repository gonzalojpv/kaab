<script setup lang="ts">
import ProductCard from '@/components/ProductCard/index.vue'

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

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
  <div v-if="getProduct" class="px-4 sm:px-6 lg:px-8">
    <ProductCard
      :description="'Lorem ipsum elit, urna consequat felis vehicula mollis dictumst, aenean non a in donec nulla.'"
      :name="getProduct.name"
      :price="Number(getProduct.price)"
      :photo="getProduct.photo || undefined"
      :price-without-tax="Number(getProduct.priceWithoutTax)"
      :price-with-tax="Number(getProduct.priceWithTax)"
      :price-without-tax-unitary="Number(getProduct.priceWithoutTaxUnitary)"
      :price-with-tax-unitary="Number(getProduct.priceWithTaxUnitary)"
      :price-public="Number(getProduct.pricePublic)"
      :price-public-unitary="Number(getProduct.pricePublicUnitary)"
    />
  </div>
</template>
