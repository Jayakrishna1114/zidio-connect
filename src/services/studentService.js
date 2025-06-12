import api from './api';

// Setup student profile
export const setupStudentProfile = async (id, profileData, profileImage) => {
  const formData = new FormData();
  formData.append('student', new Blob([JSON.stringify(profileData)], { type: 'application/json' }));
  formData.append('profileImage', profileImage);
  
  const response = await api.post(`/student/${id}/setup-profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response;
};

// Get student profile
export const getStudentProfile = async (id) => {
  const response = await api.get(`/student/${id}`);
  return response;
};

// Apply for internship
export const applyForInternship = async (studentId, internshipId, applicationData, resumeFile) => {
  const formData = new FormData();
  
  // Add all application data as form fields
  for (const key in applicationData) {
    formData.append(key, applicationData[key]);
  }
  
  // Add resume file
  formData.append('resume', resumeFile);
  
  const response = await api.post(`/application/${studentId}/apply/${internshipId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response;
};

// Get student applications
export const getStudentApplications = async (studentId) => {
  const response = await api.get(`/application/status/${studentId}`);
  return response;
};