import React, {Component} from "react";
import "./removeRoomPopup.css";

class RemoveRoomPopup extends Component {

    render() {
        return(
            <div id="rm-popup-container">
                <div id="rm-popup">
                    <span>De certeza que deseja eliminar esta sala?</span>

                    <div className="rm-d-section button-container">
                        <div className="form-button" onClick={this.props.close_popup}>Não, voltar</div>
                        <div className="form-button red-btn" onClick={this.props.remove_room}>Sim, eliminar</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RemoveRoomPopup;