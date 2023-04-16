import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
    <App />
        </BrowserRouter>
    </Provider>
)