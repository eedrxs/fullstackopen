const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id
    delete obj._id
    delete obj.__v
    return obj
  }
})

module.exports = mongoose.model('Blog', blogSchema)
