const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');

function server(app: any) {
  app.use(cookieParser());
  app.use(
    ['/api'],

    createProxyMiddleware({
      target: 'https://62468e26739ac8459190033f.mockapi.io',
      changeOrigin: true,
      selfHandleResponse: true,
      logLevel: 'debug',

      onProxyRes: responseInterceptor(
        async (responseBuffer: any, _proxyRes: any, req: any, res: any) => {
          const cookies = req.cookies;
          const blockRequests = Object.getOwnPropertyDescriptor(
            cookies,
            'request'
          );

          if (blockRequests?.value) {
            const requests: any[] = Object.values(JSON.parse(cookies.request));
            const combineRequests: any[] = requests.reduce(
              (previousRequests: any[], currentRequest: any[]) => [
                ...previousRequests,
                ...currentRequest,
              ],
              []
            );

            const currentRequest = combineRequests.find(
              (request) => request.path === req.url
            );

            if (currentRequest) {
              res.statusCode = 201;
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
              res.statusCode = response.status;
              return JSON.stringify(response.response);
            }
          }
          return responseBuffer.toString('utf-8');
        }
      ),
    })
  );
}

export default server;
