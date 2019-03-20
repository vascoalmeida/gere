import React, {Component} from "react";
import "./registerForm.css";

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password1: "",
            password2: "",
            email: "",
            class: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePass1Change = this.handlePass1Change.bind(this);
        this.handlePass2Change = this.handlePass2Change.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleClassChange = this.handleClassChange.bind(this);
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

    handleEmailChange(ev) {
        this.setState({
            email: ev.target.value
        });
    }

    handleClassChange(ev) {
        this.setState({
            class: ev.target.value
        });
    }

    handleSubmit() {
        if(this.state.username.length === 0 || this.state.password1.length === 0 || this.state.password2.length === 0 || this.state.email.length === 0 || this.state.class.length === 0) {
            alert("Por favor preencha todos os campos");
            return;
        }

        else if(this.state.password1 !== this.state.password2) {
            alert("As passwords não correspondem");
            return;
        }

        fetch("/user/activate", {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                "name": this.state.username,
                "password": this.state.password1,
                "email": this.state.email,
                "class": this.state.class,
            })
        })
        .then(r => {
            if(r.status === 401) {
                alert("O email que introduziu não está registado.");
                return;
            }

            alert("Foi registado/a com sucesso!");
            window.location.reload();
        })
        .catch();
    }

    render() {
        return (
            <form id="register-form" action="/register">
                <div id="form-name">Ativar Conta</div>
                    <input className="login-register-input" type="text" placeholder="Nome" onChange={this.handleUserChange}></input>
                    <input className="login-register-input" type="password" placeholder="Password" onChange={this.handlePass1Change}></input>
                    <input className="login-register-input" type="password" placeholder="Verificar password" onChange={this.handlePass2Change}></input>
                    <input className="login-register-input" type="email" placeholder="Email" onChange={this.handleEmailChange}></input>
                    <select className="login-register-input" onChange={this.handleClassChange}>
                        <option disabled selected>Turma</option>
                        <option value="1ºTM">1ºTM</option>
                        <option value="2ºTM">2ºTM</option>
                        <option value="3ºTM">3ºTM</option>
                        <option value="1ºAV">1ºAV</option>
                        <option value="1ºAV">2ºAV</option>
                        <option value="1ºAV">3ºAV</option>
                        <option value="1ºAV">1ºFOT</option>
                        <option value="1ºAV">2ºFOT</option>
                        <option value="1ºAV">3ºFOT</option>
                    </select>
                <button className="form-button" type="button" onClick={this.handleSubmit}>Registar</button>
                <div className="blue-text-link" onClick={this.props.changeForm}>Já és membro?</div>
            </form>
        );
    }
}

export default RegisterForm;