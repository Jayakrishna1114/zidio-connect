import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <div className="footer-logo">
              <Briefcase size={24} />
              <h2>Zidio Connect</h2>
            </div>
            <p>
              Connecting talented students with exciting internship opportunities at innovative companies.
            </p>
            <div className="social-links">
              <a href="#!" className="social-link">
                <Twitter size={18} />
              </a>
              <a href="#!" className="social-link">
                <Github size={18} />
              </a>
              <a href="#!" className="social-link">
                <Linkedin size={18} />
              </a>
              <a href="mailto:contact@zidioconnect.com" className="social-link">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/internships">Browse Internships</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          
          <div className="footer-section for-students">
            <h3>For Students</h3>
            <ul>
              <li><Link to="/internships">Find Internships</Link></li>
              <li><Link to="/register">Create Account</Link></li>
              <li><a href="#!">Resume Tips</a></li>
              <li><a href="#!">Interview Preparation</a></li>
            </ul>
          </div>
          
          <div className="footer-section for-recruiters">
            <h3>For Recruiters</h3>
            <ul>
              <li><Link to="/register">Post Internships</Link></li>
              <li><a href="#!">Find Talent</a></li>
              <li><a href="#!">Company Profile</a></li>
              <li><a href="#!">Recruiter Guide</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Zidio Connect. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#!">Privacy Policy</a>
            <a href="#!">Terms of Service</a>
            <a href="#!">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;