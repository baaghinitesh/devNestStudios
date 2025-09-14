import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HeroStats } from '../../types';

const HeroWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
  padding-top: 80px; /* Account for fixed header */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
`;

const HeroContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 3rem;
  }
`;

const ContentLeft = styled.div`
  max-width: 600px;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 16px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.125rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  opacity: 0.9;
  text-transform: lowercase;
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

const ScrollIndicator = styled(motion.a)`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  
  &::after {
    content: '↓';
    font-size: 1.25rem;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

interface HeroSectionProps {
  stats?: HeroStats;
  className?: string;
}

// Default stats based on actual TechMagic website
const defaultStats: HeroStats = {
  experts: '35+',
  clients: '20+',
  nps: '92%+',
  years: '4+'
};

const HeroSection: React.FC<HeroSectionProps> = ({ 
  stats = defaultStats,
  className 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99] as const
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <HeroWrapper id="top" className={className}>
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroContent>
            <ContentLeft>
              <Title variants={itemVariants}>
                Software product<br />Development Company
              </Title>
              
              <Description variants={itemVariants}>
                With a strong focus on Healthcare digital innovations, we possess expertise 
                in various industries – from FinTech to Hospitality. We take responsibility 
                for your next software product, from inception and design to engineering 
                and support. Starting from any step.
              </Description>
              
              <CTAButton 
                href="#section-message"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get started
              </CTAButton>
            </ContentLeft>
            
            <StatsGrid variants={statsVariants}>
              <StatItem variants={itemVariants}>
                <StatNumber>{stats.experts}</StatNumber>
                <StatLabel>certified experts</StatLabel>
              </StatItem>
              
              <StatItem variants={itemVariants}>
                <StatNumber>{stats.clients}</StatNumber>
                <StatLabel>happy clients</StatLabel>
              </StatItem>
              
              <StatItem variants={itemVariants}>
                <StatNumber>{stats.nps}</StatNumber>
                <StatLabel>client NPS</StatLabel>
              </StatItem>
              
              <StatItem variants={itemVariants}>
                <StatNumber>{stats.years}</StatNumber>
                <StatLabel>years on the market</StatLabel>
              </StatItem>
            </StatsGrid>
          </HeroContent>
        </motion.div>
      </Container>
      
      <ScrollIndicator href="#clAnimation">
        scroll
      </ScrollIndicator>
    </HeroWrapper>
  );
};

export default HeroSection;