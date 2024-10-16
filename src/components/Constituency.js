import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const Constituency = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [constituencyName, setConstituencyName] = useState('');
  const [constituencies, setConstituencies] = useState([]);

  // Fetch all constituencies when the component mounts
  useEffect(() => {
    

    fetchConstituencies();
  }, [apiUrl]);

  const handleInputChange = (e) => {
    setConstituencyName(e.target.value);
  };
  const fetchConstituencies = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/constituencies`);
      setConstituencies(response.data);
    } catch (error) {
      console.error('Error fetching constituencies:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/constituencies`, {
        constituencyName: constituencyName,
      });
      setConstituencyName(''); // Clear the input field after submission
      fetchConstituencies();
      // setConstituencies([...constituencies, response.data]); // Update constituencies state
      alert('Constituency created successfully!'); // Success alert
    } catch (error) {
      console.error('Error creating constituency:', error);
      alert('Failed to create constituency. Please try again.'); // Error alert
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this constituency and all related booths?')) {
      try {
        await axios.delete(`${apiUrl}/api/constituencies/${id}`);
        setConstituencies(constituencies.filter(c => c.id !== id)); // Remove deleted constituency from state
        alert('Constituency and related booths deleted successfully!'); // Success alert
      } catch (error) {
        console.error('Error deleting constituency:', error);
        alert('Failed to delete constituency. Please try again.'); // Error alert
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
    <LogoutButton/>
      <h1 className="text-2xl font-bold mb-4">Constituency Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={constituencyName}
          onChange={handleInputChange}
          placeholder="Constituency name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Constituency
        </button>
      </form>

      <h2 className="text-xl font-bold mb-2">Existing Constituencies</h2>
      <div className="overflow-y-auto h-60 border border-gray-300 rounded"> {/* Set height for scrolling */}
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {constituencies.map((constituency, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{constituency.constituencyName}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(constituency.id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Constituency;
