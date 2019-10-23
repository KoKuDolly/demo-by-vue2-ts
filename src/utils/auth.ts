import { casUrl } from './carUrl';

export const auth = {
  USER_KEY: '__VUEXUSER__',
  SESSION_ID: '__SESSIONID__',
  user: '',
  register(user: any) {
    auth.user = user;
    localStorage.setItem(auth.USER_KEY, JSON.stringify(user));
  },
  getUserInfo() {
    const userStr: any = localStorage.getItem(auth.USER_KEY);
    return JSON.parse(userStr);
  },
  logOut() {
    localStorage.removeItem(auth.USER_KEY);
    localStorage.removeItem(auth.SESSION_ID);
    // window.location.replace(casUrl);
  },
  destroy() {
    localStorage.removeItem(auth.USER_KEY);
    localStorage.removeItem(auth.SESSION_ID);
  },
  isLoginIn() {
    const userStr: any = localStorage.getItem(auth.USER_KEY);
    const user = JSON.parse(userStr);
    if (user) {
      auth.user = user;
      return true;
    } else {
      return false;
    }
  },
  saveSessionId(sessionId: string) {
    localStorage.setItem(auth.SESSION_ID, JSON.stringify(sessionId));
  },
  getSessionId() {
    const sessionIdStr: any = localStorage.getItem(auth.SESSION_ID);
    return JSON.parse(sessionIdStr);
  },
};
