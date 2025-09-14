import React from 'react';
import styled from 'styled-components';
import { useServices } from '../../hooks/useServices';
import { useTestimonials } from '../../hooks/useTestimonials';

const TestWrapper = styled.div`
  padding: 2rem;
  background: #f8f9fa;
  margin: 2rem 0;
`;

const TestTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const TestContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const SimpleTestSection: React.FC = () => {
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { testimonials, loading: testimonialsLoading, error: testimonialsError } = useTestimonials({ featured: true });

  console.log('🔍 SimpleTestSection render:', {
    services: services?.length,
    testimonials: testimonials?.length,
    servicesLoading,
    testimonialsLoading,
    servicesError,
    testimonialsError
  });

  return (
    <TestWrapper>
      <TestTitle>🧪 API Test Section</TestTitle>
      
      <TestContent>
        <h3>Services API Test</h3>
        <p>Loading: {servicesLoading ? 'Yes' : 'No'}</p>
        <p>Error: {servicesError || 'None'}</p>
        <p>Services Count: {services?.length || 0}</p>
        {services && services.length > 0 && (
          <div>
            <h4>First Service:</h4>
            <p>Title: {services[0].title}</p>
            <p>Description: {services[0].description?.substring(0, 100)}...</p>
          </div>
        )}
      </TestContent>

      <TestContent>
        <h3>Testimonials API Test</h3>
        <p>Loading: {testimonialsLoading ? 'Yes' : 'No'}</p>
        <p>Error: {testimonialsError || 'None'}</p>
        <p>Testimonials Count: {testimonials?.length || 0}</p>
        {testimonials && testimonials.length > 0 && (
          <div>
            <h4>First Testimonial:</h4>
            <p>Client: {testimonials[0].clientName}</p>
            <p>Company: {testimonials[0].companyName}</p>
            <p>Content: {testimonials[0].content?.substring(0, 100)}...</p>
          </div>
        )}
      </TestContent>
    </TestWrapper>
  );
};

export default SimpleTestSection;