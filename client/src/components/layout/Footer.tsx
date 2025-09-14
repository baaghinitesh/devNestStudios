import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterWrapper = styled.footer`
  background: #1a1a1a;
  color: white;
  padding: 4rem 0 2rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #007bff;
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 0.75rem;
  }
  
  a {
    color: #ccc;
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #007bff;
    }
  }
`;

const CompanyInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #007bff;
  }
  
  p {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 40px;
    height: 40px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ccc;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: #007bff;
      color: white;
      transform: translateY(-2px);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #ccc;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.div``;

const LegalLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #007bff;
    }
  }
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <FooterWrapper className={className}>
      <Container>
        <FooterContent>
          <CompanyInfo>
            <h3>DevNestStudios</h3>
            <p>
              We are a software product development company with a strong focus on 
              Healthcare digital innovations. We possess expertise in various industries – 
              from FinTech to Hospitality.
            </p>
            <p>
              <strong>Email:</strong> hello@devneststudios.com<br />
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <SocialLinks>
              <a href="https://linkedin.com/company/devneststudios" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">in</a>
              <a href="https://twitter.com/devneststudios" aria-label="Twitter" target="_blank" rel="noopener noreferrer">tw</a>
              <a href="https://github.com/devneststudios" aria-label="GitHub" target="_blank" rel="noopener noreferrer">gh</a>
              <a href="https://medium.com/@devneststudios" aria-label="Medium" target="_blank" rel="noopener noreferrer">md</a>
            </SocialLinks>
          </CompanyInfo>

          <FooterColumn>
            <h3>Services</h3>
            <FooterLinks>
              <li><Link to="/services/discovery-phase">Discovery Phase</Link></li>
              <li><Link to="/services/ux-ui-design">UX/UI Design</Link></li>
              <li><Link to="/services/web-development">Web Development</Link></li>
              <li><Link to="/services/mobile-development">Mobile Development</Link></li>
              <li><Link to="/services/cloud-implementation">Cloud Implementation</Link></li>
              <li><Link to="/services/security">Security</Link></li>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <h3>Industries</h3>
            <FooterLinks>
              <li><Link to="/industries/fintech">FinTech</Link></li>
              <li><Link to="/industries/healthcare">Healthcare</Link></li>
              <li><Link to="/industries/enterprise-saas">Enterprise SaaS</Link></li>
              <li><Link to="/industries/martech">MarTech</Link></li>
              <li><Link to="/industries/ecommerce">eCommerce</Link></li>
            </FooterLinks>
          </FooterColumn>

          <FooterColumn>
            <h3>Company</h3>
            <FooterLinks>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </FooterLinks>
          </FooterColumn>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © 2024 DevNestStudios. All rights reserved.
          </Copyright>
          <LegalLinks>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/cookies-policy">Cookies Policy</Link>
          </LegalLinks>
        </FooterBottom>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;