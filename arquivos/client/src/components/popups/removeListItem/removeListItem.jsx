import React, {Component} from "react";

var css_loaded = false;

class RemoveListItem extends Component {

    componentWillMount() {
        if(!css_loaded) {
            css_loaded = true;
            import("./removeListItem.css");
        }
    }

    render() {
        return(
            <div id="rm-popup-container">
                <div id="rm-popup">
                    <span>{this.props.confirmation}</span>

                    <div className="rm-d-section button-container">
                        <div className="form-button" onClick={this.props.close_popup}>Não, voltar</div>
                        <div className="form-button red-btn" onClick={this.props.delete}>Sim, eliminar</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RemoveListItem;