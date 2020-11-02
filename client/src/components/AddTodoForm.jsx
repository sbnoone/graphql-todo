import React from 'react'
import { Form } from 'semantic-ui-react'

const AddTodoForm = ({ handleSubmit, handleChange, error, values }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        type='text'
        name='text'
        placeholder='text...'
        value={values.text}
        onChange={handleChange}
        error={!!error}
      />
      {error && <div>{error.message}</div>}
      <Form.Button type='submit'>add todo</Form.Button>
    </Form>
  )
}

export default AddTodoForm
