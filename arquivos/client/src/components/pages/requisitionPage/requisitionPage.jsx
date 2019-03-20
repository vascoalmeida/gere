import React, {Component} from "react";
import {HashRouter, NavLink, Route, Redirect} from "react-router-dom";
import RequestRoomForm from "../../requestRoomForm/requestRoomForm";
import RequestEquipmentForm from "../../requestEquipmentForm/requestEquipmentForm";
import "./requisitionPage.css";

class RequisitionPage extends Component {
    render() {
        return(
            <HashRouter>
                <React.Fragment>
                    <div id="form-header">
                        <div id="form-title">Requisitar</div>
                        <div id="form-options">
                            <NavLink className="form-select" to="/main/requisitar/sala">Sala</NavLink>
                            <NavLink className="form-select" to="/main/requisitar/material">Equipamento</NavLink>
                        </div>
                    </div>

                    <Redirect to="/main/requisitar/sala" />
                    <Route path="/main/requisitar/sala" component={RequestRoomForm} />
                    <Route path="/main/requisitar/material" component={RequestEquipmentForm} />
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default RequisitionPage;