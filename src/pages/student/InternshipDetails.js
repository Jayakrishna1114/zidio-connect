import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInternshipById } from '../../services/internshipService';
import { applyForInternship } from '../../services/studentService';
import { useAuth } from '../../contexts/AuthContext';
import { MapPin, Calendar, DollarSign, Clock, Users, Briefcase } from 'lucide-react';
import './Internships.css';


const InternshipDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    education: '',
    graduationYear: ''
  });
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    fetchInternshipDetails();
  }, [id]);

  const fetchInternshipDetails = async () => {
  try {
    const data = await getInternshipById(id);
    console.log("Fetched internship details:", data);

    // Check if `data` is directly the internship or wrapped inside a key
    if (data && typeof data === 'object') {
      const internship = data.internship || data;  // adjust key if needed
      setInternship(internship);
    } else {
      console.error("Unexpected data format:", data);
      setInternship(null);
    }
  } catch (error) {
    console.error('Failed to fetch internship details:', error);
  } finally {
    setLoading(false);
  }
};


  const handleApply = async (e) => {
    e.preventDefault();
    try {
      await applyForInternship(currentUser.id, internship.id, formData, resumeFile);
      alert('Application submitted successfully!');
      setShowApplyForm(false);
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!internship) return <div>Internship not found</div>;

  return (
    <div className="internship-details">
      <div className="internship-header">
        <div className="company-info">
          
          <div>
            <h1>{internship.title}</h1>
            <p className="company-name">{internship.companyName}</p>
          </div>
        </div>
        
        {currentUser?.role === 'STUDENT' && (
          <><button
            className="btn btn-primary"
            onClick={() => setShowApplyForm(true)}
          >
            Apply Now
          </button><button
            className="btn btn-secondary"
            style={{ marginLeft: '1rem' }}
            onClick={() => window.open(`http://localhost:8081/api/recruiter/${currentUser.id}/profile-pdf`, '_blank')}

          >
              View Recruiter Resume
            </button></>
        )}
      </div>

      <div className="internship-grid">
        <div className="main-content">
          <section className="description">
            <h2>About the Internship</h2>
            <p>{internship.description}</p>
          </section>

          <section className="requirements">
            <h2>Skills Required</h2>
            <div className="skills-list">
              {internship.skillsRequired.split(',').map((skill, index) => (
                <span key={index} className="skill-tag">{skill.trim()}</span>
              ))}
            </div>
          </section>

          <section className="perks">
            <h2>Perks</h2>
            <div className="perks-list">
              {internship.perks.split(',').map((perk, index) => (
                <div key={index} className="perk-item">
                  <span className="perk-icon">🎁</span>
                  <span>{perk.trim()}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="process">
            <h2>Application Process</h2>
            <div className="process-steps">
              {internship.applicationProcess.split('>').map((step, index) => (
                <div key={index} className="process-step">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step.trim()}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="sidebar">
          <div className="info-card">
            <h3>Internship Details</h3>
            <div className="info-list">
              <div className="info-item">
                <MapPin size={18} />
                <span>{internship.location}</span>
              </div>
              <div className="info-item">
                <Calendar size={18} />
                <span>Start Date: {internship.batchStartDate}</span>
              </div>
              <div className="info-item">
                <Clock size={18} />
                <span>Duration: {internship.duration}</span>
              </div>
              <div className="info-item">
                <DollarSign size={18} />
                <span>Stipend: {internship.stipend}</span>
              </div>
              <div className="info-item">
                <Users size={18} />
                <span>Openings: {internship.openings}</span>
              </div>
              <div className="info-item">
                <Briefcase size={18} />
                <span>Type: {internship.internshipType}</span>
              </div>
            </div>
          </div>

          <div className="info-card">
            <h3>Important Dates</h3>
            <div className="date-list">
              <div className="date-item">
                <span>Application Deadline: </span>
                <strong>{internship.deadline}</strong>
              </div>
              <div className="date-item">
                <span>Start Date: </span>
                <strong>{internship.batchStartDate}</strong>
              </div>
              <div className="date-item">
                <span>End Date: </span>
                <strong>{internship.batchEndDate}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showApplyForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Apply for {internship.title}</h2>
            <form onSubmit={handleApply}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Education</label>
                <input
                  type="text"
                  value={formData.education}
                  onChange={(e) => setFormData({...formData, education: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Graduation Year</label>
                <input
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowApplyForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipDetails;