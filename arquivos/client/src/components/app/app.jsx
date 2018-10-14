import React, {Component} from "react";
import {
    HashRouter,
    NavLink,
    Route
} from "react-router-dom";
import HomePage from "../homePage/homePage";
import MainPage from "../mainPage/mainPage";

class App extends Component {
    render() {
        return(
            <HashRouter>
                <div className="text">
                    <NavLink to="/">Home page</NavLink>
                    <NavLink to="/main">Main page</NavLink>

                    <Route exact path="/" component={HomePage}/>
                    <Route path="/main" component={MainPage}/>
                </div>
            </HashRouter>
        )
    }
}

export default App;