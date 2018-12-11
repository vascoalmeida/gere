import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppContainer from "./components/appContainer/appContainer";
//import MainPage from "./components/mainPage/mainPage";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppContainer />, document.getElementById('root'));
registerServiceWorker();