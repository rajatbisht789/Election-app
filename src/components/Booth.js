import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const Booth = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [boothRangeStart, setBoothRangeStart] = useState('');
  const [boothRangeEnd, setBoothRangeEnd] = useState('');
  const [booths, setBooths] = useState([]);

  // Fetch constituencies on component mount
  useEffect(() => {
    const fetchConstituencies = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/constituencies`);
        setConstituencies(response.data);
      } catch (error) {
        console.error('Error fetching constituencies:', error);
      }
    };

    fetchConstituencies();
  }, [apiUrl]);

  // Fetch booths when the selected constituency changes
  const fetchBooths = async () => {
    if (selectedConstituency) {
      try {
        const response = await axios.get(`${apiUrl}/api/booths?constituencyId=${selectedConstituency}`);
        setBooths(response.data);
      } catch (error) {
        console.error('Error fetching booths:', error);
      }
    } else {
      setBooths([]); // Clear booths if no constituency is selected
    }
  };

  useEffect(() => {
    fetchBooths();
  }, [selectedConstituency, apiUrl]);

  const handleBoothSubmit = async (e) => {
    e.preventDefault();
    if (!selectedConstituency || !boothRangeStart || !boothRangeEnd) {
      alert('Please select a constituency and enter a valid booth range');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/booths`, {
        start: boothRangeStart,
        end: boothRangeEnd,
        constituencyId: selectedConstituency,
      });
      fetchBooths();
      setBoothRangeStart('');
      setBoothRangeEnd('');
      alert('Booths created successfully!'); // Success alert
    } catch (error) {
      console.error('Error creating booths:', error);
      alert('Failed to create booths. Please try again.'); // Error alert
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <LogoutButton/>
      <h1 className="text-2xl font-bold mb-4">Booth Management</h1>

      <form onSubmit={handleBoothSubmit}>
        <select
          value={selectedConstituency}
          onChange={(e) => setSelectedConstituency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          required
        >
          <option value="">Select a constituency</option>
          {constituencies.map((constituency) => (
            <option key={constituency.id} value={constituency.id}>
              {constituency.constituencyName}
            </option>
          ))}
        </select>

        <div className="flex mb-4">
          <input
            type="number"
            value={boothRangeStart}
            onChange={(e) => setBoothRangeStart(e.target.value)}
            placeholder="Booth Start Number"
            className="flex-1 p-2 border border-gray-300 rounded mr-2"
            required
          />
          <input
            type="number"
            value={boothRangeEnd}
            onChange={(e) => setBoothRangeEnd(e.target.value)}
            placeholder="Booth End Number"
            className="flex-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Create Booths
        </button>
      </form>

      <h2 className="text-xl font-bold mt-4">Existing Booths</h2>
      <div className="overflow-y-auto h-64 border border-gray-300 rounded"> {/* Adjust height as needed */}
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Constituency</th>
              <th className="border px-4 py-2">Booth No</th>
            </tr>
          </thead>
          <tbody>
            {booths.map((booth, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{booth.constituencyName}</td>
                <td className="border px-4 py-2">{booth.boothNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booth;
