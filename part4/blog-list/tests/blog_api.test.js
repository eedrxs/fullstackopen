const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const testHelper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(testHelper.initialBlogs)
})

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs")

  assert.strictEqual(response.body.length, testHelper.initialBlogs.length)
})

test("unique identifier property is 'id'", async () => {
  const response = await api.get("/api/blogs")

  assert("id" in response.body[0])
})

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Automate The Boring Stuff",
    author: "John Doe",
    url: "google.com",
    likes: 5,
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsInEnd = await testHelper.blogsInDb()
  assert.strictEqual(blogsInEnd.length, testHelper.initialBlogs.length + 1)

  const titles = blogsInEnd.map((blog) => blog.title)
  assert(titles.includes("Automate The Boring Stuff"))
})

test("'likes' property with default value of zero is added when missing from payload", async () => {
  const newBlog = {
    title: "Automate The Boring Stuff",
    author: "John Doe",
    url: "google.com",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsInEnd = await testHelper.blogsInDb()
  const newlyAddedBlog = blogsInEnd.find(
    (blog) => blog.title === "Automate The Boring Stuff"
  )
  assert(newlyAddedBlog.likes === 0)
})

test("returns 400 when 'title' or 'url' properties is missing", async () => {
  let newBlog = {
    author: "John Doe",
    url: "google.com",
  }

  await api.post("/api/blogs").send(newBlog).expect(400)

  newBlog = {
    title: "Automate The Boring Stuff",
    author: "John Doe",
  }

  await api.post("/api/blogs").send(newBlog).expect(400)
})

describe("deletion of blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogsInStart = await api.get("/api/blogs")
    const blogToDelete = blogsInStart.body[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsInEnd = await api.get("/api/blogs")

    assert.strictEqual(blogsInEnd.body.length, blogsInStart.body.length - 1)

    const blogsInEndTitles = blogsInEnd.body.map((blog) => blog.title)
    assert(!blogsInEndTitles.includes(blogToDelete.title))
  })
})

describe("update of blog", () => {
  test("a blog's number of likes can be updated", async () => {
    const blogsInStart = await api.get("/api/blogs")
    const blogToUpdate = blogsInStart.body[0]

    const updatedBlog = await api
      .patch(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(202)

    assert.strictEqual(updatedBlog.body.likes, blogToUpdate.likes + 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})
