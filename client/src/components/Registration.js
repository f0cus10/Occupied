import React, { Component } from 'react';
import '../styles/Registration.css';

class Registration extends Component {

    render() {
        return (
            <body>
                <div class="container">
                    <div id="logbox">
                        <form id="signup" method="post" action="/signup">
                            <input class="input pass" name="user[name]" type="text" placeholder="First Name" pattern="^[\w]{3,16}$" autofocus="autofocus" required="required" /><input class="input pass" name="user[password]" type="password"
                                placeholder="Last Name" required="required" /><input class="input pass" name="user[password2]" type="password" placeholder="Email" required="required" /><input class="input pass" name="user[email]" type="email" placeholder="Password"
                            /><input class="inputButton" type="submit" value="Sign me up!" /></form>
                            <p className="message">Already have a account? <a href="/">Back to login</a></p>
                    </div>
                </div>
            </body>
        );
    }
}

export default Registration;