// eslint-disable-next-line @typescript-eslint/no-require-imports
import express = require("express");
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (typeof height !== "number" || typeof weight !== "number") {
    res.json({ error: "malformatted parameters" });
  } else {
    res.send({ weight, height, bmi: calculateBmi(height, weight) });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body ?? {};

  if (!daily_exercises || !target) {
    return res.json({ error: "parameters missing" });
  }
  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((n) => isNaN(Number(n)))
  ) {
    return res.json({ error: "malformatted parameters" });
  }
  if (isNaN(Number(target))) {
    return res.json({ error: "malformatted parameters" });
  }

  try {
    const normalizedParams = [target, daily_exercises].flat().map(Number);
    const data = calculateExercises(...normalizedParams);
    return res.json(data);
  } catch (error) {
    return res.json({
      error: error instanceof Error ? error.message : "something went wrong",
    });
  }
});

app.listen(3003, () => console.log("Server listening on port 3003"));