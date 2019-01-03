import React, {Component} from "react";

var css_loaded = false;
var buttons_available;

class ListItem extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            image: "",
        }

        this.orderRoom = this.orderRoom.bind(this);
    }

    componentWillMount() {
        if(!css_loaded) {
            css_loaded = true;
            import("./listItem.css");
        }

        if(this.props.manageable) {
            buttons_available = (
                <React.Fragment>
                    <div className="form-button white-btn">Editar</div>
                    <div className="form-button red-btn">Remover</div>
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
            console.error(err);
        });

        fetch(data_request, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        .then(res => {
            /*res.json()
            .then(data => {
                this.setState({
                    name: data.name,
                    description: data.description,
                });
            });*/

            //console.log(res.text());
        })
        .catch(err => {
            alert("Ocorreu um erro ao carregar informação, por favor tente mais tarde.");
        });
    }

    orderRoom() {
        this.props.order_room(this.props.room_id);
    }

    render() {
        return(
            <div className="list-item">
                <img src={this.state.image} alt={this.props.name} alt={this.state.name} />

                <div className="item-info">
                    <h1 className="item-name">{this.state.name}</h1>
                    <div className="item-description text">{this.state.description}</div>
                    {buttons_available}
                </div>
            </div>
        );
    }
}

export default ListItem;