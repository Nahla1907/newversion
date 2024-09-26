import React from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store'; // Ensure this path is correct
import { BrowserRouter } from 'react-router-dom'
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
