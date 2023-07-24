import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import App from './App';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
import axios from 'axios';

// axios.defaults.baseURL = "http://192.168.31.136:4000"
axios.defaults.withCredentials = true;


const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options} >
        <App />
      </AlertProvider>
    </Provider>
  </BrowserRouter>
);

