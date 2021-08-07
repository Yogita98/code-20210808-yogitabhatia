const requestType = require('../request-type').GET;
const endpointName = '/getPatients';
const winston = require('winston');
const logConfiguration = {
  transports: [new winston.transports.Console()],
};

const logger = winston.createLogger(logConfiguration);

const { analysePatientsInformation } = require('../controllers/get-patients');

const endpoint = async (request, response) => {
  logger.info(`Called ${endpointName}`);
  try {
    const patientsInfo = await analysePatientsInformation();
    return response.status(200).json(patientsInfo);
  } catch (error) {
    logger.error(`error occurred fetching information` + err);
    /* istanbul ignore next */
    return response.status(error.code || 500).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  endpoint,
  requestType,
  endpointName,
};
