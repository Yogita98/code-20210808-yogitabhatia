const bodyParser = require('body-parser');
const allowedMethods = ['GET', 'POST'];
const access_control_allow_origin =
  process.env.ACCESS_CONTROL_ALLOW_ORIGIN || '*';

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', access_control_allow_origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Content-Security-Policy', "default-src 'self'");
    next();
  });

  // blocking unused methods
  app.use((req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      res.status(405).send({ message: 'Method is not supported' });
    } else {
      next();
    }
  });

  // forward the route to the adapter functions
  const router = require('./src/routes/router')();
  app.use(router);

  /**
   * Not Found exception handling.
   */
  app.all('*', function (req, res) {
    res.status(404).json({
      error: 'Not Found',
    });
  });
};
