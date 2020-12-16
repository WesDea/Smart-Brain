import React, { Component } from 'react';


class Register extends Component {
    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            name: '',
            error: false,
            errorMessage: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value});
    }

    onError = (err) => {
        this.setState({
            error: true,
            errorMessage: err,
        })
    }

    //Makes a server POST request with the users register details
    // then checks to see if req was successful by looking for user.id
    // if successful user is taken to home page
    onSubmitSignIn = () =>{
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,     
                name: this.state.name
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } else {
                this.onError(user);
            }
        })
    }

    render(){
        //displays error if there is one to display
        const errorDiv = this.state.error ? <div className="ma3 colour-red">{this.state.errorMessage}</div>: '';
        return(
            <main className="pa4 black-80 shadow-5 w-40 center">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            {errorDiv}
                            <label className="db fw6 lh-copy f6" for="email-address">Name</label>
                            <input
                                onChange={this.onNameChange} 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="name"  
                                id="name" 
                                required
                                autoFocus
                                />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                            <input 
                                onChange={this.onEmailChange}
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                required
                                 />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" for="password">Password</label>
                            <input 
                                onChange={this.onPasswordChange}
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password"
                                required
                                />
                        </div>
                    </fieldset>
                    <div className="center">
                        <input 
                            onClick={this.onSubmitSignIn}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" />
                    </div>
                </div>
            </main>
        );
    }
}

export default Register;