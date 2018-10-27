import React, {Component} from "react";
import "./mainPage.css";
import {
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";
import RequisitionPage from "../requisitionPage/requisitionPage";

class MainPage extends Component {
    render() {
        return(
            <React.Fragment>
                <div id="header-nav">
                    <img id="im-logo" src="http://www.imultimedia.org/wp-content/uploads/2015/09/logo_IM_incial_transparent.png" alt="Instituto Multimedia logo" />
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
                                </ul>
                            </div>
                            <div id="main-content">
                                <Route path="/main/requisitar" component={RequisitionPage} />
                            </div>
                        </React.Fragment>
                    </HashRouter>
                </div>
            </React.Fragment>
        );
    }
}

export default MainPage;