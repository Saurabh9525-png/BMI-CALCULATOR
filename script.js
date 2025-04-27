document.addEventListener('DOMContentLoaded', function() {
  const calculateBtn = document.getElementById('calculate-btn');
  calculateBtn.addEventListener('click', calculateBMI);
});

function calculateBMI() {
  // Get user input
  const weightInput = document.getElementById('weight');
  const heightInput = document.getElementById('height');
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value) / 100; // Convert cm to m
  
  // Reset error messages
  document.getElementById('weight-error').style.display = 'none';
  document.getElementById('height-error').style.display = 'none';
  weightInput.style.borderColor = '#e9ecef';
  heightInput.style.borderColor = '#e9ecef';
  
  // Validate input
  let isValid = true;
  
  if (isNaN(weight) || weight <= 0) {
      document.getElementById('weight-error').style.display = 'block';
      weightInput.style.borderColor = '#f72585';
      isValid = false;
  }
  
  if (isNaN(height) || height <= 0) {
      document.getElementById('height-error').style.display = 'block';
      heightInput.style.borderColor = '#f72585';
      isValid = false;
  }
  
  if (!isValid) {
      document.getElementById('result').style.display = 'none';
      return;
  }
  
  // Calculate BMI
  const bmi = weight / (height * height);
  const roundedBMI = Math.round(bmi * 10) / 10;
  
  // Determine category
  let category, categoryClass;
  if (bmi < 18.5) {
      category = "Underweight";
      categoryClass = "underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal Weight";
      categoryClass = "normal";
  } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      categoryClass = "overweight";
  } else {
      category = "Obese";
      categoryClass = "obese";
  }
  
  // Update the UI with results
  document.getElementById('bmi-value').textContent = roundedBMI;
  const categoryElement = document.getElementById('bmi-category');
  categoryElement.textContent = category;
  categoryElement.className = `bmi-category ${categoryClass}`;
  
  // Calculate indicator position (scale from 15 to 40 BMI)
  const indicator = document.getElementById('bmi-indicator');
  let position = ((bmi - 15) / (40 - 15)) * 100;
  position = Math.max(0, Math.min(100, position)); // Clamp between 0-100
  indicator.style.left = `${position}%`;
  
  // Show result
  document.getElementById('result').style.display = 'block';
}