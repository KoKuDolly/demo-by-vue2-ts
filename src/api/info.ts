import axiosFun from '@/utils/axios';
import { BASE_API } from './index';

const API_PRE = BASE_API.baseUrl;
const URL_PRE = BASE_API.urlPre;

export const companyList = (payLoad: any) => {
  return new Promise((resolve, reject) => {
    axiosFun({
      url: API_PRE + URL_PRE + '/company/list',
      method: 'post',
      data: payLoad.data,
    }).then((res: any) => {
      resolve(res);
    }).catch((err: any) => {
      reject(err);
    });
  });
};

export const apiCodeCheck = (payLoad: any) => {
  return new Promise((resolve, reject) => {
    axiosFun({
      url: API_PRE + URL_PRE + '/company/apicode/detail',
      method: 'post',
      data: payLoad.data,
    }).then((res: any) => {
      resolve(res);
    }).catch((err: any) => {
      reject(err);
    });
  });
};

export const apiCodeSave = (payLoad: any) => {
  return new Promise((resolve, reject) => {
    axiosFun({
      url: API_PRE + URL_PRE + '/company/apicode/save',
      method: 'post',
      data: payLoad.data,
      // isJsonStringify: true,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    }).then((res: any) => {
      resolve(res);
    }).catch((err: any) => {
      reject(err);
    });
  });
};

export const paizhaoTypeCankao = (payLoad: any) => {
  return new Promise((resolve, reject) => {
    axiosFun({
      url: API_PRE + URL_PRE + '/amount/organization/list',
      method: 'post',
      data: payLoad.data,
    }).then((res: any) => {
      resolve(res);
    }).catch((err: any) => {
      reject(err);
    });
  });
};
