import React, {Component} from "react";
import RequestItem from "../../requestItem/requestItem";
import Dashboard from "../../dashboard/dashboard";
import "./manageEquipmentRequests.css";

class ManageEquipmentRequests extends Component {

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

        fetch("/equipment/request/list", {
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
            .catch(err => {});
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div id="manage-equipment-requests">
                <Dashboard filter_status={true} order_by_day={true} get_data={this.getRequestsList} />

                <div id="equipment-requests-container">
                    {
                        this.state.requests_list.length !== 0 ? 

                        this.state.requests_list.map(request_item => <RequestItem key={request_item} object_type="equipment" viewed_by="admin" object_id={request_item} />)

                        :

                        <label className="faded-label">Não existem requisições</label>
                    }
                </div>
            </div>
        );
    }
}

export default ManageEquipmentRequests;