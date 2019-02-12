import React, {Component} from "react";
import AddRoom from "../../popups/addRoom/addRoom";
import ListItem from "../../listItem/listItem";
import Dashboard from "../../dashboard/dashboard";
import "./manageRoomsPage.css";

class ManageRoomsPage extends Component {

    constructor() {
        super();

        this.state = {
            room_list: [],
            showAddRoomPopup: false,
        }

        this.closePopups = this.closePopups.bind(this);
        this.showAddRoomPopup = this.showAddRoomPopup.bind(this);
        this.getRoomList = this.getRoomList.bind(this);
    }

    componentDidMount() {
        this.getRoomList("GET");
    }

    getRoomList(req_method, req_body) {
        var headers;
        var body;

        if(req_method === "POST") {
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
            };
            body = JSON.stringify(req_body);
        }

        else if(req_method === "GET") {
            headers = {
                Accept: "application/json",
            };
        }

        fetch("/room/list", {
            method: req_method,
            headers: headers,
            body: body,
        })
        .then(r => {
            console.log(r);
            r.json()
            .then(res => {
                this.setState({
                    room_list: res,
                });
            })
            .catch(err => {
                console.error(err);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    closePopups() {
        this.setState({
            add_room_visible: false,
        });
    }

    showAddRoomPopup() {
        this.setState({
            add_room_visible: true,
        });
    }

    render() {
        var active_popup;

        if(this.state.add_room_visible) {
            active_popup = <AddRoom close_popup={this.closePopups} method="POST" />
        }

        else {
            active_popup = null;
        }

        return(
            <React.Fragment>
                <div id="form-header">
                    <div id="form-title">Gerir Salas</div>
                    <div id="form-options"></div>
                </div>

                <div className="dashboard-container">
                    <Dashboard filter_status={false} order_by_day={true} main_action={this.showAddRoomPopup} main_action_msg="Criar sala" get_data={this.getRoomList} />
                </div>

                <div id="room-container">
                    {
                        this.state.room_list.length !== 0 ?
                        
                        this.state.room_list.map(id => (
                            <ListItem key={id} object_type="room" object_id={id} manageable={true} />
                        ))

                        :

                        <label className="faded-label">Ainda não existem salas</label>
                    }
                </div>

                {active_popup}
            </React.Fragment>
        );
    }
}

export default ManageRoomsPage;