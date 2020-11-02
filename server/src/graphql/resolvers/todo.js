const { isValidObjectId } = require('mongoose')
const { isAuthenticated } = require('../../utils/authMiddleware')
const Todo = require('../../models/todo')
const { AuthenticationError, UserInputError } = require('apollo-server')

module.exports = {
  Query: {
    todos: async (parent, args, context, info) => {
      const todos = await Todo.find({}).sort({ createdAt: 'desc' })
      return todos
    },
    todo: async (parent, { id }, context, info) => {
      try {
        const validId = isValidObjectId(id)
        if (!validId) {
          throw new Error('Not found')
        }

        const todo = await Todo.findById(id)
        if (!todo) {
          throw new Error('Not found')
        }
        return todo
      } catch (error) {
        return error
      }
    },
    userTodos: async (parent, { userId }, context, info) => {
      const todos = await Todo.find({ ownerId: userId })

      return todos
    },
  },
  Mutation: {
    addTodo: async (parent, { text }, context, info) => {
      try {
        const user = isAuthenticated(context)
        const newTodo = new Todo({
          text,
          ownerId: user.id,
          username: user.username,
        })

        return await newTodo.save()
      } catch (error) {
        return error
      }
    },
    deleteTodo: async (parent, { id }, context, info) => {
      try {
        const user = isAuthenticated(context)
        const todo = await Todo.findById(id)

        if (!todo) {
          throw new Error('Not found')
        }

        if (todo.ownerId.toString() === user.id.toString()) {
          await todo.deleteOne()
          return 'DELETED'
        } else {
          throw new AuthenticationError('Not allowed')
        }
      } catch (error) {
        return error
      }
    },
    updateTodo: async (parent, { id, text }, context, info) => {
      try {
        if (!text) {
          throw new UserInputError('No text provided')
        }

        const user = isAuthenticated(context)
        const todo = await Todo.findById(id)

        if (!todo) {
          throw new Error('Not found')
        }

        if (todo.ownerId.toString() === user.id.toString()) {
          todo.text = text
          todo.updatedAt = Date.now()

          return await todo.save()
        } else {
          throw new AuthenticationError('Not allowed')
        }
      } catch (error) {
        return error
      }
    },
    toggleTodo: async (parent, { id }, context, info) => {
      try {
        const todo = await Todo.findById(id)

        if (!todo) {
          throw new UserInputError('Todo not found')
        }

        todo.completed = !todo.completed
        todo.updatedAt = Date.now()

        return await todo.save()
      } catch (error) {
        return error
      }
    },
  },
}
