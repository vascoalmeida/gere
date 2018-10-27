import React, {Component} from "react";
import "./requestEquipmentForm.css";
import ServerReqBtn from "../serverReqBtn/serverReqBtn";

class RequestEquipmentForm extends Component {
    render() {
        return(

            <form id="request-equipment" className="form-request">
                <label className="text">Período da requisição:</label>

                <div className="input-container text">
                    <label>Saída do material/ equipamento</label>
                    <input type="date"></input>
                    
                    <label>pelas</label>
                    <input type="number" min="00" max="23"></input>
                    
                    <label>h</label>
                    <input type="number" min="00" max="59"></input>
                </div>

                <div className="input-container text">
                    <label>Entrega do material/ equipamento</label>
                    <input type="date"></input>
                    
                    <label>pelas</label>
                    <input type="number" min="00" max="23"></input>
                    
                    <label>h</label>
                    <input type="number" min="00" max="59"></input>
                </div>

                <div id="material-container">
                    <div id="new-material">
                        <img src={window.location.origin + "/img/icon-plus.png"} alt="plus-icon"/>
                        <label>Adicionar material</label>
                    </div>
                </div>

                <ServerReqBtn btn_text="Requisitar"></ServerReqBtn>
            </form>
        );
    }
}

export default RequestEquipmentForm;