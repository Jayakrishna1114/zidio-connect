import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { postInternship } from '../../services/recruiterService';

const PostInternship = () => {
  const { currentUser } = useAuth();
  const [internshipLogo, setInternshipLogo] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skillsRequired: '',
    duration: '',
    stipend: '',
    deadline: '',
    batchStartDate: '',
    batchEndDate: '',
    internshipType: '',
    perks: '',
    isPartTimeAllowed: false,
    openings: 1,
    applicationProcess: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       const data = new FormData();

      // Append text fields
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      // Append file
      if (internshipLogo) {
        data.append('internshipLogo', internshipLogo);
      }
      await postInternship(currentUser.id, formData, internshipLogo);
      alert('Internship posted successfully!');
      navigate('/recruiter/internships');
    } catch (error) {
      alert('Failed to post internship');
    }
  };

  return (
    <div className="post-internship">
      <h1>Post New Internship</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Internship Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="e.g., Software Development Intern"
            required
          />
        </div>
       <div className="form-group">
          <label>Internship Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setInternshipLogo(e.target.files[0])}
            required
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Detailed description of the internship"
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            placeholder="e.g., New York, NY"
            required
          />
        </div>

        <div className="form-group">
          <label>Required Skills</label>
          <input
            type="text"
            value={formData.skillsRequired}
            onChange={(e) => setFormData({...formData, skillsRequired: e.target.value})}
            placeholder="e.g., JavaScript, React, Node.js"
            required
          />
        </div>

        <div className="form-group">
          <label>Duration</label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({...formData, duration: e.target.value})}
            placeholder="e.g., 3 months"
            required
          />
        </div>

        <div className="form-group">
          <label>Stipend</label>
          <input
            type="text"
            value={formData.stipend}
            onChange={(e) => setFormData({...formData, stipend: e.target.value})}
            placeholder="e.g., $1000/month"
            required
          />
        </div>

        <div className="form-group">
          <label>Application Deadline</label>
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Batch Start Date</label>
          <input
            type="date"
            value={formData.batchStartDate}
            onChange={(e) => setFormData({...formData, batchStartDate: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Batch End Date</label>
          <input
            type="date"
            value={formData.batchEndDate}
            onChange={(e) => setFormData({...formData, batchEndDate: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Internship Type</label>
          <select
            value={formData.internshipType}
            onChange={(e) => setFormData({...formData, internshipType: e.target.value})}
            required
          >
            <option value="">Select type</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="form-group">
          <label>Perks</label>
          <input
            type="text"
            value={formData.perks}
            onChange={(e) => setFormData({...formData, perks: e.target.value})}
            placeholder="e.g., Certificate, Letter of Recommendation"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={formData.isPartTimeAllowed}
              onChange={(e) => setFormData({...formData, isPartTimeAllowed: e.target.checked})}
            />
            Part-time Allowed
          </label>
        </div>

        <div className="form-group">
          <label>Number of Openings</label>
          <input
            type="number"
            value={formData.openings}
            onChange={(e) => setFormData({...formData, openings: parseInt(e.target.value)})}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Application Process</label>
          <input
            type="text"
            value={formData.applicationProcess}
            onChange={(e) => setFormData({...formData, applicationProcess: e.target.value})}
            placeholder="e.g., Resume Screening > Interview"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Post Internship</button>
      </form>
    </div>
  );
};

export default PostInternship;