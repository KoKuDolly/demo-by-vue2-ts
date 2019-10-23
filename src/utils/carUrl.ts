let casUrl: string = '';

if (process.env.VUE_APP_CASURL === 'test') {
  // casUrl = 'http://localhost:8081';
} else if (process.env.VUE_APP_CASURL === 'prod') {
  casUrl = 'http://www.test.com';
}

export { casUrl };
