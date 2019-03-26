import React, {Component} from "react";
import UserItem from "../userItem/userItem";
import Dashboard from "../../../dashboard/dashboard";
import "./usersList.css";

class UsersList extends Component {

    constructor() {
        super();

        this.state = {
            users_list: [],
        }

        this.getRequestsList = this.getRequestsList.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getRequestsList("GET");
    }

    getRequestsList(req_method, req_body) {
        var headers;
        var body;
        console.log("BBBBBBBBBBBBBBBBBBB", req_body);

        if(req_method === "POST") {
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            body = JSON.stringify(req_body);
        }


        else if(req_method === "GET") {
            headers = {
                Accept: "application/json",
            };
        }

        fetch("/user/list/", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(r => {
            if(r.status === 401) {
                window.location = "/#/home";
                return;
            }
            
            r.json()
            .then(res => {
                this.setState({
                    users_list: res.users_list,
                });
            })
            .catch(err => {
                console.log("Error parsing JSON: " + err);
            });
        })
        .catch(err => {
            console.log("Error with response received:" + err);
        });
    }

    getData(req_info) {
        this.setState({
            filters: req_info[1].filters,
            order: req_info[1].order,
        }, () => {
            this.getRequestsList("POST", {
                filters: this.state.filters,
                order: this.state.order,
            });
        });
    }

    render() {
        return(
            <div id="users-list">
                <Dashboard filter_user_status={true} order_by_day={true} get_data={this.getRequestsList} />

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