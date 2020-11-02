import React from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink, ApolloLink, concat } from '@apollo/client'
import App from './App'

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwtToken')
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  forward(operation)
})

const httpLink = createHttpLink({
  uri: 'http://localhost:3333',
})

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
})

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
