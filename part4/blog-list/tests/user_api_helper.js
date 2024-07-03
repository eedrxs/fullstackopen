const User = require('../models/user');

const initialUsers = [
  { username: 'testuser', name: 'Test User', password: 'testpassword' },
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialUsers,
  usersInDb,
};