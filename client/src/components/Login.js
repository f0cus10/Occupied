import React, { Component } from 'react';
import '../styles/Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        alert(this.state.username);
    }

    handleChange(event) {
        this.setState({ username: event.target.value });
        console.log(this.state);
    }

    render() {
        return (
            <section class="form animated flipInX">
                <h2>Login To Your Account</h2>
                <p class="valid">Valid. Please wait a moment.</p>
                <p class="error">Error. Please enter correct Username &amp; password.</p>
                <form onSubmit={this.onSubmit} class="loginbox" autocomplete="off">
                    <input onChange={this.handleChange} placeholder="Username" type="text" id="username"></input>
                    <input placeholder="Password" type="password" id="password"></input>
                    <button id="submit">Login</button>
                </form>
            </section>
        );
    }
}

export default Login;