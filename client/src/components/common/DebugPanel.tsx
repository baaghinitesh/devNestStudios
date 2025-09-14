import React from 'react';
import styled from 'styled-components';
import { useServices } from '../../hooks/useServices';
import { useTestimonials } from '../../hooks/useTestimonials';

const DebugWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #000;
  color: #fff;
  padding: 1rem;
  border-radius: 8px;
  font-size: 12px;
  max-width: 300px;
  z-index: 9999;
  font-family: monospace;
`;

const DebugSection = styled.div`
  margin-bottom: 1rem;
  
  h4 {
    color: #00ff00;
    margin-bottom: 0.5rem;
  }
  
  .loading { color: #ffff00; }
  .error { color: #ff0000; }
  .success { color: #00ff00; }
`;

const DebugPanel: React.FC = () => {
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useTestimonials({ featured: true });

  // Enhanced console logging
  React.useEffect(() => {
    console.log('🚀 DEBUG PANEL UPDATE:', {
      timestamp: new Date().toISOString(),
      services: {
        count: services?.length || 0,
        loading: servicesLoading,
        error: servicesError,
        data: services
      },
      testimonials: {
        count: testimonials?.length || 0,
        loading: testimonialsLoading,
        error: testimonialsError,
        data: testimonials
      }
    });
  }, [services, testimonials, servicesLoading, testimonialsLoading, servicesError, testimonialsError]);

  return (
    <DebugWrapper>
      <DebugSection>
        <h4>🔧 Debug Panel</h4>
      </DebugSection>
      
      <DebugSection>
        <h4>📊 Services</h4>
        <div className={servicesLoading ? 'loading' : servicesError ? 'error' : 'success'}>
          Loading: {servicesLoading ? 'YES' : 'NO'}<br />
          Error: {servicesError || 'None'}<br />
          Count: {services?.length || 0}<br />
          First: {services?.[0]?.title || 'None'}
        </div>
      </DebugSection>

      <DebugSection>
        <h4>💬 Testimonials</h4>
        <div className={testimonialsLoading ? 'loading' : testimonialsError ? 'error' : 'success'}>
          Loading: {testimonialsLoading ? 'YES' : 'NO'}<br />
          Error: {testimonialsError || 'None'}<br />
          Count: {testimonials?.length || 0}<br />
          First: {testimonials?.[0]?.clientName || 'None'}
        </div>
      </DebugSection>

      <DebugSection>
        <h4>🌐 API Base</h4>
        <div>
          NODE_ENV: {process.env.NODE_ENV}<br />
          API_URL: {process.env.REACT_APP_API_URL || '/api'}
        </div>
      </DebugSection>
    </DebugWrapper>
  );
};

export default DebugPanel;