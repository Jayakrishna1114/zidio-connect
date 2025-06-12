import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, registerUser as register } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check for user in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginUser = async (role, credentials) => {
  try {
    setLoading(true);
    setError('');

    const response = await login(role, credentials);

    if (response.userId) {
      const user = {
        id: response.userId,
        email: credentials.email,
        role: role.toUpperCase(),
      };

      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate(`/${role.toLowerCase()}`);
      return { success: true };
    } else {
      throw new Error('Invalid login response');
    }
  } catch (err) {
    setError(err.response?.data || err.message || 'Failed to login');
    return {
      success: false,
      error: err.response?.data || err.message || 'Failed to login',
    };
  } finally {
    setLoading(false);
  }
};


  // Register function
  const registerUser = async (role, userData) => {
    try {
      setLoading(true);
      setError('');
      const response = await register(role, userData);

if (response.success && response.data?.userId) {
  const user = {
    id: response.data.userId,
    name: userData.name,
    email: userData.email,
    role: role.toUpperCase(),
  };

  setCurrentUser(user);
  localStorage.setItem('user', JSON.stringify(user));

  navigate(`/${role.toLowerCase()}`);
  return { success: true };
} else {
  throw new Error(response.error || 'Failed to register');
}

    } catch (err) {
      setError(err.message || 'Failed to register');
      return {
        success: false,
        error: err.message || 'Failed to register',
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const value = {
    currentUser,
    loading,
    error,
    loginUser,
    registerUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
