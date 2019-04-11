import React, {Component} from "react";
import "./addRoom.css";

class AddRoom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            room_img: this.props.img,
            room_name: this.props.name,
            room_description: this.props.description,
            visible_img: this.props.img || window.origin + "/img/img_placeholder.jpg",
            room_edition_active: this.props.room_edition_active,
        }

        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log(this.props);
    }

    handleSubmit() {
        var req_method;
        var req_url;

        if(this.props.edit_active) {
            req_method = "PUT";
            req_url = "/room/" + this.props.id;
        } 
        else {
            req_method = "POST";
            req_url = "/room"
        }

        var form_data = new FormData();
        form_data.append("image", this.state.room_img);
        form_data.append("name", this.state.room_name);
        form_data.append("description", this.state.room_description);
        form_data.append("id", this.props.room_id);
        
        fetch(req_url, {
            method: req_method,
            body: form_data,
            credentials: 'include',
        })
        .then(r => {
            alert("Sala criada com sucesso!");
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            alert("Ocorreu um erro, por favor tente mais tarde");
        });
    }

    handleImgChange(ev) {
        this.setState({
            room_img: ev.target.files[0],
            visible_img: URL.createObjectURL(ev.target.files[0]), 
        });
    }

    handleNameChange(ev) {
        this.setState({
            room_name: ev.target.value,
        });
    }

    handleDescriptionChange(ev) {
        this.setState({
            room_description: ev.target.value,
        });
    }

    render() {
        var btn_msg;

        if(this.props.edit_active) {
            btn_msg = "Gravar alterações";
        }
        else {
            btn_msg = "Criar sala";
        }

        return(
            <div className="popup-container" id="add-room">
                <div className="popup-content">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div className="popup-section ps1">
                        <input className="form-input" type="text" value={this.state.room_name} placeholder="Nome da sala" onChange={this.handleNameChange} required />
                        <input className="form-input" type="text" value={this.state.room_description} placeholder="Descrição" onChange={this.handleDescriptionChange} required />
                        <div id="create-room-btn" className="form-button" onClick={this.handleSubmit}>{btn_msg}</div>
                    </div>

                    <div className="popup-section ps2">
                        <img id="equipment-img" src={this.state.visible_img} alt="Equipamento" />
                        <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleImgChange} required />
                        <label id="chose-img-btn" className="form-button white-btn" htmlFor="file">Escolher imagem</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRoom;