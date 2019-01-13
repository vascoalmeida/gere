import React, {Component} from "react";
import "./mainPage.css";
import {
    HashRouter,
    NavLink,
    Route,
    Redirect
} from "react-router-dom";
import RequisitionPage from "../requisitionPage/requisitionPage";
import ManageRequestsPage from "../manageRequestsPage/manageRequestsPage";
import ManageRoomRequests from "../manageRoomRequests/manageRoomRequests";
import ManageRoomsPage from "../manageRoomsPage/manageRoomsPage";
import ManageEquipmentPage from "../manageEquipmentPage/manageEquipmentPage";

class MainPage extends Component {

    constructor() {
        super();

        this.logout = this.logout.bind(this);
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
        return(
            <React.Fragment>
                <div id="header-nav">
                    <div id="logout-btn" onClick={this.logout}>Logout</div>
                </div>
                <div id="panels-container">
                    <HashRouter>
                        <React.Fragment>
                            <div id="menu-panel">
                                <ul id="menu">
                                    <NavLink to="/main/requisitar" className="menu-item">
                                        <label>Requisitar</label>
                                        <img className="item-icon" src={window.location.origin + "/img/icon-book.png"} alt="book-icon" />
                                    </NavLink>
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
                                </ul>
                            </div>
                            <div id="main-content">
                                <Redirect to="/main/requisitar/sala" />

                                <Route path="/main/requisitar" component={RequisitionPage} />
                                <Route path="/main/gerir/salas" component={ManageRoomsPage} />
                                <Route path="/main/gerir/equipamento" component={ManageEquipmentPage} />
                                <Route path="/main/gerir/requisicoes" component={ManageRequestsPage} />
                            </div>
                        </React.Fragment>
                    </HashRouter>
                </div>
            </React.Fragment>
        );
    }
}

export default MainPage;