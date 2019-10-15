import Vue from 'vue';
import Router from 'vue-router';
import { routes } from './router';
import { Loading } from 'element-ui';
import qs from 'qs';
import { auth } from '@/utils/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

let loading: any = null;

router.beforeEach((to, from, next) => {
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    background: 'rgba(0, 0, 0, 0.3)',
  });
  next();
});

router.afterEach(() => {
  loading.close();
});

export default router;
