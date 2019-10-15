const envType = process.env.NODE_ENV === 'production';
// const testUrl = '';
const testUrl = '';
const prodUrl = '';
// const yufaUrl = '';

export const BASE_API = {
  baseUrl: envType ? prodUrl : testUrl,
  urlPre: '/api',
};
