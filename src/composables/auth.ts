import router from '@/router'

import { useAuthStore } from '@/stores/auth'

export default function () {
  const auth = useAuthStore()

  const onLogout = () => {
    auth.logOut()

    router.push({ name: 'auth.login' })
  }

  return {
    onLogout
  }
}
