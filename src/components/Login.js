import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userName, setName] = useState('');
  const [phoneNumber, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(''); // State to store error messages

  useEffect(() => {
    document.title = "Login - Election App"; // Set the document title here
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Payload for the login API
    const loginData = {
      userName,
      phoneNumber,
      password
    };
    try {
      // Send POST request to the Spring Boot login API
      const response = await axios.post(`${apiUrl}/api/auth/login`, loginData);
      
      // If login is successful, trigger any actions you want, e.g., save token, redirect, etc.
      if (response.status === 200) {
        const data = response.data;  // Assuming the token is returned from the API
        console.log(data)
        localStorage.setItem('token', data.token);  // Save the token in localStorage (optional) 
        localStorage.setItem('isAdmin', data.admin);
        
        setError('');
        navigate('/HomePage');
      } else {
        setError('Login failed. Please check your credentials.');
      }

    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>} {/* Display error message if exists */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="Name" 
            value={userName} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input 
            type="tel" 
            placeholder="Phone No" 
            value={phoneNumber} 
            onChange={(e) => setPhone(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
