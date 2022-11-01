import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((routeTo, routeFrom, next) => {
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

  redirectToLogin()
})

export default router
