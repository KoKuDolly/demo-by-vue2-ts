const path = require('path');
const ZipWebpackPlugin = require('zip-webpack-plugin');

module.exports = {
  // configureWebpack: (config: any): void => {
  //   config.resolve.alias('@r', path.resolve(__dirname, ''));
  //   config.resolve.extensions = ['ts', 'json', 'vue'];
  // },
  chainWebpack: (config) => {
    config.resolve.alias.set('@r', path.resolve(__dirname, ''));
  },
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3003',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  configureWebpack: {
    plugins: [
      new ZipWebpackPlugin({
        path: path.join(__dirname, './'),
        filename: 'info-plat.zip',
        pathPrefix: ''
      })
    ],
  },
};
