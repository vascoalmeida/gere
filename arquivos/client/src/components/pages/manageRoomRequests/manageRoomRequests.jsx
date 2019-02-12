import React, {Component} from "react";
import Dashboard from "../../dashboard/dashboard";
import RequestItem from "../../requestItem/requestItem";
import "./manageRoomRequests.css";

var css_loaded = false;

class ManageRoomRequests extends Component {

    constructor() {
        super();

        this.state = {
            requests_list: [],
        }

        this.getRequestsList = this.getRequestsList.bind(this);
    }

    componentDidMount() {
        this.getRequestsList("GET");
    }
    
    getRequestsList(req_method, req_body) {
        var headers;
        var body;

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

        fetch("/room/request/list", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(r => {
            r.json()
            .then(res => {
                this.setState({
                    requests_list: res,
                });
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    render() {
        return(
            <div id="manage-room-requests">
                <Dashboard filter_status={true} order_by_day={true} get_data={this.getRequestsList} />

                <div id="room-requests-container">
                    {
                        this.state.requests_list.length !== 0 ? 

                        this.state.requests_list.map(request_item => <RequestItem key={request_item} object_type="room" viewed_by="admin" object_id={request_item} />)

                        :

                        <label className="faded-label">Não existem requisições</label>
                    }
                </div>
            </div>
        );
    }
}

export default ManageRoomRequests;