import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
`;

const Navbar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: 40px;
    width: auto;
  }
`;

const Nav = styled.nav<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
  }
`;

const NavItem = styled.div`
  position: relative;
  
  &:hover .dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
`;

const NavButton = styled.button`
  background: none;
  border: none;
  color: #333;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #007bff;
  }
  
  &::after {
    content: '▼';
    font-size: 12px;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: rotate(180deg);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 200px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 1rem 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1.5rem;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
    color: #007bff;
  }
`;

const ContactButton = styled(Link)`
  background: #007bff;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderWrapper className={className}>
      <Navbar>
        <Logo to="/">
          <img src="/images/logo.png" alt="DevNestStudios" />
        </Logo>
        
        <Nav isOpen={isMenuOpen}>
          <NavItem>
            <NavButton type="button">
              Services
            </NavButton>
            <Dropdown className="dropdown">
              <DropdownItem to="/services/discovery-phase">Discovery Phase</DropdownItem>
              <DropdownItem to="/services/ux-ui-design">UX/UI Design</DropdownItem>
              <DropdownItem to="/services/web-development">Web Development</DropdownItem>
              <DropdownItem to="/services/mobile-development">Mobile Development</DropdownItem>
              <DropdownItem to="/services/test-automation">Test Automation</DropdownItem>
              <DropdownItem to="/services/data-engineering">Data Engineering</DropdownItem>
              <DropdownItem to="/services/cloud-implementation">Cloud Implementation</DropdownItem>
              <DropdownItem to="/services/security">Security</DropdownItem>
              <DropdownItem to="/services/salesforce">Salesforce</DropdownItem>
              <DropdownItem to="/services/cto-as-a-service">CTO as a Service</DropdownItem>
            </Dropdown>
          </NavItem>
          
          <NavItem>
            <NavButton type="button">
              Industries
            </NavButton>
            <Dropdown className="dropdown">
              <DropdownItem to="/industries/fintech">FinTech</DropdownItem>
              <DropdownItem to="/industries/healthcare">Healthcare</DropdownItem>
              <DropdownItem to="/industries/enterprise-saas">Enterprise SaaS</DropdownItem>
              <DropdownItem to="/industries/martech">MarTech</DropdownItem>
              <DropdownItem to="/industries/ecommerce">eCommerce</DropdownItem>
            </Dropdown>
          </NavItem>
          
          <NavItem>
            <NavButton type="button">
              Resources
            </NavButton>
            <Dropdown className="dropdown">
              <DropdownItem to="/blog">Blog</DropdownItem>
              <DropdownItem to="/case-studies">Case Studies</DropdownItem>
              <DropdownItem to="/whitepapers">White Papers</DropdownItem>
              <DropdownItem to="/webinars">Webinars</DropdownItem>
            </Dropdown>
          </NavItem>
          
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </Nav>
        
        <ContactButton to="#section-message">
          Contact us
        </ContactButton>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
      </Navbar>
    </HeaderWrapper>
  );
};

export default Header;