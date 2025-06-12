import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, {currentUser?.name || 'Student'}</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Applications</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Shortlisted</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Rejected</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;