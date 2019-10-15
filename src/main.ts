import Vue from 'vue';
import App from './App.vue';
import router from './routers/index';
import store from './store/index';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.scss';
import { end2frontMap } from './utils/end2frontMap';

Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.end2frontMap = end2frontMap;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
