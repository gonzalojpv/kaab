const productChildRoutes = (prop: string, mode = false) => [
  {
    path: '',
    name: `${prop}.index`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/product/index.vue')
  },
  {
    path: 'list',
    name: `${prop}.list`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/product/list.vue')
  },
  {
    path: 'new',
    name: `${prop}.new`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/product/new.vue')
  },
  {
    path: ':productId/detail',
    name: `${prop}.detail`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/product/detail.vue')
  },
  {
    path: ':productId/edit',
    name: `${prop}.edit`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/product/edit.vue')
  }
]

export default productChildRoutes
