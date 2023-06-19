import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store"
import App from './App';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic';
// import axios from 'axios';


// axios.defaults.baseURL = process.env.REACT_APP_BACKEND_API;
// console.log(process.env.REACT_APP_BACKEND_API);
// axios.defaults.baseURL = "https://princee-commerce.onrender.com"

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

