import React, {Component} from "react";
import "./requestEquipmentForm.css";

class RequestEquipmentForm extends Component {
    render() {
        return(
            <form className="form-request" id="request-equipment">
                <div className="title">Requisitar Material</div>
                <div id="form-container">
                    <div>
                        <input type="text" placeholder="Motivo"></input>
                        <div className="form-group">
                            <div className="input-container">
                                <label className="text">Saída do material/equipamento</label>
                                <input type="date"></input>
                                <label className="text">pelas</label>
                                <input type="time"></input>
                            </div>

                            <div className="input-container">
                                <label className="text">Entrega do material/equipamento</label>
                                <input type="date"></input>
                                <label className="text">pelas</label>
                                <input type="time"></input>
                            </div>
                        </div>
                        <div id="materials-container">
                            <div className="new-material">
                                <div id="add-material">
                                    <span className="text plus-sign">+</span>
                                    <label className="text">Adicionar material</label>
                                </div>

                                <div className="input-container">
                                    <input id="input-description" type="text" placeholder="Descrição"></input>
                                </div>

                                <div id="model-brand-input-container" className="input-container">
                                    <input type="text" placeholder="Marca"></input>
                                    <input type="text" placeholder="Modelo"></input>
                                </div>
                                
                                <input className="number-input" type="text" placeholder="Quantidade"></input>
                            </div>
                        </div>
                    </div>

                    <div id="materials-list">
                        <div>
                            <div className="material-item">
                                <div className="m-description">
                                    <label>Descrição</label>
                                    <span>descriptionDescription</span>
                                </div>
                                <div className="m-brand">
                                    <label>Marca</label>
                                    <span>marca</span>
                                </div>
                                <div className="m-model">
                                    <label>Modelo</label>
                                    <span>modelo</span>
                                </div>
                                <div className="m-quantity">
                                    <label>Quantidade</label>
                                    <span>x2</span>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default RequestEquipmentForm;