import React, {Component} from "react";
import RequestItem from "../../../requestItem/requestItem";
import "./roomRequests.css";

class RoomRequests extends Component {
    constructor() {
        super();

        this.state = {
            requests: [],
        }
    }

    componentDidMount() {
        fetch("/room/request/list/" + this.props.email, {
            method: "GET"
        })
        .then(requests_raw => {
            requests_raw.json()
            .then(requests => {
                this.setState({
                    requests: requests,
                });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
           
            this.state.requests.length > 0 ?

            this.state.requests.map(req => <RequestItem key={req} viewed_by="user" object_type="room" object_id={req} />)

            :

            <label className="faded-label">Não existem requisições</label>
           
        );
    }
}

export default RoomRequests;