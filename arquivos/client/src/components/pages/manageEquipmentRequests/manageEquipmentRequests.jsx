import React, {Component} from "react";
import RequestItem from "../../requestItem/requestItem";
import Dashboard from "../../dashboard/dashboard";
import "./manageEquipmentRequests.css";

class ManageEquipmentRequests extends Component {

    constructor() {
        super();

        this.state = {
            requests_list: [],
            limit: 5,
            filters: {},
            order: {},
        }

        this.getRequestsList = this.getRequestsList.bind(this);
        this.increaseLimit = this.increaseLimit.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getRequestsList("GET");
    }

    getRequestsList(req_method, req_body) {
        var headers;
        var body;

        console.log({
            filters: this.state.filters,
            order: this.state.order,
            limit: this.state.limit,
        });

        if(req_method === "POST") {
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            body = JSON.stringify({
                filters: this.state.filters,
                order: this.state.order,
                limit: this.state.limit,
            });
        }


        else if(req_method === "GET") {
            headers = {
                Accept: "application/json",
            };
        }

        fetch("/equipment/request/list/" + this.state.limit, {
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

    increaseLimit() {
        this.setState({
            limit: this.state.limit + 5,
        }, () => {
            this.getRequestsList("POST");
        });
    }

    getData(req_info) {
        this.setState({
            filters: req_info[1].filters,
            order: req_info[1].order,
        }, () => {
            this.getRequestsList("POST", req_info);
        });
    }

    render() {
        return(
            <div id="manage-equipment-requests">
                <Dashboard filter_status={true} order_by_day={true} get_data={this.getData} />

                <div id="equipment-requests-container">
                    {
                        this.state.requests_list.length !== 0 ? 
                        <React.Fragment>
                            {this.state.requests_list.map(request_item => <RequestItem key={request_item} object_type="equipment" viewed_by="admin" object_id={request_item} />)}
                            <div className="form-button" id="load-more-btn" onClick={this.increaseLimit} >Carregar mais</div>

                        </React.Fragment>

                        :

                        <label className="faded-label">Não existem requisições</label>
                    }
                </div>

            </div>
        );
    }
}

export default ManageEquipmentRequests;