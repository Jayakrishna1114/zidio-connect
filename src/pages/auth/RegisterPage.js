import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const { registerUser, error } = useAuth();
  const [role, setRole] = useState('student');
  
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required')
  });
  
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const { confirmPassword, ...userData } = values;
      const result = await registerUser(role, userData);
      if (!result.success) {
        setStatus({ error: result.error });
      }
    } catch (err) {
      setStatus({ error: 'Failed to register. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="auth-page register-page">
      <h1>Create an Account</h1>
      <p className="auth-subtitle">Join Zidio Connect and unlock your career potential.</p>
      
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
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="auth-form">
            {status && status.error && (
  <div className="alert alert-error">
    {typeof status.error === 'string' ? status.error : status.error.message || 'An unexpected error occurred.'}
  </div>
)}

            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            
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
                placeholder="Create a password"
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>
            
            <div className="form-footer">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
            
            <div className="auth-links">
              <p>
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterPage;