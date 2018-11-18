import React, {Component} from "react";
import "./requestRoomForm.css";
import RoomPopup1 from "../roomPopup1/roomPopup1";
import RoomPopup2 from "../roomPopup2/roomPopup2";

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
            popup1_visible: false,
            popup2_visible: false,
            blocked_button_class: "locked-button",
            chosen_day: "",
            chosen_time_start: "",
            chosen_time_end: "",
            chosen_room: "Nenhuma",
            responsability_agree: false,
        }

        this.handleRoomClick = this.handleRoomClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.recieveFromPopup1 = this.recieveFromPopup1.bind(this);
    }

    handleFormSubmit() {
        fetch("/request-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                date: this.state.chosen_day,
                time_start: this.state.chosen_time_start,
                time_end: this.state.chosen_time_end,
                room: this.state.chosen_room
            })
        }).then((res) => {
            window.location.reload();
        })
    }

    recieveFromPopup1(data) {
        this.setState({
            chosen_day: data.date,
            chosen_time_start: data.time_start,
            chosen_time_end: data.time_end,
            popup1_visible: false,
            popup2_visible: true,
        });
    }

    handleRoomClick(index) {
        let clicked_room = this.state.room_list[index].name;
        this.setState({
            chosen_room: clicked_room,
            popup1_visible: true
        });
    }

    closePopup() {
        this.setState({popup_visible: false});
    }

    render() {
        var active_popup;

        if(this.state.popup1_visible) {
            active_popup = <RoomPopup1 blocked_button_class={this.state.blocked_button_class} room={this.state.chosen_room} action={this.recieveFromPopup1} />;
        }

        else if(this.state.popup2_visible) {
            active_popup = <RoomPopup2 room={this.state.chosen_room} date={this.state.chosen_day} time_start={this.state.chosen_time_start} time_end={this.state.chosen_time_end} />
        }

        else {
            active_popup = null;
        }

        return(
            <form id="request-room" onSubmit={this.handleFormSubmit} >

                {active_popup}

                <div id="rm-dashboard">
                    <div className="rm-d-section">
                        <select className="filter-search">
                            <option value="op1">Opt 1</option>
                            <option value="op2">Opt 2</option>
                            <option value="op3">Opt 3</option>
                        </select>
                    </div>

                    <div className="rm-d-section button-container">
                        <div className="form-button" onClick={this.handleBtnClick}>Filtrar</div>
                    </div>
                </div>

                <div id="room-list">
                    {this.state.room_list.map(room => (

                        <div className="room" key={room.id} >
                            <img src={window.location.origin + "/img/" + room.img} alt={room.name} />

                            <div className="room-info">
                                <h1 className="room-name">{room.name}</h1>
                                <div className="room-description text">{room.desc}</div>
                                <div className="form-button" onClick={() => this.handleRoomClick(room.id)}>Requisitar</div>
                            </div>
                        </div>
                        
                    ))}
                </div>
            </form>
        );
    }
}

export default RequestRoomForm;