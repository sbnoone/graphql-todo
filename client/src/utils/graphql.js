import { gql } from '@apollo/client'

export const FETCH_TODOS_QUERY = gql`
  {
    todos {
      id
      ownerId
      text
      completed
      createdAt
      updatedAt
    }
  }
`
export const ADD_TODO_MUTATION = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      ownerId
      __typename
    }
  }
`

export const TOGGLE_TODO_MUTATION = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      completed
      updatedAt
      id
    }
  }
`

export const DELETE_TODO_MUTATION = gql`
  mutation($id: ID!) {
    deleteTodo(id: $id)
  }
`
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(logInp: { email: $email, password: $password }) {
      id
      token
      username
    }
  }
`

export const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register(regInp: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
      id
      token
      username
    }
  }
`
