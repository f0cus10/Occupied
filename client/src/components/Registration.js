import React, { PureComponent } from 'react';
import axios from 'axios';
import { Message } from 'semantic-ui-react';
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
            incompleteError: '',
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        //when the submit button is pressed, all the errors should be cleared
        this.setState({
            usernameError: '',
            passwordError: '',
            incompleteError: '',
        })
        const { username, password, firstName, lastName } = this.state;

        //Make a frontend optimization on null data
        if (!username || !password){
            this.setState({
                incompleteError: "Username or Password is empty",
            })
            return;
        }

        const data = {
            username,
            password,
            description: firstName+lastName,
        };
        const res = await axios.post('/api/signup', data);
        if (res.status !== 201){
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
        const { username, password, firstName, lastName, usernameError, passwordError, incompleteError } = this.state;

        //Describe an error list 
        const errList = [];
        if (usernameError){
            errList.push(usernameError);
        }
        if (passwordError){
            errList.push(passwordError);
        }

        if(incompleteError) {
            errList.push(incompleteError);
        }
        return (
            <body>
                <div className="container">
                    <div id="logbox">
                        <form id="signup" method="post" action="/signup">
                            <input 
                                className="input pass transparent" 
                                onChange={this.onChange} 
                                name="firstName" 
                                type="text" value={firstName} 
                                placeholder="First Name" 
                                autoFocus="autofocus" 
                                required={false} 
                            />
                            <input className="input pass" onChange={this.onChange} name="lastName" type="text" value={lastName} placeholder="Last Name" required={false} />
                            <input 
                                error={(!!usernameError || !!incompleteError) ? "true" : undefined } // the !! casts it as a boolean
                                className="input pass" 
                                onChange={this.onChange} 
                                name="username" type="text" 
                                value={username} 
                                placeholder="Username"  
                                required="required" 
                            />
                            <input
                                error={(!!passwordError || !!incompleteError) ? "true": undefined }
                                className="input pass" 
                                onChange={this.onChange} 
                                name="password" 
                                type="password" 
                                value={password} 
                                placeholder="Password"  
                                required="required"
                            />
                            <input className="inputButton" type="submit" onClick={this.onSubmit} value="Sign me up!" />
                            
                            { usernameError || passwordError || incompleteError ? (<Message
                                error //show error only if it exits 
                                header="Sign up unsuccessful" 
                                list={errList}
                            />
                            ) : null
                            }

                            </form>
                            <p className="message">Already have a account? <a href="/">Back to login</a></p>
                    </div>
                </div>
            </body>
        );
    }
}

export default Registration;