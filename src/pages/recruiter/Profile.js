import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { setupRecruiterProfile } from '../../services/recruiterService';

const RecruiterProfile = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    designation: '',
    companyWebsite: '',
    phoneNumber: '',
    linkedInProfile: '',
    address: '',
    industry: '',
    companyDescription: '',
    numberOfEmployees: '',
    headquartersLocation: '',
    foundedYear: '',
    companyType: '',
    twitterHandle: '',
    facebookPage: '',
    contactEmail: ''
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setupRecruiterProfile(currentUser.id, formData, profileImage);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div className="profile-page">
      <h1>Complete Company Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Logo</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
            placeholder="Your company name"
          />
        </div>

        <div className="form-group">
          <label>Your Designation</label>
          <input
            type="text"
            value={formData.designation}
            onChange={(e) => setFormData({...formData, designation: e.target.value})}
            placeholder="e.g., HR Manager"
          />
        </div>

        <div className="form-group">
          <label>Company Website</label>
          <input
            type="url"
            value={formData.companyWebsite}
            onChange={(e) => setFormData({...formData, companyWebsite: e.target.value})}
            placeholder="https://example.com"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
            placeholder="Your contact number"
          />
        </div>

        <div className="form-group">
          <label>LinkedIn Company Page</label>
          <input
            type="url"
            value={formData.linkedInProfile}
            onChange={(e) => setFormData({...formData, linkedInProfile: e.target.value})}
            placeholder="https://linkedin.com/company/name"
          />
        </div>

        <div className="form-group">
          <label>Company Address</label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="Full company address"
          />
        </div>

        <div className="form-group">
          <label>Industry</label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
            placeholder="e.g., Technology, Healthcare"
          />
        </div>

        <div className="form-group">
          <label>Company Description</label>
          <textarea
            value={formData.companyDescription}
            onChange={(e) => setFormData({...formData, companyDescription: e.target.value})}
            placeholder="Tell us about your company"
          />
        </div>

        <div className="form-group">
          <label>Number of Employees</label>
          <input
            type="number"
            value={formData.numberOfEmployees}
            onChange={(e) => setFormData({...formData, numberOfEmployees: e.target.value})}
            placeholder="e.g., 100"
          />
        </div>

        <div className="form-group">
          <label>Headquarters Location</label>
          <input
            type="text"
            value={formData.headquartersLocation}
            onChange={(e) => setFormData({...formData, headquartersLocation: e.target.value})}
            placeholder="City, Country"
          />
        </div>

        <div className="form-group">
          <label>Founded Year</label>
          <input
            type="text"
            value={formData.foundedYear}
            onChange={(e) => setFormData({...formData, foundedYear: e.target.value})}
            placeholder="e.g., 2010"
          />
        </div>

        <div className="form-group">
          <label>Company Type</label>
          <select
            value={formData.companyType}
            onChange={(e) => setFormData({...formData, companyType: e.target.value})}
          >
            <option value="">Select company type</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Startup">Startup</option>
          </select>
        </div>

        <div className="form-group">
          <label>Twitter Handle</label>
          <input
            type="text"
            value={formData.twitterHandle}
            onChange={(e) => setFormData({...formData, twitterHandle: e.target.value})}
            placeholder="@companyname"
          />
        </div>

        <div className="form-group">
          <label>Facebook Page</label>
          <input
            type="url"
            value={formData.facebookPage}
            onChange={(e) => setFormData({...formData, facebookPage: e.target.value})}
            placeholder="https://facebook.com/companyname"
          />
        </div>

        <div className="form-group">
          <label>Contact Email</label>
          <input
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
            placeholder="contact@company.com"
          />
        </div>

        <button type="submit" className="btn btn-primary">Save Profile</button>
      </form>
    </div>
  );
};

export default RecruiterProfile;