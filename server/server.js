/**
 * @server.js
 * This file is used for setting up an express app and the websocket server
 *
 */

const http = require('http');
const express = require('express')

const winston = require('winston');
const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

const logger = winston.createLogger(logConfiguration);

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
require('./app')(app);

server.listen(port, function () {
  logger.info(`SERVICE is now running on port ${port}`);
});
