import React from 'react';
import styled from 'styled-components';
import { useServices } from '../../hooks/useServices';

const ServicesWrapper = styled.section`
  padding: 3rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const ServicesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #666;
  font-size: 1.2rem;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #dc3545;
  font-size: 1.2rem;
`;

const ServicesSection: React.FC = () => {
  const { services, loading, error } = useServices();
  
  console.log('🔍 ServicesSection-simple render:', { 
    servicesCount: services?.length, 
    loading, 
    error,
    services: services
  });

  if (loading) {
    return (
      <ServicesWrapper>
        <Container>
          <LoadingState>🔄 Loading services...</LoadingState>
        </Container>
      </ServicesWrapper>
    );
  }

  if (error) {
    return (
      <ServicesWrapper>
        <Container>
          <ErrorState>❌ Error: {error}</ErrorState>
        </Container>
      </ServicesWrapper>
    );
  }
  
  if (!services || services.length === 0) {
    return (
      <ServicesWrapper>
        <Container>
          <ErrorState>📭 No services available</ErrorState>
        </Container>
      </ServicesWrapper>
    );
  }

  return (
    <ServicesWrapper>
      <Container>
        <SectionTitle>Our Services ({services.length} available)</SectionTitle>
        <ServicesList>
          {services.map((service, index) => (
            <ServiceCard key={service._id || index}>
              <h3>{service.title}</h3>
              <p>{service.subtitle}</p>
              <p style={{ fontSize: '14px', color: '#666' }}>
                {service.description?.substring(0, 200)}...
              </p>
            </ServiceCard>
          ))}
        </ServicesList>
      </Container>
    </ServicesWrapper>
  );
};

export default ServicesSection;