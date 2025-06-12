import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Search, Users, Award, ChevronRight, Bookmark, Clock, MapPin } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  
  
  // Demo recent companies
  const recentCompanies = [
    { id: 1, name: 'Google', logo: 'https://images.pexels.com/photos/5043379/pexels-photo-5043379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, name: 'Microsoft', logo: 'https://images.pexels.com/photos/5474295/pexels-photo-5474295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, name: 'Amazon', logo: 'https://images.pexels.com/photos/4792730/pexels-photo-4792730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, name: 'Apple', logo: 'https://images.pexels.com/photos/9829350/pexels-photo-9829350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
  ];
  
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Launch Your Career with the Perfect Internship</h1>
          <p>Connect with top companies offering internships that match your skills and interests.</p>
          <div className="hero-cta">
            <Link to="/internships" className="btn btn-primary btn-lg">
              Find Internships <ChevronRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg">
              Create Account
            </Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Using a placeholder image from Pexels */}
          <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Students collaborating" />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose Zidio Connect?</h2>
          <p>We make finding and applying to internships simpler and more effective.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Search size={32} />
            </div>
            <h3>Find Opportunities</h3>
            <p>Browse hundreds of internships across various industries and locations.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Briefcase size={32} />
            </div>
            <h3>Easy Application</h3>
            <p>Apply with just a few clicks and track your applications in one place.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h3>Connect with Recruiters</h3>
            <p>Directly interact with company recruiters and improve your chances.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Award size={32} />
            </div>
            <h3>Boost Your Resume</h3>
            <p>Gain valuable experience and enhance your professional profile.</p>
          </div>
        </div>
      </section>
      
     {/*
<section className="featured-section">
  <div className="section-header">
    <h2>Featured Internships</h2>
    <Link to="/internships" className="view-all-link">
      View All <ChevronRight size={16} />
    </Link>
  </div>
  <div className="internships-grid">
    {featuredInternships.map(internship => (
      <div className="internship-card" key={internship.id}>
        <div className="internship-card-header">
          <img src={internship.logo} alt={internship.company} className="company-logo" />
          <button className="bookmark-btn">
            <Bookmark size={20} />
          </button>
        </div>
        <div className="internship-card-body">
          <h3>{internship.title}</h3>
          <p className="company-name">{internship.company}</p>
          <div className="internship-details">
            <div className="detail">
              <MapPin size={16} />
              <span>{internship.location}</span>
            </div>
            <div className="detail">
              <Briefcase size={16} />
              <span>{internship.type}</span>
            </div>
            <div className="detail">
              <Clock size={16} />
              <span>{internship.deadline}</span>
            </div>
          </div>
        </div>
        <div className="internship-card-footer">
          <Link to={`/internships/${internship.id}`} className="btn btn-outline btn-sm">
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>
</section>
*/}

      
      {/* Companies Section */}
      <section className="companies-section">
        <div className="section-header">
          <h2> Top Companies</h2>
          <p>Join these leading organizations looking for fresh talent.</p>
        </div>
        <div className="companies-grid">
          {recentCompanies.map(company => (
            <div className="company-card" key={company.id}>
              <img src={company.logo} alt={company.name} />
              <h3>{company.name}</h3>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Career Journey?</h2>
          <p>Create an account today to apply for internships and connect with top companies.</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary btn-lg">
              Sign Up Now
            </Link>
            <Link to="/internships" className="btn btn-outline btn-lg">
              Browse Internships
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;