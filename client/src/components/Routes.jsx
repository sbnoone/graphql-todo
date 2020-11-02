import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Home from '../pages/Home'
import AuthRoute from '../utils/AuthRoute'
import Navigation from '../components/Navigation'
import Logout from './Logout'

const Routes = () => {
  return (
    <Container className='app-container'>
      <Navigation />
      <Route exact path='/' component={Home} />
      <Route exact path='/logout' component={Logout} />
      <AuthRoute exact path='/register' component={RegisterForm} />
      <AuthRoute exact path='/login' component={LoginForm} />
    </Container>
  )
}

export default Routes
