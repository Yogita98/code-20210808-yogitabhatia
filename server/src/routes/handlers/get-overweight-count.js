const requestType = require('../request-type').GET;
const endpointName = '/getOverweightCount';
const { logger } = require('../../helpers/logger');

const {
  getOverweightPatientCount,
} = require('../controllers/get-overweight-count');

const endpoint = async (request, response) => {
  logger.info(`Called ${endpointName}`);
  try {
    const overweightCount = await getOverweightPatientCount();
    return response.status(200).json({ overweightCount });
  } catch (error) {
    logger.error(`error occurred fetching information` + err);
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
