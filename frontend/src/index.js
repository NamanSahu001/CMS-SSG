import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Adjust the path

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter> {/* Wrap the app in BrowserRouter */}
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
