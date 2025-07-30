import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import ToolsSection from './components/ToolsSection';
import BenefitsSection from './components/BenefitsSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from './components/Footer';

const MendlyLandingPage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ToolsSection />
      <BenefitsSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MendlyLandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;