import axiosFun from '@/utils/axios';
import { BASE_API } from './index';

const API_PRE = BASE_API.baseUrl;
const URL_PRE = BASE_API.urlPre;

export const login = (payLoad: any) => {
  return new Promise((resolve, reject) => {
    axiosFun({
      url: API_PRE + URL_PRE + 'login.do',
      method: 'post',
      data: payLoad.data,
    }).then((res: any) => {
      resolve(res);
    }).catch((err: any) => {
      reject(err);
    });
  });
};

// logout
export const logout = () => {
  return new Promise((resolve, reject) => {
    axiosFun({
      url: API_PRE + URL_PRE + 'loginOut',
      method: 'post',
    }).then((res: any) => {
      resolve(res);
    }).catch((err: any) => {
      reject(err);
    });
  });
};
