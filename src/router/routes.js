const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Dashboard.vue')},
      {path: '/Dashboard2', component: () => import('pages/Dashboard2.vue')},
      {path: '/Profile', component: () => import('pages/UserProfile.vue')},
      {path: '/Map', component: () => import('pages/Map.vue')},
      {path: '/MapMarker', component: () => import('pages/MapMarker.vue')},
      {path: '/TreeTable', component: () => import('pages/TreeTable.vue')},
      {path: '/StreetView', component: () => import('pages/StreetView.vue')},
      {path: '/Cards', component: () => import('pages/Cards.vue')},
      {path: '/Tables', component: () => import('pages/Tables.vue')},
      {path: '/Contact', component: () => import('pages/Contact.vue')},
      {path: '/Checkout', component: () => import('pages/Checkout.vue')},
      {path: '/Ecommerce', component: () => import('pages/ProductCatalogues.vue')},
      {path: '/Pagination', component: () => import('pages/Pagination.vue')},
      {path: '/Charts', component: () => import('pages/Charts.vue')},
      {path: '/Calendar', component: () => import('pages/Calendar.vue')},
      {path: '/Directory', component: () => import('pages/Directory.vue')},
      {path: '/Footer', component: () => import('pages/Footer.vue')},
      {path: '/CardHeader', component: () => import('pages/CardHeader.vue')},

      // Not completed yet
      // {path: '/Taskboard', component: () => import('pages/TaskBoard.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/Mail',
    component: () => import('layouts/Mail.vue')
  },
  {
    path: '/Maintenance',
    component: () => import('pages/Maintenance.vue')
  },
  {
    path: '/Pricing',
    component: () => import('pages/Pricing.vue')
  },
  {
    path: '/Login-1',
    component: () => import('pages/Login-1.vue')
  },
  {
    path: '/Lock',
    component: () => import('pages/LockScreen.vue')
  },
  {
    path: '/Lock-2',
    component: () => import('pages/LockScreen-2.vue')
  }
]

export default routes
