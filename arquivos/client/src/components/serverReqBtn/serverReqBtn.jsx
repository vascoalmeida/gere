import React, {Component} from "react";
import "./serverReqBtn.css";

class ServerReqButton extends Component {
    render() {
        return(
            <button id="sumbit-btn" type="submit">{this.props.btn_text}</button>
        );
    }
}

export default ServerReqButton;