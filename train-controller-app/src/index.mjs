import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.mjs';
import reportWebVitals from './reportWebVitals.mjs';

//const root = ReactDOM.createRoot(document.getElementById('container'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
