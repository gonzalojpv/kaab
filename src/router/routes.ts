import publicChildRoutes from './public'
import authChildRoutes from './auth'
import dashChildRoutes from './dashboard'
import checkoutChildRoutes from './checkout'
import productChildRoutes from './product'
import reportChildRoutes from './report'

export default [
  {
    path: '/',
    component: () => import('../views/layouts/default.vue'),
    children: publicChildRoutes('home', true)
  },
  {
    path: '/auth',
    component: () => import('../views/layouts/auth.vue'),
    children: authChildRoutes('auth', false)
  },
  {
    path: '/dashboard/product',
    component: () => import('../views/layouts/dashboard.vue'),
    children: productChildRoutes('product', true)
  },
  {
    path: '/dashboard/report',
    component: () => import('../views/layouts/dashboard.vue'),
    children: reportChildRoutes('report', true)
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
