const fs = require('fs');
const path = require('path');

const {
  calculateBmi,
  getHealthRiskandCategory,
} = require('../../helpers/helper');

async function analysePatientsInformation() {
  let data = '',
    parsedObj = '',
    analysedPatientsInfo;
  const stream = fs.createReadStream(
    path.join(__dirname, '../../../', 'data/data.json')
  );

  return new Promise((resolve, reject) => {
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
