// const morgan = require('morgan');
// const logger = require('converse-logger');
const bodyParser = require('body-parser');
const { loggers } = require('winston');
// const cookieParser = require('cookie-parser');
const allowedMethods = ['GET', 'POST'];
const access_control_allow_origin = process.env.ACCESS_CONTROL_ALLOW_ORIGIN || '*'; // Gotta read more about it

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

  // error handler, will be used for throwing validation errors
//   app.use((err, req, res, next) => {
//     logger.error('Error validating request parameters ', {
//       error: err,
//       component: 'app.js',
//     });

//     if (err.custom) {
//       res.status(err.code || 400).json({
//         message: err.toString(),
//       });
//     } else {
//       res.status(400).json(err);
//     }
//   });
};
