import React, {Component} from "react";
import {
    HashRouter,
    NavLink,
    Route,
    Redirect
} from "react-router-dom";
import ManageRoomRequests from "../manageRoomRequests/manageRoomRequests";

class ManageRequests extends Component {
    render() {
        return(
            <HashRouter>
                <React.Fragment>
                    <div id="form-header">
                        <div id="form-title">Gerir Requisições</div>
                        <div id="form-options">
                            <NavLink className="form-select" to="/main/gerir/requisicoes/salas">Sala</NavLink>
                            <NavLink className="form-select" to="/main/gerir/requisicoes/equipamentos" >Equipamento</NavLink>
                        </div>
                    </div>

                    <Redirect to="/main/gerir/requisicoes/salas" />
                    <Route path="/main/gerir/requisicoes/salas" component={ManageRoomRequests} />
                    <Route path="/main/gerir/requisicoes/materiais" />
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default ManageRequests;