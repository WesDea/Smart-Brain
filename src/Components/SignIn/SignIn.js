import React, { Component } from 'react';


class SignIn extends Component {
    constructor(props){
        super(props);
        this.state ={
            signInEmail: '',
            signInPassword: '',
            error: false,
            errorMessage: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onError = (err) => {
        this.setState({
            error: true,
            errorMessage: err,
        })
    }

    // Makes a POST request to the server with user login details
    // then checks if request was successfull by checking for user.id in resopnse
    // if successful user is taken to home page
    onSubmitSignIn = () =>{
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword    
            })
        }).then(res => res.json())
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
        const { onRouteChange } = this.props;
        //displays error if there is one to display
        const errorDiv = this.state.error ? <div className="ma3 colour-red">{this.state.errorMessage}</div>: '';
        return(
            <main className="pa4 black-80 shadow-5 center w-40">
                <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                    {errorDiv}
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
                    <input onChange={this.onPasswordChange} 
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
                value="Sign in" 
                />
                </div>
                <div className="center lh-copy mt3">
                <a href="#0"  onClick={() => onRouteChange('register')} className="f6 link dim black db">Register</a>
                </div>
                </div>
            </main>
    
        );
    }
    
}

export default SignIn;