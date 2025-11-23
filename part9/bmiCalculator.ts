function calculateBmi(...args: number[]): string {
  const [heightCm, weightKg] =
    require.main === module ? process.argv.slice(2).map(Number) : args;

  if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
    throw new Error(
      "Invalid input. Usage: node bmiCalculator.js <heightCm> <weightKg> (both must be positive numbers)"
    );
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  if (bmi < 18.5) {
    return `Underweight (BMI: ${bmi.toFixed(1)})`;
  } else if (bmi < 25) {
    return `Normal range (BMI: ${bmi.toFixed(1)})`;
  } else if (bmi < 30) {
    return `Overweight (BMI:/ ${bmi.toFixed(1)})`;
  } else {
    return `Obese (BMI: ${bmi.toFixed(1)})`;
  }
}

try {
  console.log(calculateBmi());
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error("Error:", error.message);
  }
}

export { calculateBmi };