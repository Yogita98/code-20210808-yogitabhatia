const axios = require('axios');
const { logger } = require('../../helpers/logger');
const { endpointName } = require('../handlers/get-patients');
logger.info(endpointName)

async function getOverweightPatientCount() {
  try {
    const result = await axios.get(`http://localhost:3000${endpointName}`);
    let count = 0;
    result.data.forEach((patient) => {
      count = patient.bmiCategory === 'Overweight' ? count + 1 : count;
    });
    return count;
  } catch (error) {
    logger.error(error.message);
  }
}

module.exports = {
  getOverweightPatientCount,
};
