import {
  login,
  logout,
} from '@/api/login';
import { auth } from '@/utils/auth';

import { ActionContext } from 'vuex';

interface Payload {
  data: any;
}

interface InterfaceUserInfo {
  createdate: number;
  deptid: number;
  deptname: string;
  email: string;
  id: number;
  name: string;
  proId: number;
  role: string;
  roleCode: string;
  roleId: number;
  status: string;
  updatedate: number;
  userId: number;
  username: string;
  zone: string;
  zoneId: number;
}

interface InterfaceState {
  userInfo: InterfaceUserInfo;
}

export default {
  namespaced: true,
  state: {
    userName: '',
  },
  mutations: {
    loginSuccess(state: InterfaceState, res: any) {
      state.userInfo = res.data.userInfo;
      auth.register(state.userInfo);
      auth.saveSessionId(res.data.sessionId);
    },
  },
  actions: {
    loginAction(context: ActionContext<any, any>, data: Payload) {
      return new Promise((resolve, reject) => {
        login(data).then((res: any) => {
          if (res.code === '000000') {
            context.commit('loginSuccess', res);
            resolve(res);
          } else {
            reject(res);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    userQuitAction(context: ActionContext<any, any>, data: Payload) {
      return new Promise((resolve, reject) => {
        logout().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  getters: {
    getUserInfo: (state: InterfaceState) => state.userInfo,
  },
};
