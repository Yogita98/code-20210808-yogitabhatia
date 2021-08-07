const calculateBmi = (height, weight) => {
  const heightInMetres = height / 100;
  const bmi = weight / (heightInMetres * heightInMetres);
  return roundToTwo(bmi);
};

const getHealthRiskandCategory = (bmi) => {
  let category, risk;
  if (bmi <= 18.4) {
    category = 'Underweight';
    risk = 'Malnutrition risk';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal weight';
    risk = 'Low risk';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
    risk = 'Enhanced risk';
  } else if (bmi >= 30 && bmi <= 34.9) {
    category = 'Moderately obese';
    risk = 'Medium risk';
  } else if (bmi >= 35 && bmi <= 39.9) {
    category = 'Severely obese';
    risk = 'High risk';
  } else if (bmi === null || bmi === undefined) {
  } else {
    category = 'Very severely obese';
    risk = 'Very high risk';
  }

  return {
    bmiCategory: category,
    healthRisk: risk,
  };
};

function roundToTwo(num) {
  return +(Math.round(num + 'e+2') + 'e-2');
}

module.exports = {
  calculateBmi,
  getHealthRiskandCategory,
};
