import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import AddTodoForm from '../components/AddTodoForm'
import EditModal from '../components/Modal'
import TodoList from '../components/TodoList'
import { AuthContext } from '../context/auth'
import { FETCH_TODOS_QUERY, ADD_TODO_MUTATION, TOGGLE_TODO_MUTATION } from '../utils/graphql'
import useForm from '../utils/hooks'

const Home = () => {
  const auth = React.useContext(AuthContext)
  const [state, setState] = React.useState({
    openModal: false,
    currentTodo: null,
    error: null,
  })

  const { values, handleChange, handleSubmit, setValues } = useForm(handleAddTodo, { text: '' })
  const { loading, data } = useQuery(FETCH_TODOS_QUERY)
  const [toggleTodo] = useMutation(TOGGLE_TODO_MUTATION)
  const [addTodoMutation] = useMutation(ADD_TODO_MUTATION, {
    variables: values,
    update(cache, { data: { addTodo } }) {
      try {
        let cachedData = cache.readQuery({ query: FETCH_TODOS_QUERY })
        cachedData = Object.assign({}, cachedData)
        cachedData.todos = [addTodo, ...cachedData.todos]
        cache.writeQuery({ query: FETCH_TODOS_QUERY, data: cachedData })
        setValues({ text: '' })
      } catch (error) {
        console.log(error)
      }
    },
    onError(error) {
      if (error.graphQLErrors.length) {
        const errObj = { code: error.graphQLErrors[0].extensions.code, message: error.graphQLErrors[0].message }
        setState(prev => ({ ...prev, error: errObj }))
      }
    },
  })

  function handleAddTodo() {
    addTodoMutation()
  }

  const openEditModal = todo => {
    setState(prev => ({ ...prev, currentTodo: todo, openModal: true }))
  }
  const closeEditModal = () => {
    setState(prev => ({ ...prev, openModal: false }))
  }

  const { openModal, error, currentTodo } = state

  return (
    <>
      <div className='home-container'>
        {auth.user && (
          <AddTodoForm handleSubmit={handleSubmit} handleChange={handleChange} error={error} values={values} />
        )}
        {!loading && (
          <TodoList
            user={auth.user}
            todos={data.todos}
            loading={loading}
            toggleTodo={toggleTodo}
            openEditModal={openEditModal}
          />
        )}
        {openModal && <EditModal {...currentTodo} closeEditModal={closeEditModal} />}
      </div>
    </>
  )
}

export default Home
