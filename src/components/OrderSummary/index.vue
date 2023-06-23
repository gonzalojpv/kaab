<script setup lang="ts">
import useCheckout from '@/composables/checkout'

import { setAltImgOnError } from '@/utils/index'
import { ref, computed, watch } from 'vue'

type Order = {
  id: string | unknown
  name: string
  price: number
  amount: number
  quantity: number
  photo: string
}

interface Props {
  products: Array<Order>
}

const props = defineProps<Props>()

const { getTotal, updateQuantityItem, removeItem, onSubmitCheckout, tryTo } =
  useCheckout()

const paymentAmount = ref<number>(0)

const getReturnAmount = computed(() => {
  if (paymentAmount.value && paymentAmount.value > getTotal.value) {
    return paymentAmount.value - getTotal.value
  }

  return 0
})

watch(
  () => props.products,
  (newProducts: Array<Order>) => {
    if (!newProducts.length) {
      paymentAmount.value = 0
    }
  }
)
</script>
<template>
  <div class="mt-10 lg:mt-0">
    <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

    <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
      <h3 class="sr-only">Items in your cart</h3>
      <ul role="list" class="divide-y divide-gray-200">
        <li
          v-for="product in products"
          :key="String(product.id)"
          class="flex py-6 px-4 sm:px-6"
        >
          <div class="flex-shrink-0">
            <img
              :src="
                product.photo
                  ? product.photo
                  : 'https://via.placeholder.com/192x288.png'
              "
              :alt="product.name"
              class="w-20 rounded-md"
              @error="setAltImgOnError"
            />
          </div>

          <div class="ml-6 flex flex-1 flex-col">
            <div class="flex">
              <div class="min-w-0 flex-1">
                <h4 class="text-sm">
                  <a
                    :href="'#'"
                    class="font-medium text-gray-700 hover:text-gray-800"
                    >{{ product.name }}</a
                  >
                </h4>
              </div>

              <div class="ml-4 flow-root flex-shrink-0">
                <button
                  type="button"
                  class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                  @click="removeItem(String(product.id))"
                >
                  <span class="sr-only">Remove</span>
                  <!-- <TrashIcon class="h-5 w-5" aria-hidden="true" /> -->
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>

            <div class="flex flex-1 items-end justify-between pt-2">
              <p class="mt-1 text-sm font-medium text-gray-900">
                ${{ $filters.formatMoney(product.amount, 2) }}
              </p>

              <div class="ml-4">
                <label for="quantity" class="sr-only">Quantity</label>
                <input
                  id="quantity"
                  :value="product.quantity"
                  type="number"
                  class="rounded-md border border-gray-300 text-left text-base font-medium text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  name="quantity"
                  min="0"
                  @input="(value: Event) => updateQuantityItem(value, product.id)"
                />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <dl class="space-y-6 border-t border-gray-200 py-6 px-4 sm:px-6">
        <div class="flex items-center justify-between pt-6">
          <dt class="text-base font-medium">Total</dt>
          <dd class="text-base font-medium text-gray-900">
            ${{ $filters.formatMoney(getTotal, 2) }}
          </dd>
        </div>
        <div
          v-if="products.length"
          class="flex items-center justify-between pt-6"
        >
          <dt class="text-base font-medium">Recibo</dt>
          <dd class="text-base font-medium text-gray-900">
            <input v-model="paymentAmount" type="text" class="form-control" />
          </dd>
        </div>
        <div
          v-if="products.length && getReturnAmount"
          class="flex items-center justify-between pt-6"
        >
          <dt class="text-base font-medium">Cambio</dt>
          <dd class="text-base font-medium text-gray-900">
            ${{ $filters.formatMoney(getReturnAmount, 2) }}
          </dd>
        </div>
      </dl>

      <div
        v-if="products.length"
        class="border-t border-gray-200 py-6 px-4 sm:px-6"
      >
        <button
          type="button"
          class="w-full rounded-md border border-transparent bg-indigo-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          :disabled="tryTo"
          @click="onSubmitCheckout"
        >
          Pagar
        </button>
      </div>
    </div>
  </div>
</template>
