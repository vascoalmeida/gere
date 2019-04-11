import React, {Component} from "react";
import RemoveListItem from "../popups/removeListItem/removeListItem";
import AddEquipment from "../popups/AddEquipment/AddEquipment";
import AddRoom from "../popups/addRoom/addRoom";
import "./listItem.css";

var buttons_available;

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            image: window.origin + "/img/img_placeholder.jpg",
            brand: "",
            model: "",
            remove_popup_visibility: false,
            edit_popup_visibility: false,
        }
        
        this.orderRoom = this.orderRoom.bind(this);
        this.showRemovePopup = this.showRemovePopup.bind(this);
        this.showEditPopup = this.showEditPopup.bind(this);
        this.closePopups = this.closePopups.bind(this);
        this.deleteObject = this.deleteObject.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    componentDidMount() {
        console.log("PROPS", this.props);
        var image_request = "/" + this.props.object_type + "/img/" + this.props.object_id;
        var data_request = "/" + this.props.object_type + "/info/" + this.props.object_id;

        console.log(image_request);

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
    
    removeItem() {
        console.log("BBBBBBBBBBBBBBBBBBBB", this.props.object_id);
        //this.props.remove_equipment(this.props.object_id);
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
            window.location.reload();
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

        else if(this.props.selected) {
            /*buttons_available = (
                <React.Fragment>
                    <div className="form-button red-btn" onClick={this.props.remove_equipment}>Remover</div>
                </React.Fragment>
            )*/
            buttons_available = null;
        }

        else {
            buttons_available = (
                <React.Fragment>
                    <div className="form-button" onClick={this.props.order_object}>Requisitar</div>
                </React.Fragment>
            );
        }

        if(this.state.remove_popup_visibility) {
            var popup_question = "Tem a certeza de que deseja eliminar a entrada escolhida?";

            active_popup = <RemoveListItem confirmation={popup_question} object_id={this.props.object_id} close_popup={this.closePopups} delete={this.deleteObject} />
        }

        else if(this.state.edit_popup_visibility) {

            if(this.props.object_type === "equipment") {
                active_popup = <AddEquipment edit_active={true} id={this.props.object_id} name={this.state.name} description={this.state.description} brand={this.state.brand} model={this.state.model} close_popup={this.closePopups}/>
            }

            else if(this.props.object_type === "room") {
                active_popup = <AddRoom edit_active={true} id={this.props.object_id} name={this.state.name} description={this.state.description} close_popup={this.closePopups} room_edition_active={true} />
            }
        }

        return(
            <React.Fragment>
                {active_popup}
                <div className="list-item">
                    <img src={this.state.image} alt={this.state.name} />

                    <div className="item-info">
                        <div>
                            <h1 className="item-name">{this.state.name}</h1>
                            <div className="item-description text">{this.state.description}</div>
                        </div>
                        <div id="btn-container">
                            {buttons_available}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ListItem;