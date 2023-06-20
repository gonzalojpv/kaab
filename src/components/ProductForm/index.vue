<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import useProduct from '@/composables/product'
import BarcodeGenerator from '@/components/BarcodeGenerator/index.vue'
import useNotification from '@/composables/notification'
import vSelect from 'vue-select'

import { reactive, computed, ref, onMounted, watch } from 'vue'
import type { Product } from '@/stores/models/product.model'
import type { Brand } from '@/stores/models/brand.model'
import { required, integer } from '@vuelidate/validators'
import { useProductStore } from '@/stores/product'
import { useBrandStore } from '@/stores/brand'
import { storeToRefs } from 'pinia'

interface Props {
  product: Product
  productId: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (event: 'submit'): void
}>()

const form: Product = reactive({
  name: '',
  quantity: 1,
  price: null,
  code: '',
  barCode: '',
  stock: 1,
  pricePublicUnitary: 0,
  pricePublic: 0,
  priceWithTaxUnitary: 0,
  priceWithoutTaxUnitary: 0,
  priceWithTax: 0,
  priceWithoutTax: 0,
  revenue: null,
  photo: '',
  brand: ''
})

const productStore = useProductStore()
const brandStore = useBrandStore()

const { getAllBrands } = storeToRefs(brandStore)
const { calculatePrices } = useProduct()

const toTry = ref<boolean>(false)
const rules = computed((): object => {
  return {
    name: { required },
    priceWithoutTax: { required },
    pricePublic: { required },
    quantity: { required },
    code: { required },
    barCode: { required },
    stock: { required, integer }
  }
})

const buttonText = computed(() => {
  if (toTry.value) {
    return 'Updating...'
  }

  return 'Update'
})

const v$ = useVuelidate(rules, form)

const handlePrices = (): void => {
  const result = calculatePrices({
    quantity: form.quantity,
    price: form.priceWithoutTax
  })

  const {
    pricePublic,
    priceWithTax,
    priceWithoutTaxUnitary,
    priceWithTaxUnitary,
    pricePublicUnitary,
    revenue
  } = result

  form.pricePublic = pricePublic
  form.priceWithTax = priceWithTax
  form.priceWithoutTaxUnitary = priceWithoutTaxUnitary
  form.priceWithTaxUnitary = priceWithTaxUnitary
  form.pricePublicUnitary = pricePublicUnitary
  form.revenue = revenue

  if (form.quantity > 1) {
    form.price = pricePublicUnitary
  } else {
    form.price = pricePublic
  }
}

const setValueToForm = () => {
  Object.assign(form, props.product, {
    $collectionId: undefined,
    $createdAt: undefined,
    $databaseId: undefined,
    $id: undefined
  })
}

const onSubmit = (): void => {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    toTry.value = true
    productStore.updateProduct(form, props.productId).then(() => {
      toTry.value = false
      emit('submit')
    })
  }
}

const setAltImg = (event: Event): void => {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/192x288.png'
}

onMounted(() => {
  brandStore.fetchBrands()
  setValueToForm()
})

watch(
  () => props.product,
  () => {
    setValueToForm()
  }
)
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <form @submit.prevent="onSubmit">
      <div class="mt-10 pt-10">
        <h2 class="text-lg font-medium text-gray-900">
          Información del producto
        </h2>
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div
            v-if="props.product?.photo || form.barCode"
            class="flex justify-between sm:col-span-2"
          >
            <div v-if="props.product?.photo" class="mt-8 lg:mt-0">
              <img
                :src="props.product.photo"
                alt="New Product"
                class="rounded-lg"
                @error="setAltImg"
              />
            </div>
            <!-- BarCode -->
            <div v-if="form.barCode" class="text-center">
              <BarcodeGenerator :value="form.barCode" />
            </div>
            <!-- /.BarCode -->
          </div>
          <!-- Name -->
          <div>
            <label for="first-name" class="form-label">Nombre</label>
            <div class="mt-1">
              <input
                id="name"
                v-model="form.name"
                type="text"
                name="name"
                autocomplete="name"
                class="form-control"
                :class="{ 'is-invalid': v$.name.$errors.length }"
                @blur="v$.name.$touch()"
              />
              <p
                v-for="err of v$.name.$errors"
                v-show="v$.name.$error"
                :key="err.$uid"
                class="invalid-feedback"
                role="alert"
              >
                {{ err.$message }}
              </p>
            </div>
          </div>
          <!-- /.Name -->
          <!-- quantity -->
          <div>
            <label for="quantity" class="form-label">Cantidad</label>
            <div class="mt-1">
              <input
                id="quantity"
                v-model="form.quantity"
                type="number"
                name="quantity"
                autocomplete="quantity"
                class="form-control"
                :class="{ 'is-invalid': v$.quantity.$errors.length }"
                @blur="v$.quantity.$touch()"
                @input="handlePrices"
              />
              <p
                v-for="err of v$.quantity.$errors"
                v-show="v$.quantity.$error"
                :key="err.$uid"
                class="invalid-feedback"
                role="alert"
              >
                {{ err.$message }}
              </p>
            </div>
          </div>
          <!-- /.quantity -->
          <!-- priceWithoutTax -->
          <div>
            <label for="last-name" class="form-label">Precio sin IVA</label>
            <div class="mt-1">
              <input
                id="price"
                v-model="form.priceWithoutTax"
                type="text"
                name="price"
                autocomplete="price"
                class="form-control"
                :class="{ 'is-invalid': v$.priceWithoutTax.$errors.length }"
                @blur="v$.priceWithoutTax.$touch()"
                @input="handlePrices"
              />
              <p
                v-for="err of v$.priceWithoutTax.$errors"
                v-show="v$.priceWithoutTax.$error"
                :key="err.$uid"
                class="invalid-feedback"
                role="alert"
              >
                {{ err.$message }}
              </p>
            </div>
          </div>
          <!-- /.priceWithoutTax -->
          <!-- revenue -->
          <div>
            <label for="price" class="form-label">Ganancia</label>
            <div class="mt-1">
              <input
                id="price"
                v-model="form.revenue"
                type="text"
                name="price"
                autocomplete="price"
                class="form-control"
                readonly
              />
            </div>
          </div>
          <!-- /.revenue -->
          <!-- price -->
          <div>
            <label for="price" class="form-label">Precio</label>
            <div class="mt-1">
              <input
                id="price"
                v-model="form.price"
                type="text"
                name="price"
                autocomplete="price"
                class="form-control"
              />
            </div>
          </div>
          <!-- /.price -->
          <!-- Code -->
          <div>
            <label for="code" class="form-label">Code</label>
            <div class="mt-1">
              <input
                id="code"
                v-model="form.code"
                type="text"
                name="code"
                autocomplete="address-level1"
                class="form-control"
                :class="{ 'is-invalid': v$.code.$errors.length }"
                @blur="v$.code.$touch()"
              />
            </div>
          </div>
          <!-- /.Code -->
          <!-- stock -->
          <div>
            <label for="stock" class="form-label">Stock</label>
            <div class="mt-1">
              <input
                id="stock"
                v-model="form.stock"
                type="number"
                name="stock"
                autocomplete="stock"
                class="form-control"
                :class="{ 'is-invalid': v$.stock.$errors.length }"
                @blur="v$.stock.$touch()"
              />
              <p
                v-for="err of v$.stock.$errors"
                v-show="v$.stock.$error"
                :key="err.$uid"
                class="invalid-feedback"
                role="alert"
              >
                {{ err.$message }}
              </p>
            </div>
          </div>
          <!-- /.stock -->
          <!-- photo -->
          <div>
            <label for="stock" class="form-label">Foto</label>
            <div class="mt-1">
              <input
                id="photo"
                v-model="form.photo"
                type="url"
                name="photo"
                autocomplete="photo"
                class="form-control"
              />
            </div>
          </div>
          <!-- /.photo -->
          <!-- Brand -->
          <div>
            <label for="stock" class="form-label">Marca</label>
            <div class="mt-1">
              <vSelect
                v-model="form.brand"
                :clearable="false"
                class="mb-3"
                :options="getAllBrands"
                label="name"
                :reduce="(option: Brand) => option.name"
              />
            </div>
          </div>
          <!-- /.Brand -->
          <!-- Submit -->
          <div class="text-right sm:col-span-2">
            <button :disabled="v$.$invalid || toTry" type="submit" class="btn">
              {{ buttonText }}
            </button>
          </div>
          <!-- /.Submit -->
        </div>
      </div>
    </form>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div
            class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <dt class="flex">
                      Precio C.
                      <span
                        class="ml-2 rounded-full bg-green-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                        >Con IVA</span
                      >
                    </dt>
                  </th>
                  <th
                    scope="col"
                    class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <dt class="flex">
                      Precio U.
                      <span
                        class="ml-2 rounded-full bg-red-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                        >Sin IVA</span
                      >
                    </dt>
                  </th>
                  <th
                    scope="col"
                    class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    <dt class="flex">
                      Precio U.
                      <span
                        class="ml-2 rounded-full bg-green-600 py-0.5 px-2 text-xs tracking-wide text-gray-50"
                        >Con IVA</span
                      >
                    </dt>
                  </th>
                  <th
                    scope="col"
                    class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Precio S. U.
                  </th>
                  <th
                    scope="col"
                    class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Precio S.
                  </th>
                  <th
                    scope="col"
                    class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Ganancia
                  </th>
                  <th
                    scope="col"
                    class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
                  >
                    Precio Publico
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr>
                  <td
                    class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
                  >
                    ${{ form.priceWithTax }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900">
                    ${{ form.priceWithoutTaxUnitary }}
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    <dd class="text-gray-900">
                      ${{ form.priceWithTaxUnitary }}
                    </dd>
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    <dd class="text-gray-900">
                      ${{ form.pricePublicUnitary }}
                    </dd>
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    <dd class="text-gray-900">${{ form.pricePublic }}</dd>
                  </td>
                  <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                    ${{ form.revenue }}
                  </td>
                  <td
                    class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
                  >
                    <dd class="text-gray-900">${{ form.price }}</dd>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
