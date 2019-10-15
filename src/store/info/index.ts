import {
  companyList,
  apiCodeCheck,
  apiCodeSave,
  paizhaoTypeCankao,
} from '@/api/info';

import { ActionContext } from 'vuex';

interface StateInterface {
  paizhaoType: string;
}

interface Payload {
  data: any;
}

export default {
  namespaced: true,
  state: {
    paizhaoType: '',
  },
  mutations: {
    handlePaizhaoTypeUse(state: StateInterface, data: Payload) {
      state.paizhaoType = data.data;
    },
  },
  actions: {
    companyListActions(context: ActionContext<StateInterface, any>, data: Payload) {
      return new Promise((resolve, reject) => {
        companyList(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    apiCodeCheckActions(context: ActionContext<StateInterface, any>, data: Payload) {
      return new Promise((resolve, reject) => {
        apiCodeCheck(data).then((res: any) => {
          context.commit('handlePaizhaoTypeUse', { data: res.data.data.financialLicenceType });
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    apiCodeSaveActions(context: ActionContext<StateInterface, any>, data: Payload) {
      return new Promise((resolve, reject) => {
        apiCodeSave(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
    paizhaoTypeCankaoActions(context: ActionContext<StateInterface, any>, data: Payload) {
      return new Promise((resolve, reject) => {
        paizhaoTypeCankao(data).then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
  getters: {
    paizhaoTypeGetter: (state: StateInterface) => state.paizhaoType,
  },
};
