import React, {Component} from "react";
import "./editRoomPopup.css";

class EditRoomPopup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.room_name,
            description: this.props.room_description,
            image: this.props.room_img,
        }

        this.handleSaveChanges = this.handleSaveChanges.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
    }

    handleSaveChanges() {
        fetch("/room", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
            }),
        })
    }

    handleNameChange(ev) {
        this.setState({
            name: ev.target.value,
        });
    }

    handleDescriptionChange(ev) {
        this.setState({
            description: ev.target.value,
        });
    }

    handleImgChange(ev) {
        this.setState({
            image: ev.target.files[0],
        });
    }

    render() {
        return (
            <div id="rm-popup-container">
                <div id="rm-popup" className="room-edit-container">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div id="room-info-img" className="rm-d-section">
                        <img src={window.location.origin + "/img/camera.jpg"} alt={this.props.room_name} className="room-edit-img" />

                        <div className="room-info room-edit">
                            <input type="text" className="form-input in-name" defaultValue={this.state.name} onChange={this.handleNameChange} />
                            <input type="text" className="form-input in-desc" defaultValue={this.state.description} onChange={this.handleDescriptionChange} />

                            <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleImgChange} />
                            <label className="form-button white-btn" htmlFor="file">Escolher imagem</label>
                        </div>
                    </div>
    
                    <div className="rm-d-section button-container">
                        <div className="form-button" onClick={this.handleSaveChanges} >Gravar alterações</div>
                        <div className="form-button red-btn" onClick={this.props.close_popup} >Descartar alterações</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditRoomPopup;