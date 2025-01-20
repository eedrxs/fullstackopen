const blogsRouter = require("express").Router()
const Blog = require("../models/blog.js")

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  })
  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  const user = req.user

  if (user) {
    if (!req.body.title || !req.body.url) {
      return res.status(400).end()
    }

    req.body.likes ??= 0
    req.body.user = user._id
    const blog = new Blog(req.body)
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } else {
    res.status(401).json({ error: "not authorized" })
  }
})

blogsRouter.delete("/:id", async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (user && user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } else {
    res.status(401).json({ error: "unauthorized" })
  }
})

blogsRouter.patch("/:id", async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(202).json(updatedBlog)
})

blogsRouter.post("/:id/comments", async (req, res) => {
  
  const blog = await Blog.findById(req.params.id)
  blog.comments = blog.comments.concat(req.body.comment)
  console.log(req.body)
  console.log(blog.comments)
  const updatedBlog = await blog.save()

  res.status(201).json(updatedBlog)
})

module.exports = blogsRouter
