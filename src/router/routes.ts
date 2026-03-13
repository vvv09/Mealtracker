import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/diary' },
      { path: '/diary', name: 'diary', component: () => import('pages/Diary.vue') },
      { path: '/profile', name: 'profile', component: () => import('pages/Profile.vue') },
      { path: '/plans', name: 'plans', component: () => import('pages/Plans.vue') },
      { path: '/products', name: 'products', component: () => import('pages/Products.vue') },
      { path: '/archive', name: 'archive', component: () => import('pages/Archive.vue') },
      { path: '/settings', name: 'settings', component: () => import('pages/Settings.vue') },
      { path: '/about', name: 'about', component: () => import('pages/About.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
