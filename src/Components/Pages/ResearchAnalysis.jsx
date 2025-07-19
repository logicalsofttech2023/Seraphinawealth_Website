import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import { FiDownload, FiX } from 'react-icons/fi';

const ResearchAnalysis = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [timeFilter, setTimeFilter] = useState('all'); // all, daily, weekly, monthly, yearly
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const fetchResearchDocs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}getAllResearchAnalysis`);
      if (res.data.success) {
        const docs = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
        setData(docs);
        setFilteredData(docs);
      }
    } catch (error) {
      console.error("Error fetching research documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchResearchDocs();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const now = new Date();
    let filtered = [];

    switch (timeFilter) {
      case 'daily':
        filtered = data.filter(item => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getDate() === now.getDate() &&
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;
      
      case 'weekly':
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        filtered = data.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate >= weekStart;
        });
        break;
      
      case 'monthly':
        filtered = data.filter(item => {
          const itemDate = new Date(item.createdAt);
          return (
            itemDate.getMonth() === now.getMonth() &&
            itemDate.getFullYear() === now.getFullYear()
          );
        });
        break;
      
      case 'yearly':
        filtered = data.filter(item => {
          const itemDate = new Date(item.createdAt);
          return itemDate.getFullYear() === now.getFullYear();
        });
        break;
      
      default:
        filtered = [...data];
    }

    setFilteredData(filtered);
  }, [timeFilter, data]);

  const renderDescription = (htmlContent) => {
    return { __html: htmlContent };
  };

  const handlePdfClick = (pdfUrl) => {
    setPdfLoading(true);
    setSelectedDoc(pdfUrl);
    setShowPdfViewer(true);
  };

  const closePdfViewer = () => {
    setShowPdfViewer(false);
    setPdfLoading(false);
  };

  const handleDownloadPdf = (pdfUrl) => {
    window.open(`${import.meta.env.VITE_FILE_URL}${pdfUrl}`, '_blank');
  };

  const fileUrl = import.meta.env.VITE_FILE_URL;

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Skeleton variant="text" width={200} height={40} />
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Skeleton variant="rounded" width={60} height={36} />
            <Skeleton variant="rounded" width={70} height={36} />
            <Skeleton variant="rounded" width={80} height={36} />
            <Skeleton variant="rounded" width={90} height={36} />
            <Skeleton variant="rounded" width={80} height={36} />
          </Box>
        </Box>
        
        {/* Document list skeletons */}
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ mb: 3, p: 3, border: '1px solid #e2e8f0', borderRadius: 1, bgcolor: 'white' }}>
            <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="100%" height={20} sx={{ mb: 0.5 }} />
            <Skeleton variant="text" width="40%" height={20} sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Skeleton variant="rounded" width={100} height={36} />
              <Skeleton variant="rounded" width={100} height={36} />
            </Box>
          </Box>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* PDF Viewer Modal */}
      {showPdfViewer && selectedDoc && (
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
              {selectedDoc.split('/').pop()}
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleDownloadPdf(selectedDoc)}
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
              src={`${fileUrl}${selectedDoc}`} 
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#2d3748', margin: 0 }}>
          Research Analysis
        </h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setTimeFilter('all')}
            style={{
              background: timeFilter === 'all' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
              color: timeFilter === 'all' ? 'white' : '#2d3748',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            All
          </button>
          <button
            onClick={() => setTimeFilter('daily')}
            style={{
              background: timeFilter === 'daily' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
              color: timeFilter === 'daily' ? 'white' : '#2d3748',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeFilter('weekly')}
            style={{
              background: timeFilter === 'weekly' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
              color: timeFilter === 'weekly' ? 'white' : '#2d3748',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeFilter('monthly')}
            style={{
              background: timeFilter === 'monthly' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
              color: timeFilter === 'monthly' ? 'white' : '#2d3748',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeFilter('yearly')}
            style={{
              background: timeFilter === 'yearly' ? 'linear-gradient(135deg, #00833D, #000000)' : '#edf2f7',
              color: timeFilter === 'yearly' ? 'white' : '#2d3748',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'all 0.2s ease',
            }}
          >
            Yearly
          </button>
        </div>
      </div>

      {filteredData.length === 0 ? (
        <p style={{ 
          textAlign: 'center', 
          color: '#718096', 
          padding: '2rem', 
          backgroundColor: '#f8fafc', 
          borderRadius: '0.5rem',
          marginTop: '1rem'
        }}>
          No research analysis documents found for this time period.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredData.map((item) => (
            <div
              key={item._id}
              style={{
                border: '1px solid #e2e8f0',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                backgroundColor: 'white',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1a202c', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>

              <div
                dangerouslySetInnerHTML={renderDescription(item.description)}
                style={{ color: '#4a5568', lineHeight: '1.5', marginBottom: '1rem' }}
              />

              <p style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '1rem' }}>
                Uploaded on: {new Date(item.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>

              {/* Render document links */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {item.documents?.map((doc, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePdfClick(doc)}
                    style={{
                      background: '#edf2f7',
                      color: '#2d3748',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span>Document {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResearchAnalysis;