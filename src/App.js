import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';


// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Pages
import LoginPage from './pages/auth/Loginpage';
import RegisterPage from './pages/auth/RegisterPage';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentProfile from './pages/student/Profile';
import StudentApplications from './pages/student/Applications';
import BrowseInternships from './pages/student/BrowseInternships';
import InternshipDetails from './pages/student/InternshipDetails';

// Recruiter Pages
import RecruiterDashboard from './pages/recruiter/Dashboard';
import RecruiterProfile from './pages/recruiter/Profile';
import RecruiterInternships from './pages/recruiter/Internships';
import RecruiterApplications from './pages/recruiter/Applications';
import PostInternship from './pages/recruiter/PostInternship';
import SavedInternships from './pages/student/SavedInternships';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="internships" element={<BrowseInternships />} />
        <Route path="internships/:id" element={<InternshipDetails />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      
      {/* Auth Routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      
      {/* Student Routes */}
      <Route path="/student" element={
        <ProtectedRoute allowedRoles={['STUDENT']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="applications" element={<StudentApplications />} />
        <Route path="saved-internships" element={<SavedInternships />} />
      </Route>
      
      {/* Recruiter Routes */}
      <Route path="/recruiter" element={
        <ProtectedRoute allowedRoles={['RECRUITER']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<RecruiterDashboard />} />
        <Route path="profile" element={<RecruiterProfile />} />
        <Route path="internships" element={<RecruiterInternships />} />
        <Route path="post-internship" element={<PostInternship />} />
        <Route path="applications/:internshipId" element={<RecruiterApplications />} />
      </Route>
      
      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>
     

    </Routes>
  );
}

export default App;