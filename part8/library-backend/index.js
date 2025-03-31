const { startStandaloneServer } = require("@apollo/server/standalone")
const jwt = require("jsonwebtoken")
const config = require("./utils/config")
const app = require("./app")
const User = require("./models/user")

startStandaloneServer(app, {
  listen: { port: config.PORT },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
