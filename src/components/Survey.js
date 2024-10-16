import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const Survey = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // To hold user answers

    useEffect(() => {
        axios.get(`${apiUrl}/api/survey/questions`).then(
            response => {
                setQuestions(response.data);
            }
        );
    }, []);

    const handleInputChange = (questionId, value) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    const handleCheckboxChange = (questionId, option) => {
        setAnswers(prevAnswers => {
            const currentAnswers = prevAnswers[questionId] || [];
            if (currentAnswers.includes(option)) {
                return {
                    ...prevAnswers,
                    [questionId]: currentAnswers.filter(item => item !== option),
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [...currentAnswers, option],
                };
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // // Send answers to Spring Boot application
        // axios.post(`${apiUrl}/api/survey/submit`, answers)
        //     .then(response => {
        //         console.log('Survey submitted successfully:', response.data);
        //         // Optionally handle success (e.g., show a message)
        //     })
        //     .catch(error => {
        //         console.error('Error submitting survey:', error);
        //         // Optionally handle error (e.g., show an error message)
        //     });
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <div className="mb-4"><LogoutButton /></div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Survey</h1>
            <form onSubmit={handleSubmit}>
                {questions.map((q) => (
                    <div key={q.id} className="mb-4">
                        <label className="block text-lg font-semibold mb-2">{q.question}</label>
                        {q.optionType === 'TEXT' && (
                            <textarea
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                rows="3"
                                placeholder="Type your answer here"
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                            />
                        )}
                        {q.optionType === 'DROPDOWN' && (
                            <select
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                                required
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                            >
                                <option value="" disabled>Select an option</option>
                                {q.options.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        )}
                        {q.optionType === 'CHECKBOX' && (
                            <div className="flex flex-col">
                                {q.options.map((option, index) => (
                                    <label key={index} className="flex items-center mb-2">
                                        <input 
                                            type="checkbox" 
                                            value={option} 
                                            className="mr-2" 
                                            onChange={() => handleCheckboxChange(q.id, option)} 
                                        /> 
                                        {option}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Survey;
