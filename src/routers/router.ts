import Layout from '@/views/Layout/index.vue';

export const appRouter = [
  {
    path: '/',
    redirect: '/info',
    component: Layout,
    children: [
      {
        path: '/info',
        name: 'info',
        meta: {
          info: '信息页',
          childrenName: 'infoList',
        },
        // route level code-splitting
        // this generates a separate chunk (info.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "info" */ '@/views/Info/index.vue'),
        children: [
          {
            path: '',
            name: 'infoList',
            meta: {
              info: '信息列表',
              isAsider: false,
            },
            component: () => import('@/views/Info/list/index.vue'),
          },
          {
            path: 'check/:id',
            name: 'infoCheck',
            meta: {
              info: '信息查看',
              isAsider: false,
            },
            component: () => import('@/views/Info/edit/index.vue'),
          },
          {
            path: 'edit/:id',
            name: 'infoEdit',
            meta: {
              info: '信息编辑',
              isAsider: false,
            },
            component: () => import('@/views/Info/edit/index.vue'),
          },
        ],
      },
    ],
  },
];

export const routes = [
  ...appRouter,
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Layout/Home.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/404.vue'),
      },
    ],
  },
  {
    path: '/**',
    redirect: '/404',
  },
];
