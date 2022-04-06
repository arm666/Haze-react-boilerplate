const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

module.exports = function (app) {
  app.use(cookieParser());
  app.use(
    ['/api'],
    createProxyMiddleware({
      target: 'https://62468e26739ac8459190033f.mockapi.io',
      changeOrigin: true,
      selfHandleResponse: true,
      logLevel: 'debug',

      onProxyRes: responseInterceptor(
        async (responseBuffer, _proxyRes, req, res) => {
          const cookies = req.cookies;
          const blockRequests = Object.getOwnPropertyDescriptor(
            cookies,
            'request'
          );

          if (blockRequests?.value) {
            const requests = Object.values(JSON.parse(cookies.request));
            const combineRequests = requests.reduce(
              (previousRequests, currentRequest) => [
                ...previousRequests,
                ...currentRequest,
              ],
              []
            );

            const currentRequest = combineRequests.find(
              (request) => request.path === req.url
            );

            if (currentRequest) {
              const data = fs.readFileSync(
                path.join(__dirname, 'DevTools', 'fixtures', 'response.json'),
                {
                  encoding: 'utf-8',
                }
              );

              const response = lodash.get(
                JSON.parse(data),
                currentRequest.responseKey
              );
              if (response) {
                if (response.status) res.statusCode = response.status;
                if (response.response) return JSON.stringify(response.response);
              }
            }
          }
          return responseBuffer.toString('utf-8');
        }
      ),
    })
  );
};
