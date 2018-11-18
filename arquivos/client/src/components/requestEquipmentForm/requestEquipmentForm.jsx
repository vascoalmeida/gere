import React, {Component} from "react";
import "./requestEquipmentForm.css";

class RequestEquipmentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            material_list: [
                {
                    id: 0,
                    name: "Câmera",
                    img: "camera.jpg",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat."
                },
                {
                    id: 1,
                    name: "Câmera",
                    img: "camera.jpg",
                    desc: "Ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat."
                },
                {
                    id: 2,
                    name: "Câmera",
                    img: "camera.jpg",
                    desc: "Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat."
                },
            ]
        }

        this.createNewMaterial = this.createNewMaterial.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
    }

    handleFormSubmission() {
        /*
        fetch("/request-material", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: this.state.chosen_day,
                time_start: this.state.chosen_time_start,
                time_end: this.state.chosen_time_end,
                room: this.state.chosen_room
            })
        })
        */
       console.log("a");
    }
    
    removeMaterial(ev) {
        console.log("material_index");
    }

    createNewMaterial() {
        console.log("a");
    }


    render() {
        return(
            <form id="material-form">

                <div id="mf-dashboard">
                    <div className="mf-d-section">
                        <label className="label-title">Saída do material</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date"></input>
                        </div>

                        <div>
                            <label>Horas</label>
                            <input className="input-time" type="time"></input>
                        </div>
                    </div>

                    <div className="mf-d-section">
                        <label className="label-title" >Entrega do material</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date"></input>
                        </div>
                        <div>
                            <label>Horas</label>
                            <input className="input-time" type="time"></input>
                        </div>
                    </div>

                    <div className="mf-d-section button-container">
                        <div className="form-button" onClick={this.createNewMaterial}>Adicionar Material</div>
                        <div className="form-button">Próximo</div>
                    </div>
                </div>

                <div id="material-container">
                    {this.state.material_list.map(material => (

                        <div className="material" key={material.id}>
                            <img src={window.location.origin + "/img/" + material.img} alt={material.name} />

                            <div className="material-info">
                                <h1 className="material-name">{material.name}</h1>
                                <div className="material-description text">{material.desc}</div>
                            </div>
                        </div>

                    ))}

                </div>

                <div className="scroll-top"></div>
            </form>
        );
    }
}

export default RequestEquipmentForm;