import React, {Component} from "react";
import "./mainPage.css";
import {
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";
import RequisitionPage from "../requisitionPage/requisitionPage";

class MainPage extends Component {

    constructor() {
        super();

        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        fetch("/main", {
            method: "GET",
        })
        .then(r => {
            console.log(r);
            if(r.status === 401) {
                window.location = "/#/home";
                return;
            }
        })
        .catch(err => console.log(err));
    }

    logout() {
        fetch("/logout", {
            method: "GET",
        })
        .then(r => console.log(r))
        .catch(err => console.log(err));
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
                                    <NavLink to="/main/material" className="menu-item">
                                        <label>Material</label>
                                        <img className="item-icon" src={window.location.origin + "/img/icon-camera.png"} alt="book-icon" />
                                    </NavLink>
                                    <NavLink to="/main/salas" className="menu-item">
                                        <label>Salas</label>
                                        <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                                    </NavLink>
                                    <NavLink to="/main/gerir-requisicoes" className="menu-item">
                                        <label>Gerir Requisições</label>
                                        <img className="item-icon" src={window.location.origin + "/img/icon-room.png"} alt="book-icon" />
                                    </NavLink>
                                </ul>
                            </div>
                            <div id="main-content">
                                <Route path="/main/requisitar" component={RequisitionPage} />
                                <Route path="/main/gerir-requisicoes" component={RequisitionPage} />
                            </div>
                        </React.Fragment>
                    </HashRouter>
                </div>
            </React.Fragment>
        );
    }
}

export default MainPage;