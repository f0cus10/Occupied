import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../store';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warning: ""
    };
  }

  render() {
    const { setUsername, isAuth } = this.props;
    const { warning} = this.state;
    // let { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isAuth) {
      return <Redirect to='/Home' />
    }

    return (
      <div className="login-page">
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
    username: state.user.user,
    isAuth: state.user.isAuth
  }
}

const mapDispatch = dispatch => {
  return {
    setUsername(e) {
      e.preventDefault();
      const username = e.target.username.value;
      const isLogin = dispatch(auth(username));
      if (!isLogin) {
        this.setState({ warning: "User does not exist!" })
      }
    }
  }
}

export default connect(mapState, mapDispatch)(Login);