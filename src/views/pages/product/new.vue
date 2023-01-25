<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import useProduct from '@/composables/product'
import router from '@/router'
import BarcodeGenerator from '@/components/BarcodeGenerator/index.vue'
import ProductCard from '@/components/ProductCard/index.vue'

import type { Product as BaseProps } from '@/stores/models/product.model'
import { reactive, computed, ref } from 'vue'
import { required, integer } from '@vuelidate/validators'
import { useProductStore } from '@/stores/product'
import useNotification from '@/composables/notification'

interface Props extends BaseProps {
  name: string
}

const form: Props = reactive({
  name: '',
  quantity: 1,
  price: 0,
  code: '',
  barCode: '',
  stock: 1,
  pricePublicUnitary: 0,
  pricePublic: 0,
  priceWithTaxUnitary: 0,
  priceWithoutTaxUnitary: 0,
  priceWithTax: 0,
  priceWithoutTax: 0,
  revenue: 0,
  photo: ''
})

const { showNotification } = useNotification()
const { calculatePrices } = useProduct()
const product = useProductStore()

const toTry = ref<boolean>(false)
let barcode: string
let interval: ReturnType<typeof setInterval>

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
    return 'Creating...'
  }

  return 'Create'
})

const v$ = useVuelidate(rules, form)

const onSubmit = async () => {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    toTry.value = true
    await product.createProduct({ ...form })
    toTry.value = false
    showNotification({
      text: 'Created',
      icon: 'success',
      didClose: () => {
        router.push({ name: 'product.list' })
      }
    })
  }
}

const handlePrices = () => {
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

document.addEventListener('keydown', (evt) => {
  if (interval) clearInterval(interval)

  if (evt.code == 'Enter') {
    if (barcode) form.barCode = barcode
    barcode = ''
    return
  }

  if (evt.key != 'Shift') barcode += evt.key
  interval = setInterval(() => (barcode = ''), 20)
})
</script>

<template>
  <div class="grid grid-cols-1 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
    <div>
      <ProductCard
        :description="'Lorem ipsum elit, urna consequat felis vehicula mollis dictumst, aenean non a in donec nulla.'"
        :name="form.name"
        :price="Number(form.price)"
        :photo="form.photo"
        :price-without-tax="Number(form.priceWithoutTax)"
        :price-with-tax="Number(form.priceWithTax)"
        :price-without-tax-unitary="Number(form.priceWithoutTaxUnitary)"
        :price-with-tax-unitary="Number(form.priceWithTaxUnitary)"
        :price-public="Number(form.pricePublic)"
        :price-public-unitary="Number(form.pricePublicUnitary)"
      />
    </div>
    <div>
      <form class="px-4 sm:px-6 lg:px-8" @submit.prevent="onSubmit">
        <div class="mt-10 pt-10">
          <h2 class="text-lg font-medium text-gray-900">Product information</h2>
          <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <!-- Name -->
            <div>
              <label for="first-name" class="form-label">Name</label>
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
            <div v-if="form.barCode" class="text-center">
              <BarcodeGenerator :value="form.barCode" />
            </div>
            <!-- quantity -->
            <div>
              <label for="quantity" class="form-label">Quantity</label>
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
              <label for="last-name" class="form-label"
                >Price without Tax</label
              >
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
              <label for="price" class="form-label">revenue</label>
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
              <label for="price" class="form-label">price</label>
              <div class="mt-1">
                <input
                  id="price"
                  v-model="form.price"
                  type="text"
                  name="price"
                  autocomplete="price"
                  class="form-control"
                  readonly
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

            <div>
              <label for="bar-code" class="form-label">Bar code</label>
              <div class="mt-1">
                <input
                  id="bar-code"
                  v-model="form.barCode"
                  type="text"
                  name="bar-code"
                  readonly
                  autocomplete="bar-code"
                  class="form-control"
                  :class="{ 'is-invalid': v$.barCode.$errors.length }"
                  @blur="v$.barCode.$touch()"
                />
              </div>
            </div>
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
              <label for="stock" class="form-label">Photo</label>
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
            <div class="text-right sm:col-span-2">
              <button
                :disabled="v$.$invalid || toTry"
                type="submit"
                class="btn"
              >
                {{ buttonText }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
