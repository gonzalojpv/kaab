<script setup lang="ts">
import ProductGrid from '@/components/ProductGrid/index.vue'
import OrderSummary from '@/components/OrderSummary/index.vue'

import { useProductStore } from '@/stores/product'
import { useCheckoutStore } from '@/stores/checkout'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const checkoutStore = useCheckoutStore()

const { getAllProducts } = storeToRefs(productStore)
const { getOrder } = storeToRefs(checkoutStore)
</script>
<template>
  <div class="bg-gray-50">
    <div
      class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Checkout</h2>

      <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <ProductGrid :products="getAllProducts" />
        </div>

        <!-- Order summary -->
        <OrderSummary :products="getOrder" />
      </form>
    </div>
  </div>
</template>
