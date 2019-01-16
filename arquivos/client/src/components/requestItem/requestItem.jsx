import React, {Component} from "react";
import ConfirmAction from "../popups/confirmAction/confirmAction";
import "./requestItem.css";

class RequestItem extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            day_start: "",
            day_end: "",
            time_start: "",
            time_end: "",
            status: "",
            user: "",
            user_class: "",
            confirm_request_visible: false,
            reject_request_visible: false,
            status_color_class: "text",
        }

        this.closePopups = this.closePopups.bind(this);
        this.showAcceptRequestPopup = this.showAcceptRequestPopup.bind(this);
        this.showRejectRequestPopup = this.showRejectRequestPopup.bind(this);
        this.acceptRequest = this.acceptRequest.bind(this);
        this.rejectRequest = this.rejectRequest.bind(this);
    }

    componentDidMount() {

        fetch("/" + this.props.object_type + "/request/info/" + this.props.object_id, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
        .then(r => {
            r.json()
            .then(res => {
                res.request.day = res.request.day.slice(0, res.request.day.indexOf("T"));
                res.request.time_start = res.request.time_start.slice(0, res.request.time_start.lastIndexOf(":"));
                res.request.time_end = res.request.time_end.slice(0, res.request.time_end.lastIndexOf(":"));

                this.setState({
                    name: res.room.name,
                    day_start: res.request.day_start || res.request.day,
                    day_end: res.request.day_end || "",
                    time_start: res.request.time_start,
                    time_end: res.request.time_end,
                    status: res.request.status,
                    user: res.user.name,
                    user_class: res.user.class,
                });
            })
            .catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    closePopups() {
        this.setState({
            confirm_request_visible: false,
            reject_request_visible: false,
        });
    }

    showAcceptRequestPopup() {
        this.setState({
            confirm_request_visible: true,
        });
    }

    showRejectRequestPopup() {
        this.setState({
            reject_request_visible: true,
        });
    }

    acceptRequest() {
        var form_data = new FormData();
        form_data.append("status", "Aceite");

        fetch("/room/request/" + this.props.object_id, {
            method: "PUT",
            body: form_data,
        })
        .then(r => {
            console.log(r);
        })
        .catch(err => {
            console.log(err);
        });
    }

    rejectRequest() {
        var form_data = new FormData();
        form_data.append("status", "Recusado");

        fetch("/room/request/" + this.props.object_id, {
            method: "PUT",
            body: form_data,
        })
        .then(r => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        var active_popup;
        var visible_buttons;
        var status_color;

        if(this.state.confirm_request_visible) {
            active_popup = (
                <ConfirmAction type="confirm-requisition" message="Deseja ACEITAR a requisição?" accept_btn_msg="Sim, aceitar" reject_btn_msg="Não, voltar" accept_btn_action={this.acceptRequest} reject_btn_action={this.closePopups} close_popup={this.closePopups} />
            );
        }

        else if(this.state.reject_request_visible) {
            active_popup = (
                <ConfirmAction type="confirm-requisition" message="Deseja RECUSAR a requisição?" accept_btn_msg="Sim, rejeitar" reject_btn_msg="Não, voltar" accept_btn_action={this.rejectRequest} reject_btn_action={this.closePopups} close_popup={this.closePopups} />
            );
        }

        else {
            active_popup = null;
        }
        
        if(this.state.status === "Pendente") {
            visible_buttons = (
                <div className="ri-section btn-container">
                    <div className="form-button white-btn" onClick={this.showAcceptRequestPopup}>Aceitar</div>
                    <div className="form-button red-btn" onClick={this.showRejectRequestPopup}>Recusar</div>   
                </div>
            );
        }

        else if(this.state.status === "Aceite") {
            status_color = "text-green";
        }

        else if(this.state.status === "Recusado") {
            status_color = "text-red";
        }

        else {
            status_color = "";
        }

        return(
            <React.Fragment>
                {active_popup}
                <div id="request-item">
                    <div className="request-item-section">

                        <div className="ri-section">
                            <h1 className="item-name">{this.state.name}</h1>
                        </div>

                        <div className="ri-section">
                            <div>
                                <label className="label-title">Dia:</label>
                                <span className="text">{this.state.day_start}</span>
                            </div>
                            
                            <div>
                                <label className="label-title">Estado:</label>
                                <span className={"text " + status_color}>{this.state.status}</span>
                            </div>
                        </div>

                        <div className="ri-section">
                            <div>
                                <label className="label-title">Horas (início):</label>
                                <span className="text">{this.state.time_start}</span>
                            </div>

                            <div>
                                <label className="label-title">Horas (fim):</label>
                                <span className="text">{this.state.time_end}</span>
                            </div>
                        </div>

                        <div className="ri-section">
                            <div>
                                <label className="label-title">Requisitado por:</label>
                                <span className="text">{this.state.user}</span>
                            </div>

                            <div>
                                <label className="label-title">Turma:</label>
                                <span className="text">{this.state.user_class}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="request-item-section">
                        {visible_buttons}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RequestItem;