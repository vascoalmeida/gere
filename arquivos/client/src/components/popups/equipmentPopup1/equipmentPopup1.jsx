import React, {Component} from "react";
import "./equipmentPopup1.css";

class EquipmentPopup1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            leave_date: "",
            leave_time: "",
            delivery_date: "",
            delivery_time: "",
            button_lock: this.props.button_blocked_class,
        }

        this.allowContinue = this.allowContinue.bind(this);
        this.handleDeliveryDay = this.handleDeliveryDay.bind(this);
        this.handleDeliveryTime = this.handleDeliveryTime.bind(this);
        this.handleLeaveDay = this.handleLeaveDay.bind(this);
        this.handleLeaveTime = this.handleLeaveTime.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleBtnClick() {
        if(this.state.button_lock !== "") {
            return;
        }
        
        this.props.action(this.state);
    }

    handleDeliveryDay(ev) {
        this.setState({delivery_date: ev.target.value}, this.allowContinue);
    }

    handleLeaveDay(ev) {
        this.setState({leave_date: ev.target.value}, this.allowContinue);
    }

    handleDeliveryTime(ev) {
        this.setState({delivery_time: ev.target.value}, this.allowContinue);
    }

    handleLeaveTime(ev) {
        this.setState({leave_time: ev.target.value}, this.allowContinue);
    }

    allowContinue() {
        if(this.state.leave_date.length > 0 && this.state.leave_time.length > 0 && this.state.delivery_date.length > 0 && this.state.delivery_time.length > 0) {
            this.setState({button_lock: ""});
        }
        else {
            this.setState({button_lock: this.state.button_lock});
        }
    }

    render() {
        var today = new Date();
        var today_day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
        var today_month = today.getMonth() < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
        var today_year = today.getFullYear();
        var min_date = today_year + "-" + today_month + "-" + today_day;

        return(
            <div id="rm-popup-container" className="equipment-popup">
                <div id="rm-popup">
                    <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div id="disclaimer-eq">
                        <label>As requisições só serão vistas pelos administradores no período da manhã (10:00h às 13:00h) e no período da tarde (14:30h às 17:00h)</label>
                    </div>
                    <div className="rm-d-section">
                        <label className="label-title">Saída do material</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date" onChange={this.handleLeaveDay} min={min_date} required></input>
                        </div>

                        <div>
                            <label>Horas</label>
                            <input className="input-time" type="time" onChange={this.handleLeaveTime} required></input>
                        </div>
                    </div>

                    <div className="rm-d-section">
                        <label className="label-title">Entrega do material</label>
                        <div>
                            <label>Data</label>
                            <input className="input-date" type="date" onChange={this.handleDeliveryDay} min={min_date} required></input>
                        </div>

                        <div>
                            <label>Horas</label>
                            <input className="input-time" type="time" onChange={this.handleDeliveryTime} required></input>
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

export default EquipmentPopup1;