import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard">
      <h1>Welcome, {currentUser?.name || 'Admin'}</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Total Recruiters</h3>
          <p className="stat-number">0</p>
        </div>
        <div className="stat-card">
          <h3>Active Internships</h3>
          <p className="stat-number">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;