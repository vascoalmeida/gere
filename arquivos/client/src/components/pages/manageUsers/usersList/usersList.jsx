import React, {Component} from "react";
import "./usersList.css";

class UsersList extends Component {
    render() {
        return(
            <div id="users-list">
                <div id="dashboard">
                    <div className="db-section">
                        <label className="label-title">Filtros</label>
                        <select className="filter-search">
                            <option value="op1">Opt 1</option>
                            <option value="op2">Opt 2</option>
                            <option value="op3">Opt 3</option>
                        </select>
                    </div>

                    <div className="db-section button-container">
                        <div className="form-button">Filtrar</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersList;