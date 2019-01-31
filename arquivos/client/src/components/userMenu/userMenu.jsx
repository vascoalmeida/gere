import React, {Component} from "react";
import "./userMenu.css";

class UserMenu extends Component {
    render() {
        return(
            <div id="user-menu-container">
                <div className="arrow-up"></div>
                
                <ul id="user-menu">
                    <li className="user-menu-option text">Perfil</li>
                    <li className="user-menu-option text">Logout</li>
                </ul>
            </div>
        );
    }
}

export default UserMenu;