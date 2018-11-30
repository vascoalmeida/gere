import React, {Component} from "react";
import HomePage from "../homePage/homePage";
import MainPage from "../mainPage/mainPage";

class AppContainer extends Component {

    constructor() {
        super();

        this.state = {
            login: false,
        }
    }

    render() {
        var window;

        if(this.state.login) {
            window = <MainPage />
        }
        else {
            window = <HomePage />
        }

        return (
            <React.Fragment>
                {window}
            </React.Fragment>
        );
    }
}

export default AppContainer;