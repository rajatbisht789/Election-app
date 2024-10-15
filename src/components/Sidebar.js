import React from 'react';

const Sidebar = ({ setActiveSection }) => {
    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <ul>
                <li onClick={() => setActiveSection('voters')}>Voters</li>
                <li onClick={() => setActiveSection('constituency')}>Constituency</li>
                <li onClick={() => setActiveSection('booth')}>Booth</li>
                <li onClick={() => setActiveSection('survey')}>Survey</li>
                <li onClick={() => setActiveSection('shareImage')}>Survey</li>
                <li onClick={() => setActiveSection('user')}>Survey</li>
            </ul>
        </div>
    );
};

export default Sidebar;
