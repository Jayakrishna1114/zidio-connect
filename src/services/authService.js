// authService.js
import api from './api';
import axios from 'axios';

/// authService.js
export const login = async (role, credentials) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/api/auth/${role}/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
     
    );

    if (response.status === 200) {
      return response.data; // response is like { message, userId }
    } else {
      throw new Error('Login failed');
    }
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message || 'Login failed');
  }
};



// Registration service
export const registerUser = async (role, userData) => {
  try {
    const response = await axios.post(`http://localhost:8081/api/auth/${role}/register`, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    if (response.status === 200 || response.status === 201) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: `Registration failed with status ${response.status}` };
    }
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || err.message || 'Internal server error',
    };
  }
};
