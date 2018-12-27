import React, {Component} from "react";

class RoomItem extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            description: "",
            image: "",
        }
    }

    componentDidMount() {
        var room_id = this.props.room_id;

        fetch("/room/img/" + room_id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(img => {
            return img.blob();
        })
        .then(img_blob => {
            const file_reader = new FileReader();
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

        fetch("/room/info/" + room_id, {
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
        })
        .catch(err => {
            console.error(err)
            alert("Ocorreu um erro ao carregar as salas, por favor tente mais tarde.");
        });
    }

    render() {
        return(
            <div className="room">
                <img src={this.state.image} alt={this.props.name} />

                <div className="room-info">
                    <h1 className="room-name">{this.state.name}</h1>
                    <div className="room-description text">{this.state.description}</div>
                    <div className="form-button" onClick={() => this.handleRoomClick(this.props.id)}>Requisitar</div>
                </div>
            </div>
        )
    }
}

export default RoomItem;