const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { DB_URL } = require('./config/dev')

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: ({ req }) => ({ req }),
})

async function start() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    const serverInfo = await server.listen({ port: 3333 })
    console.log('Server ', serverInfo.url)
  } catch (error) {
    console.error(error)
  }
}
start()
