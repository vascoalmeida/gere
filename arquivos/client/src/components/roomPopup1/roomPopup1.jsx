import React, {Component} from "react";
import "./roomPopup1.css";

class RoomPopup2 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: "",
            time_start: "",
            time_end: "",
            room: this.props.room,
            button_lock: this.props.blocked_button_class,
        }

        this.handleBtnClick = this.handleBtnClick.bind(this);
        this.handleChosenDay = this.handleChosenDay.bind(this);
        this.handleChosenTimeStart = this.handleChosenTimeStart.bind(this);
        this.handleChosenTimeEnd = this.handleChosenTimeEnd.bind(this);
        this.allowContinue = this.allowContinue.bind(this);
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
        this.setState({date: ev.target.value}, this.allowContinue);
    }

    handleChosenTimeStart(ev) {
        this.setState({time_start: ev.target.value}, this.allowContinue);
    }

    handleChosenTimeEnd(ev) {
        this.setState({time_end: ev.target.value}, this.allowContinue);
    }

    render() {
        return(
            <div id="rm-popup-container">
                <div id="rm-popup">
                    <div className="rm-d-section">
                        <label className="label-title">Período da requisição</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date" onChange={this.handleChosenDay} required></input>
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
                        <label className="label-title">Sala escolhida:</label>
                        <label>{this.props.room}</label>
                    </div>

                    <div className="rm-d-section button-container">
                        <div className={this.state.button_lock + " form-button"} onClick={this.handleBtnClick}>Próximo</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RoomPopup2;