const { UserInputError } = require('apollo-server')
const User = require('../../models/user')
const bcrypt = require('bcrypt')
const generateToken = require('../../utils/generateToken')
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

module.exports = {
  Query: {
    me: (parent, args, context, info) => {},
    getUser: async (parent, { id }, context, info) => {
      try {
        const user = await User.findById(id)
      } catch (error) {
        return error
      }
    },
  },
  Mutation: {
    register: async (parent, { regInp: { email, username, password, confirmPassword } }, context, info) => {
      const { errors, isValid } = validateRegisterInput(email, username, password, confirmPassword)

      try {
        if (!isValid) {
          throw new UserInputError('Input Error', { errors })
        }

        const user = await User.findOne({ email })

        if (user) {
          errors.register = 'User already exists'
          throw new UserInputError('User already exists', { errors })
        }
        password = await bcrypt.hash(password, 10)

        const newUser = new User({
          email,
          password,
          username,
        })
        const newUserData = await newUser.save()
        const token = generateToken(newUserData)

        return {
          ...newUserData._doc,
          id: newUserData._id,
          token,
        }
      } catch (error) {
        return error
      }
    },
    login: async (parent, { logInp: { email, password } }, context, info) => {
      const { errors, isValid } = validateLoginInput(email, password)

      try {
        if (!isValid) {
          throw new UserInputError('Input Error', { errors })
        }

        const user = await User.findOne({ email })

        if (!user) {
          errors.general = 'User not found'
          throw new UserInputError('User not found', { errors })
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          errors.general = 'Wrong credentials'
          throw new UserInputError('Wrong credentials', { errors })
        }
        const token = generateToken(user)

        return {
          ...user._doc,
          id: user._id,
          token,
        }
      } catch (error) {
        return error
      }
    },
  },
}
