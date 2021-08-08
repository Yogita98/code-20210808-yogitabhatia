const requestType = require('../request-type').GET;
const endpointName = '/getPatients';
const { logger } = require('../../helpers/logger');

const { analysePatientsInformation } = require('../controllers/get-patients');

const endpoint = async (request, response) => {
  logger.info(`Called ${endpointName}`);
  try {
    const patientsInfo = await analysePatientsInformation();
    return response.status(200).json(patientsInfo);
  } catch (error) {
    logger.error(error.toString())
    return response.status(500).json({
      message: error.toString(),
    });
  }
};

module.exports = {
  endpoint,
  requestType,
  endpointName,
};
