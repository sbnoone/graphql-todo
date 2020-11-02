import React from 'react'
import { useMutation } from '@apollo/client'
import { Form, Button, Header } from 'semantic-ui-react'
import useForm from '../utils/hooks'
import { AuthContext } from '../context/auth'
import AuthErrors from './AuthErrors'
import { REGISTER_MUTATION } from '../utils/graphql'

const RegisterForm = props => {
  const { login } = React.useContext(AuthContext)
  const [errors, setErrors] = React.useState({})
  const { values, handleChange, handleSubmit } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [register, { loading }] = useMutation(REGISTER_MUTATION, {
    variables: values,
    onError(error) {
      setErrors(error.graphQLErrors[0].extensions.exception.errors)
    },
    update(cache, { data: { register: userData } }) {
      login(userData)
      props.history.push('/')
    },
  })

  function registerUser() {
    register()
  }

  return (
    <div className='form-container'>
      <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
        <Header as='h1' textAlign='center'>
          Register
        </Header>
        <Form.Input
          label='Username'
          placeholder='Username'
          name='username'
          type='text'
          value={values.username}
          error={!!errors.username}
          onChange={handleChange}
        />
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
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={handleChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      <AuthErrors errors={errors} />
    </div>
  )
}

export default RegisterForm
