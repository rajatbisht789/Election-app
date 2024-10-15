import React, { useState, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';

// Using forwardRef to expose methods to the parent component
const NameSuggestion = forwardRef(({ setName }, ref) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    // Expose the clearSuggestion method to the parent
    useImperativeHandle(ref, () => ({
        clearSuggestion() {
            setInput(''); // Clear the input field
            setSuggestions([]); // Clear the suggestions
            setShowDropdown(false); // Hide the dropdown
        }
    }));

    // Fetch suggestions from backend
    const fetchSuggestions = async (inputValue) => {
        try {
            const response = await axios.get(`${apiUrl}/api/voters/suggestions`, {
                params: { name: inputValue }
            });
            const uniqueSuggestions = [...new Set(response.data)];
            setSuggestions(uniqueSuggestions);
            setShowDropdown(true); // Show the dropdown
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setInput(value);

        if (value) {
            fetchSuggestions(value); // Fetch suggestions based on input
        } else {
            setShowDropdown(false); // Hide dropdown if input is empty
        }
    };

    // Handle selection from dropdown
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion); // Set the selected suggestion to input
        setName(suggestion);  // Pass the selected name to the parent component (FindVoter)
        setShowDropdown(false); // Hide the dropdown after selection
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
            />
            {showDropdown && suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});

export default NameSuggestion;
