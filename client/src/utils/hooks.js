import React from 'react'

const useForm = (callback, initialValues = {}) => {
  const [values, setValues] = React.useState(initialValues)
  const handleChange = e => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    await callback()
  }

  return {
    values,
    handleChange,
    handleSubmit,
    setValues,
  }
}

export default useForm
