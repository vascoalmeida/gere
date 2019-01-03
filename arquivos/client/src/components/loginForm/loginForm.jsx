import React, {Component} from "react";
import "./loginForm.css"

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: ""
        }

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(ev) {
        this.setState({
            email: ev.target.value
        });
    }

    handlePassChange(ev) {
        this.setState({
            password: ev.target.value,
        });
    }

    handleSubmit() {
        fetch("/user/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "email": this.state.email,
                "password": this.state.password,
            }),
        })
        .then((r) => {
            if(r.status === 200) {
                window.location = "/#/main";
            }
            else {
                alert("Email e/ou password errados");
            }
        })
        .catch(err => {
            alert("Infelizmente ocorreu um erro, por favor tente mais tarde.");
        });
    }

    render() {
        return (
            <form id="login-form">
                <div id="form-name">Login</div>

                <input type="email" className="login-register-input" placeholder="Email" onChange={this.handleEmailChange} required />
                <input type="password" className="login-register-input" placeholder="Password" onChange={this.handlePassChange} required />

                <button className="form-button" type="button" onClick={this.handleSubmit}>Login</button>
                <div className="blue-text-link" onClick={this.props.changeForm}>Ainda não és membro?</div>
            </form>
        );
    }
}

export default LoginForm;