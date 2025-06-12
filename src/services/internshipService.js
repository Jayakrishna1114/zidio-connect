import api from './api';
import axios  from 'axios';

// Get all internships
export const getAllInternships = async () => {
  const response = await api.get('/recruiter/public/internships');
  return response;
};

// Search internships
export const searchInternships = async (keyword) => {
  const response = await api.get(`/recruiter/public/internships/search?q=${keyword}`);
  return response;
};

// Get internship by ID
export const getInternshipById = async (id) => {
  const response = await api.get(`/recruiter/public/internships/${id}`);
  return response;
};

export const saveInternship = async (studentId, internshipId) => {
  return axios.post(`http://localhost:8081/api/student/${studentId}/internships/${internshipId}/save`);
};

export const unsaveInternship = async (studentId, internshipId) => {
  return axios.delete(`http://localhost:8081/api/student/${studentId}/internships/${internshipId}/unsave`);
};