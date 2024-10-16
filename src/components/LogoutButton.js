// src/components/LogoutButton.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear any authentication token or user data stored in localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        // Redirect to login page
        navigate('/login');
    };

    return (
        <div className="absolute top-4 right-4 z-10">
            <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
                Logout
            </button>
        </div>
    );
};

export default LogoutButton;
