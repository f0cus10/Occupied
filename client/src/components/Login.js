import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Authorization from '../auth';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuth: false
    };
  }

  login = (e) => {
    e.preventDefault();
    Authorization.authenticate(() => {
      this.setState({ isAuth: true })
    });
  }

  componentDidMount() {
    console.log('hello');
  }

  render() {
    const { isAuthenticated } = Authorization;
    // let { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isAuthenticated) {
      return <Redirect to='/home' />
    }

    return (
      <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input type="text" placeholder="name" />
            <input type="password" placeholder="password" />
            <input type="text" placeholder="email address" />
            <button>create</button>
            <p class="message">Already registered? <a href="#">Sign In</a></p>
          </form>
          <form class="login-form">
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button onClick={this.login}>login</button>
            <p class="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;