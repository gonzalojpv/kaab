import publicChildRoutes from './public'

export default [
   {
    path: '/',
    component: () => import('../views/layouts/default.vue'),
    children: publicChildRoutes('home', false)
  },
]