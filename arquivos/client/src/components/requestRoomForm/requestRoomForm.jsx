import React, {Component} from "react";
import "./requestRoomForm.css";
import RoomPopup1 from "../popups/roomPopup1/roomPopup1";
import RoomPopup2 from "../popups/roomPopup2/roomPopup2";
import RemoveListItem from "../popups/removeListItem/removeListItem";
import AddRoom from "../popups/addRoom/addRoom";
import ListItem from "../listItem/listItem";
import Dashboard from "../dashboard/dashboard";

class RequestRoomForm extends Component {

    constructor() {
        super();
        
        this.state = {
            limit: 10,
            room_list: [],
            popup1_visible: false,
            popup2_visible: false,
            remove_room_popup_visible: false,
            edit_room_popup_visible: false,
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
        this.removeRoom = this.removeRoom.bind(this);
        this.getRequestsList = this.getRequestsList.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getRequestsList("GET");
    }

    getRequestsList(req_method) {
        var headers;
        var body;

        if(req_method === "POST") {
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            body = JSON.stringify({
                filters: this.state.filters,
                order: this.state.order,
                limit: this.state.limit,
            });
        }

        else if(req_method === "GET") {
            headers = {
                Accept: "application/json",
            };
        }

        fetch("/room/list/", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(r => {
            if(r.status === 401) {
                window.location = "/#/home";
                return;
            }
            
            r.json()
            .then(res => {
                this.setState({
                    room_list: res,
                });
            })
            .catch(err => {
                console.log("Error parsing JSON: " + err);
            });
        })
        .catch(err => {
            console.log("Error with response received:" + err);
        });
    }

    getData(req_info) {
        this.setState({
            filters: req_info[1].filters,
            order: req_info[1].order,
        }, () => {
            this.getRequestsList("POST");
        });
    }

    handleFormSubmit() {
        fetch("/room/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                day: this.state.chosen_day,
                time_start: this.state.chosen_time_start,
                time_end: this.state.chosen_time_end,
                room_id: this.state.chosen_room[0],
            }),
        })
        .then((res) => {
            window.location.reload();
        })
        .catch(err => {
            alert("Ocorreu um erro, por favor tente mais tarde");
        });
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

    closePopup() {
        this.setState({
            popup1_visible: false,
            popup2_visible: false,
            remove_room_popup_visible: false,
            edit_room_popup_visible: false,
        });
    }

    removeRoom() {
        var delete_room = {id: this.state.chosen_room[0].id};

        fetch("/room", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(delete_room)
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

    handleRoomClick(index) {
        let clicked_room = this.state.room_list.filter(room => room === index);

        this.setState({
            chosen_room: clicked_room,
            popup1_visible: true
        });
    }

    render() {
        var active_popup;

        if(this.state.popup1_visible) {
            active_popup = <RoomPopup1 blocked_button_class={this.state.blocked_button_class} room={this.state.chosen_room} action={this.recieveFromPopup1} close_popup={this.closePopup} />;
        }

        else if(this.state.popup2_visible) {
            active_popup = <RoomPopup2 room={this.state.chosen_room} date={this.state.chosen_day} time_start={this.state.chosen_time_start} time_end={this.state.chosen_time_end}  close_popup={this.closePopup} />
        }

        else if(this.state.remove_room_popup_visible) {
            var confirmation_sentence = "Tem a certeza de que deseja eliminar esta sala?";
            active_popup = <RemoveListItem confirmation={confirmation_sentence} close_popup={this.closePopup} remove_room={this.removeRoom} />
        }

        else if(this.state.edit_room_popup_visible) {
            active_popup = (
                <div id="rm-popup-container">
                    <div id="rm-popup">
                        <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.closePopup} />
                        <div className="rm-d-section">
                            <AddRoom room_img={this.state.chosen_room.img} room_name={this.state.chosen_room.name} room_description={this.state.chosen_room.description} room_id={this.state.chosen_room.id} room_edition_active={true} method="PUT" />
                        </div>
                    </div>
                </div>
            );
        }

        else {
            active_popup = null;
        }

        return(
            <form id="request-room" onSubmit={this.handleFormSubmit} >
                {active_popup}

                <Dashboard filter_status={false} order_by_day={true} get_data={this.getData} />

                <div id="room-list">
                    {
                        this.state.room_list.length !== 0 ?

                        this.state.room_list.map(id => (
                            <ListItem key={id} object_type="room" object_id={id} order_object={() => this.handleRoomClick(id)} />
                        ))

                        :

                        <label className="faded-label">De momento não há salas disponíveis</label>
                    }
                </div>
            </form>
        );
    }
}

export default RequestRoomForm;