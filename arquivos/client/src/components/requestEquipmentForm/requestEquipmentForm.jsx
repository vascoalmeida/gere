import React, {Component} from "react";
import "./requestEquipmentForm.css";

class MaterialSheet extends Component {

    constructor() {
        super();

        this.state = {
            title: "Material",
            description: "",
            brand: "",
            model: "",
            amount: "",
            observations: ""
        }

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    handleDescriptionChange(ev) {
        this.setState({description: ev.target.value}, function() {

            if(this.state.description.length === 0) {
                this.setState({title: "Material"});
            }
    
            else {
                this.setState({title: this.state.description});
            }
        });
    }

    render() {
        return(
            <div id="mf-first" className="mf-section material-sheet">
                <h1>{this.state.title}</h1>

                <input type="text" placeholder="Descrição" value={this.state.description} onChange={this.handleDescriptionChange} required></input>
                <input type="text" placeholder="Marca (opcional)"></input>
                <input type="text" placeholder="Modelo (opcional)"></input>
                <input type="number" min="1" placeholder="Quantidade" required></input>
                <input type="text" placeholder="Observações (opcional)"></input>

                <div className="remove-material-btn" onClick={this.props.removeMaterial} data-index={this.props.index}>Remover material</div>
            </div>
        );
    }
}

class RequestEquipmentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            material_sheets: []
        }

        this.createNewMaterial = this.createNewMaterial.bind(this);
        this.removeMaterial = this.removeMaterial.bind(this);
    }
    
    removeMaterial(ev) {
        let material_index = ev.target.getAttribute("data-index");
        let ms_arr = this.state.material_sheets;

        ms_arr.splice(material_index, 1);
        this.setState({material_sheets: ms_arr});

        console.log(material_index);
    }

    createNewMaterial() {
        let ms_arr = this.state.material_sheets;

        ms_arr.push(<MaterialSheet key={this.state.material_sheets.length} removeMaterial={this.removeMaterial} index={this.state.material_sheets.length} />);

        this.setState({material_sheets: ms_arr});
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
                    {this.state.material_sheets}
                </div>

                <div className="scroll-top"></div>
            </form>
        );
    }
}

export default RequestEquipmentForm;