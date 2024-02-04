// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/users', {
      target: 'http://3.37.54.220:3000/',
      changeOrigin: true,
    }),
  );
};