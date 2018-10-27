import React, {Component} from "react";
import {HashRouter, NavLink, Route} from "react-router-dom";
import RequestRoomForm from "../requestRoomForm/requestRoomForm";
import RequestEquipmentForm from "../requestEquipmentForm/requestEquipmentForm";

class RequisitionPage extends Component {
    render() {
        return(
            <HashRouter>
                <React.Fragment>
                    <NavLink to="req-sala">Sala</NavLink>
                    <NavLink to="req-material">Material</NavLink>

                    <Route path="req-sala" component={RequestRoomForm} />
                    <Route path="req-sala" component={RequestEquipmentForm} />
                    <h1>aaa</h1>
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default RequisitionPage;