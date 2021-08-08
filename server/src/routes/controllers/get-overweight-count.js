const axios = require('axios');
const { logger } = require('../../helpers/logger');
const { endpointName } = require('../handlers/get-patients');

async function getOverweightPatientCount() {
  try {
    // TODO: Host the app on heroku and 
    // include a config file and supply host and port as per the env
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
