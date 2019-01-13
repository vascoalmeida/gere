import React, {Component} from "react";
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
        }
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

    render() {
        return(
            <div id="request-item">
                <div className="request-item-section">

                    <div className="ri-section">
                        <h1 className="item-name">{this.state.name}</h1>
                        <div className="text">{this.state.day_start}</div>
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
            </div>
        );
    }
}

export default RequestItem;