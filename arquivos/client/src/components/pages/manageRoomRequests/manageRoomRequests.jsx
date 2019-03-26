import React, {Component} from "react";
import Dashboard from "../../dashboard/dashboard";
import RequestItem from "../../requestItem/requestItem";
import "./manageRoomRequests.css";

class ManageRoomRequests extends Component {

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

        if(req_method === "POST") {
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            body = JSON.stringify(req_body);
            console.log("AAAAAAAAAAAAAAAAAAAAA", req_body);
        }

        else if(req_method === "GET") {
            headers = {
                Accept: "application/json",
            };
        }

        fetch("/room/request/list/", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(r => {
            if(r.status === 401) {
                window.location = "/#/home";
            }

            r.json()
            .then(res => {
                this.setState({
                    requests_list: res,
                }, () => console.log(this.state));
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.error(err);
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

    increaseLimit() {
        this.setState({
            limit: this.state.limit + 5,
        }, () => {
            this.getRequestsList("POST", {limit: this.state.limit});
        });
    }

    render() {
        return(
            <div id="manage-room-requests">
                <Dashboard filter_status={true} order_by_day={true} get_data={this.getRequestsList} />

                <div id="room-requests-container">
                    {
                        this.state.requests_list.length !== 0 ? 

                        <React.Fragment>
                            {this.state.requests_list.map(request_item => <RequestItem key={request_item} object_type="room" viewed_by="admin" object_id={request_item} />)}
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

export default ManageRoomRequests;