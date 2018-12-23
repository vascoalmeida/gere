import React, {Component} from "react";
import "./addRoom.css";

class AddRoom extends Component {

    constructor(props) {
        super(props);

        this.state = {
            room_img: this.props.room_img,
            room_name: this.props.room_name,
            room_description: this.props.room_description,
            visible_img: "",
            room_edition_active: this.props.room_edition_active,
        }

        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var form_data = new FormData();
        form_data.append("image", this.state.room_img);
        form_data.append("name", this.state.room_name);
        form_data.append("description", this.state.room_description);
        form_data.append("id", this.props.room_id);

        fetch("/room", {
            method: this.props.method,
            body: form_data,
        })
        .catch(err => {
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
        var buttons;

        if(this.state.room_edition_active) {
            buttons = (
                <React.Fragment>
                        <button className="form-button" onClick={this.handleSubmit} >Gravar alterações</button>
                        <div className="form-button red-btn" onClick={this.props.close_popup} >Descartar alterações</div>
                </React.Fragment>
            );
        }

        else {
            buttons = (<button className="form-button" type="button" onClick={this.handleSubmit}>Adicionar</button>);
        }

        return(
            <form id="add-room-container">
                <div className="add-room">
                    <div id="img-container">
                        <img src={window.location.origin + "/img/camera.jpg"} alt="Room" />
                        <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleImgChange} />
                        <label className="file-btn white-btn" htmlFor="file">Escolher imagem</label>
                    </div>
                    <div id="room-info">
                        <input id="room-name" type="text" name="room_name" className="form-input" placeholder="Nome da sala" defaultValue={this.state.room_name} onChange={this.handleNameChange} required />
                        <input id="room-desc" type="text" name="room_desc" className="form-input" placeholder="Descrição" defaultValue={this.state.room_description} onChange={this.handleDescriptionChange} required />
                    </div>
                </div>

                <div className="rm-d-section button-container">
                    {buttons}
                </div>
            </form>
        );
    }
}

export default AddRoom;