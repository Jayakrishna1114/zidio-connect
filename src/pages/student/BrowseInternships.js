import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllInternships, searchInternships } from '../../services/internshipService';
import { saveInternship, unsaveInternship } from '../../services/internshipService';
import { MapPin, Clock, DollarSign, Bookmark } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const styles = {
  searchSection: {
    flex:10,
     maxWidth: '100%',
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start', // Align content to left
  
    padding: '0 1rem'

  },
  searchForm: {
    display: 'flex',
    width: '100%',
    maxWidth: '600px',
  },
  searchInput: {
   flex: 1,
    padding: '0.6rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '4px 0 0 4px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  searchInputFocus: {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0,123,255,0.5)',
  },
  searchButton: {
    padding: '0 1.5rem',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'background-color 0.3s ease',
  },
  searchButtonHover: {
    backgroundColor: '#0056b3',
  },
  internshipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1.8rem',
    padding: '0 1rem',
  },
  internshipCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    boxShadow: '0 4px 10px rgb(0 0 0 / 0.1)',
    padding: '1.4rem 1.6rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  internshipCardHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 8px 20px rgb(0 0 0 / 0.15)',
  },
  internshipHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  searchTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textAlign: 'left',
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1.5px solid #ddd',
  },
  bookmarkBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    transition: 'color 0.3s ease',
  },
  bookmarkBtnHover: {
    color: '#007bff',
  },
  internshipTitle: {
    fontSize: '1.25rem',
    marginBottom: '0.3rem',
    fontWeight: 700,
    color: '#222',
  },
  companyName: {
    fontSize: '0.9rem',
    color: '#555',
    marginBottom: '1rem',
  },
  internshipDetails: {
    display: 'flex',
    gap: '1.5rem',
    color: '#555',
    marginBottom: '1rem',
  },
  detail: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.875rem',
  },
  skillsRequired: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.6rem',
    marginBottom: '1rem',
  },
  skillTag: {
    backgroundColor: '#e6f0ff',
    color: '#007bff',
    padding: '0.25rem 0.75rem',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: 600,
    userSelect: 'none',
  },
  internshipFooter: {
    textAlign: 'right',
  },
  btnOutline: {
    border: '1.5px solid #007bff',
    color: '#007bff',
    padding: '0.5rem 1.1rem',
    borderRadius: 6,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'transparent',
  },
};

const BrowseInternships = () => {
  const { currentUser } = useAuth();
const studentId = currentUser?.id;

  const [internships, setInternships] = useState([]);
  const [bookmarkedInternships, setBookmarkedInternships] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [bookmarkHoverIndex, setBookmarkHoverIndex] = useState(null);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
  try {
    const data = await getAllInternships();
    console.log("Fetched internships:", data);

    const internshipsArray = Array.isArray(data)
      ? data
      : Array.isArray(data?.internships)
      ? data.internships
      : [];

    setInternships(internshipsArray);
  } catch (error) {
    console.error('Failed to fetch internships:', error);
    setInternships([]); // fallback
  } finally {
    setLoading(false);
  }
};

  const toggleBookmark = async (internshipId) => {
  const isBookmarked = bookmarkedInternships.has(internshipId);
  try {
    if (isBookmarked) {
      await unsaveInternship(studentId, internshipId);
      setBookmarkedInternships((prev) => {
        const newSet = new Set(prev);
        newSet.delete(internshipId);
        return newSet;
      });
    } else {
      await saveInternship(studentId, internshipId);
      setBookmarkedInternships((prev) => new Set(prev).add(internshipId));
    }
  } catch (error) {
    console.error('Bookmark toggle failed:', error);
  }
};


  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchInternships(searchQuery);
      setInternships(data);
    } catch (error) {
      console.error('Failed to search internships:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="browse-internships">
      <div style={styles.searchSection}>
        <h1>Find Your Perfect Internship</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, company, or skills..."
            style={{
              ...styles.searchInput,
              ...(inputFocused ? styles.searchInputFocus : {}),
            }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
          />
          <button
            type="submit"
            style={styles.searchButton}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
          >
            Search
          </button>
        </form>
      </div>

      <div style={styles.internshipsGrid}>
        {internships.map((internship, index) => {
          return (
            <div
              key={internship.id}
              style={{
                ...styles.internshipCard,
                ...(bookmarkHoverIndex === index ? styles.internshipCardHover : {}),
              }}
              onMouseEnter={() => setBookmarkHoverIndex(index)}
              onMouseLeave={() => setBookmarkHoverIndex(null)}
            >
              <div style={styles.internshipHeader}>
                <img
  src={`http://localhost:8081/api/recruiter/internship/${internship.id}/logo`}
  alt="Internship Logo"
  style={styles.companyLogo}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/50';
  }}
/>

                <button
  style={{
    ...styles.bookmarkBtn,
    ...(bookmarkHoverIndex === index || bookmarkedInternships.has(internship.id)
      ? styles.bookmarkBtnHover
      : {}),
  }}
  aria-label="Bookmark internship"
  onClick={() => toggleBookmark(internship.id)}
>
  <Bookmark
    size={20}
    fill={bookmarkedInternships.has(internship.id) ? '#007bff' : 'none'}
  />
</button>

              </div>

              <div className="internship-body">
                <h3 style={styles.internshipTitle}>{internship.title}</h3>
                <p style={styles.companyName}>{internship.companyName}</p>

                <div style={styles.internshipDetails}>
                  <div style={styles.detail}>
                    <MapPin size={16} />
                    <span>{internship.location}</span>
                  </div>
                  <div style={styles.detail}>
                    <Clock size={16} />
                    <span>{internship.duration}</span>
                  </div>
                  <div style={styles.detail}>
                    <DollarSign size={16} />
                    <span>{internship.stipend}</span>
                  </div>
                </div>

                <div style={styles.skillsRequired}>
                  {internship.skillsRequired.split(',').map((skill, idx) => (
                    <span key={idx} style={styles.skillTag}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.internshipFooter}>
                <Link to={`/internships/${internship.id}`} style={styles.btnOutline}>
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseInternships;
