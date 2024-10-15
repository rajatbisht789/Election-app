import React from 'react';
import './App.css'; // Include your CSS
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import Login from './components/Login';
import HomePage from './components/HomePage';
import FindVoter from './components/FindVoter';
import SurveyReview from './components/SurveyReview';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedLogin from './components/ProtectedLogin';
import AdminDashboard from './components/AdminDashboard';
import Constituency from './components/Constituency';
import Booth from './components/Booth';
import Survey from './components/Survey';
import Voters from './components/Voters';
import ShareImage from './components/ShareImage';
import UserPage from './components/UserPage';

const App = () => {
  
    
  return (
    <Router>
      <Routes> 
      
        {/* Public Route */}
        <Route path="/login" element={<ProtectedLogin><Login /> </ProtectedLogin>} />

        {/* Protected Routes */}
        <Route path="/homePage" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/find-voter" element={<ProtectedRoute><FindVoter /></ProtectedRoute>} />
        <Route path="/survey" element={<ProtectedRoute><Survey /></ProtectedRoute>} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="voters" element={<Voters />} />
          <Route path="constituency" element={<Constituency />} />
          <Route path="booth" element={<Booth />} />
          <Route path="survey-review" element={<SurveyReview />} />
          <Route path="shareImage" element={<ShareImage />} />
          <Route path="user" element={<UserPage />} />
        </Route>
        {/* Default Route */}
        <Route path="/" element={<ProtectedLogin><Login /> </ProtectedLogin>} />
      </Routes>
    </Router>
  );
};

export default App;
