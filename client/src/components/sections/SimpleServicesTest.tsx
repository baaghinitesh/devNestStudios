import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TestWrapper = styled.div`
  padding: 2rem;
  background: #f0f0f0;
  margin: 2rem 0;
  border: 2px solid #007bff;
`;

const TestTitle = styled.h2`
  color: #007bff;
  margin-bottom: 1rem;
`;

const ServicesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const ServiceCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const SimpleServicesTest: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      console.log('🔄 SimpleServicesTest: Starting fetch');
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        console.log('📡 SimpleServicesTest: Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ SimpleServicesTest: Data received:', {
          type: typeof data,
          isArray: Array.isArray(data),
          length: data?.length,
          firstItem: data?.[0]
        });
        
        setServices(data);
        setError(null);
      } catch (err: any) {
        console.error('❌ SimpleServicesTest: Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('🏁 SimpleServicesTest: Fetch completed');
      }
    };

    fetchServices();
  }, []);

  console.log('🎨 SimpleServicesTest: Rendering with:', {
    servicesLength: services.length,
    loading,
    error,
    firstService: services[0]?.title
  });

  if (loading) {
    return (
      <TestWrapper>
        <TestTitle>🔄 Loading Services...</TestTitle>
        <p>Please wait while we fetch the services data...</p>
      </TestWrapper>
    );
  }

  if (error) {
    return (
      <TestWrapper>
        <TestTitle>❌ Error Loading Services</TestTitle>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </TestWrapper>
    );
  }

  if (!services || services.length === 0) {
    return (
      <TestWrapper>
        <TestTitle>📭 No Services Found</TestTitle>
        <p>No services data available.</p>
      </TestWrapper>
    );
  }

  return (
    <TestWrapper>
      <TestTitle>✅ Services Test - {services.length} Services Found</TestTitle>
      <ServicesList>
        {services.slice(0, 3).map((service, index) => (
          <ServiceCard key={service._id || index}>
            <h3>{service.title}</h3>
            <p>{service.subtitle}</p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              {service.description?.substring(0, 150)}...
            </p>
            <p style={{ fontSize: '12px', color: '#999' }}>
              Category: {service.category} | Features: {service.features?.length || 0}
            </p>
          </ServiceCard>
        ))}
      </ServicesList>
    </TestWrapper>
  );
};

export default SimpleServicesTest;