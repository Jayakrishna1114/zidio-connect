import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Check, X } from 'lucide-react';
import { getApplicantsForInternship, updateApplicationStatus } from '../../services/recruiterService';

const RecruiterApplications = () => {
  const { internshipId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, [internshipId]);

  const fetchApplications = async () => {
    try {
      const data = await getApplicantsForInternship(internshipId);
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    try {
      await updateApplicationStatus(applicationId, status);
      fetchApplications();
    } catch (error) {
      alert('Failed to update application status');
    }
  };

  // Styles
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
  };

  const titleStyles = {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '2rem',
  };

  const tableContainerStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  };

  const thStyles = {
    backgroundColor: '#f8fafc',
    color: '#475569',
    fontWeight: '600',
    padding: '1rem',
    textAlign: 'left',
    borderBottom: '1px solid #e2e8f0',
  };

  const tdStyles = {
    padding: '1rem',
    borderBottom: '1px solid #e2e8f0',
    color: '#1e293b',
  };

  const buttonBaseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
  };

  const viewResumeStyles = {
    ...buttonBaseStyles,
    backgroundColor: '#f1f5f9',
    color: '#475569',
  };

  const viewResumeHoverStyles = {
    backgroundColor: '#e2e8f0',
  };

  const selectButtonStyles = {
    ...buttonBaseStyles,
    backgroundColor: '#dcfce7',
    color: '#166534',
    marginRight: '0.5rem',
  };

  const selectButtonHoverStyles = {
    backgroundColor: '#bbf7d0',
  };

  const rejectButtonStyles = {
    ...buttonBaseStyles,
    backgroundColor: '#fee2e2',
    color: '#991b1b',
  };

  const rejectButtonHoverStyles = {
    backgroundColor: '#fecaca',
  };

  const statusBadgeStyles = (status) => ({
    display: 'inline-block',
    padding: '0.375rem 0.75rem',
    borderRadius: '9999px',
    fontWeight: '500',
    fontSize: '0.875rem',
    ...getStatusColors(status),
  });

  const getStatusColors = (status) => {
    switch (status) {
      case 'SELECTED':
        return {
          backgroundColor: '#dcfce7',
          color: '#166534',
        };
      case 'REJECTED':
        return {
          backgroundColor: '#fee2e2',
          color: '#991b1b',
        };
      default:
        return {
          backgroundColor: '#f1f5f9',
          color: '#475569',
        };
    }
  };

  const emptyStateStyles = {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  const loadingStyles = {
    ...emptyStateStyles,
    color: '#475569',
  };

  if (loading) {
    return (
      <div style={containerStyles}>
        <div style={loadingStyles}>Loading applications...</div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Applications</h1>
      
      {applications.length === 0 ? (
        <div style={emptyStateStyles}>
          <p style={{ color: '#475569', fontSize: '1.125rem' }}>
            No applications received yet.
          </p>
        </div>
      ) : (
        <div style={tableContainerStyles}>
          <table style={tableStyles}>
            <thead>
              <tr>
                <th style={thStyles}>Name</th>
                <th style={thStyles}>Education</th>
                <th style={thStyles}>Graduation Year</th>
                <th style={thStyles}>Applied Date</th>
                <th style={thStyles}>Resume</th>
                <th style={thStyles}>Status</th>
                <th style={thStyles}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(application => (
                <tr key={application.id}>
                  <td style={tdStyles}>{`${application.firstName} ${application.lastName}`}</td>
                  <td style={tdStyles}>{application.education}</td>
                  <td style={tdStyles}>{application.graduationYear}</td>
                  <td style={tdStyles}>
                    {new Date(application.appliedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td style={tdStyles}>
                    <a
                      href={application.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={viewResumeStyles}
                      onMouseOver={e => Object.assign(e.currentTarget.style, {...viewResumeStyles, ...viewResumeHoverStyles})}
                      onMouseOut={e => Object.assign(e.currentTarget.style, viewResumeStyles)}
                    >
                      <FileText size={16} />
                      View Resume
                    </a>
                  </td>
                  <td style={tdStyles}>
                    <span style={statusBadgeStyles(application.status)}>
                      {application.status}
                    </span>
                  </td>
                  <td style={tdStyles}>
                    {application.status === 'PENDING' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'SELECTED')}
                          style={selectButtonStyles}
                          onMouseOver={e => Object.assign(e.currentTarget.style, {...selectButtonStyles, ...selectButtonHoverStyles})}
                          onMouseOut={e => Object.assign(e.currentTarget.style, selectButtonStyles)}
                        >
                          <Check size={16} />
                          Select
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                          style={rejectButtonStyles}
                          onMouseOver={e => Object.assign(e.currentTarget.style, {...rejectButtonStyles, ...rejectButtonHoverStyles})}
                          onMouseOut={e => Object.assign(e.currentTarget.style, rejectButtonStyles)}
                        >
                          <X size={16} />
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecruiterApplications;