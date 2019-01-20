import React, {Component} from "react";
import {HashRouter, NavLink, Route, Redirect} from "react-router-dom";
import AddUser from "./addUser/addUser";
import UsersList from "./usersList/usersList";
import "./manageUsers.css";

class ManageUsers extends Component {
    render() {
        return(
            <HashRouter>
                <React.Fragment>
                    <div id="form-header">
                        <div id="form-title">Gerir Utilizadores</div>
                        <div id="form-options">
                            <NavLink className="form-select" to="/main/gerir/utilizadores/lista">Lista</NavLink>
                            <NavLink className="form-select" to="/main/gerir/utilizadores/criar/">Criar utilizadores</NavLink>
                        </div>
                    </div>

                    <div id="manage-users">
                        <Redirect to="/main/gerir/utilizadores/lista" />
                        <Route path="/main/gerir/utilizadores/lista" component={UsersList} />
                        <Route path="/main/gerir/utilizadores/criar/" component={AddUser} />
                    </div>
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default ManageUsers;