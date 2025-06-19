import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import store from './store/store.js';
import { Provider } from 'react-redux';
import './css/input.css';
import './css/indicator.css';
import './css/castomSelect.css';
import './css/main.css';
import './css/button.css';
import './css/loader.css';
import './css/header.css';
import './css/menu.css';
import './css/form.css';
import './css/checkbox.css';
import './css/table.css';
import './css/radio.css';
import './css/pagination.css';
import './css/filter.css';
import './css/swich.css';
import './css/dropdown.css';
import './css/toggle.css';
import './css/actionDisplay.css';
import './css/mobile.css';

const WebApp = ReactDOM.createRoot(document.getElementById('WebApp'));

WebApp.render(
  <Provider store={store}>
    <App />
  </Provider>
);

const loaderScreen = document.querySelector('.preload-loader');
if (loaderScreen) {
  loaderScreen.remove();
}