import React, {Component} from "react";
import "./equipmentPopup2.css";

class EquipmentPopup2 extends Component {
    render() {
        return (
            <div id="rm-popup-container" >
                <div id="rm-popup" className="rm-popup2">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />
                
                    <div className="popup-info">
                        <label className="label-title">Período da requisição:</label>
                        <div>
                            <span>Saída do material dia </span>
                            <span>{this.props.leave_date}</span>
                            <span>pelas</span>
                            <span>{this.props.leave_time}</span>
                        </div>
                        <div>
                            <span>Entrega do material dia </span>
                            <span>{this.props.delivery_date}</span>
                            <span>pelas</span>
                            <span>{this.props.delivery_time}</span>
                        </div>

                    </div>

                    <div className="popup-info">
                        <label className="label-title">Material requisitado:</label>
                        {this.props.material.map(mat => {
                            return(
                                <div className="material-overview" key={mat.id}>
                                    <span>{mat.name}</span>
                                    <span>x{mat.quantity}</span>
                                </div>
                            )
                        })}
                    </div>

                    <div className="popup-info">
                        <input type="checkbox" required></input>
                        <label className="cb-label">Declaro que me responsabilizo pela entrega, pelo bom uso e estado de conservação de todo o material/equipamento requisitado, desde o seu levantamento até à sua devolução e conferência, assumindo inegralmente os custos com qualquer estrago causado.</label>
                    </div>

                    <button type="submit" className="form-button">Requisitar</button>
                </div>
            </div>
        )
    }
}

export default EquipmentPopup2;