const reportChildRoutes = (prop: string, mode = false) => [
  {
    path: '',
    name: `${prop}.index`,
    meta: {
      authRequired: mode,
      title: ''
    },
    component: () => import('../views/pages/report/index.vue')
  }
]

export default reportChildRoutes
