import React, { useState, useEffect } from "react";
import { FiPlus, FiArrowRight, FiSearch, FiX, FiDownload } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResearchAnalysis = () => {
  const navigate = useNavigate();
  const [researchData, setResearchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [timeFilter, setTimeFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchResearchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}getResearchByUserPlan`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.data.success) {
          setResearchData(response.data.data);
          setFilteredData(response.data.data);
        } else {
          setError("Failed to fetch research data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchResearchData();
  }, []);

  useEffect(() => {
    if (researchData.length === 0) return;

    let filtered = [...researchData];
    const now = new Date();

    // Apply time filter
    switch (timeFilter) {
      case "daily":
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "weekly":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        filtered = filtered.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= weekStart;
        });
        break;

      case "monthly":
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;

      case "yearly":
        filtered = filtered.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate.getFullYear() === now.getFullYear();
        });
        break;

      default:
        break;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.documents && item.documents.some(doc => doc.toLowerCase().includes(query)))
      );
    }

    setFilteredData(filtered);
  }, [timeFilter, researchData, searchQuery]);

  const handlePdfClick = (pdfUrl, e) => {
    e.stopPropagation();
    setPdfLoading(true);
    setSelectedPdf(pdfUrl);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
    setPdfLoading(false);
  };

  const handleDownloadPdf = (pdfUrl, e) => {
    e.stopPropagation();
    window.open(`${import.meta.env.VITE_FILE_URL}${pdfUrl}`, '_blank');
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const truncateText = (text, limit = 150) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div style={{ 
        padding: '24px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              padding: '20px',
              height: '140px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{
                width: '60%',
                height: '24px',
                backgroundColor: '#e9ecef',
                borderRadius: '6px',
                animation: 'pulse 1.5s infinite'
              }}></div>
              <div style={{
                width: '100%',
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '6px',
                animation: 'pulse 1.5s infinite',
                animationDelay: '0.2s'
              }}></div>
              <div style={{
                width: '80%',
                height: '16px',
                backgroundColor: '#e9ecef',
                borderRadius: '6px',
                animation: 'pulse 1.5s infinite',
                animationDelay: '0.4s'
              }}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '24px',
        backgroundColor: '#fff8f8',
        border: '1px solid #ffebee',
        borderRadius: '8px',
        color: '#d32f2f',
        maxWidth: '1200px',
        margin: '24px auto',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '8px' }}>Error Loading Research Data</h3>
        <p style={{ color: '#5f2120' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '12px',
            padding: '8px 16px',
            backgroundColor: '#d32f2f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const fileUrl = import.meta.env.VITE_FILE_URL;

  return (
    <div style={{ 
      maxWidth: '1200px',
      margin: '0 auto',
      
    }}>
      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            padding: '12px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '8px'
          }}>
            <span style={{ 
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '70%'
            }}>
              {selectedPdf.split('/').pop()}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={(e) => handleDownloadPdf(selectedPdf, e)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FiDownload size={16} />
                <span>Download</span>
              </button>
              <button 
                onClick={closePdfViewer}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  ':hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FiX size={16} />
                <span>Close</span>
              </button>
            </div>
          </div>
          <div style={{ 
            backgroundColor: '#fff',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '1200px',
            height: 'calc(100% - 60px)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {pdfLoading && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255,255,255,0.8)'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '4px solid rgba(0,0,0,0.1)',
                  borderTopColor: '#00833D',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
              </div>
            )}
            <iframe 
              src={`${fileUrl}${selectedPdf}`} 
              title="PDF Viewer"
              style={{ 
                width: '100%',
                height: '100%',
                border: 'none',
                visibility: pdfLoading ? 'hidden' : 'visible'
              }}
              onLoad={() => setPdfLoading(false)}
            ></iframe>
          </div>
        </div>
      )}

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        marginBottom: '24px'
      }}>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: '600',
                color: '#2d3748',
                lineHeight: '1.3'
              }}>
                Research Analysis
              </h1>
              <p style={{
                margin: '4px 0 0',
                fontSize: '14px',
                color: '#718096'
              }}>
                {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{
                position: 'relative',
                minWidth: '240px'
              }}>
                <FiSearch style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#a0aec0',
                  zIndex: 1
                }} />
                <input
                  type="text"
                  placeholder="Search research..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: '10px 16px 10px 36px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    width: '100%',
                    transition: 'all 0.2s ease',
                    backgroundColor: '#f8fafc',
                    ':focus': {
                      outline: 'none',
                      borderColor: '#00833D',
                      boxShadow: '0 0 0 3px rgba(0, 131, 61, 0.1)',
                      backgroundColor: '#fff'
                    }
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setTimeFilter('all')}
                  style={{
                    background: timeFilter === 'all' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
                    color: timeFilter === 'all' ? '#fff' : '#4a5568',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ':hover': {
                      backgroundColor: timeFilter === 'all' ? '#004d26' : '#e2e8f0'
                    }
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setTimeFilter('daily')}
                  style={{
                    background: timeFilter === 'daily' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
                    color: timeFilter === 'daily' ? '#fff' : '#4a5568',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ':hover': {
                      backgroundColor: timeFilter === 'daily' ? '#004d26' : '#e2e8f0'
                    }
                  }}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeFilter('weekly')}
                  style={{
                    background: timeFilter === 'weekly' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
                    color: timeFilter === 'weekly' ? '#fff' : '#4a5568',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ':hover': {
                      backgroundColor: timeFilter === 'weekly' ? '#004d26' : '#e2e8f0'
                    }
                  }}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setTimeFilter('monthly')}
                  style={{
                    background: timeFilter === 'monthly' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
                    color: timeFilter === 'monthly' ? '#fff' : '#4a5568',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ':hover': {
                      backgroundColor: timeFilter === 'monthly' ? '#004d26' : '#e2e8f0'
                    }
                  }}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setTimeFilter('yearly')}
                  style={{
                    background: timeFilter === 'yearly' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
                    color: timeFilter === 'yearly' ? '#fff' : '#4a5568',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    ':hover': {
                      backgroundColor: timeFilter === 'yearly' ? '#004d26' : '#e2e8f0'
                    }
                  }}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>

          {filteredData.length > 0 ? (
            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              {filteredData.map((research) => (
                <div 
                  key={research._id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      borderColor: '#cbd5e0'
                    }
                  }}
                >
                  <div style={{ padding: '20px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px',
                      gap: '12px',
                      flexWrap: 'wrap'
                    }}>
                      <h3 style={{
                        margin: '0 0 8px 0',
                        fontSize: '18px',
                        fontWeight: '600',
                        color: '#00833D',
                        flex: 1,
                        minWidth: '200px'
                      }}>
                        {research.title || 'Untitled Research'}
                      </h3>
                      <span style={{
                        fontSize: '14px',
                        color: '#718096',
                        fontWeight: '500',
                        whiteSpace: 'nowrap'
                      }}>
                        {formatDate(research.createdAt)}
                      </span>
                    </div>
                    
                    <div 
                      style={{
                        color: '#4a5568',
                        fontSize: '15px',
                        lineHeight: '1.6',
                        marginBottom: '16px'
                      }}
                    >
                      {research.description ? (
                        <>
                          <div 
                            dangerouslySetInnerHTML={{ 
                              __html: expandedDescriptions[research._id] 
                                ? research.description 
                                : truncateText(research.description.replace(/<[^>]*>/g, ''), 200)
                            }} 
                            style={{
                              wordBreak: 'break-word'
                            }}
                          />
                          {research.description.length > 200 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDescription(research._id);
                              }}
                              style={{
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: '#3182ce',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '4px 0',
                                marginTop: '8px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                fontWeight: '500',
                                transition: 'color 0.2s',
                                ':hover': {
                                  color: '#2c5282'
                                }
                              }}
                            >
                              {expandedDescriptions[research._id] ? 'Show less' : 'Read more'}
                              <FiArrowRight 
                                size={14} 
                                style={{
                                  marginLeft: '6px',
                                  transform: expandedDescriptions[research._id] ? 'rotate(90deg)' : 'rotate(0deg)',
                                  transition: 'transform 0.2s ease'
                                }} 
                              />
                            </button>
                          )}
                        </>
                      ) : (
                        <span style={{ 
                          color: '#a0aec0', 
                          fontStyle: 'italic',
                          fontSize: '14px'
                        }}>
                          No description provided
                        </span>
                      )}
                    </div>
                    
                    {research.documents && research.documents.length > 0 && (
                      <div style={{ 
                        marginTop: '16px',
                        paddingTop: '16px',
                        borderTop: '1px solid #edf2f7'
                      }}>
                        <p style={{
                          color: '#00833D',
                          fontSize: '14px',
                          marginBottom: '12px',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <span>Attachments</span>
                          <span style={{
                            backgroundColor: '#e2e8f0',
                            borderRadius: '9999px',
                            padding: '2px 8px',
                            fontSize: '12px',
                            color: '#00833D'
                          }}>
                            {research.documents.length}
                          </span>
                        </p>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px'
                        }}>
                          {research.documents.map((doc, index) => (
                            <div key={index} style={{
                              background: 'linear-gradient(135deg, #00833D, #000000)',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              border: '1px solid #e2e8f0',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              transition: 'all 0.2s',
                              ':hover': {
                                backgroundColor: '#edf2f7'
                              }
                            }}>
                              {doc.endsWith('.pdf') ? (
                                <button
                                  onClick={(e) => handlePdfClick(doc, e)}
                                  style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    padding: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    textAlign: 'left'
                                  }}
                                  title={doc.split('/').pop()}
                                >
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: '#ebf8ff',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#3182ce'
                                  }}>
                                    <FiSearch size={16} />
                                  </div>
                                  <span style={{
                                    maxWidth: '200px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {doc.split('/').pop()}
                                  </span>
                                </button>
                              ) : (
                                <a 
                                  href={`${fileUrl}${doc}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  style={{
                                    color: '#3182ce',
                                    textDecoration: 'none',
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                  title={doc.split('/').pop()}
                                >
                                  <div style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: '#ebf8ff',
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#3182ce'
                                  }}>
                                    <FiDownload size={16} />
                                  </div>
                                  <span style={{
                                    maxWidth: '200px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                  }}>
                                    {doc.split('/').pop()}
                                  </span>
                                </a>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px 24px',
              backgroundColor: '#f8fafc',
              borderRadius: '12px',
              border: '1px dashed #e2e8f0',
              marginTop: '24px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 16px',
                backgroundColor: '#edf2f7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#a0aec0'
              }}>
                <FiSearch size={32} />
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                {searchQuery ? 
                  'No matching research found' : 
                  'No research analysis available'}
              </h3>
              <p style={{
                color: '#718096',
                fontSize: '14px',
                maxWidth: '400px',
                margin: '0 auto'
              }}>
                {searchQuery ? 
                  'Try adjusting your search or filter criteria' : 
                  `No research data found for the ${timeFilter} time period`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchAnalysis;