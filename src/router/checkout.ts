const checkoutChildRoutes = (prop: string, mode = false) => [
  {
    path: '',
    name: `${prop}.index`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/checkout/index.vue')
  }
]

export default checkoutChildRoutes
