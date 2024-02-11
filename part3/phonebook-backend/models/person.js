const mongoose = require("mongoose")

mongoose.set("strictQuery", false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((err) => {
    console.log("error connecting to MongoDB:", err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (value) => /^\d{2,3}-\d+$/.test(value),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, "User phone number required"],
  },
})

personSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
    return obj
  },
})

module.exports = mongoose.model("Person", personSchema)
