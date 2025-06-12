import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const RecruiterDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, {currentUser?.companyName || 'Recruiter'}</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Internships</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Applications</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Selected Candidates</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;