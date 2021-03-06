import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAuth, setWarning, setAuth } from '../store';
import Cookies from 'js-cookie';
import { DisplayText, InlineError } from '@shopify/polaris';
import '../styles/Login.css';

class Login extends Component {
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
        <DisplayText size="extraLarge"> Occupied Login </DisplayText>
        <div className="form">
          <InlineError message={warning} fieldId="login" />
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
          dispatch(setWarning("Incorrect Username/Password."));
        }
      })
    },
    changeAuth: () => {
      dispatch(setAuth());
    }
  }
}

export default connect(mapState, mapDispatch)(Login);