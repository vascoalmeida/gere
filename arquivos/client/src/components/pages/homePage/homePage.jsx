import React, {Component} from "react";
import LoginForm from "../../loginForm/loginForm";
import RegisterForm from "../../registerForm/registerForm";
import "./homePage.css";

class HomePage extends Component {

    constructor(props) {
        super();

        this.state = {
            login_visible: true,
        }

        this.showRegister = this.showRegister.bind(this);
        this.showLogin = this.showLogin.bind(this);
    }

    showRegister() {
        this.setState({
            login_visible: false,
        });
    }

    showLogin() {
        this.setState({
            login_visible: true,
        });
    }

    render() {
        var displayed_form;

        if(this.state.login_visible) {
            displayed_form = <LoginForm changeForm={this.showRegister} />
        }
        else {
            displayed_form = <RegisterForm changeForm={this.showLogin} />
        }

        return (
            <div id="homepage-container">
                <div id="form-container">
                    {displayed_form}
                </div>

                <div id="image-container">
                    <img src={window.location.origin + "/img/instituto.JPG"} alt="Instituto Multimédia" />
                </div>
            </div>
        );
    }
}

export default HomePage;