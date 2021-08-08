const fs = require('fs');
const path = require('path');

const {
  calculateBmi,
  getHealthRiskandCategory,
} = require('../../helpers/helper');

const ROOT_DIR = '../../../';

async function analysePatientsInformation() {
  const filename = path.join(__dirname, ROOT_DIR, 'data/data.json');
  let data = '',
    parsedObj = '',
    analysedPatientsInfo;

  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filename)) {
      reject('File does not exist');
    }
    const stream = fs.createReadStream(filename);
    stream.setEncoding('UTF8');
    stream.on('data', (chunk) => {
      data = data + chunk;
    });
    stream.on('end', () => {
      parsedObj = JSON.parse(data);
      analysedPatientsInfo = parsedObj.patients.map((patient) => {
        const bmi = calculateBmi(patient.HeightCm, patient.WeightKg);
        const { bmiCategory, healthRisk } = getHealthRiskandCategory(bmi);
        return { ...patient, bmi, bmiCategory, healthRisk };
      });
      resolve(analysedPatientsInfo);
    });
    stream.on('error', (err) => {
      reject(err);
    });
  });
}

module.exports = {
  analysePatientsInformation,
};
