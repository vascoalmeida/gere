import React, {Component} from "react";
import ListItem from "../../listItem/listItem";
import EditEquipment from "../../popups/AddEquipment/AddEquipment";
import Dashboard from "../../dashboard/dashboard";
import "./manageEquipmentPage.css";

class ManageEquipmentPage extends Component {

    constructor() {
        super();

        this.state = {
            equipment_list: [],
            edit_equipment_visible: false,
        }

        this.closePopup = this.closePopup.bind(this);
        this.showAddEquipmentPopup = this.showAddEquipmentPopup.bind(this);
        this.getEquipmentList = this.getEquipmentList.bind(this);
    }

    componentDidMount() {
        this.getEquipmentList("GET");
    }
    
    getEquipmentList(req_method, req_body) {
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

        fetch("/equipment/list", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(res => {
            if(res.status === 401) {
                window.location = "/#/home";
                return;
            }
            
            res.json()
            .then(r => {
                this.setState({
                    equipment_list: r,
                });
            })
            .catch(err => {
                alert("Ocorreu um erro a carregar os equipamentos, por favor tente mais tarde");
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    showAddEquipmentPopup() {
        this.setState({
            edit_equipment_visible: true,
        });
    }

    closePopup() {
        this.setState({
            edit_equipment_visible: false,
        });
    }

    render() {
        var visible_popup;

        if(this.state.edit_equipment_visible) {
            visible_popup = (
                <EditEquipment close_popup={this.closePopup} />
            );
        }

        else {
            visible_popup = null;
        }

        return(
            <React.Fragment>
                {visible_popup}
                <div id="form-header">
                    <div id="form-title">Gerir Equipamento</div>
                </div>

                <form id="manage-equipment">
                    <Dashboard filter_status={false} order_by_day={true} main_action={this.showAddEquipmentPopup} main_action_msg="Criar equipamento" get_data={this.getEquipmentList} />

                    <div id="material-container">
                        {
                            this.state.equipment_list.length !== 0 ?

                            this.state.equipment_list.map(id => (
                                <ListItem key={id} object_type="equipment" object_id={id} manageable={true} />
                            ))

                            :

                            <label className="faded-label">Não existe nenhum equipamento</label>
                        }
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default ManageEquipmentPage;