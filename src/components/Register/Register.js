import React from 'react';
import './Register.css';

class Reagister extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Email: '',
            Password: '',


        }
    }

    onNameChange = (event) => {
        this.setState({ Name: event.target.value })
        console.log(this.state.Name);
    }

    onEmailChange = (event) => {
        this.setState({ Email: event.target.value })
        console.log(this.state.Email);
    }

    onPasswordChange = (event) => {
        this.setState({ Password: event.target.value })
    }

   
    onsubmitsignin = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.Email,
                password: this.state.Password,
                name: this.state.Name
            })
        })
            .then(response => response.json())
            .then(users => {
                if (users) {
                    this.props.loaduser(users)
                    this.props.onroutechange('home');
                }
            })

    }


    render() {
        //  const { onroutechange } = this.props
        return (
            <div className="container">
                <main className="pa4 black-80 shadow-5   signin_container">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="Name"
                                    id="Name"
                                    onChange={this.onNameChange} />
                            </div>

                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" for="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange} />
                            </div>

                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" for="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange} />
                            </div>

                        </fieldset>
                        <div>
                            <input
                                onClick={(e) => this.onsubmitsignin(e)}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>

                    </form>
                </main>
            </div>)
    }
}




export default Reagister;
