import Vue from 'vue';
import Vuex from 'vuex';

import info from './info/index';
import login from './login/index';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {

  },
  modules: {
    info,
    login,
  },
});
