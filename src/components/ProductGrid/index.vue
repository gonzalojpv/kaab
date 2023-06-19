<script setup lang="ts">
import type { Product } from '@/stores/models/product.model'

interface Props {
  products: Array<Product>
}

withDefaults(defineProps<Props>(), {
  products: () => []
})

const setAltImg = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/192x288.png'
}
</script>

<template>
  <div class="bg-white">
    <div
      class="mx-auto max-w-7xl overflow-hidden py-16 px-4 sm:py-24 sm:px-6 lg:px-8"
    >
      <div
        class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
      >
        <a
          v-for="product in products"
          :key="product.$id"
          :href="product.link"
          class="group text-sm"
        >
          <div
            class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
          >
            <img
              :src="
                product.photo
                  ? product.photo
                  : 'https://via.placeholder.com/192x288.png'
              "
              :alt="product.name"
              class="h-full w-full object-cover object-center"
              @error="setAltImg"
            />
          </div>
          <h3 class="mt-4 font-medium text-gray-900">{{ product.name }}</h3>
          <p class="italic text-gray-500">{{ product.stock }}</p>
          <p class="mt-2 font-medium text-gray-900">{{ product.price }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
