import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth' 

import routes from './routes'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
  const auth = useAuthStore()
  const { loggedIn } = storeToRefs(auth)
  const redirectToLogin = () => {
    const redirectFrom: string = routeTo.fullPath

    return next({
      name: 'auth.login',
      query: { redirectFrom },
      params: routeTo.params
    })
  }
  // Check if auth is required on this route
  // (including nested routes).// Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)
  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  if (!loggedIn.value) {
    redirectToLogin()
  }

  return next()
})

export default router
