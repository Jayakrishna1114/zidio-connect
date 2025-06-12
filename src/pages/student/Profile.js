import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { setupStudentProfile } from '../../services/studentService';

const StudentProfile = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    bio: '',
    skills: '',
    education: '',
    projects: '',
    certifications: '',
    githubProfile: '',
    linkedinProfile: '',
    phoneNumber: '',
    graduationYear: '',
    university: ''
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setupStudentProfile(currentUser.id, formData, profileImage);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Profile Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({...formData, bio: e.target.value})}
            placeholder="Tell us about yourself"
          />
        </div>

        <div className="form-group">
          <label>Skills</label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
            placeholder="e.g., JavaScript, React, Node.js"
          />
        </div>

        <div className="form-group">
          <label>Education</label>
          <textarea
            value={formData.education}
            onChange={(e) => setFormData({...formData, education: e.target.value})}
            placeholder="Your educational background"
          />
        </div>

        <div className="form-group">
          <label>Projects</label>
          <textarea
            value={formData.projects}
            onChange={(e) => setFormData({...formData, projects: e.target.value})}
            placeholder="Describe your projects"
          />
        </div>

        <div className="form-group">
          <label>Certifications</label>
          <textarea
            value={formData.certifications}
            onChange={(e) => setFormData({...formData, certifications: e.target.value})}
            placeholder="List your certifications"
          />
        </div>

        <div className="form-group">
          <label>GitHub Profile</label>
          <input
            type="url"
            value={formData.githubProfile}
            onChange={(e) => setFormData({...formData, githubProfile: e.target.value})}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="form-group">
          <label>LinkedIn Profile</label>
          <input
            type="url"
            value={formData.linkedinProfile}
            onChange={(e) => setFormData({...formData, linkedinProfile: e.target.value})}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            placeholder="Your phone number"
          />
        </div>

        <div className="form-group">
          <label>Graduation Year</label>
          <input
            type="number"
            value={formData.graduationYear}
            onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
            placeholder="Expected graduation year"
          />
        </div>

        <div className="form-group">
          <label>University</label>
          <input
            type="text"
            value={formData.university}
            onChange={(e) => setFormData({...formData, university: e.target.value})}
            placeholder="Your university name"
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Profile</button>
      </form>
    </div>
  );
};

export default StudentProfile;