import React, {Component} from "react";
import AddRoom from "../../popups/addRoom/addRoom";
import ListItem from "../../listItem/listItem";
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
    }

    componentDidMount() {
        fetch("/room/list", {
            method: "GET",
            headers: {
                "Accept": "application/json",
            },
        })
        .then(r => {
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

                <div id="dashboard">
                    <div className="db-section">
                        <label className="label-title">Filtros</label>
                        <select className="filter-search">
                            <option value="op1">Opt 1</option>
                            <option value="op2">Opt 2</option>
                            <option value="op3">Opt 3</option>
                        </select>
                    </div>

                    <div className="db-section button-container">
                        <div className="form-button">Filtrar</div>
                    </div>

                    <div className="db-section button-container">
                        <div className="form-button" onClick={this.showAddRoomPopup}>Criar sala</div>
                    </div>
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