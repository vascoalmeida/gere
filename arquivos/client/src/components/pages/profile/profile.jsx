import React, {Component} from "react";
import {NavLink, HashRouter, Route, Redirect} from "react-router-dom";
import RoomRequests from "./roomRequests/roomRequests";
import EquipmentRequests from "./equipmentRequests/equipmentRequests";
import "./profile.css";

class Profile extends Component {
    
    constructor() {
        super();
        
        this.state = {
            name: "",
            email: "",
            class: "",
            requisitions: [],
        }
    }

    componentDidMount() {
        fetch("/user", {
            method: "GET",
        })
        .then(r => {
            if(r.status === 200) {
                r.json()
                .then(res => {

                    this.setState({
                        name: res.name,
                        email: res.email,
                        class: res.class,
                    }, () => {

                        fetch("/room/request/list/" + this.state.email, {
                            method: "GET"
                        })
                        .then(requests_raw => {
                            requests_raw.json()
                            .then(requests => {
                                console.log(requests);
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));

                        fetch("/equipment/request/list/" + this.state.email, {
                            method: "GET"
                        })
                        .then(requests_raw => {
                            requests_raw.json()
                            .then(requests => {
                                console.log(requests);
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));

                    });
                })
                .catch(err => console.log(err));
            }
            else if(r.status === 401) {
                window.location = "/#/home";
            }
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <React.Fragment>
                <div id="form-header">
                    <div id="form-title">Perfil</div>
                </div>

                <div id="profile">
                    <div id="personal-info">
                        <div>
                            <label className="label-title">Nome</label>
                            <span className="text">{this.state.name}</span>
                        </div>

                        <div>
                            <label className="label-title">Turma</label>
                            <span className="text">{this.state.class}</span>
                        </div>

                        <div>
                            <label className="label-title">Email</label>
                            <span className="text">{this.state.email}</span>
                        </div>
                    </div>

                    <HashRouter>
                        <div id="user-requisitions">
                            <div id="requisition-header">
                                <div className="section-title">As minhas requisições</div>
                                <div id="form-options">
                                    <NavLink to="/main/perfil/requisicoes/salas" className="form-select">Sala</NavLink>
                                    <NavLink to="/main/perfil/requisicoes/equipamento" className="form-select">Equipamento</NavLink>
                                </div>
                            </div>

                            <div id="requests-container">
                                <Redirect to="/main/perfil/requisicoes/salas" />
                                <Route path="/main/perfil/requisicoes/salas" render={() => <RoomRequests email={this.state.email} />} />
                                <Route path="/main/perfil/requisicoes/equipamento" render={() => <EquipmentRequests email={this.state.email} />} />
                            </div>
                        </div>
                    </HashRouter>
                </div>
            </React.Fragment>
        );
    }
}

export default Profile;