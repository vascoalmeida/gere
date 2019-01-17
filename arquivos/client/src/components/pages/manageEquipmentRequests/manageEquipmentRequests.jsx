import React, {Component} from "react";
import RequestItem from "../../requestItem/requestItem";
import "./manageEquipmentRequests.css";

class ManageEquipmentRequests extends Component {

    constructor() {
        super();

        this.state = {
            requests_list: [],
        }
    }

    componentDidMount() {
        fetch("/equipment/request/list", {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
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
                <div id="rm-dashboard">
                    <div className="rm-d-section">
                        <label className="label-title">Filtros</label>
                        <select className="filter-search">
                            <option value="op1">Opt 1</option>
                            <option value="op2">Opt 2</option>
                            <option value="op3">Opt 3</option>
                        </select>
                    </div>

                    <div className="rm-d-section button-container">
                        <div className="form-button" onClick={this.handleBtnClick}>Filtrar</div>
                    </div>
                </div>

                <div id="equipment-requests-container">
                    {
                        this.state.requests_list.length !== 0 ? 

                        this.state.requests_list.map(request_item => <RequestItem key={request_item} object_type="equipment" object_id={request_item} />)

                        :

                        <label className="faded-label">Não existem requisições</label>
                    }
                </div>
            </div>
        );
    }
}

export default ManageEquipmentRequests;