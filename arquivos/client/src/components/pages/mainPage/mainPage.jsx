import React, {Component} from "react";
import "./mainPage.css";
import {
    HashRouter,
    NavLink,
    Route,
} from "react-router-dom";
import RequisitionPage from "../requisitionPage/requisitionPage";
import ManageRequestsPage from "../manageRequestsPage/manageRequestsPage";
import ManageRoomsPage from "../manageRoomsPage/manageRoomsPage";
import ManageEquipmentPage from "../manageEquipmentPage/manageEquipmentPage";
import ManageUsers from "../manageUsers/manageUsers";
import Profile from "../profile/profile";

class MainPage extends Component {

    constructor() {
        super();

        this.state = {
            usr_rank: 0,
        }

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        fetch("/user/", {
            method: "GET",
            headers: {
                accept: "application/json",
            },
        })
        .then(r => {
            r.json()
            .then(res => {
                this.setState({
                    usr_rank: res.rank,
                });
            })
            .catch(err => console.log(err));
        })
        .catch();
    }

    logout() {
        fetch("/user/logout", {
            method: "GET",
        })
        .then(r => {
            window.location.reload();
        });
    }

    render() {
        var management_links;

        if(this.state.usr_rank == 1) {
            management_links = (
                <React.Fragment>
                    <NavLink to="/main/gerir/salas" className="menu-item">
                        <label>Gerir Salas</label>
                        <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                    </NavLink>

                    <NavLink to="/main/gerir/equipamento" className="menu-item">
                        <label>Gerir Equipamento</label>
                        <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                    </NavLink>

                    <NavLink to="/main/gerir/requisicoes" className="menu-item">
                        <label>Gerir Requisições</label>
                        <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                    </NavLink>

                    <NavLink to="/main/gerir/utilizadores" className="menu-item">
                        <label>Gerir Utilizadores</label>
                        <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                    </NavLink>
                </React.Fragment>
            );
        }

        else {
            management_links = null;
        }

        console.log(management_links)

        return(
            <HashRouter>
                <React.Fragment>
                    <div id="header-nav">
                        <div id="logout-btn" onClick={this.logout}>Logout</div>
                    </div>
                    <div id="panels-container">
                        <div id="menu-panel">
                            <ul id="menu">
                                <NavLink to="/main/perfil" className="menu-item">
                                    <label>Perfil</label>
                                    <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                                </NavLink>

                                <NavLink to="/main/requisitar" className="menu-item">
                                    <label>Requisitar</label>
                                    <img className="item-icon" src={window.location.origin + "/img/icon-book.png"} alt="book-icon" />
                                </NavLink>

                                {management_links}
                            </ul>
                        </div>
                        <div id="main-content">
                            <Route path="/main/perfil" component={Profile} />
                            <Route path="/main/requisitar" component={RequisitionPage} />
                            <Route path="/main/gerir/salas" component={ManageRoomsPage} />
                            <Route path="/main/gerir/equipamento" component={ManageEquipmentPage} />
                            <Route path="/main/gerir/requisicoes" component={ManageRequestsPage} />
                            <Route path="/main/gerir/utilizadores" component={ManageUsers} />
                        </div>
                    </div>
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default MainPage;