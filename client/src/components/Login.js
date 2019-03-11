import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, setAuth } from '../store';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { setUsername, isAuth } = this.props;
    // let { from } = this.props.location.state || { from: { pathname: "/" } };
    if (isAuth) {
      return <Redirect to='/home' />
    }

    return (
      <div className="login-page">
        <div className="form">
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
            <p className="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state.user)
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
      dispatch(setUser(username));
      dispatch(setAuth());
    }
  }
}

export default connect(mapState, mapDispatch)(Login);