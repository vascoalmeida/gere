import React, {Component} from "react";

var css_loaded = false;

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

        console.log(this.props, this.state);
    }

    componentDidMount() {
        if(!css_loaded) {
            css_loaded = true;
            import("./addRoom.css");
        }
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
            credentials: 'include',
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
        return(
            <div className="popup-container">
                <div className="popup-content">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div className="popup-section ps1">
                        <input className="form-input" type="text" value={this.state.room_name} placeholder="Nome da sala" onChange={this.handleNameChange} required />
                        <input className="form-input" type="text" value={this.state.room_description} placeholder="Descrição" onChange={this.handleDescriptionChange} required />
                        <div id="create-room-btn" className="form-button" onClick={this.handleSubmit}>Criar sala</div>
                    </div>

                    <div className="popup-section ps2">
                        <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleImgChange} required />
                        <img id="equipment-img" src={this.state.visible_img} alt="Equipamento" />
                        <label id="chose-img-btn" className="form-button white-btn" htmlFor="file">Escolher imagem</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddRoom;