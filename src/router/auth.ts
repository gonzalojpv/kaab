const authChildRoutes = (prop: string, mode = false) => [
  {
    path: 'login',
    name: `${prop}.login`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/auth/login.vue')
  }
]

export default authChildRoutes
