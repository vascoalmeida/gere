import React, {Component} from "react";
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import LoginForm from "../loginForm/loginForm";
import RegisterForm from "../registerForm/registerForm";
import "./homePage.css";
import ServerReqButton from "../serverReqBtn/serverReqBtn";

class HomePage extends Component {
    render() {
        return (
            <div id="main-page-wrapper">
                <div id="main-page-content-container">
                <HashRouter>
                    <React.Fragment>
                        <div id="main-nav">
                            <NavLink to="/register">Register</NavLink>
                            <NavLink to="/login">Login</NavLink>
                        </div>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                    </React.Fragment>
                </HashRouter>
                </div>
            </div>
        );
    }
}

export default HomePage;