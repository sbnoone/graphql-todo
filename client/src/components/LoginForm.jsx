import React from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button, Header } from 'semantic-ui-react'
import useForm from '../utils/hooks'
import { AuthContext } from '../context/auth'
import AuthErrors from './AuthErrors'
import { LOGIN_MUTATION } from '../utils/graphql'

const LoginForm = props => {
  const auth = React.useContext(AuthContext)
  const [errors, setErrors] = React.useState({})
  const { values, handleChange, handleSubmit } = useForm(loginUser, {
    email: '',
    password: '',
  })

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    variables: values,
    onError(error) {
      if (error.graphQLErrors.length) {
        setErrors(error.graphQLErrors[0].extensions.exception.errors)
      }
    },
    update(cache, { data: { login: userData } }) {
      auth.login(userData)
      props.history.push('/')
    },
  })
  function loginUser() {
    login()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
        <Header as='h1' textAlign='center'>
          Login
        </Header>
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          error={!!errors.email}
          onChange={handleChange}
        />

        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          error={!!errors.password}
          onChange={handleChange}
        />

        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      <AuthErrors errors={errors} />
    </div>
  )
}

export default LoginForm
