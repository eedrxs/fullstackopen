const express = require("express")
const morgan = require('morgan')
const app = express()

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

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

app.post("/api/persons", (req, res) => {
  const payload = req.body
  const requiredProperties = ["name", "number"]
  const missingProperites = []

  for (let property of requiredProperties) {
    if (!payload[property]) missingProperites.push(property)
  }

  if (missingProperites.length === 0) {
    for (let property in payload) {
      const matchFound = persons.find(
        (person) => payload[property] === person[property]
      )
      
      if (matchFound) {
        const errorMessage = `A person with the ${property} '${payload[property]}' already exists`
        return res.status(409).json({ error: errorMessage })
      }
    }

    const person = {
      id: generateId(),
      ...req.body,
    }

    persons.push(person)
    res.json(person)
  } else {
    const errorMessage = `missing ${missingProperites} propert${
      missingProperites.length > 1 ? "ies" : "y"
    }`
    res.status(400).json({ error: errorMessage })
  }
})

app.get("/api/persons", (req, res) => {
  res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const { id } = req.params
  const person = persons.find((person) => person.id == id)

  if (!person) {
    return res.status(404).end()
  }

  res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
  const { id } = req.params
  persons = persons.filter((person) => person.id != id)
  res.status(204).end()
})

app.get("/info", (req, res) => {
  res.end(`
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
