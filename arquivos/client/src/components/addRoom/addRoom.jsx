import React, {Component} from "react";
import "./addRoom.css";

class AddRoom extends Component {

    constructor() {
        super();

        this.state = {
            room_img: "",
            room_name: "",
            room_description: "",
            visible_img: "",
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

        fetch("/room", {
            method: "POST",
            headers: {"Content-Type": "multipart/form-data"},
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
        return(
            <form id="add-room-container" action="/room" method="POST" encType="multipart/form-data">
                <div className="add-room">
                    <div id="img-container">
                        <img src={window.location.origin + "/img/camera.jpg"} alt="Room" />
                        <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleImgChange} />
                        <label className="file-btn" htmlFor="file">Escolher imagem</label>
                    </div>
                    <div id="room-info">
                        <input id="room-name" type="text" name="room_name" className="form-input" placeholder="Nome da sala" required onChange={this.handleNameChange} />
                        <input id="room-desc" type="text" name="room_desc" className="form-input" placeholder="Descrição" required onChange={this.handleDescriptionChange} />
                    </div>
                </div>

                <button className="form-button" type="submit">Adicionar</button>
            </form>
        );
    }
}

export default AddRoom;