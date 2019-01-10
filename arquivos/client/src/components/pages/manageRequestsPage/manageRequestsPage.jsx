import React, {Component} from "react";
import {
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";

class ManageRequests extends Component {
    render() {
        return(
            <HashRouter>
                <React.Fragment>
                    <div id="form-header">
                        <div id="form-title"></div>
                        <div id="form-options">
                            {/*<NavLink className="form-select" to="/main/gerir_requisicoes/salas">Sala</NavLink>
                            <NavLink className="form-select" to="/main/gerir_requisicoes/materiais" >Material</NavLink>*/}
                        </div>
                    </div>

                    <Route path="/main/gerir_requisicoes/salas" />
                    <Route path="/main/gerir_requisicoes/materiais" />
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default ManageRequests;