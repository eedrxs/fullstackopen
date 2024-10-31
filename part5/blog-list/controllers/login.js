const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post("/", async (req, res) => {
  const { username = "", password = "" } = req.body

  const user = await User.findOne({ username })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: "invalid username or password" })
  }

  const userForToken = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, config.SECRET)
  res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter