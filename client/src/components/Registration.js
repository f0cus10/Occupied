import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Registration.css';

class Registration extends Component {
    //keep track of the variables
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '', 
            firstName: '',
            lastName: '',
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, password, firstName, lastName } = this.state;
        const data = {
            username,
            password,
            description: firstName+lastName
        };
        console.log(`sending data with ${data}`)
        axios.post('/api/signup', {body: data})
            .then(res => {
                //for now, we'll log the data
                console.log(res);
            })
    }

    onChange = (e) => {
        const {name, value} = e.target;
        //[name] will dynamically become username, password etc.
        this.setState({ [name]: value });
    };

    render() {
        //grab the variables from the state
        const { username, password, firstName, lastName } = this.state;

        return (
            <body>
                <div className="container">
                    <div id="logbox">
                        <form id="signup" method="post" action="/signup">
                            <input className="input pass" onChange={this.onChange} name="firstName" type="text" value={firstName} placeholder="First Name" autoFocus="autofocus" required={false} />
                            <input className="input pass" onChange={this.onChange} name="lastName" type="text" value={lastName} placeholder="Last Name" required={false} />
                            <input className="input pass" onChange={this.onChange} name="username" type="text" value={username} placeholder="Username" pattern="^[\w]{3,16}$" required="required" />
                            <input className="input pass" onChange={this.onChange} name="password" type="password" value={password} placeholder="Password" pattern="^[\w]{8,36}$" required="required"/>
                            <input className="inputButton" type="submit" onClick={this.onSubmit} value="Sign me up!" />
                            </form>
                            <p className="message">Already have a account? <a href="/">Back to login</a></p>
                    </div>
                </div>
            </body>
        );
    }
}

export default Registration;