// src/components/HomePage.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const HomePage = () => {
  useEffect(() => {
    document.title = "Home - Election App"; // Set the document title here
  }, []);

  const navigate = useNavigate();

  const handleFindVoter = () => {
    navigate('/find-voter');
  };

  const handleSurveyReview = () => {
    navigate('/survey');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="mb-4"><LogoutButton /></div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Welcome to the Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleFindVoter}
        >
          Find Voter
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition duration-300"
          onClick={handleSurveyReview}
        >
          Survey Review
        </button>
      </div>
    </div>
  );
};

export default HomePage;
