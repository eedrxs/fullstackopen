const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  })
  res.json(users)
})

usersRouter.post("/", async (req, res) => {
  const { username = "", password = "", name = "" } = req.body

  switch (true) {
    case username === "":
      return res.status(400).json({ error: "username is required" })
    case password === "":
      return res.status(400).json({ error: "password is required" })
    case username.length < 3:
      return res
        .status(400)
        .json({ error: "username must be at least 3 characters long" })
    case password.length < 3:
      return res
        .status(400)
        .json({ error: "password must be at least 3 characters long" })
    case Boolean(await User.findOne({ username })):
      return res.status(400).json({ error: "username is already taken" })
    default:
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, passwordHash })
  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
