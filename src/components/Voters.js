import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx
import LogoutButton from './LogoutButton';

const VoterPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [voters, setVoters] = useState([]);
  const fileInputRef = useRef(null); // Create a ref for the file input

  const fetchVoters =  async () => {
    const response = await axios.get(`${apiUrl}/api/voters/getAllVoters`);
    setVoters(response.data);
  };

  useEffect(() => {
    fetchVoters();
  }, [ ]);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(voters);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Voters');
    XLSX.writeFile(wb, 'voters.xlsx');
  };

  const handleFileUpload = async (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post(`${apiUrl}/api/voters/importThroughExcel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Voters imported successfully');
      fetchVoters();
      fileInputRef.current.value = ''; // Reset the file input
    } catch (error) {
      console.error('Error importing voters:', error);
      alert('Failed to import voters');
    }
  };

  return (
    <div className="p-6">
    <LogoutButton/>
      <h1 className="text-2xl font-bold mb-4">Voter Management</h1>
      {/* Flex container for Export and Upload buttons */}
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white p-2 rounded mb-2 md:mb-0 md:mr-2"
        >
          Export to Excel
        </button>

        {/* File upload for importing voters */}
        <div className="flex items-center">
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            ref={fileInputRef} // Attach ref
            className="hidden" // Hide the default input
          />
          <button
            onClick={() => fileInputRef.current.click()} // Trigger file input click
            className="bg-gray-500 text-white p-2 rounded"
          >
            Upload Voters
          </button>
        </div>
      </div>

      {/* Table with fixed height and horizontal scrolling */}
      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Part Id</th>
              <th className="p-2 border">Sr no.</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Father's / Husband's Name</th>
              <th className="p-2 border">Voted</th>
              <th className="p-2 border">Supporter</th>
              <th className="p-2 border">Out</th>
              <th className="p-2 border">Age</th>
              <th className="p-2 border">Phone Number</th>
              <th className="p-2 border">House No</th>
              <th className="p-2 border">Voter Id</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Booth Address</th>
            </tr>
          </thead>
          <tbody>
            {voters.map((v, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{v.partId}</td>
                <td className="p-2 border">{v.id}</td>
                <td className="p-2 border">{v.name}</td>
                <td className="p-2 border">{v.fatherOrHusbandName}</td>
                <td className="p-2 border">{v.voted ? "Yes" : "No"}</td>
                <td className="p-2 border">{v.supporter ? "Yes" : "No"}</td>
                <td className="p-2 border">{v.out ? "Yes" : "No"}</td>
                <td className="p-2 border">{v.age}</td>
                <td className="p-2 border">{v.phoneNumber}</td>
                <td className="p-2 border">{v.houseNumber}</td>
                <td className="p-2 border">{v.voterId}</td>
                <td className="p-2 border">{v.address}</td>
                <td className="p-2 border">{v.boothAddress}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoterPage;
