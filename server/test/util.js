const join = require('path').join;
const fs = require('fs');

const mockedResponse = [
  {
    Gender: 'Male',
    HeightCm: 171,
    WeightKg: 96,
    bmi: 32.83,
    bmiCategory: 'Moderately obese',
    healthRisk: 'Medium risk',
  },
  {
    Gender: 'Male',
    HeightCm: 161,
    WeightKg: 85,
    bmi: 32.79,
    bmiCategory: 'Moderately obese',
    healthRisk: 'Medium risk',
  },
  {
    Gender: 'Male',
    HeightCm: 180,
    WeightKg: 77,
    bmi: 23.77,
    bmiCategory: 'Normal weight',
    healthRisk: 'Low risk',
  },
  {
    Gender: 'Female',
    HeightCm: 166,
    WeightKg: 62,
    bmi: 22.5,
    bmiCategory: 'Normal weight',
    healthRisk: 'Low risk',
  },
  {
    Gender: 'Female',
    HeightCm: 150,
    WeightKg: 70,
    bmi: 31.11,
    bmiCategory: 'Moderately obese',
    healthRisk: 'Medium risk',
  },
  {
    Gender: 'Female',
    HeightCm: 167,
    WeightKg: 82,
    bmi: 29.4,
    bmiCategory: 'Overweight',
    healthRisk: 'Enhanced risk',
  },
];

function moveFileWithinDir(dirPath, src, dest) {
  const srcFilePath = join(dirPath, src);
  const destFilePath = join(dirPath, dest);
  const fileContent = fs.readFileSync(srcFilePath, { encoding: 'utf-8' });
  fs.writeFileSync(destFilePath, fileContent);
  fs.rmSync(srcFilePath);
}

module.exports = {
  mockedResponse,
  moveFileWithinDir,
};
