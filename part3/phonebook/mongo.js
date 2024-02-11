const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("provide password as argument")
  process.exit(1)
}

const [password, name, number] = process.argv.slice(2)
const url = `mongodb+srv://eedris:${password}@cluster0.vagojos.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
personSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    return obj
  },
})
const Person = mongoose.model("Person", personSchema)

if (name && number) {
  const person = new Person({
    name,
    number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((persons) => {
    console.log("phonebook:")
    persons.forEach(({ name, number }) => console.log(`${name} ${number}`))
    mongoose.connection.close()
  })
}
