import Router from "next/router";
import React, { useState, useEffect } from "react";
import { signin, authenticate, isAuth } from "../../actions/auth";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "betosalcido.work@gmail.com",
    password: "123456",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  })

  const {email, password, error, loading, message, showForm } = values;
  
  useEffect(() => {
    isAuth() && Router.push('/')
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.table({ name, email, password, error, loading, message, showForm })
    setValues({...values, loading: true, error: false})
    const user = { email, password }

    signin(user)
    .then(data => {
      if (data.error) {
        setValues({...values, error: data.error, loading: false})
      } else {
        authenticate(data, () => {
          Router.push(`/`)
        })
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

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <input
              value={email}
              className="form-control"
              type="email"
              placeholder="Type your email"
              onChange={handleOnChange('email')}
            />
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
          <button className="btn btn-primary">Sign in</button>
        </div>
      </form>
    )
  }

  return( 
    <React.Fragment> 
      { showError() }
      { showLoading() }
      { showMessage() }
      { showForm && signinForm() }
    </React.Fragment>
  )
}

export default SigninComponent
