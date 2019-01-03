import React, {Component} from "react";
import ListItem from "../../listItem/listItem";
import EditEquipment from "../../popups/AddEquipment/AddEquipment";

var css_loaded = false;

class ManageEquipmentPage extends Component {

    constructor() {
        super();

        this.state = {
            equipment_list: [],
            edit_equipment_visible: false,
        }

        this.closePopup = this.closePopup.bind(this);
        this.showAddEquipmentPopup = this.showAddEquipmentPopup.bind(this);
    }

    componentWillMount() {
        if(!css_loaded) {
            css_loaded = true;
            import("./manageEquipmentPage.css");
        }
    }

    componentDidMount() {
        fetch("/equipment/list", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(res => {
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
                            <div className="form-button">Filtrar</div>
                        </div>

                        <div className="rm-d-section button-container">
                            <div className="form-button" onClick={this.showAddEquipmentPopup}>Adicionar equipamento</div>
                        </div>
                    </div>

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