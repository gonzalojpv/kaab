<script setup lang="ts">
interface Props {
  name: string
  price: number
  photo?: string
  description: string
  priceWithoutTax: number
  priceWithTax: number
  priceWithoutTaxUnitary: number
  priceWithTaxUnitary: number
  pricePublic: number
  pricePublicUnitary: number
}

withDefaults(defineProps<Props>(), {
  name: 'Product Name',
  price: 0,
  photo: 'https://via.placeholder.com/192x288.png',
  description: ''
})

const setAltImg = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/192x288.png'
}
</script>
<template>
  <div class="bg-white">
    <div class="pt-6 pb-16 sm:pb-24">
      <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:auto-rows-min lg:grid-cols-2 lg:gap-x-2">
          <h1 class="col-span-2 mb-3 text-xl font-medium text-gray-900">
            {{ name }}
          </h1>
          <!-- Image gallery -->
          <div class="mt-8 lg:mt-0">
            <img
              :src="photo"
              alt="New Product"
              class="rounded-lg"
              @error="setAltImg"
            />
          </div>
          <div>
            <div class="flex">
              <span
                class="ml-2 rounded-full bg-green-600 py-0.5 px-2 text-xl font-medium tracking-wide text-gray-50"
                >${{ price }}</span
              >
            </div>
            <div class="mt-10">
              <h2 class="text-sm font-medium text-gray-900">Description</h2>

              <div class="prose prose-sm mt-4 text-gray-500">
                <p v-html="description"></p>
              </div>
            </div>
          </div>
          <div class="col-span-2 mt-8 flex flex-col">
            <div>
              <dl class="mt-2 space-y-6 text-sm font-medium text-gray-500">
                <div v-if="pricePublicUnitary" class="flex justify-between">
                  <dt>Unitary Price</dt>
                  <dd class="text-gray-900">${{ pricePublicUnitary }}</dd>
                </div>
                <div v-if="pricePublic" class="flex justify-between">
                  <dt>Public Price</dt>
                  <dd class="text-gray-900">${{ pricePublic }}</dd>
                </div>
                <div v-if="priceWithoutTax" class="flex justify-between">
                  <dt class="flex">
                    Price
                    <span
                      class="ml-2 rounded-full bg-red-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                      >Sin IVA</span
                    >
                  </dt>
                  <dd class="text-gray-900">${{ priceWithoutTax }}</dd>
                </div>
                <div v-if="priceWithTax" class="flex justify-between">
                  <dt class="flex">
                    Price Con IVA
                    <span
                      class="ml-2 rounded-full bg-green-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                      >Con IVA</span
                    >
                  </dt>
                  <dd class="text-gray-900">${{ priceWithTax }}</dd>
                </div>
                <div v-if="priceWithoutTaxUnitary" class="flex justify-between">
                  <dt class="flex">
                    Unitary Price
                    <span
                      class="ml-2 rounded-full bg-red-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                      >Sin IVA</span
                    >
                  </dt>
                  <dd class="text-gray-900">${{ priceWithoutTaxUnitary }}</dd>
                </div>
                <div v-if="priceWithTaxUnitary" class="flex justify-between">
                  <dt class="flex">
                    Unitary Price
                    <span
                      class="ml-2 rounded-full bg-green-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                      >Con IVA</span
                    >
                  </dt>
                  <dd class="text-gray-900">${{ priceWithTaxUnitary }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
