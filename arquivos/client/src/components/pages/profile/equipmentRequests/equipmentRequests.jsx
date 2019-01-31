import React, {Component} from "react";
import RequestItem from "../../../requestItem/requestItem";
import "./equipmentRequests.css";

class EquipmentRequests extends Component {
    constructor() {
        super();

        this.state = {
            requests: [],
        }
    }

    componentDidMount() {
        fetch("/equipment/request/list/" + this.props.email, {
            method: "GET"
        })
        .then(requests_raw => {
            requests_raw.json()
            .then(requests => {
                this.setState({
                    requests: requests,
                }, () => console.log(this.state));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
           
            this.state.requests.length > 0 ?

            this.state.requests.map(req => <RequestItem key={req} viewed_by="user" object_type="equipment" object_id={req} />)

            :

            <label className="faded-label">Não existem requisições</label>
           
        );
    }
}

export default EquipmentRequests;