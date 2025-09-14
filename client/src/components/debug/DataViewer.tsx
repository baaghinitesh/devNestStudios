import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const DebugWrapper = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  background: #000;
  color: #00ff00;
  padding: 1rem;
  border-radius: 8px;
  font-family: monospace;
  font-size: 12px;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 10000;
  border: 2px solid #00ff00;
`;

interface ApiData {
  services?: any[];
  testimonials?: any[];
  loading: boolean;
  error?: string;
}

const DataViewer: React.FC = () => {
  const [data, setData] = useState<ApiData>({ loading: true });

  useEffect(() => {
    const fetchData = async () => {
      console.log('🔄 DataViewer: Starting API fetch');
      
      try {
        setData({ loading: true });
        
        // Fetch services
        const servicesResponse = await fetch('/api/services');
        const servicesData = await servicesResponse.json();
        console.log('✅ DataViewer: Services response', servicesData);
        
        // Fetch testimonials
        const testimonialsResponse = await fetch('/api/testimonials?featured=true');
        const testimonialsData = await testimonialsResponse.json();
        console.log('✅ DataViewer: Testimonials response', testimonialsData);
        
        setData({
          services: servicesData,
          testimonials: testimonialsData,
          loading: false
        });
        
      } catch (error: any) {
        console.error('❌ DataViewer: API error', error);
        setData({
          loading: false,
          error: error.message
        });
      }
    };

    fetchData();
  }, []);

  return (
    <DebugWrapper>
      <h3>🔍 Data Viewer Debug</h3>
      
      {data.loading && <div>⏳ Loading...</div>}
      
      {data.error && <div style={{color: '#ff0000'}}>❌ Error: {data.error}</div>}
      
      {!data.loading && !data.error && (
        <>
          <div style={{marginTop: '1rem'}}>
            <strong>📊 Services:</strong><br/>
            Count: {data.services?.length || 0}<br/>
            {data.services?.length && (
              <>
                First: {data.services[0]?.title}<br/>
                All titles: {data.services.map(s => s.title).join(', ')}
              </>
            )}
          </div>
          
          <div style={{marginTop: '1rem'}}>
            <strong>💬 Testimonials:</strong><br/>
            Count: {data.testimonials?.length || 0}<br/>
            {data.testimonials?.length && (
              <>
                First: {data.testimonials[0]?.clientName}<br/>
                All clients: {data.testimonials.map(t => t.clientName).join(', ')}
              </>
            )}
          </div>
        </>
      )}
    </DebugWrapper>
  );
};

export default DataViewer;