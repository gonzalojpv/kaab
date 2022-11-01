<script setup lang="ts">
import router from '@/router'
import AuthLoginForm from '@/components/AuthLoginForm/index.vue'
import useNotification from '@/composables/notification'

import type { AuthCredentials } from '@/store/models/auth.model'
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()

const { showNotification } = useNotification()

const loginFormRef = ref<InstanceType<typeof AuthLoginForm> | null>(null)

const onSubmit = async (form: AuthCredentials): Promise<void> => {
  try {
    const response = await auth.login(form)
    console.log('----', response)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: string | any) {
    showNotification({
      text: error,
      icon: 'success'
    })
  }

  loginFormRef.value?.setTryTo(false)
}
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img
          class="mx-auto h-20 w-auto"
          src="@/assets/images/logo.png"
          alt="More"
        />
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>

      <AuthLoginForm ref="loginFormRef" @submit="onSubmit" />
    </div>
  </div>
</template>
