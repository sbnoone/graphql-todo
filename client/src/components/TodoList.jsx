import React from 'react'
import DeleteButton from './DeleteButton'
import { Button, Checkbox, List } from 'semantic-ui-react'

const TodoList = ({ todos, loading, toggleTodo, openEditModal, user }) => {
  let list = null

  if (user) {
    if (todos) {
      list = todos.map(t => {
        return (
          <List.Item className='todo-item' key={t.id}>
            <div>
              <List.Content>
                <Checkbox
                  checked={t.completed}
                  label={t.text}
                  onChange={() => {
                    toggleTodo({ variables: { id: t.id } })
                  }}
                />
              </List.Content>
            </div>
            <div>
              <List.Content floated='right'>
                <DeleteButton color='youtube' todoId={t.id} />
              </List.Content>
              <List.Content floated='right'>
                <Button onClick={() => openEditModal(t)}>edit</Button>
              </List.Content>
            </div>
          </List.Item>
        )
      })
    }
  } else {
    list = todos.map(t => {
      return (
        <List.Item key={t.id}>
          <Checkbox checked={t.completed} label={t.text} disabled />
        </List.Item>
      )
    })
  }

  return (
    <List divided ordered verticalAlign='middle'>
      {!todos.length ? <h3>No todos</h3> : <h3>Todos</h3>}
      {loading ? <div>loading...</div> : list}
    </List>
  )
}

export default TodoList
