<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import useProduct from '@/composables/product'
import router from '@/router'

import type { Product as BaseProps } from '@/stores/models/product.model'
import { reactive, computed, ref } from 'vue'
import { required } from '@vuelidate/validators'
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
  stock: 0,
  pricePublicUnitary: 0,
  pricePublic: 0,
  priceWithTaxUnitary: 0,
  priceWithoutTaxUnitary: 0,
  priceWithTax: 0,
  priceWithoutTax: 0,
  revenue: 0
})

const { showNotification } = useNotification()
const { calculatePrices } = useProduct()
const product = useProductStore()

const toTry = ref<boolean>(false)

const rules = computed((): object => {
  return {
    name: { required },
    priceWithoutTax: { required },
    pricePublic: { required },
    quantity: { required },
    code: { required },
    barCode: { required }
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
  console.log('result', result)
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
</script>

<template>
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
          <label for="last-name" class="form-label">Price without Tax</label>
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
        <!-- priceWithTax -->
        <div>
          <label for="unitPrice" class="form-label">priceWithTax</label>
          <div class="mt-1">
            <input
              id="unitPrice"
              v-model="form.priceWithTax"
              type="number"
              name="unitPrice"
              min="0"
              step="0.1"
              autocomplete="unit-price"
              class="form-control"
              readonly
            />
          </div>
        </div>
        <!-- /.priceWithTax -->
        <!-- priceWithoutTaxUnitary -->
        <div>
          <label for="unitPrice" class="form-label"
            >priceWithoutTaxUnitary</label
          >
          <div class="mt-1">
            <input
              id="unitPrice"
              v-model="form.priceWithoutTaxUnitary"
              type="number"
              name="unitPrice"
              min="0"
              step="0.1"
              autocomplete="unit-price"
              class="form-control"
              readonly
            />
          </div>
        </div>
        <!-- /.priceWithoutTaxUnitary -->
        <!-- priceWithTaxUnitary -->
        <div>
          <label for="price" class="form-label">priceWithTaxUnitary</label>
          <div class="mt-1">
            <input
              id="price"
              v-model="form.priceWithTaxUnitary"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
              readonly
            />
          </div>
        </div>
        <!-- /.priceWithTaxUnitary -->
        <!-- pricePublic -->
        <div>
          <label for="price" class="form-label">Public price</label>
          <div class="mt-1">
            <input
              id="price"
              v-model="form.pricePublic"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
              :class="{ 'is-invalid': v$.pricePublic.$errors.length }"
              @blur="v$.pricePublic.$touch()"
            />
            <p
              v-for="err of v$.pricePublic.$errors"
              v-show="v$.pricePublic.$error"
              :key="err.$uid"
              class="invalid-feedback"
              role="alert"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
        <!-- /.pricePublic -->
        <!-- pricePublicUnitary -->
        <div>
          <label for="price" class="form-label">pricePublicUnitary</label>
          <div class="mt-1">
            <input
              id="price"
              v-model="form.pricePublicUnitary"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
              readonly
            />
          </div>
        </div>
        <!-- /.pricePublic -->
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
          <label for="postal-code" class="form-label">Bar code</label>
          <div class="mt-1">
            <input
              id="postal-code"
              v-model="form.barCode"
              type="text"
              name="postal-code"
              autocomplete="postal-code"
              class="form-control"
              :class="{ 'is-invalid': v$.barCode.$errors.length }"
              @blur="v$.barCode.$touch()"
            />
          </div>
        </div>

        <div class="text-right sm:col-span-2">
          <button :disabled="v$.$invalid || toTry" type="submit" class="btn">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
