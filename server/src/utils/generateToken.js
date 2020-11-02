const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/dev')

function generateToken(data) {
  return jwt.sign(
    {
      id: data.id,
      email: data.email,
      username: data.username,
    },
    SECRET,
    { expiresIn: '1h' }
  )
}

module.exports = generateToken
