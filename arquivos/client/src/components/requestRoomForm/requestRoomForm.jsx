import React, {Component} from "react";
import "./requestRoomForm.css";

class RequestRoomForm extends Component {

    constructor() {
        super();
        
        this.state = {
            room_list: [
                {
                    id: 0,
                    name: "Sala 44",
                    img: "room.jpeg",
                    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat."
                },
                {
                    id: 1,
                    name: "Sala 43",
                    img: "room.jpeg",
                    desc: "Ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat."
                },
                {
                    id: 2,
                    name: "Laboratório 51",
                    img: "room.jpeg",
                    desc: "Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae scelerisque ipsum, in gravida felis. Sed purus dui, tempus ac risus nec, vestibulum aliquet nisi. Sed pharetra magna id purus pretium, eu malesuada elit feugiat."
                },
            ],
            popup_visible: false,
            blocked_button_class: "locked-button",
            chosen_day: "",
            chosen_time_start: "",
            chosen_time_end: "",
            chosen_room: "Nenhuma",
            responsability_agree: false,
        }

        this.handleRoomClick = this.handleRoomClick.bind(this);
        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleChosenDay = this.handleChosenDay.bind(this);
        this.handleChosenTimeStart = this.handleChosenTimeStart.bind(this);
        this.handleChosenTimeEnd = this.handleChosenTimeEnd.bind(this);
    }

    handleRoomClick(index) {
        let clicked_room = this.state.room_list[index].name;
        this.setState({
            chosen_room: clicked_room,
            blocked_button_class: ""
        });
    }

    handleChosenDay(ev) {
        this.setState({chosen_day: ev.target.value});
    }

    handleChosenTimeStart(ev) {
        this.setState({chosen_time_start: ev.target.value});
    }

    handleChosenTimeEnd(ev) {
        this.setState({chosen_time_end: ev.target.value});
    }

    handleBtnClick() {
        if(this.state.blocked_button_class !== "") {
            return;
        }

        this.setState({popup_visible: true});
    }

    render() {
        return(
            <form id="request-room">

                <div id="rm-popup-container">
                    <div id="rm-popup">
                        
                        <div className="popup-info">
                            <label className="label-title">Período da requisição:</label>
                            <span>Dia </span>
                            <span>19/12/1876</span>
                            <span>das</span>
                            <span>10h30</span>
                            <span>às</span>
                            <span>11h20</span>
                        </div>

                        <div className="popup-info">
                            <input type="checkbox" required></input>
                            <label>Declaro que me responsabilizo pelo bom uso e conservação de todo o material/equipamento presente na sala, bem como pela manutenção da limpeza do espaço.</label>
                        </div>
                    </div>
                </div>

                <div id="rm-dashboard">
                    <div className="rm-d-section">
                        <label className="label-title">Período da requisição</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date"></input>
                        </div>

                        <div>
                            <label>Horas (início)</label>
                            <input className="input-time" type="time"></input>
                        </div>

                        <div>
                            <label>Horas (fim)</label>
                            <input className="input-time" type="time"></input>
                        </div>
                    </div>

                    <div className="rm-d-section">
                        <label className="label-title">Sala escolhida:</label>
                        <label>{this.state.chosen_room}</label>
                    </div>

                    <div className="rm-d-section button-container">
                        <div className={this.state.blocked_button_class + " form-button"} onClick={this.handleBtnClick}>Próximo</div>
                    </div>
                </div>

                <div id="room-list">
                    {this.state.room_list.map(room => (

                        <div className="room" key={room.id} onClick={() => this.handleRoomClick(room.id)} >
                            <img src={window.location.origin + "/img/" + room.img} alt={room.name} />

                            <div className="room-info">
                                <h1 className="room-name">{room.name}</h1>
                                <div className="room-description text">{room.desc}</div>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </form>
        );
    }
}

export default RequestRoomForm;