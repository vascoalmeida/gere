import React, {Component} from "react";
import "./mainPage.css";
import {
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";
import RequestEquipmentForm from "../requestEquipmentForm/requestEquipmentForm";

class MainPage extends Component {
    render() {
        return(
            <div id="main-page">
                <div id="header-nav">
                    <img id="im-logo" src="http://www.imultimedia.org/wp-content/uploads/2015/09/logo_IM_incial_transparent.png" alt="Instituto Multimedia logo" />
                </div>
                <div id="panels-container">
                    <HashRouter>
                        <React.Fragment>
                            <div id="menu-panel">
                                <ul id="menu">
                                    <li className="menu-item">
                                        <NavLink to="/main/requisitar">Requisitar</NavLink>
                                    </li>
                                    <li className="menu-item">
                                        <NavLink to="/material">Material</NavLink>
                                    </li>
                                    <li className="menu-item">
                                        <NavLink to="/reservas">Reservas</NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div id="main-content">
                                <Route path="/main/requisitar" component={RequestEquipmentForm} />
                                
                            </div>
                        </React.Fragment>
                    </HashRouter>
                </div>
            </div>
        );
    }
}

export default MainPage;