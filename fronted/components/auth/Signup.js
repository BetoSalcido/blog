import React, { useState } from "react";
import { signup } from "../../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "Beto Salcido",
    email: "betosalcido.work@gmail.com",
    password: "123",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  })

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.table({ name, email, password, error, loading, message, showForm })
    setValues({...values, loading: true, error: false})
    const user = { name, email, password }

    signup(user)
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error, loading: false})
      } else {
        setValues({...values, name: '', password: '', error: '', loading: false, email: '', message: data.message, showForm: false})
      }
    })
  }

  const handleOnChange = name => e => {
    e.preventDefault()
    setValues({
        ...values,
        error: false,
        [name]: e.target.value
    })
  }

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')
  const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '')
  const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '')

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={name}
            className="form-control"
            type="text"
            placeholder="Type your name"
            onChange={handleOnChange('name')}
          />

          <div className="form-group">
            <input
              value={email}
              className="form-control"
              type="email"
              placeholder="Type your email"
              onChange={handleOnChange('email')}
            />
          </div>
        </div>

        <div className="form-group">
          <input
            value={password}
            className="form-control"
            type="password"
            placeholder="Type your password"
            onChange={handleOnChange('password')}
          />
        </div>

        <div>
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    )
  }

  return( 
    <React.Fragment> 
      { showError() }
      { showLoading() }
      { showMessage() }
      { showForm && signupForm() }
    </React.Fragment>
  )
}

export default SignupComponent
