import publicChildRoutes from './public'
import authChildRoutes from './auth'
import dashChildRoutes from './dashboard'

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
    component: () => import('../views/layouts/default.vue'),
    children: dashChildRoutes('dashboard', false)
  }
]
