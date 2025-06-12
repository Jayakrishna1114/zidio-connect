import React, { useState, useEffect } from 'react';
import { MapPin, Users, Calendar, Plus, Briefcase, ChevronRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getRecruiterInternships } from '../../services/recruiterService';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';


const RecruiterInternships = (props) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
   
const recruiterId = currentUser?.id;  // or get from state, or context

const backendUrl = 'http://localhost:8081';



  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
  try {
    const data = await getRecruiterInternships(currentUser.id);
    console.log("Fetched internships data:", data);
    
    // Adjust this line based on what is logged:
    setInternships(Array.isArray(data) ? data : data.internships || []);
  } catch (error) {
    console.error('Failed to fetch internships:', error);
  } finally {
    setLoading(false);
  }
};

  const handleDeleteInternship = async (internshipId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this internship?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `${backendUrl}/api/recruiter/${recruiterId}/internships/${internshipId}`, // Replace recruiterId with actual value
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      alert('Internship deleted successfully.');
      // Optionally, update state to remove the deleted internship from the UI
      setInternships(prev => prev.filter(internship => internship.id !== internshipId));
    } else {
      const errorMsg = await response.text();
      alert(`Failed to delete internship: ${errorMsg}`);
    }
  } catch (error) {
    alert('Error deleting internship. Please try again later.');
    console.error(error);
  }
};

  // Animation styles
  const fadeIn = {
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const scaleUp = {
    transition: 'transform 0.2s ease-in-out',
  };

  // Keyframe animations (defined in CSS)
  const keyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;

  // Empty state styles
  const emptyStateStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    textAlign: 'center',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    margin: '2rem 0',
    animation: 'fadeIn 0.6s ease-in-out',
  };

  // Loading skeleton styles
  const skeletonStyles = {
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    animation: 'pulse 1.5s infinite ease-in-out',
  };

  // Container styles
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  };

  // Page header styles
  const pageHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1e293b',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  // Button styles
  const primaryButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 6px rgba(37, 99, 235, 0.1)',
    textDecoration: 'none',
    fontSize: '1rem',
  };

  const primaryButtonHoverStyles = {
    backgroundColor: '#1d4ed8',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 8px rgba(37, 99, 235, 0.2)',
  };

  const outlineButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'transparent',
    color: '#2563eb',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontWeight: 500,
    border: '1px solid #2563eb',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
    fontSize: '0.9rem',
  };

  const outlineButtonHoverStyles = {
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    transform: 'translateY(-1px)',
  };

  // Grid styles
  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1.5rem',
  };

  // Card styles
  const cardStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    animation: 'fadeIn 0.5s ease-in-out',
  };

  const cardHoverStyles = {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.08)',
  };

  // Card header styles
  const cardHeaderStyles = {
    padding: '1.5rem',
    borderBottom: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };

  const cardTitleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '0.5rem',
  };

  const badgeStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 500,
    backgroundColor: '#eff6ff',
    color: '#3b82f6',
    alignSelf: 'flex-start',
  };

  // Card body styles
  const cardBodyStyles = {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flexGrow: 1,
  };

  const detailStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontSize: '0.9rem',
  };

  const deadlineStyles = (date) => {
    const daysRemaining = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    const isUrgent = daysRemaining <= 7;
    
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: isUrgent ? '#ef4444' : '#64748b',
      fontSize: '0.9rem',
      fontWeight: isUrgent ? 500 : 400,
    };
  };

  // Card footer styles
  const cardFooterStyles = {
    padding: '1.5rem',
    borderTop: '1px solid #f1f5f9',
    display: 'flex',
    justifyContent: 'flex-end',
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <style>{keyframes}</style>
        <div style={pageHeaderStyles}>
          <h1 style={titleStyles}>My Internships</h1>
          <div style={{...skeletonStyles, width: '180px', height: '48px'}}></div>
        </div>
        <div style={gridStyles}>
          {[1, 2, 3].map(index => (
            <div key={index} style={{...cardStyles, opacity: 0.7}}>
              <div style={cardHeaderStyles}>
                <div style={{...skeletonStyles, width: '70%', height: '24px', marginBottom: '0.5rem'}}></div>
                <div style={{...skeletonStyles, width: '40%', height: '20px'}}></div>
              </div>
              <div style={cardBodyStyles}>
                <div style={{...skeletonStyles, width: '90%', height: '16px'}}></div>
                <div style={{...skeletonStyles, width: '80%', height: '16px'}}></div>
                <div style={{...skeletonStyles, width: '60%', height: '16px'}}></div>
              </div>
              <div style={cardFooterStyles}>
                <div style={{...skeletonStyles, width: '120px', height: '36px'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <style>{keyframes}</style>
      <div style={pageHeaderStyles}>
        <h1 style={titleStyles}>
          <Briefcase size={28} />
          My Internships
        </h1>


      </div>

      {internships.length === 0 ? (
        <div style={emptyStateStyles}>
          <Briefcase size={64} color="#2563eb" style={{ opacity: 0.8, marginBottom: '1.5rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#1e293b', marginBottom: '1rem' }}>
            No internships posted yet
          </h2>
          <p style={{ color: '#64748b', marginBottom: '2rem', maxWidth: '400px', lineHeight: '1.6' }}>
            Create your first internship posting to start receiving applications from qualified candidates.
          </p>
         <Link to="/recruiter/post-internship" style={{ textDecoration: 'none' }}>
  <button 
    style={primaryButtonStyles} 
    onMouseOver={e => Object.assign(e.currentTarget.style, primaryButtonHoverStyles)}
    onMouseOut={e => Object.assign(e.currentTarget.style, primaryButtonStyles)}
  >
    <Plus size={18} />
    Post New Internship
  </button>
</Link>
        </div>
      ) : (
        <div style={gridStyles}>
          {internships.map((internship, index) => (
            <div 
              key={internship.id} 
              style={{...cardStyles, animationDelay: `${index * 0.1}s`}}
              onMouseOver={e => Object.assign(e.currentTarget.style, {...cardStyles, ...cardHoverStyles})}
              onMouseOut={e => Object.assign(e.currentTarget.style, cardStyles)}
            >
              <div style={cardHeaderStyles}>
                 <button
    onClick={() => handleDeleteInternship(internship.id)}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#ef4444', // red color
      marginLeft: '1rem'
    }}
    
  >
    <Trash2 size={20} />
  </button>
                <h3 style={cardTitleStyles}>{internship.title}</h3>
                <div style={badgeStyles}>
                  {internship.applicationsCount} Application{internship.applicationsCount !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div style={cardBodyStyles}>
                <div style={detailStyles}>
                  <MapPin size={16} />
                  <span>{internship.location}</span>
                </div>
                <div style={detailStyles}>
                  <Users size={16} />
                  <span>{internship.openings} Opening{internship.openings !== 1 ? 's' : ''}</span>
                </div>
                <div style={deadlineStyles(new Date(internship.deadline))}>
                  <Calendar size={16} />
                  <span>Deadline: {new Date(internship.deadline).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
              
              <div style={cardFooterStyles}>
               <Link 
  to={`/recruiter/applications/${internship.id}`} 
  style={{
    ...outlineButtonStyles,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
  onMouseOver={e => Object.assign(e.currentTarget.style, {...outlineButtonStyles, ...outlineButtonHoverStyles})}
  onMouseOut={e => Object.assign(e.currentTarget.style, outlineButtonStyles)}
>
  View Applications
  <ChevronRight size={16} />
</Link>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecruiterInternships;