import React from 'react'
import { gql, useMutation } from '@apollo/client'
import { Button, Modal, Form } from 'semantic-ui-react'

const EditModal = ({ closeEditModal, text, id }) => {
  const [todoText, setTodoText] = React.useState(text)
  const [updateTodo] = useMutation(UPDATE_TODO_MUTATION, {
    variables: { id, text: todoText },
  })
  const handleChange = e => {
    setTodoText(e.target.value)
  }

  const saveTodoChanges = () => {
    updateTodo()
    closeEditModal()
  }

  return (
    <Modal size='small' open onClose={closeEditModal}>
      <Modal.Header>Edit todo</Modal.Header>
      <Form.Input fluid type='text' name='text' placeholder='text...' value={todoText} onChange={handleChange} />

      <Modal.Actions>
        <Button negative onClick={closeEditModal}>
          cancel
        </Button>
        <Button positive disabled={!todoText} onClick={saveTodoChanges}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const UPDATE_TODO_MUTATION = gql`
  mutation UpdateTodo($id: ID!, $text: String!) {
    updateTodo(id: $id, text: $text) {
      id
      text
      updatedAt
    }
  }
`

export default EditModal
