import React, {Component} from "react";
import "./confirmAction.css";

class ConfirmAction extends Component {
    render() {
        return(
            <div id="confirm-action" className="popup-container">
                <div className="popup-content">
                <img src={window.location.origin + "/img/icon-close.png"} alt="Close icon" className="close-icon" onClick={this.props.close_popup} />

                    <div className="text">{this.props.message}</div>

                    <div className="btn-container">
                        <div className="form-button white-btn" onClick={this.props.accept_btn_action}>{this.props.accept_btn_msg}</div>
                        <div className="form-button red-btn" onClick={this.props.reject_btn_action}>{this.props.reject_btn_msg}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmAction;