import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import the xlsx library
import LogoutButton from './LogoutButton';

const UserPage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userName, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [users, setUsers] = useState([]);
  const fileInputRef = useRef(null); // Create a ref for the file input

  // Function to generate a random password
  const generateRandomPassword = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let randomPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPassword += characters[randomIndex];
    }
    return randomPassword; // Return the generated password
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/users/getAllUsers`); 
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userName || !phoneNumber) {
      alert('Please fill in all fields');
      return;
    }

    const generatedPassword = generateRandomPassword(); // Generate password
    const newUser = { userName, password: generatedPassword, phoneNumber }; // Use generated password
    
    try {
      await axios.post(`${apiUrl}/api/users/createUser`, newUser); 
      alert('User added successfully');
      setUsername('');
      setPhoneNumber('');
      fetchUsers(); 
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  const handleShare = (user) => {
    const userDetails = `Name: ${user.userName}\nPhone Number: ${user.phoneNumber}\nPassword: ${user.password}`;
    navigator.clipboard.writeText(userDetails)
      .then(() => {
        alert('User details copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const usersData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const usersToCreate = usersData.slice(1).map(row => {
        return {
          userName: row[0],
          phoneNumber: row[1],
          password: generateRandomPassword() // Generate a random password for each user
        };
      });

      try {
        await Promise.all(usersToCreate.map(user => 
          axios.post(`${apiUrl}/api/users/createUser`, user)
        ));
        alert('Users imported successfully');
        fetchUsers();
      } catch (error) {
        console.error('Error importing users:', error);
        alert('Failed to import users');
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
    <LogoutButton/>
      <h1 className="text-xl font-bold mb-4">User Management</h1>
      
      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2"
            required
          />
        </div>

        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 p-2"
            required
          />
        </div>

        {/* Button container */}
        <div className="col-span-1 sm:col-span-2 flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add User
          </button>
        </div>
      </form>

      {/* File upload for importing users */}
      <div className="flex flex-col items-center mb-4">
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          ref={fileInputRef} // Attach ref
          style={{ display: 'none' }} // Hide the default input
        />
        <button
          onClick={() => fileInputRef.current.click()} // Trigger file input click
          className="bg-gray-500 text-white p-2 rounded mb-2"
        >
          Upload Users
        </button>
      </div>

      {/* Table with fixed height and scrolling */}
      <div className="overflow-auto" style={{ maxHeight: '400px' }}>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300">Name</th>
              <th className="border border-gray-300">Phone Number</th>
              <th className="border border-gray-300">Password</th>
              <th className="border border-gray-300">Actions</th> {/* New column for actions */}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300">{user.userName}</td>
                <td className="border border-gray-300">{user.phoneNumber}</td>
                <td className="border border-gray-300">{user.password}</td>
                <td className="border border-gray-300">
                  <button
                    onClick={() => handleShare(user)} // Add click handler for sharing
                    className="bg-green-500 text-white p-1 rounded"
                  >
                    Share
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

export default UserPage;
