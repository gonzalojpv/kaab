import publicChildRoutes from './public'
import authChildRoutes from './auth'
import dashChildRoutes from './dashboard'
import checkoutChildRoutes from './checkout'

export default [
  {
    path: '/',
    component: () => import('../views/layouts/default.vue'),
    children: publicChildRoutes('home', false)
  },
  {
    path: '/auth',
    component: () => import('../views/layouts/auth.vue'),
    children: authChildRoutes('auth', false)
  },
  {
    path: '/dashboard',
    component: () => import('../views/layouts/dashboard.vue'),
    children: dashChildRoutes('dashboard', true)
  },
  {
    path: '/checkout',
    component: () => import('../views/layouts/default.vue'),
    children: checkoutChildRoutes('checkout', true)
  }
]
