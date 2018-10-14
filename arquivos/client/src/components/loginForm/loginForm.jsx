import React, {Component} from "react";
import ServerReqBtn from "../serverReqBtn/serverReqBtn";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import "./loginForm.css"

class LoginForm extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: ""
        }

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(ev) {
        this.setState({
            username: ev.target.value
        });
    }

    handlePassChange(ev) {
        this.setState({
            password: ev.target.value,
        });
    }

    handleSubmit(ev) {
        fetch("/login", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
            }),
        })
        .then(r => r.json())
        .then(function(d) {
            console.log(d);
            return d.string;
        })
        .then(s => console.log(s));
    }

    render() {
        return (
            <form id="login-form" action="/login" onSubmit={this.handleSubmit}>
                <div id="form-title">LOGIN</div>
                <div className="input-container">
                    <input type="text" placeholder="USERNAME" onChange={this.handleUserChange}></input>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="PASSWORD" onChange={this.handlePassChange}></input>
                </div>
                <ServerReqBtn btn_text="Login" />
            </form>
        );
    }
}

export default LoginForm;