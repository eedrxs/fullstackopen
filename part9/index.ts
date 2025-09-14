import express = require("express")
import { calculateBmi } from "./bmiCalculator"

const app = express()

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height)
  const weight = Number(req.query.weight)
  console.log(height, weight)

  if (typeof height !== "number" || typeof weight !== "number") {
    res.json({ error: "malformatted parameters" })
  } else {
    res.send({ weight, height, bmi: calculateBmi(height, weight) })
  }
})

app.listen(3003, () => console.log("Server listening on port 3003"))
