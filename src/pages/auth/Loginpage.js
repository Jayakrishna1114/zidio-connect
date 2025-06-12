import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const { loginUser, error } = useAuth();
  const [role, setRole] = useState('student');
  
  const initialValues = {
    email: '',
    password: ''
  };
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });
  
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
  try {
    const result = await loginUser(role, values);
    if (!result.success) {
      const errorMsg =
        typeof result.error === 'string'
          ? result.error
          : result.error?.message || 'Login failed';
      setStatus({ error: errorMsg });
    }
  } catch (err) {
    setStatus({ error: 'Failed to login. Please try again.' });
  } finally {
    setSubmitting(false);
  }
};

  
  return (
    <div className="auth-page login-page">
      <h1>Log In to Your Account</h1>
      <p className="auth-subtitle">Welcome back! Please login to your account.</p>
      
      <div className="role-tabs">
        <button
          className={`role-tab ${role === 'student' ? 'active' : ''}`}
          onClick={() => setRole('student')}
        >
          Student
        </button>
        <button
          className={`role-tab ${role === 'recruiter' ? 'active' : ''}`}
          onClick={() => setRole('recruiter')}
        >
          Recruiter
        </button>
        <button
          className={`role-tab ${role === 'admin' ? 'active' : ''}`}
          onClick={() => setRole('admin')}
        >
          Admin
        </button>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="auth-form">
            {status && status.error && (
              <div className="alert alert-error">{status.error}</div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
              </button>
            </div>
            
            <div className="auth-links">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;