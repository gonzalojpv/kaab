<script setup lang="ts">
import useVuelidate from '@vuelidate/core'

import { computed, reactive, ref } from 'vue'
import { required, email } from '@vuelidate/validators'
import { AuthCredentials } from '@/stores/models/auth.model'

const emit = defineEmits<{
  (event: 'submit', form: AuthCredentials): void
}>()

const passwordType = ref<string>('password')
const tryTo = ref<boolean>(false)
const form: AuthCredentials = reactive({
  email: '',
  password: ''
})

const rules = computed((): object => {
  return {
    email: { required, email },
    password: { required }
  }
})

const v$ = useVuelidate(rules, form)

const showCurrent = () => {
  if (passwordType.value === 'password') {
    passwordType.value = 'text'
  } else {
    passwordType.value = 'password'
  }
}

const setTryTo = (newVal: boolean) => (tryTo.value = newVal)

const onSubmit = () => {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    setTryTo(true)
    emit('submit', form)
  }
}

defineExpose({
  setTryTo
})
</script>

<template>
  <form class="mt-8 space-y-6" @submit.prevent="onSubmit">
    <input type="hidden" name="remember" value="true" />
    <div class="shadow-sm">
      <div class="mt-3">
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          v-model="form.email"
          name="email"
          type="email"
          autocomplete="email"
          class="form-control"
          placeholder="Email address"
          :class="{ 'is-invalid': v$.email.$errors.length }"
          @blur="v$.email.$touch()"
        />
      </div>
      <div class="mt-3">
        <label for="password" class="sr-only">Password</label>
        <div class="relative mt-1">
          <input
            id="password"
            v-model="form.password"
            name="password"
            :type="passwordType"
            autocomplete="current-password"
            class="form-control input-group-right"
            placeholder="Password"
            :class="{ 'is-invalid': v$.password.$errors.length }"
            @blur="v$.password.$touch()"
          />
          <span class="input-icon-right" @click.prevent="showCurrent">
            <i v-if="'password' === passwordType" class="far fa-eye-slash" />
            <i v-else class="far fa-eye" />
          </span>
          <p
            v-for="err of v$.email.$errors"
            v-show="v$.email.$error"
            :key="err.$uid"
            class="invalid-feedback"
            role="alert"
          >
            {{ err.$message }}
          </p>
        </div>
      </div>
    </div>

    <div>
      <button
        type="submit"
        :disabled="tryTo"
        class="btn group relative flex w-full justify-center"
      >
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <i class="far fa-lock"></i>
        </span>
        Sign in
      </button>
    </div>
  </form>
</template>
