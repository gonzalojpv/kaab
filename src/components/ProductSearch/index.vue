<script setup lang="ts">
import { reactive } from 'vue'
import { useProductStore } from '@/stores/product'
import { storeToRefs } from 'pinia'

import type { Product } from '@/stores/models/product.model'

const emit = defineEmits<{
  (event: 'submit'): Array<Product>
}>()
const form = reactive({
  q: ''
})

const productStore = useProductStore()

const { getAllProducts } = storeToRefs(productStore)

const onSubmit = async () => {
  console.log('.....', form.q)
  if (form.q) {
    await productStore.searchProduct(form.q)
    emit('submit', getAllProducts)
  }

  emit('submit', null)
}
</script>

<template>
  <form class="flex w-full md:ml-0" @submit.prevent="onSubmit">
    <label for="search-field" class="sr-only">Search</label>
    <div class="relative w-full text-gray-400 focus-within:text-gray-600">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center"
        aria-hidden="true"
      >
        <i class="far fa-search"></i>
      </div>
      <input
        id="search-field"
        v-model="form.q"
        name="search-field"
        class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        placeholder="Buscar producto"
        type="search"
      />
    </div>
  </form>
</template>
