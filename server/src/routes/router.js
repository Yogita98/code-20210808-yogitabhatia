const express = require('express');
// const validate = require('express-validation');

const fs = require('fs');
const join = require('path').join;
const routes = join(__dirname,'handlers');
const winston = require('winston');
const logConfiguration = {
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(logConfiguration);

module.exports = () => {
  const router = express.Router();

  /**
   * @description Bootstrapping app routes in handlers folder
   *              This will loop through all .js files in the handlers folder,
   *              add a route to the routed using the requestType at the given endpoint,
   *              and set the function called endpoint as the listener
   */
  fs.readdirSync(routes)
    .filter((file) => ~file.indexOf('.js'))
    .forEach((file) => {
      const route = require(join(routes, file));
      try {
        const endpoint = route.endpointName;
        let endpointHandler = route.endpoint;

        let handlers = [];


        handlers.push(endpointHandler);

        router.route(`${endpoint}`)[route.requestType](handlers);
        logger.info(`successfully bootstrapped route: ${endpoint}`);
      } catch (err) {
        logger.error(`Error bootstrapping route:  ${file} ->  ${err}`);
      }
    });
  return router;
};
