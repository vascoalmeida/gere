import React, {Component} from "react";
import RemoveListItem from "../popups/removeListItem/removeListItem";
import AddEquipment from "../popups/AddEquipment/AddEquipment";

var css_loaded = false;
var buttons_available;

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            image: "",
            remove_popup_visibility: false,
            edit_popup_visibility: false,
        }
        
        this.orderRoom = this.orderRoom.bind(this);
        this.showRemovePopup = this.showRemovePopup.bind(this);
        this.showEditPopup = this.showEditPopup.bind(this);
        this.closePopups = this.closePopups.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
    }
    
    componentWillMount() {
        if(!css_loaded) {
            css_loaded = true;
            import("./listItem.css");
        }
    }

    componentDidMount() {
        var image_request = "/" + this.props.object_type + "/img/" + this.props.object_id;
        var data_request = "/" + this.props.object_type + "/info/" + this.props.object_id;

        fetch(image_request, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(img => {
            return img.blob();
        })
        .then(img_blob => {
            var file_reader = new FileReader();
            file_reader.readAsDataURL(img_blob);

            file_reader.onload = () => {
                var base_64_data = file_reader.result;
                
                this.setState({
                    image: base_64_data,
                });
            }
        })
        .catch(err => {
            alert("Ocorreu um erro ao carregar informação, por vafor tente mais tarde");
        });

        fetch(data_request, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            res.json()
            .then(data => {
                this.setState({
                    name: data.name,
                    description: data.description,
                });
            })
            .catch(err => {
                //alert("Ocorreu um erro ao carregar os equipamentos, por favor tente mais tarde");
                console.log(err);
            });
        })
        .catch(err => {
            alert("Ocorreu um erro ao carregar informação, por favor tente mais tarde.");
        });
    }

    showRemovePopup() {
        this.setState({
            remove_popup_visibility: true,
        });
    }

    showEditPopup() {
        this.setState({
            edit_popup_visibility: true,
        })
    }

    closePopups() {
        this.setState({
            remove_popup_visibility: false,
            edit_popup_visibility: false,
        });
    }

    deleteObject() {
        var remove_request = "/" + this.props.object_type + "/" + this.props.object_id;

        fetch(remove_request, {
            method: "DELETE",
        })
        .then(r => {
            this.setState({
                remove_room_popup_visible: false,
            });
        })
        .then(r => {
            //window.location.reload();
        })
        .catch(err => {
            alert("Ocorreu um erro, por favor tente mais tarde");
        });
    }

    orderRoom() {
        this.props.order_room(this.props.room_id);
    }

    render() {
        var active_popup;

        if(this.props.manageable) {
            buttons_available = (
                <React.Fragment>
                    <div className="form-button white-btn" onClick={this.showEditPopup}>Editar</div>
                    <div className="form-button red-btn" onClick={this.showRemovePopup}>Remover</div>
                </React.Fragment>
            );
        }

        else {
            buttons_available = (
                <React.Fragment>
                    <div className="form-button">Requisitar</div>
                </React.Fragment>
            );
        }

        if(this.state.remove_popup_visibility) {
            var popup_question = "Tem a certeza de que deseja eliminar a entrada escolhida?";

            active_popup = <RemoveListItem confirmation={popup_question} object_id={this.props.object_id} close_popup={this.closePopups} delete={this.deleteObject} />
        }

        else if(this.state.edit_popup_visibility) {
            active_popup = <AddEquipment edit_active={true} id={this.props.object_id} name={this.state.name} description={this.state.description} brand={this.state.brand} model={this.state.model} close_popup={this.closePopups}/>
        }

        return(
            <React.Fragment>
                {active_popup}
                <div className="list-item">
                    <img src={this.state.image} alt={this.props.name} alt={this.state.name} />

                    <div className="item-info">
                        <h1 className="item-name">{this.state.name}</h1>
                        <div className="item-description text">{this.state.description}</div>
                        {buttons_available}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ListItem;