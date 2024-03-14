const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      {
        name: 'places-list',
        path: 'places',
        component: () => import('pages/PlaceListPage.vue'),
      },
      {
        name: 'places-one',
        path: 'places/:id',
        component: () => import('pages/PlaceOnePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
