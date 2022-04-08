const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/dev-tools/config', (req, res) => {
    try {
      const filePath = path.join(
        __dirname,
        'DevTools',
        'fixtures',
        'response.json'
      );
      const data = fs.readFileSync(filePath, {
        encoding: 'utf-8',
      });
      if (data) {
        return res.json(data);
      }
      res.status(400).json({});
    } catch (error) {
      res.status(400).json({});
    }
  });

  app.post('/dev-toos/config', (req, res) => {
    try {
      const dataBody = req.body;
      console.log(dataBody);
      const filePath = path.join(
        __dirname,
        'DevTools',
        'fixtures',
        'response.json'
      );
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify(dataBody, null, 2));
      } else {
        const previousData = fs.readFileSync(filePath, {
          encoding: 'utf-8',
        });

        const data1 = JSON.parse(previousData);
        const data = Object.assign(data1, dataBody);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      }
      res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({});
    }
  });

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

            if (currentRequest && currentRequest?.isEnabled) {
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
