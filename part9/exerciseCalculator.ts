interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (): Result => {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error('Not enough arguments. Usage: node exerciseCalculator.js <target> <day1> <day2> ...');
  }

  const [targetStr, ...dailyStrs] = args;
  const target = Number(targetStr);
  const dailyExerciseHours = dailyStrs.map(Number);

  if (isNaN(target) || dailyExerciseHours.some(isNaN)) {
    throw new Error('All inputs must be numbers.');
  }
  if (target <= 0) {
    throw new Error('Target must be a positive number.');
  }
  if (dailyExerciseHours.length === 0) {
    throw new Error('Provide at least one day of exercise hours.');
  }

  const periodLength = dailyExerciseHours.length;
  const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
  const totalHours = dailyExerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;
  const targetRatio = average / target;

  if (targetRatio >= 1) {
    rating = 3;
    ratingDescription = "excellent - target reached or exceeded";
  } else if (targetRatio >= 0.75) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "poor - far below target";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const result = calculateExercises();
  console.log(result);
} catch (error: any) {
  console.error('Error:', error.message);
}

export { calculateExercises, Result };