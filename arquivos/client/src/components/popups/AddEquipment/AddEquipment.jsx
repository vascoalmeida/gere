import React, {Component} from "react";

var css_loaded = false;

class AddEquipment extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            desc: this.props.description,
            brand: this.props.brand,
            model: this.props.model,
            img_src: this.props.img || window.origin + "/img/img_placeholder.jpg",
        }

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleBrandChange = this.handleBrandChange.bind(this);
        this.handleModelChange = this.handleModelChange.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        console.log("PROPS", this.props);
    }

    componentWillMount() {
        if(!css_loaded) {
            css_loaded = true;
            import("./AddEquipment.css");
        }
    }

    handleSubmit() {
        if(!this.state.name || !this.state.desc || !this.state.img) {
            alert("Por favor preencha todos os campos necessários");
            return;
        }
        
        var req_method;
        var req_url;

        if(this.props.edit_active) {
            req_method = "PUT";
            req_url = "/equipment/" + this.props.id;
        } 
        else {
            req_method = "POST";
            req_url = "/equipment"
        }

        var form_data = new FormData();
        form_data.append("name", this.state.name);
        form_data.append("description", this.state.desc);
        form_data.append("brand", this.state.brand);
        form_data.append("model", this.state.model);
        form_data.append("image", this.state.img);

        fetch(req_url, {
            method: req_method,
            body: form_data,
            credentials: "include",
        })
        .then(r => {
            window.location.reload();
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao criar equipamento, por favor tente mais tarde");
        });
    }

    handleNameChange(ev) {
        this.setState({
            name: ev.target.value,
        });
    }

    handleDescriptionChange(ev) {
        this.setState({
            desc: ev.target.value,
        });
    }

    handleBrandChange(ev) {
        this.setState({
            brand: ev.target.value,
        });
    }

    handleModelChange(ev) {
        this.setState({
            model: ev.target.value,
        });
    }

    handleImgChange(ev) {
        this.setState({
            img: ev.target.files[0],
            img_src: URL.createObjectURL(ev.target.files[0]),
        });
    }


    render() {
        return(
            <div className="popup-container">
                <div className="popup-content">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div className="popup-section ps1">
                        <input className="form-input" type="text" value={this.state.name} placeholder="Nome do equipamento" onChange={this.handleNameChange} required />
                        <input className="form-input" type="text" value={this.state.desc} placeholder="Descrição" onChange={this.handleDescriptionChange} required />
                        <input className="form-input" type="text" value={this.state.brand} placeholder="Marca (opcional)" onChange={this.handleBrandChange} />
                        <input className="form-input" type="text" value={this.state.model} placeholder="Modelo (opcional)" onChange={this.handleModelChange} />
                        <div className="form-button" onClick={this.handleSubmit}>Criar equipamento</div>
                    </div>

                    <div className="popup-section ps2">
                        <input type="file" name="uploaded_img" id="file" className="input-file" onChange={this.handleImgChange} required />
                        <img id="equipment-img" src={this.state.img_src} alt="Equipamento" />
                        <label id="" className="form-button white-btn" htmlFor="file">Escolher imagem</label>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEquipment;