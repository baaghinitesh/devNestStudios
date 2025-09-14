import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ServicesSection from './components/sections/ServicesSection';
import TestimonialsSection from './components/sections/TestimonialsSection';
import DebugPanel from './components/common/DebugPanel';
import SimpleTestSection from './components/sections/SimpleTestSection';
import DataViewer from './components/debug/DataViewer';
import SimpleServicesTest from './components/sections/SimpleServicesTest';
import SimpleTestimonialsTest from './components/sections/SimpleTestimonialsTest';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <SimpleServicesTest />
      <SimpleTestimonialsTest />
      <SimpleTestSection />
      <ServicesSection />
      <TestimonialsSection />
    </>
  );
};

const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>About DevNestStudios</h1>
      <p>Coming soon...</p>
    </div>
  );
};

const ContactPage: React.FC = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Contact Us</h1>
      <p>Coming soon...</p>
    </div>
  );
};

const CaseStudiesPage: React.FC = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Case Studies</h1>
      <p>Coming soon...</p>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Our Services</h1>
      <p>Coming soon...</p>
    </div>
  );
};

const BlogPage: React.FC = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Blog</h1>
      <p>Coming soon...</p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppWrapper>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Add more specific service routes as needed */}
            <Route path="/services/:serviceId" element={<ServicesPage />} />
            <Route path="/industries/:industryId" element={<ServicesPage />} />
          </Routes>
        </MainContent>
        <Footer />
        <DebugPanel />
        <DataViewer />
      </AppWrapper>
    </Router>
  );
}

export default App;