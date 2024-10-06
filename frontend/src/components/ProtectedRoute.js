import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Adjust path as needed

const ProtectedRoute = ({ element: Component }) => {
    const { token } = useAuth(); // Get the token from the context

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/login" />;
    }

    // If authenticated, render the component
    return <Component />;
};

export default ProtectedRoute;
