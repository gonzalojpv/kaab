const publicChildRoutes = (prop: string, mode = false) => [
  {
    path: '/',
    name: `${prop}.index`,
    meta: {
      authRequired: mode,
      title: 'Campaigns',
      withHeader: true
    },
    component: () => import('../views/pages/public/home.vue')
  }
]

export default publicChildRoutes
