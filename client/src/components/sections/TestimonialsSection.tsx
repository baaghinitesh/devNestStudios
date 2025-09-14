import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTestimonials } from '../../hooks/useTestimonials';

const TestimonialsWrapper = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  color: #333;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ViewAllLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #0056b3;
  }
  
  &::after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: translateX(4px);
  }
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  min-height: 300px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem;
  }
`;

const ClientImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
`;

const TestimonialContent = styled.div`
  flex: 1;
`;

const ClientName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin: 0 0 0.5rem 0;
`;

const ClientPosition = styled.p`
  font-size: 0.875rem;
  color: #666;
  text-transform: uppercase;
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`;

const CompanyTag = styled.span`
  display: inline-block;
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const ClientLocation = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 1.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '';
    width: 16px;
    height: 16px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  
  &.australia::before { background-image: url('/images/avatar/australia.svg'); }
  &.usa::before { background-image: url('/images/avatar/usa.svg'); }
  &.uk::before { background-image: url('/images/avatar/uk.svg'); }
  &.sweden::before { background-image: url('/images/avatar/sweden.svg'); }
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TestimonialText = styled.blockquote`
  font-size: 1.125rem;
  line-height: 1.6;
  color: #333;
  margin: 0;
  font-style: italic;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 2rem;
  }
`;

const SliderButton = styled.button`
  background: none;
  border: none;
  color: #666;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: #333;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SliderDivider = styled.span`
  width: 40px;
  height: 1px;
  background: #ddd;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #666;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: #dc3545;
`;

interface TestimonialsSectionProps {
  className?: string;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ className }) => {
  const { testimonials, loading, error } = useTestimonials({ featured: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  console.log('🔍 TestimonialsSection render:', { 
    testimonialsCount: testimonials?.length, 
    loading, 
    error,
    firstTestimonial: testimonials?.[0]?.clientName
  });

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 6000); // Change every 6 seconds

      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return (
      <TestimonialsWrapper className={className}>
        <Container>
          <LoadingState>Loading testimonials...</LoadingState>
        </Container>
      </TestimonialsWrapper>
    );
  }

  if (error) {
    console.error('❌ TestimonialsSection error:', error);
    return (
      <TestimonialsWrapper className={className}>
        <Container>
          <ErrorState>
            Failed to fetch testimonials: {error}
          </ErrorState>
        </Container>
      </TestimonialsWrapper>
    );
  }
  
  if (!testimonials || testimonials.length === 0) {
    console.warn('⚠️ TestimonialsSection: No testimonials data');
    return (
      <TestimonialsWrapper className={className}>
        <Container>
          <ErrorState>
            No testimonials available at the moment.
          </ErrorState>
        </Container>
      </TestimonialsWrapper>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <TestimonialsWrapper id="clAnimation" className={className}>
      <Container>
        <SectionHeader>
          <SectionTitle>
            What Our Clients Say<br />About DevNest
          </SectionTitle>
          <ViewAllLink href="/client-testimonials">
            View all
          </ViewAllLink>
        </SectionHeader>

        <SliderContainer>
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={currentTestimonial._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ClientImage>
                <img 
                  src={`/${currentTestimonial.clientImage}`} 
                  alt={currentTestimonial.clientName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/avatar/default-avatar.png';
                  }}
                />
              </ClientImage>

              <TestimonialContent>
                <ClientName>{currentTestimonial.clientName}</ClientName>
                <ClientPosition>{currentTestimonial.clientPosition}</ClientPosition>
                {currentTestimonial.companyTag && (
                  <CompanyTag>{currentTestimonial.companyTag}</CompanyTag>
                )}
                <ClientLocation className={currentTestimonial.location.countryCode}>
                  {currentTestimonial.location.city && `${currentTestimonial.location.city}, `}
                  {currentTestimonial.location.country}
                </ClientLocation>
                <TestimonialText>
                  "{currentTestimonial.content}"
                </TestimonialText>
              </TestimonialContent>

              <SliderControls>
                <SliderButton 
                  onClick={prevTestimonial}
                  disabled={testimonials.length <= 1}
                >
                  Prev
                </SliderButton>
                <SliderDivider />
                <SliderButton 
                  onClick={nextTestimonial}
                  disabled={testimonials.length <= 1}
                >
                  Next
                </SliderButton>
              </SliderControls>
            </TestimonialCard>
          </AnimatePresence>
        </SliderContainer>
      </Container>
    </TestimonialsWrapper>
  );
};

export default TestimonialsSection;