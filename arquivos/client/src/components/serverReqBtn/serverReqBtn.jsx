import React, {Component} from "react";
import "./serverReqBtn.css";

class ServerReqButton extends Component {
    render() {
        return(
            <button className="form-button" type="button">{this.props.btn_text}</button>
        );
    }
}

export default ServerReqButton;