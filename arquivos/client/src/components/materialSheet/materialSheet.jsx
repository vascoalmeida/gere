import React, {Component} from "react";
import "./materialSheet.css";

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

export default MaterialSheet;