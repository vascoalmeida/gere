import React, {Component} from "react";
import "./requestEquipmentForm.css";
import EquipmentPopup1 from "../popups/equipmentPopup1/equipmentPopup1";
import EquipmentPopup2 from "../popups/equipmentPopup2/equipmentPopup2";
import ListItem from "../listItem/listItem";

class RequestEquipmentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            material_list: [
                {
                    id: 0,
                    name: "Câmera",
                    img: "camera.jpg",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat.",
                    quantity: 1,
                },
                {
                    id: 1,
                    name: "Câmera",
                    img: "camera.jpg",
                    desc: "Ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat.",
                    quantity: 1,
                },
                {
                    id: 2,
                    name: "Câmera",
                    img: "camera.jpg",
                    desc: "Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat.",
                    quantity: 1,
                },
            ],
            chosen_material: [],
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
        this.addMaterial = this.addMaterial.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
        this.recieveFromPopup1 = this.recieveFromPopup1.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    handleFormSubmission() {
        fetch("/request-material", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requested_material: this.state.chosen_material
            })
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
        })
    }

    handleQuantityChange(ev, index) {
        this.setState({quantity: ev.target.value});
    }

    handleNextClick(ev) {
        this.setState({popup1_visible: true});
    }
    
    removeMaterial(index) {
        var s_chosen_material = this.state.chosen_material;
        var s_material_list = this.state.material_list;

        for(var i = 0; i < s_chosen_material.length; i++) {
            
            if(s_chosen_material[i].id === index) {
                var add_mat = s_chosen_material[i];
                s_chosen_material.splice(i, 1);
            }
        }

        s_material_list.push(add_mat);

        this.setState({
            chosen_material: s_chosen_material,
            material_list: s_material_list,
        });
    }

    addMaterial(index) {
        var s_chosen_material = this.state.chosen_material;
        var s_material_list = this.state.material_list;
    
        for(var i = 0; i < s_material_list.length; i++) {
            
            if(s_material_list[i].id === index) {
                var add_mat = s_material_list[i];
                s_material_list.splice(i, 1);
            }
        }

        s_chosen_material.push(add_mat);

        this.setState({
            chosen_material: s_chosen_material,
            material_list: s_material_list,
            button_blocked_class: ""
        });
    }

    render() {
        var active_popup;

        if(this.state.popup1_visible) {
            active_popup = <EquipmentPopup1 button_blocked_class="locked-button" action={this.recieveFromPopup1} close_popup={this.closePopup} />
        }

        else if(this.state.popup2_visible) {
            active_popup = <EquipmentPopup2 leave_date={this.state.leave_date} leave_time={this.state.leave_time} delivery_date={this.state.delivery_date} delivery_time={this.state.delivery_time} material={this.state.chosen_material} close_popup={this.closePopup} />
        }

        else {
            active_popup = null;
        }

        return(
            <form id="material-form" onSubmit={this.handleFormSubmission}>

                {active_popup}

                <div id="mf-dashboard">
                    <div className="mf-d-section">
                        <label className="label-title">Filtros</label>
                        <select>
                            <option value="opt1">Opt 1</option>
                            <option value="opt2">Opt 2</option>
                            <option value="opt3">Opt 3</option>
                        </select>
                    </div>

                    <div className="mf-d-section button-container">
                        <div id="request-btn" className="form-button">Filtrar</div>
                    </div>
                </div>

                <div className="section-title">Materiais escolhidos</div>

                <div id="selected-material-section">
                    
                    <div id="selected-material-container">
                        {
                            this.state.chosen_material.length !== 0 ?
                            
                            this.state.chosen_material.map(material => (
                                <React.Fragment key={material.id}>
                                    <ListItem name={material.name} description={material.desc} />
                                </React.Fragment>
                            ))

                            :
                            
                            <label className="faded-label">Sem materiais</label>
                        }
                    </div>

                </div>

                <div className="section-title">Lista de materiais</div> 
                <div id="material-container">
                    {
                        this.state.material_list.length !== 0 ?
                        
                        this.state.material_list.map(material => (

                            <React.Fragment key={material.id}>
                                <ListItem object_type="equipment" object_id={material.id} name={material.name} description={material.desc} />
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