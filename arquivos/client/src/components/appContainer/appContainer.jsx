import React, {Component} from "react";
import {
    HashRouter,
    Route
} from "react-router-dom";
import HomePage from "../homePage/homePage";
import MainPage from "../mainPage/mainPage";

class AppContainer extends Component {

    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <Route path="/main" component={MainPage} />
                    <Route path="/home" component={HomePage} />
                </React.Fragment>
            </HashRouter>
        );
    }
}

export default AppContainer;