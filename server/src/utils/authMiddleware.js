const { AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/dev')

module.exports.isAuthenticated = context => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1]
    if (token) {
      try {
        const user = jwt.verify(token, SECRET)
        return user
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    throw new AuthenticationError('Token must be "Bearer [token]"')
  }
  throw new AuthenticationError('No authorization haders provided')
}
