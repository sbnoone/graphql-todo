import React from 'react'
import { useMutation } from '@apollo/client'
import { Button } from 'semantic-ui-react'
import { FETCH_TODOS_QUERY, DELETE_TODO_MUTATION } from '../utils/graphql'

const DeleteButton = ({ todoId, ...props }) => {
  const [deleteTodo] = useMutation(DELETE_TODO_MUTATION, {
    variables: { id: todoId },
    update(cache) {
      let cachedData = cache.readQuery({ query: FETCH_TODOS_QUERY })
      let cd = Object.assign({}, cachedData)
      cd.todos = cd.todos.filter(t => t.id !== todoId)
      cache.writeQuery({ query: FETCH_TODOS_QUERY, data: cd })
    },
  })

  return (
    <Button {...props} onClick={deleteTodo}>
      delete
    </Button>
  )
}

export default DeleteButton
