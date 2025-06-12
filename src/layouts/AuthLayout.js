import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-sidebar">
          <div className="auth-brand">
            <Briefcase size={40} color="#0052CC" />
            <h1>Zidio Connect</h1>
          </div>
          <div className="auth-info">
            <h2>Launch Your Career</h2>
            <p>Connect with top companies offering internships that match your skills and interests.</p>
            <div className="auth-features">
              <div className="auth-feature">
                <div className="auth-feature-icon">🚀</div>
                <div className="auth-feature-text">
                  <h3>Find Opportunities</h3>
                  <p>Browse hundreds of internships across various industries</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">📝</div>
                <div className="auth-feature-text">
                  <h3>Easy Application</h3>
                  <p>Apply with just a few clicks and track your applications</p>
                </div>
              </div>
              <div className="auth-feature">
                <div className="auth-feature-icon">🏢</div>
                <div className="auth-feature-text">
                  <h3>Company Profiles</h3>
                  <p>Learn about companies before applying</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="auth-content">
          <div className="auth-nav">
            <Link to="/" className="auth-nav-link">Home</Link>
            <Link to="/internships" className="auth-nav-link">Browse Internships</Link>
          </div>
          <div className="auth-form-container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;