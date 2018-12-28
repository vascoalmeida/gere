import React, {Component} from "react";

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
        import("./listItem.css");
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
            res.json()
            .then(data => {
                this.setState({
                    name: data.name,
                    description: data.description,
                });
            });

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
                    <div className="form-button" onClick={this.orderRoom}>Requisitar</div>
                </div>
            </div>
        );
    }
}

export default ListItem;