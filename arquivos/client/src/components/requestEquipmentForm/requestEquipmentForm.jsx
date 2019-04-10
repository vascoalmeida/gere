import React, {Component} from "react";
import EquipmentPopup1 from "../popups/equipmentPopup1/equipmentPopup1";
import EquipmentPopup2 from "../popups/equipmentPopup2/equipmentPopup2";
import ListItem from "../listItem/listItem";
import Dashboard from "../dashboard/dashboard";
import "./requestEquipmentForm.css";

class RequestEquipmentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            equipment_list: [],
            chosen_equipment: [],
            button_blocked_class: "locked-button",
            popup1_visible: false,
            popup2_visible: false,
            leave_date: "",
            leave_time: "",
            delivery_date: "",
            delivery_time: "",
        }

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleQuantityChange = this.handleQuantityChange.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.getMaterialList = this.getMaterialList.bind(this);
        this.addMaterial = this.addMaterial.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
        this.recieveFromPopup1 = this.recieveFromPopup1.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        this.getMaterialList("GET");
    }

    getMaterialList(req_method, req_body) {
        var headers;
        var body;

        if(req_method === "POST") {
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            console.log("BODY", req_body);
            body = JSON.stringify(req_body);
        }

        else if(req_method === "GET") {
            headers = {
                Accept: "application/json",
            };
        }

        fetch("/equipment/list/", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(r => {
            if(r.status === 401) {
                window.location = "/#/home";
                return;
            }
            
            r.json()
            .then(res => {
                this.setState({
                    equipment_list: res,
                });
            })
            .catch(err => {
                console.log("Error parsing JSON: " + err);
            });
        })
        .catch(err => {
            console.log("Error with response received:" + err);
        });
    }

    handleFormSubmission() {
        fetch("/equipment/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requested_equipment: this.state.chosen_equipment,
                day_start: this.state.leave_date,
                day_end: this.state.delivery_date,
                time_start: this.state.leave_time,
                time_end: this.state.delivery_time,
            }),
        })
        .then(r => {
            if(r.status === 205) {
                alert("Equipamento(s) requisitado(s) com sucesso.");
                window.location.reload();
            }
        })
        .catch((err) => console.log(err));
    }

    recieveFromPopup1(data) {
        this.setState({
            leave_date: data.leave_date,
            leave_time: data.leave_time,
            delivery_date: data.delivery_date,
            delivery_time: data.delivery_time,
            popup1_visible: false,
            popup2_visible: true,
        });
    }

    closePopup() {
        this.setState({
            popup1_visible: false,
            popup2_visible: false,
        });
    }

    handleQuantityChange(ev, index) {
        this.setState({
            quantity: ev.target.value
        });
    }

    handleNextClick(ev) {
        this.setState({
            popup1_visible: true
        });
    }
    
    removeMaterial(index) {
        console.log("AAAAAAAAAAAAAAAAAAA", index);
        var s_chosen_equipment = this.state.chosen_equipment;
        var s_equipment_list = this.state.equipment_list;

        for(var i = 0; i < s_chosen_equipment.length; i++) {
            
            if(s_chosen_equipment[i].id === index) {
                var add_mat = s_chosen_equipment[i];
                s_chosen_equipment.splice(i, 1);
            }
        }

        s_equipment_list.push(add_mat);

        this.setState({
            chosen_equipment: s_chosen_equipment,
            equipment_list: s_equipment_list,
        });
    }

    addMaterial(index) {
        var s_chosen_equipment = this.state.chosen_equipment;
        var s_equipment_list = this.state.equipment_list;
    
        for(var i = 0; i < s_equipment_list.length; i++) {
            
            if(s_equipment_list[i] === index) {
                var add_mat = s_equipment_list[i];
                s_equipment_list.splice(i, 1);
            }
        }

        s_chosen_equipment.push(add_mat);

        this.setState({
            chosen_equipment: s_chosen_equipment,
            equipment_list: s_equipment_list,
            button_blocked_class: ""
        });
    }

    render() {
        var active_popup;

        if(this.state.popup1_visible) {
            active_popup = <EquipmentPopup1 button_blocked_class="locked-button" action={this.recieveFromPopup1} close_popup={this.closePopup} />
        }

        else if(this.state.popup2_visible) {
            active_popup = <EquipmentPopup2 leave_date={this.state.leave_date} leave_time={this.state.leave_time} delivery_date={this.state.delivery_date} delivery_time={this.state.delivery_time} equipment={this.state.chosen_equipment} close_popup={this.closePopup} />
        }

        else {
            active_popup = null;
        }

        return(
            <form id="material-form" onSubmit={this.handleFormSubmission}>
                {active_popup}

                {/*<Dashboard filter_status={false} order_by_day={true} get_data={this.getMaterialList} />*/}

                <div className="section-title">Equipamento escolhido</div>

                <div id="selected-material-section">
                    
                    <div id="selected-material-container">
                        {
                            this.state.chosen_equipment.length !== 0 ?
                            
                            <React.Fragment>
                            {
                                this.state.chosen_equipment.map(equipment => (
                                    <ListItem key={equipment} object_type="equipment" object_id={equipment} selected={true} remove_equipment={this.removeMaterial} />
                                ))
                            }

                                <div className="form-btn-container">
                                    <div className="form-button" onClick={this.handleNextClick}>Requisitar</div>
                                </div>
                            </React.Fragment>

                            :
                            
                            <label className="faded-label">Sem equipamento</label>
                        }
                    </div>

                </div>

                <div className="section-title">Equipamento disponível</div> 
                <div id="material-container">
                    {
                        this.state.equipment_list.length !== 0 ?
                        
                        this.state.equipment_list.map(equipment => (

                            <React.Fragment key={equipment}>
                                <ListItem object_type="equipment" object_id={equipment} order_object={() => this.addMaterial(equipment)} />
                            </React.Fragment>

                        ))
                        
                        :

                        <label className="faded-label">Sem materiais</label>
                    }
                </div>

                <div className="scroll-top"></div>
            </form>
        );
    }
}

export default RequestEquipmentForm;