import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TestWrapper = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  margin: 2rem 0;
  border: 2px solid #28a745;
`;

const TestTitle = styled.h2`
  color: #28a745;
  margin-bottom: 1rem;
`;

const TestimonialsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const TestimonialCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const SimpleTestimonialsTest: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      console.log('🔄 SimpleTestimonialsTest: Starting fetch');
      try {
        setLoading(true);
        const response = await fetch('/api/testimonials?featured=true');
        console.log('📡 SimpleTestimonialsTest: Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('✅ SimpleTestimonialsTest: Data received:', {
          type: typeof data,
          isArray: Array.isArray(data),
          length: data?.length,
          firstItem: data?.[0]
        });
        
        setTestimonials(data);
        setError(null);
      } catch (err: any) {
        console.error('❌ SimpleTestimonialsTest: Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
        console.log('🏁 SimpleTestimonialsTest: Fetch completed');
      }
    };

    fetchTestimonials();
  }, []);

  console.log('🎨 SimpleTestimonialsTest: Rendering with:', {
    testimonialsLength: testimonials.length,
    loading,
    error,
    firstTestimonial: testimonials[0]?.clientName
  });

  if (loading) {
    return (
      <TestWrapper>
        <TestTitle>🔄 Loading Testimonials...</TestTitle>
        <p>Please wait while we fetch the testimonials data...</p>
      </TestWrapper>
    );
  }

  if (error) {
    return (
      <TestWrapper>
        <TestTitle>❌ Error Loading Testimonials</TestTitle>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </TestWrapper>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return (
      <TestWrapper>
        <TestTitle>📭 No Testimonials Found</TestTitle>
        <p>No testimonials data available.</p>
      </TestWrapper>
    );
  }

  return (
    <TestWrapper>
      <TestTitle>✅ Testimonials Test - {testimonials.length} Testimonials Found</TestTitle>
      <TestimonialsList>
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <TestimonialCard key={testimonial._id || index}>
            <h3>{testimonial.clientName}</h3>
            <p><strong>{testimonial.clientPosition}</strong></p>
            <p><em>{testimonial.companyName} - {testimonial.companyTag}</em></p>
            <p style={{ fontSize: '14px', color: '#666' }}>
              "{testimonial.content?.substring(0, 150)}..."
            </p>
            <p style={{ fontSize: '12px', color: '#999' }}>
              Rating: {testimonial.rating}/5 | {testimonial.location?.city}, {testimonial.location?.country}
            </p>
          </TestimonialCard>
        ))}
      </TestimonialsList>
    </TestWrapper>
  );
};

export default SimpleTestimonialsTest;