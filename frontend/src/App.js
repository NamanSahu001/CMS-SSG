import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext'; // Adjust the path
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/HomePage';
import Login from './components/Login';
import CreateArticle from './components/CreateArticle';


const App = () => {
  const { token } = useAuth(); // This should now be defined
  console.log(token);

  return (
    <AuthProvider>
      <Routes>
        {/* Redirect to Home if user is logged in, else redirect to Login */}
        <Route path="/" element={token ? <CreateArticle /> : <Navigate to="/login" />} />

        {/* Allow direct access to Login page if no token */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />

        {/* Catch-all route to redirect based on token presence */}
        <Route path="*" element={token ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
