import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import HomePage from "./components/homePage/homePage";
import MainPage from "./components/mainPage/mainPage";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainPage />, document.getElementById('root'));
registerServiceWorker();