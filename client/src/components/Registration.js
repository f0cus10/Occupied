import React, { PureComponent } from 'react';
import axios from 'axios';
import {Input, Button, } from 'semantic-ui-react';
import '../styles/Registration.css';

class Registration extends PureComponent {
    //keep track of the variables
    constructor(props){
        super(props);
        this.state = {
            username: '',
            usernameError: '',
            password: '',
            passwordError: '',
            firstName: '',
            lastName: '',
            err: ''
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        //when the submit button is pressed, all the errors should be cleared
        this.setState({
            usernameError: '',
            passwordError: ''
        })
        const { username, password, firstName, lastName } = this.state;
        const data = {
            username,
            password,
            description: firstName+lastName,
        };
        const res = await axios.post('/api/signup', data);
        if (res.status != 201){
            console.log("Something went wrong");
        }

        const { registered, errors } = res.data;
        console.log(res.data);
        //if successfully logged in, redirect
        if(registered){
            this.props.history.push('/');
        }
        else{
            const err = {};
            errors.forEach(({path, message}) =>{
                // err['passwordError'] = 'too long'
                err[`${path}Error`] = message;
            })
            this.setState(err);
        }
    }

    onChange = (e) => {
        const {name, value} = e.target;
        //[name] will dynamically become username, password etc.
        this.setState({ [name]: value });
    };

    render() {
        //grab the variables from the state
        const { username, password, firstName, lastName, usernameError, passwordError, err } = this.state;

        return (
            <body>
                <div className="container">
                    <div id="logbox">
                        <h2> {err} </h2>
                        <form id="signup" method="post" action="/signup">
                            <Input 
                                className="input pass transparent" 
                                onChange={this.onChange} 
                                name="firstName" 
                                type="text" value={firstName} 
                                placeholder="First Name" 
                                autoFocus="autofocus" 
                                required={false} 
                            />
                            <Input className="input pass transparent" onChange={this.onChange} name="lastName" type="text" value={lastName} placeholder="Last Name" required={false} />
                            <Input
                                error={!!usernameError} // the !! casts it as a boolean
                                className="input pass transparent" 
                                onChange={this.onChange} 
                                name="username" type="text" 
                                value={username} 
                                placeholder="Username"  
                                required="required" 
                            />
                            <Input
                                error={!!passwordError}
                                className="input pass transparent" 
                                onChange={this.onChange} 
                                name="password" 
                                type="password" 
                                value={password} 
                                placeholder="Password"  
                                required="required"
                            />
                            <Button className="inputButton" onClick={this.onSubmit}> Sign me up! </Button>
                            </form>
                            <p className="message">Already have a account? <a href="/">Back to login</a></p>
                    </div>
                </div>
            </body>
        );
    }
}

export default Registration;