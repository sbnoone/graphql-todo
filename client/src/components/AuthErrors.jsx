import React from 'react'

const AuthErrors = ({ errors }) => {
  const err = Object.values(errors)
  return err.length ? (
    <div className='ui error message'>
      <ul className='list'>
        {err.map(message => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  ) : null
}

export default AuthErrors
