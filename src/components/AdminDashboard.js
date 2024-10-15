import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-0'
        } bg-blue-800 text-white fixed top-0 left-0 h-full transition-width duration-300 overflow-hidden md:w-64 md:overflow-auto`}
      >
        <div className="p-6 text-lg font-semibold">
          Admin Dashboard
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link to="/admin/user" className="block px-6 py-3 hover:bg-blue-700 transition">
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/voters" className="block px-6 py-3 hover:bg-blue-700 transition">
                Voters
              </Link>
            </li>
            <li>
              <Link to="/admin/constituency" className="block px-6 py-3 hover:bg-blue-700 transition">
                Constituency
              </Link>
            </li>
            <li>
              <Link to="/admin/booth" className="block px-6 py-3 hover:bg-blue-700 transition">
                Booth
              </Link>
            </li>
            <li>
              <Link to="/admin/survey-review" className="block px-6 py-3 hover:bg-blue-700 transition">
                Survey
              </Link>
            </li>
            <li>
              <Link to="/admin/shareImage" className="block px-6 py-3 hover:bg-blue-700 transition">
                Share Image
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} md:ml-64`}>
        <button
          onClick={toggleSidebar}
          className="mb-4 p-2 bg-blue-500 text-white rounded md:hidden"
        >
          {isSidebarOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H9m6 6H9m6-12H9" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <Outlet /> {/* This will render the respective page content based on the route */}
      </div>
    </div>
  );
};

export default AdminDashboard;
