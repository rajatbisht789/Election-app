import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedLogin = ({ children }) => {
  const token = localStorage.getItem('token');  // Check if the token exists
  return token!=="undefined" && token!==null && token!==undefined ? <Navigate to="/homePage" /> : children;  
  // Redirect to homePage if already logged in
};

export default ProtectedLogin;
