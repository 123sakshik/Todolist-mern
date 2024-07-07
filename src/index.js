import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import React from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Replace ReactDOM.render with createRoot
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
