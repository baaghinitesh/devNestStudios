import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useServices } from '../../hooks/useServices';

const ServicesWrapper = styled.section`
  padding: 5rem 0;
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
  line-height: 1.2;
  color: #333;
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 3rem;
  }
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 3rem;
  
  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ServicesNavigation = styled.div`
  @media (max-width: 968px) {
    display: none;
  }
`;

const NavigationItem = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  text-align: left;
  border: none;
  background: ${props => props.isActive ? '#f8f9fa' : 'transparent'};
  color: ${props => props.isActive ? '#007bff' : '#333'};
  font-size: 1.125rem;
  font-weight: ${props => props.isActive ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;
  border-left: 3px solid ${props => props.isActive ? '#007bff' : 'transparent'};
  
  &:hover {
    background: #f8f9fa;
    color: #007bff;
  }
`;

const ServicesAccordion = styled.div`
  @media (min-width: 969px) {
    display: none;
  }
`;

const AccordionItem = styled.div<{ isActive: boolean }>`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const AccordionHeader = styled.button<{ isActive: boolean }>`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.isActive ? '#f8f9fa' : 'white'};
  border: none;
  text-align: left;
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
  
  &::after {
    content: '${props => props.isActive ? '−' : '+'}';
    font-size: 1.25rem;
    font-weight: 300;
  }
  
  &:hover {
    background: #f8f9fa;
  }
`;

const ServiceContent = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const ServiceSubtitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const ServiceDescription = styled.div`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1rem;
    font-size: 1.125rem;
  }
`;

const ServiceFeatures = styled.div`
  margin-bottom: 2rem;
`;

const FeaturesTitle = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.5rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #666;
  
  &::before {
    content: '✓';
    color: #28a745;
    font-weight: bold;
    font-size: 1rem;
  }
`;

const TechnologiesList = styled.div`
  margin-bottom: 2rem;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ViewMoreButton = styled.a`
  display: inline-block;
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
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

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ className }) => {
  const { services, loading, error } = useServices();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  
  console.log('🔍 ServicesSection render:', { 
    servicesCount: services?.length, 
    loading, 
    error,
    firstService: services?.[0]?.title
  });

  if (loading) {
    return (
      <ServicesWrapper className={className}>
        <Container>
          <LoadingState>Loading services...</LoadingState>
        </Container>
      </ServicesWrapper>
    );
  }

  if (error) {
    console.error('❌ ServicesSection error:', error);
    return (
      <ServicesWrapper className={className}>
        <Container>
          <ErrorState>
            Failed to fetch services: {error}
          </ErrorState>
        </Container>
      </ServicesWrapper>
    );
  }
  
  if (!services || services.length === 0) {
    console.warn('⚠️ ServicesSection: No services data');
    return (
      <ServicesWrapper className={className}>
        <Container>
          <ErrorState>
            No services available at the moment.
          </ErrorState>
        </Container>
      </ServicesWrapper>
    );
  }

  const activeService = services[activeServiceIndex];

  return (
    <ServicesWrapper className={className}>
      <Container>
        <SectionTitle>
          Let's Go together on a Software Product Development Journey, Starting From Any Step
        </SectionTitle>

        <ServicesContainer>
          {/* Desktop Navigation */}
          <ServicesNavigation>
            {services.map((service, index) => (
              <NavigationItem
                key={service._id}
                isActive={index === activeServiceIndex}
                onClick={() => setActiveServiceIndex(index)}
              >
                {service.title}
              </NavigationItem>
            ))}
          </ServicesNavigation>

          {/* Mobile Accordion */}
          <ServicesAccordion>
            {services.map((service, index) => (
              <AccordionItem key={service._id} isActive={index === activeServiceIndex}>
                <AccordionHeader
                  isActive={index === activeServiceIndex}
                  onClick={() => setActiveServiceIndex(
                    index === activeServiceIndex ? -1 : index
                  )}
                >
                  {service.title}
                </AccordionHeader>
                <AnimatePresence>
                  {index === activeServiceIndex && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ServiceContent>
                        <ServiceSubtitle>{service.subtitle}</ServiceSubtitle>
                        <ServiceDescription>
                          {service.description.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                          ))}
                        </ServiceDescription>

                        {service.features && service.features.length > 0 && (
                          <ServiceFeatures>
                            <FeaturesTitle>Key Features:</FeaturesTitle>
                            <FeaturesList>
                              {service.features.map((feature, i) => (
                                <FeatureItem key={i}>{feature}</FeatureItem>
                              ))}
                            </FeaturesList>
                          </ServiceFeatures>
                        )}

                        {service.technologies && service.technologies.length > 0 && (
                          <TechnologiesList>
                            <FeaturesTitle>Technologies:</FeaturesTitle>
                            <TechTags>
                              {service.technologies.map((tech, i) => (
                                <TechTag key={i}>{tech}</TechTag>
                              ))}
                            </TechTags>
                          </TechnologiesList>
                        )}

                        {service.detailPageUrl && (
                          <ViewMoreButton href={service.detailPageUrl}>
                            View more
                          </ViewMoreButton>
                        )}
                      </ServiceContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AccordionItem>
            ))}
          </ServicesAccordion>

          {/* Desktop Content */}
          <AnimatePresence mode="wait">
            <ServiceContent
              key={activeService._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block' }}
            >
              <ServiceSubtitle>{activeService.subtitle}</ServiceSubtitle>
              <ServiceDescription>
                {activeService.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </ServiceDescription>

              {activeService.features && activeService.features.length > 0 && (
                <ServiceFeatures>
                  <FeaturesTitle>Key Features:</FeaturesTitle>
                  <FeaturesList>
                    {activeService.features.map((feature, i) => (
                      <FeatureItem key={i}>{feature}</FeatureItem>
                    ))}
                  </FeaturesList>
                </ServiceFeatures>
              )}

              {activeService.technologies && activeService.technologies.length > 0 && (
                <TechnologiesList>
                  <FeaturesTitle>Technologies:</FeaturesTitle>
                  <TechTags>
                    {activeService.technologies.map((tech, i) => (
                      <TechTag key={i}>{tech}</TechTag>
                    ))}
                  </TechTags>
                </TechnologiesList>
              )}

              {activeService.detailPageUrl && (
                <ViewMoreButton href={activeService.detailPageUrl}>
                  View more
                </ViewMoreButton>
              )}
            </ServiceContent>
          </AnimatePresence>
        </ServicesContainer>
      </Container>
    </ServicesWrapper>
  );
};

export default ServicesSection;