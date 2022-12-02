<script setup lang="ts">
import useVuelidate from '@vuelidate/core'

import type { Product as BaseProps } from '@/stores/models/product.model'
import { reactive, computed } from 'vue'
import { required } from '@vuelidate/validators'

interface Props extends BaseProps {
  name: string
}

const form: Props = reactive({
  name: '',
  unitPrice: 0,
  price: 0,
  suggestedPrice: 0,
  quantity: 0,
  category: '',
  code: '',
  barCode: '',
  description: ''
})

const rules = computed((): object => {
  return {
    name: { required },
    unitPrice: { required },
    price: { required },
    suggestedPrice: { required },
    quantity: { required },
    category: { required },
    code: { required },
    barCode: { required }
  }
})

const v$ = useVuelidate(rules, form)

const onSubmit = () => {
  console.log('onSubmit')
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
        <!-- unitPrice -->
        <div>
          <label for="unitPrice" class="form-label">Price Unity</label>
          <div class="mt-1">
            <input
              id="unitPrice"
              v-model="form.unitPrice"
              type="number"
              name="unitPrice"
              min="0"
              step="0.1"
              autocomplete="unit-price"
              class="form-control"
              :class="{ 'is-invalid': v$.unitPrice.$errors.length }"
              @blur="v$.unitPrice.$touch()"
            />
            <p
              v-for="err of v$.unitPrice.$errors"
              v-show="v$.unitPrice.$error"
              :key="err.$uid"
              class="invalid-feedback"
              role="alert"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
        <!-- /.unitPrice -->

        <div>
          <label for="last-name" class="form-label">Price</label>
          <div class="mt-1">
            <input
              id="price"
              v-model="form.price"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
              :class="{ 'is-invalid': v$.price.$errors.length }"
              @blur="v$.price.$touch()"
            />
            <p
              v-for="err of v$.price.$errors"
              v-show="v$.price.$error"
              :key="err.$uid"
              class="invalid-feedback"
              role="alert"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
        <!-- suggestedPrice -->
        <div>
          <label for="price" class="form-label">Suggested price</label>
          <div class="mt-1">
            <input
              id="price"
              v-model="form.suggestedPrice"
              type="text"
              name="price"
              autocomplete="price"
              class="form-control"
              :class="{ 'is-invalid': v$.suggestedPrice.$errors.length }"
              @blur="v$.suggestedPrice.$touch()"
            />
            <p
              v-for="err of v$.suggestedPrice.$errors"
              v-show="v$.suggestedPrice.$error"
              :key="err.$uid"
              class="invalid-feedback"
              role="alert"
            >
              {{ err.$message }}
            </p>
          </div>
        </div>
        <!-- /.suggestedPrice -->
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
        <!-- category -->
        <div>
          <label for="category" class="form-label">Categories</label>
          <div class="mt-1">
            <select
              id="category"
              v-model="form.category"
              name="category"
              autocomplete="category-name"
              class="form-control"
            >
              <option>United States</option>
              <option>Canada</option>
              <option>Mexico</option>
            </select>
          </div>
        </div>
        <!-- /.category -->
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
        <!-- description -->
        <div class="sm:col-span-2">
          <label for="phone" class="form-label">Description</label>
          <div class="mt-1">
            <textarea
              id="about"
              v-model="form.description"
              name="about"
              rows="3"
              class="form-control"
            ></textarea>
          </div>
          <p class="mt-2 text-sm text-gray-500">
            Write a few sentences about yourself.
          </p>
        </div>
        <!-- /.description -->

        <div class="text-right sm:col-span-2">
          <button type="submit" class="btn">Create</button>
        </div>
      </div>
    </div>
  </form>
</template>
