const { describe, test, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const app = require("../app")
const supertest = require("supertest")
const User = require("../models/user")
const userTestHelper = require("./user_api_helper")

const api = supertest(app)

describe("creating users", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(userTestHelper.initialUsers)
  })

  test("a valid user can be created", async () => {
    const newUser = {
      username: "johndoe",
      name: "John Doe",
      password: "secret",
    }
    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const usersAfter = await userTestHelper.usersInDb()
    assert.equal(usersAfter.length, userTestHelper.initialUsers.length + 1)

    const usernames = usersAfter.map((u) => u.username)
    assert(usernames.includes("johndoe"))
  })

  test("a user without a username or password is not created", async () => {
    let newUser = { name: "John Doe", password: "secret" }
    let response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    assert(response.body && response.body.error === "username is required")

    newUser = { name: "John Doe", username: "johndoe" }
    response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    assert(response.body && response.body.error === "password is required")

    const usersAfter = await userTestHelper.usersInDb()
    assert.equal(usersAfter.length, userTestHelper.initialUsers.length)
  })

  test("a user with a username or password shorter than 3 characters is not created", async () => {
    let newUser = {
      username: "jd",
      name: "John Doe",
      password: "secret",
    }
    let response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    assert(
      response.body &&
        response.body.error === "username must be at least 3 characters long"
    )

    newUser = {
      username: "johndoe",
      name: "John Doe",
      password: "pw",
    }
    response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    assert(
      response.body &&
        response.body.error === "password must be at least 3 characters long"
    )

    const usersAfter = await userTestHelper.usersInDb()
    assert.equal(usersAfter.length, userTestHelper.initialUsers.length)
  })

  test("a user with an already taken username is not created", async () => {
    let newUser = {
      username: "testuser",
      name: "Test User",
      password: "testpassword",
    }
    let response = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    assert(response.body && response.body.error === "username is already taken")
  })
})

after(async () => {
  await mongoose.connection.close()
})
