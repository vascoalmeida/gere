import React, {Component} from "react";
import {
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";
import "./manageRoomsPage.css";
import AddRoom from "../addRoom/addRoom";

class ManageRoomsPage extends Component {
    render() {
        return(
            <HashRouter>
                <React.Fragment>
                    <div id="form-header">
                        <div id="form-title">Gerir Salas</div>
                        <div id="form-options">
                            <NavLink className="form-select" to="/main/gerir-salas/adicionar">Adicionar</NavLink>
                            <NavLink className="form-select" to="/main/gerir-salas/remover">Remover</NavLink>
                            <NavLink className="form-select" to="/main/gerir-salas/editar">Editar</NavLink>
                        </div>
                    </div>

                    <Route path="/main/gerir-salas/adicionar" render={() => <AddRoom method="POST" />} />
                    <Route path="/main/gerir-salas/remover" />
                    <Route path="/main/gerir-salas/editar" />
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default ManageRoomsPage;