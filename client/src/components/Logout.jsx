import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const Logout = () => {
  const { logout } = React.useContext(AuthContext)

  React.useEffect(() => {
    logout()
  }, [])

  return <Redirect to='/' />
}

export default Logout
