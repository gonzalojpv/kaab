const dashChildRoutes = (prop: string, mode = false) =>  [
  {
    path: '',
    name: `${prop}.home`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/dashboard/home.vue')
  }
]

export default dashChildRoutes