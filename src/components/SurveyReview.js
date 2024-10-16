import React, { useEffect } from 'react';
import LogoutButton from './LogoutButton';

const SurveyReview = () => {
  const surveyData = [
    { question: "What is your opinion on the voting process?", response: "It is quite straightforward." },
    { question: "How can we improve voter turnout?", response: "By increasing awareness." },
    { question: "Do you feel informed about the candidates?", response: "Yes, through various media." },
  ];

  useEffect(() => {
    document.title = "Survey Review - Election App"; // Set the document title here
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <LogoutButton/>
      <h1 className="text-3xl font-bold mb-6 text-center">Survey Review</h1>
      <div className="space-y-4">
        {surveyData.map((item, index) => (
          <div key={index} className="p-4 border border-gray-300 rounded-md">
            <h3 className="text-lg font-semibold">{item.question}</h3>
            <p className="text-gray-700">{item.response}</p>
          </div>
        ))}
      </div>
      <button 
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={() => window.history.back()}
      >
        Back
      </button>
    </div>
  );
};

export default SurveyReview;
