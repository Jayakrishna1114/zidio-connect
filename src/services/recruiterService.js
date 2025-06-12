import api from './api';

// Setup recruiter profile
export const setupRecruiterProfile = async (id, profileData, profileImage) => {
  const formData = new FormData();
  formData.append('recruiter', new Blob([JSON.stringify(profileData)], { type: 'application/json' }));
  
  if (profileImage) {
    formData.append('profileImage', profileImage);
  }
  
  const response = await api.post(`/recruiter/${id}/setup-profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response;
};

// Get recruiter profile
export const getRecruiterProfile = async (id) => {
  const response = await api.get(`/recruiter/${id}`);
  return response;
};

// Generate recruiter profile PDF
export const generateProfilePdf = async (id) => {
  const response = await api.get(`/recruiter/${id}/profile-pdf`);
  return response;
};

export const postInternship = async (recruiterId, internshipData, logoFile) => {
  const formData = new FormData();
  formData.append('internship', new Blob([JSON.stringify(internshipData)], { type: 'application/json' }));
  formData.append('logo', logoFile);

  const response = await api.post(`/recruiter/${recruiterId}/internships`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};


// Get recruiter internships
export const getRecruiterInternships = async (recruiterId) => {
  const response = await api.get(`/recruiter/${recruiterId}/internships`);
  return response;
};

// Get applicants for internship
export const getApplicantsForInternship = async (internshipId) => {
  const response = await api.get(`/application/internship/${internshipId}/applicants`);
  return response;
};

// Update application status
export const updateApplicationStatus = async (applicationId, status) => {
  const response = await api.put(`/application/${applicationId}/status`, { status });
  return response;
};