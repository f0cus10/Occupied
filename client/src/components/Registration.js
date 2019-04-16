import React, { Component } from 'react';
import '../styles/Registration.css';

class Registration extends Component {

    render() {
        return (
            <body>
                <div class="container">
                    <div id="logbox">
                        <form id="signup" method="post" action="/signup">
                            <input class="input pass" name="user[firstName]" type="text" placeholder="First Name" autofocus="autofocus" required="false" />
                            <input class="input pass" name="user[lastName]" type="text"placeholder="Last Name" required="false" />
                            <input class="input pass" name="user[username]" type="text" placeholder="Username" pattern="^[\w]{3,16}$" required="required" />
                            <input class="input pass" name="user[password]" type="password" placeholder="Password" pattern="^[\w]{8,36}$" required="required"/>
                            <input class="inputButton" type="submit" value="Sign me up!" />
                            </form>
                            <p className="message">Already have a account? <a href="/">Back to login</a></p>
                    </div>
                </div>
            </body>
        );
    }
}

export default Registration;