import React, {Component} from "react";
import "./roomPopup2.css";

class RoomPopup2 extends Component {
    constructor() {
        super();

        this.state = {
            chosen_room : "Nenhuma",
        }
    }

    componentDidMount() {
        fetch("/room/info/" + this.props.room, {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        })
        .then(r => {
            r.json()
            .then(res => {
                this.setState({
                    chosen_room: res.name,
                });
            })
            .catch();
        })
        .catch();
    }

    render() {
        return(
            <div id="rm-popup-container" >
                <div id="rm-popup" className="rm-popup2">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />
                    <div className="popup-info">
                        <label className="label-title">Período da requisição:</label>
                        <span>Dia </span>
                        <span>{this.props.date}</span>
                        <span>das</span>
                        <span>{this.props.time_start}</span>
                        <span>às</span>
                        <span>{this.props.time_end}</span>
                    </div>

                    <div className="popup-info">
                        <label className="label-title">Sala requisitada:</label>
                        <span>{this.state.chosen_room}</span>
                    </div>

                    <div className="popup-info">
                        <input type="checkbox" required></input>
                        <label className="cb-label">Declaro que me responsabilizo pelo bom uso e conservação de todo o material/equipamento presente na sala, bem como pela manutenção da limpeza do espaço.</label>
                    </div>

                    <button type="submit" className="form-button">Requisitar</button>
                </div>
            </div>
        )
    }
}

export default RoomPopup2;