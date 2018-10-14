import React, {Component} from "react";
import ServerReqBtn from "../serverReqBtn/serverReqBtn";

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password1: "",
            password2: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePass1Change = this.handlePass1Change.bind(this);
        this.handlePass2Change = this.handlePass2Change.bind(this);
    }

    handlePass1Change(ev) {
        this.setState({
            password1: ev.target.value
        });
    }

    handlePass2Change(ev) {
        this.setState({
            password2: ev.target.value
        });
    }

    handleUserChange(ev) {
        this.setState({
            username: ev.target.value
        });
    }

    handleSubmit(ev) {
        fetch("/register")
    }

    render() {
        return (
            <form id="register-form" action="/register" onSubmit={this.handleSubmit}>
                <div id="form-title">REGISTER</div>
                <div className="input-container">
                    <input type="text" placeholder="USERNAME" onChange={this.handleUserChange}></input>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="PASSWORD" onChange={this.handlePassChange}></input>
                </div>
                <div className="input-container">
                    <input type="password" placeholder="VERIFY PASSWORD" onChange={this.handlePassChange}></input>
                </div>
                <ServerReqBtn btn_text="Register" />
            </form>
        );
    }
}

export default RegisterForm;