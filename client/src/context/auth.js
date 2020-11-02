import React from 'react'
import jwtDecode from 'jwt-decode'

const initialState = {
  user: null,
}

const token = localStorage.getItem('jwtToken')
if (token) {
  const userData = jwtDecode(token)

  if (userData.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken')
  } else {
    initialState.user = userData
  }
}

const AuthContext = React.createContext({
  user: null,
  login: userData => {},
  logout: () => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = React.useReducer(authReducer, initialState)

  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  const login = userData => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({ type: 'LOGIN', payload: userData })
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
}

export { AuthContext, AuthProvider }
