import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getStudentApplications } from '../../services/studentService';
import { MapPin, Clock, DollarSign } from 'lucide-react';

const StudentApplications = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [internship] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getStudentApplications(currentUser.id);
        setApplications(data);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [currentUser.id]);

  if (loading) return <div>Loading...</div>;

  const statusColor = {
    selected: { background: '#d1f7dc', color: '#1e824c' },
    rejected: { background: '#f8d7da', color: '#c0392b' },
    pending:  { background: '#e2e3e5', color: '#6c757d' }
  };

  return (
    <div className="applications-page" style={{ padding: '20px' }}>
      <h1 style={{ fontWeight: '700', marginBottom: '30px', fontSize: '2rem', color: '#333' }}>
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="no-applications" style={{ fontSize: '1.2rem', color: '#666' }}>
          <p>You haven't applied to any internships yet.</p>
        </div>
      ) : (
        <div
          className="applications-grid"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
            justifyContent: 'flex-start',
          }}
        >
          {applications.map((application) => {
            const currentStatusStyle = statusColor[application.status.toLowerCase()] || {};

            return (
              <div
                key={application.id}
                style={{
                  backgroundColor: '#fff',
                  padding: '24px',
                  width: '320px',
                  borderRadius: '14px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
              >
                <img
                  src={`http://localhost:8081/api/recruiter/internship/${application.internship.id}/logo`}
                  alt="Company Logo"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '12px',
                    border: '2px solid #ddd',
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80';
                  }}
                />

                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    marginBottom: '12px',
                    textAlign: 'center',
                    color: '#222',
                    minHeight: '48px',
                  }}
                >
                  {application.internship?.title || 'Title N/A'}
                </h3>

                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: '12px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '20px',
                    userSelect: 'none',
                    ...currentStatusStyle,
                  }}
                >
                  {application.status}
                </span>

                <div style={{ width: '100%', fontSize: '0.9rem', color: '#555' }}>
                  <p style={{ marginBottom: '12px' }}>
                    <strong>Applied Date: </strong>
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginTop: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={18} />
                      <span>{application.internship?.location || 'Location N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={18} />
                      <span>{application.internship?.duration || 'Duration N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DollarSign size={18} />
                      <span>{application.internship?.stipend || 'Stipend N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentApplications;
