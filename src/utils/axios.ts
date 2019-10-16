import axios from 'axios';
import qs from 'qs';
import { auth } from '@/utils/auth';

const instance = axios.create({
  baseURL: '',
});

// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Add a request interceptor
instance.interceptors.request.use((config: any) => {
  // Do something before request is sent
  // console.log(config);
  return config;
}, (error: any) => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response: any) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  const code = response.data.code;
  const data = response.data;
  switch (code) {
    case '000000':
      return data;
    case '100013': // session 过期
      auth.logOut();
      break;
    default: // 其他报错
      return Promise.reject(data);
  }
}, (error: any) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

const axiosFun = (options: any) => {
  // console.log(options.data);
  const config: any = {
    method: options.method || 'get',
    url: options.url || '',
    headers: options.headers || {
      'Content-Type': 'application/x-www-form-urlencoded',
      'sessionId': auth.getSessionId() ? auth.getSessionId() : '',
    },
    data: qs.stringify(options.data) || {},
    timeout: 10000 || options.timeout,
    withCredentials: true,
  };
  return instance(config)
    .then((response: any) => {
      return Promise.resolve(response);
    })
    .catch((error: any) => {
      return Promise.reject(error);
    });
};

export default axiosFun;
