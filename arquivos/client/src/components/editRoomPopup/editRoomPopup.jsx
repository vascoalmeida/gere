import React, {Component} from "react";
import "./editRoomPopup.css";

class EditRoomPopup extends Component {
    render() {
        return (
            <div id="rm-popup-container">
                <div id="rm-popup" className="room-edit-container">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div id="room-info-img" className="rm-d-section">
                        <img src={window.location.origin + "/img/camera.jpg"} alt={this.props.room_name} className="room-edit-img" />

                        <div className="room-info room-edit">
                            <input type="text" className="form-input in-name" defaultValue={this.props.room_name} />
                            <input type="text" className="form-input in-desc" defaultValue={this.props.room_description} />
                            <div className="form-button white-btn">Escolher imagem</div>
                        </div>
                    </div>
                    
                    <div className="rm-d-section button-container">
                        <div className="form-button">Gravar alterações</div>
                        <div className="form-button red-btn">Descartar alterações</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditRoomPopup;