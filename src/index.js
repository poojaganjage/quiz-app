import React from 'react';
import ReactDOM from 'react-dom/client';
import {AppProvider} from './Context/Context';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
