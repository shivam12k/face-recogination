import React from 'react';
import './signin.css';
class SignIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            SignInEmail: '',
            SignInPassword: '',
        }
    }

    onEmailChange = (event) => {
        this.setState({ SignInEmail: event.target.value })
        console.log(this.state.SignInEmail);
    }

    onPasswordChange = (event) => {
        this.setState({ SignInPassword: event.target.value })
    }

    onsubmitsignin = e => {
        // Added e as an argument && e.preventDefault() to stop form from reloading onPasswordChange
        e.preventDefault();

        fetch('/signin', {
            method: 'post',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
        .then(res => res.json())

            .then(data => {
              console.log(data);
                if (data === 'success') {

                     this.props.onroutechange('home');
                }
            })


    }


    render() {
        const { onroutechange } = this.props;

        return (
            <div className="container" >
              <main className="pa4 black-80 shadow-5 w-50 h-50 signin_container">
                {/* Added login submit to form */}
                <form className="measure center" onSubmit={(e) => this.onsubmitsignin(e)}>
                  <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="email" name="email-address" id="email-address"
                        onChange={this.onEmailChange} />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                      <input
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                        type="password"
                        name="password"
                        id="password"
                        onChange={this.onPasswordChange} />

                    </div>
                  </fieldset>
                  <div >
                    {/*  <input

                      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                      type="submit"
                      value="Sign in"
                      onClick={this.onsubmitsignin}
                    /> */}
                    {/* Changed input to submit button */}
                    <button type="submit" className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib">Sign in</button>
                  </div>
                  <input
                    onClick={() => onroutechange('register')}
                        className="b mv2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit"
                        value="Register"
                      />
                    </form>
                </main>
            </div>)
    }

}

export default SignIn;
