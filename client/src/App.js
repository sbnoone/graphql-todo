import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'
import { AuthProvider } from './context/auth'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
