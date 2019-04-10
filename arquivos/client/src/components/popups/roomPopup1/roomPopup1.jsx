import React, {Component} from "react";
import "./roomPopup1.css";

class RoomPopup1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: "",
            time_start: "",
            time_end: "",
            room: this.props.room,
            button_lock: this.props.blocked_button_class,
            chosen_room: "...",
        }

        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleChosenDay = this.handleChosenDay.bind(this);
        this.handleChosenTimeStart = this.handleChosenTimeStart.bind(this);
        this.handleChosenTimeEnd = this.handleChosenTimeEnd.bind(this);
        this.allowContinue = this.allowContinue.bind(this);
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

    handleBtnClick() {
        if(this.state.button_lock !== "") {
            return;
        }

        this.props.action(this.state);
    }

    allowContinue() {
        if(this.state.date.length > 0 && this.state.time_start.length > 0 && this.state.time_end.length > 0) {
            this.setState({button_lock: ""});
        }
        else {
            this.setState({button_lock: this.props.blocked_button_class});
        }
    }

    handleChosenDay(ev) {
        this.setState({
            date: ev.target.value
        }, this.allowContinue);
    }

    handleChosenTimeStart(ev) {
        this.setState({
            time_start: ev.target.value
        }, this.allowContinue);
    }

    handleChosenTimeEnd(ev) {
        this.setState({
            time_end: ev.target.value
        }, this.allowContinue);
    }

    render() {
        var today = new Date();
        var today_day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        var today_month = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        var today_year = today.getFullYear();
        var min_date = today_year + "-" + today_month + "-" + today_day;
        
        return(
            <div id="rm-popup-container">
                <div id="rm-popup">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />
                    <div className="rm-d-section">
                        <label className="label-title">Período da requisição</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date" min={min_date} onChange={this.handleChosenDay} required></input>
                        </div>

                        <div>
                            <label>Horas (início)</label>
                            <input className="input-time" type="time" onChange={this.handleChosenTimeStart} required></input>
                        </div>

                        <div>
                            <label>Horas (fim)</label>
                            <input className="input-time" type="time" onChange={this.handleChosenTimeEnd} required></input>
                        </div>
                    </div>

                    <div className="rm-d-section">
                        <div>
                            <label className="label-title">Sala escolhida:</label>
                            <label>{this.state.chosen_room}</label>
                        </div>

                        <div id="disclaimer">
                            <label>As requisições só serão vistas pelos administradores no período da manhã (10:00h às 13:00h) e no período da tarde (14:30h às 17:00h)</label>
                        </div>
                    </div>

                    <div className="rm-d-section button-container">
                        <div className={this.state.button_lock + " form-button"} onClick={this.handleBtnClick}>Próximo</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomPopup1;