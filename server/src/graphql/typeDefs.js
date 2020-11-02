const { gql } = require('apollo-server')

const typeDefs = gql`
  type Todo {
    id: ID!
    ownerId: ID!
    text: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String
  }

  type User {
    id: ID!
    email: String!
    username: String!
    token: String!
    createdAt: String!
  }

  input RegisterInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
    getUser(id: ID!): User!
    todos: [Todo]
    todo(id: ID!): Todo!
    userTodos(userId: ID!): [Todo]
  }
  type Mutation {
    register(regInp: RegisterInput!): User
    login(logInp: LoginInput!): User
    addTodo(text: String!): Todo!
    deleteTodo(id: ID!): String!
    updateTodo(id: ID!, text: String!): Todo!
    toggleTodo(id: ID!): Todo!
  }
`
module.exports = typeDefs
