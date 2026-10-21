import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import TrackOrder from './pages/TrackOrder';
import Admin from './pages/Admin';

// Scroll to top helper on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

// Layout component to hide client Navbar and Footer on /admin
const MainLayout = ({ children, onOpenQuote }) => {
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-seablue-100 selection:text-seablue-800">
      {!isAdminPage && <Navbar onOpenQuote={onOpenQuote} />}
      
      <main className="flex-1">
        {children}
      </main>

      {!isAdminPage && <Footer onOpenQuote={onOpenQuote} />}
    </div>
  );
};

function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenQuote = (service = null) => {
    setSelectedService(service);
    setIsQuoteOpen(true);
  };

  const handleCloseQuote = () => {
    setIsQuoteOpen(false);
    setSelectedService(null);
  };

  return (
    <Router>
      <ScrollToTop />
      
      <MainLayout onOpenQuote={() => handleOpenQuote(null)}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onOpenQuote={() => handleOpenQuote(null)} 
                onSelectService={(srv) => handleOpenQuote(srv)} 
              />
            } 
          />
          <Route 
            path="/about" 
            element={<About onOpenQuote={() => handleOpenQuote(null)} />} 
          />
          <Route 
            path="/services" 
            element={<Services onOpenQuote={() => handleOpenQuote(null)} />} 
          />
          <Route 
            path="/contact" 
            element={<Contact />} 
          />
          <Route 
            path="/track" 
            element={<TrackOrder />} 
          />
          <Route 
            path="/track-order" 
            element={<TrackOrder />} 
          />
          <Route 
            path="/admin" 
            element={<Admin />} 
          />
          <Route 
            path="*" 
            element={
              <Home 
                onOpenQuote={() => handleOpenQuote(null)} 
                onSelectService={(srv) => handleOpenQuote(srv)} 
              />
            } 
          />
        </Routes>
      </MainLayout>

      {/* Global Interactive Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteOpen} 
        onClose={handleCloseQuote} 
      />
    </Router>
  );
}

export default App;
