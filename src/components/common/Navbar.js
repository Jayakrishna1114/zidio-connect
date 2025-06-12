import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/internships?q=${searchQuery}`);
      setSearchQuery('');
    }
  };
  
  const getNavLinks = () => {
    if (!currentUser) {
      return (
        <>
          <li className="nav-item">
            <Link to="/internships" className="nav-link">Browse Internships</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link btn btn-primary">Register</Link>
          </li>
        </>
      );
    }
    
    if (currentUser.role === 'STUDENT') {
      return (
        <>
          <li className="nav-item">
            <Link to="/internships" className="nav-link">Browse Internships</Link>
          </li>
          <li className="nav-item">
            <Link to="/student/applications" className="nav-link">My Applications</Link>
          </li>
          <li className="nav-item">
            <Link to="/student/saved-internships" className="nav-link">Saved Internships</Link>
          </li>
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle">
              <User size={18} /> {currentUser.name || 'Profile'}
            </button>
            <div className="dropdown-menu">
              <Link to="/student/profile" className="dropdown-item">My Profile</Link>
              <Link to="/student" className="dropdown-item">Dashboard</Link>
              <button onClick={logout} className="dropdown-item text-danger">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </li>
        </>
      );
    }
    
    if (currentUser.role === 'RECRUITER') {
      return (
        <>
          <li className="nav-item">
            <Link to="/recruiter/internships" className="nav-link">My Internships</Link>
          </li>
          <li className="nav-item">
            <Link to="/recruiter/post-internship" className="nav-link">Post Internship</Link>
          </li>
        
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle">
              <User size={18} /> {currentUser.name || 'Profile'}
            </button>
            <div className="dropdown-menu">
              <Link to="/recruiter/profile" className="dropdown-item">Company Profile</Link>
              <Link to="/recruiter" className="dropdown-item">Dashboard</Link>
              <button onClick={logout} className="dropdown-item text-danger">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </li>
        </>
      );
    }
    
    if (currentUser.role === 'ADMIN') {
      return (
        <>
          <li className="nav-item">
            <Link to="/admin" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item dropdown">
            <button className="nav-link dropdown-toggle">
              <User size={18} /> Admin
            </button>
            <div className="dropdown-menu">
              <button onClick={logout} className="dropdown-item text-danger">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </li>
        </>
      );
    }
    
    return null;
  };
  
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <Briefcase size={24} />
            <span>Zidio Connect</span>
          </Link>
          
          <div className="navbar-search">
            <form onSubmit={handleSearch}>
             
            </form>
          </div>
          
          <button className="navbar-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <ul className={`navbar-nav ${isMenuOpen ? 'show' : ''}`}>
            {getNavLinks()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;