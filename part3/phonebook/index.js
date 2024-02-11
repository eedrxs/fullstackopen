require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

morgan.token("body", (req, res) => JSON.stringify(req.body))

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
)

const Person = require("./models/person")
const errorHandler = require("./error")

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
]

const generateId = () => {
  return Math.random() * 1000
}

app.post("/api/persons", (req, res, next) => {
  const payload = req.body
  const requiredProperties = ["name", "number"]
  const missingProperites = []

  for (let property of requiredProperties) {
    if (!payload[property]) missingProperites.push(property)
  }

  if (missingProperites.length === 0) {
    const person = new Person({ ...payload })
    person
      .save()
      .then((person) => {
        res.json(person)
      })
      .catch((err) => next(err))
  } else {
    const errorMessage = `missing ${missingProperites} propert${
      missingProperites.length > 1 ? "ies" : "y"
    }`
    res.status(400).json({ error: errorMessage })
  }
})

app.put("/api/persons/:id", (req, res, next) => {
  const { id } = req.params
  const payload = req.body

  Person.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return res.status(404).end()
      }
      res.status(202).json(updatedPerson)
    })
    .catch((err) => next(err))
})

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params

  Person.findById(id)
    .then((person) => {
      if (!person) {
        return res.status(404).end()
      }

      res.json(person)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

app.delete("/api/persons/:id", (req, res, next) => {
  const { id } = req.params

  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.get("/info", (req, res, next) => {
  Person.countDocuments({})
    .then((numberOfPersons) => {
      res.end(`
      <p>Phonebook has info for ${numberOfPersons} people</p>
      <p>${new Date()}</p>
  `)
    })
    .catch((err) => next(err))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
