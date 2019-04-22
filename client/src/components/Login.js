import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAuth, setWarning, setAuth } from '../store';
import Cookies from 'js-cookie';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (Cookies.get('token')) {
      this.props.changeAuth()
    }
  }
  render() {
    const { setUsername, warning, isAuth } = this.props;
    if (isAuth) {
      return <Redirect to='/Home' />
    }

    return (
      <div className="login-page">
        <h1> Occupied Login </h1>
        <div className="form">
          <h2> {warning} </h2>
          <form className="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p className="message">Already registered? <a href="#">Sign In</a></p>
          </form>
          <form onSubmit={setUsername} className="login-form">
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="password" />

            <button type="submit">login</button>
            <p className="message">Not registered? <a href="/register">Create an account</a></p>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    username : state.user.user,
    isAuth   : state.user.auth,
    warning  : state.user.warning
  }
}

const mapDispatch = dispatch => {
  return {
    setUsername: (e) => {
      e.preventDefault();
      const username = e.target.username.value;
      const password = e.target.password.value;
      dispatch(loginAuth(username, password))
      .then(res => {
        if (!res) {
          dispatch(setWarning("User does not exist!"));
        }
      })
    },
    changeAuth: () => {
      dispatch(setAuth());
    }
  }
}

export default connect(mapState, mapDispatch)(Login);