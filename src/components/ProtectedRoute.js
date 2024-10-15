import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if the token exists
  return token!=="undefined" && token!==null && token!==undefined ? children : <Navigate to="/login" />;  // Redirect to login if not authenticated
};

export default ProtectedRoute;
