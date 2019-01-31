import React, {Component} from "react";
import UserItem from "../userItem/userItem";
import "./usersList.css";

class UsersList extends Component {

    constructor() {
        super();

        this.state = {
            users_list: [],
        }
    }

    componentDidMount() {
        fetch("/user/list", {
            method: "GET",
            headers: {
                "Accept": "application/json",   
            },
        })
        .then(r => {
            r.json()
            .then(res => {
                this.setState({
                    users_list: res.users_list,
                });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

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

                <div id="users-list">
                    {
                        this.state.users_list.length !== 0 ?

                            this.state.users_list.map(user => 
                                <UserItem key={user} email={user} /> 
                            )
                        :
                        <label className="faded-label">Ainda não existem utilizadores</label>
                    }
                </div>
            </div>
        );
    }
}

export default UsersList;