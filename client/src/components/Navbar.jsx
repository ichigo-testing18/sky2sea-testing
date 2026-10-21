import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Facebook, Twitter, Instagram, Linkedin, Menu, X, Search } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_CONFIG } from '../data/siteConfig';

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Track Order', path: '/track' },
  { label: 'Request Quote', isAction: true },
  { label: 'Contact Us', path: '/contact' }
];

const Navbar = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full z-50 bg-white sticky top-0 shadow-sm transition-all duration-200">
      {/* ========================================================================= */}
      {/* 1. TOP CONTACT BAR (Corporate Blue) */}
      {/* ========================================================================= */}
      <div className="bg-[#00539C] text-white text-xs sm:text-[13px] font-medium py-2 px-4 sm:px-8 lg:px-16 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Email */}
          <div className="flex items-center gap-4 sm:gap-8 flex-wrap">
            <a
              href={`mailto:${CONTACT_CONFIG.email}`}
              className="inline-flex items-center gap-2 text-white/95 hover:text-white transition-colors group"
              title="Email SKY2SEA"
            >
              <Mail className="w-4 h-4 text-white/90 group-hover:scale-110 transition-transform" />
              <span>{CONTACT_CONFIG.email}</span>
            </a>
          </div>

          {/* Right: Social Media Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {CONTACT_CONFIG.socials.facebook && (
              <a
                href={CONTACT_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-white/80 hover:text-white hover:scale-110 transition-all p-1"
              >
                <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
            {CONTACT_CONFIG.socials.twitter && (
              <a
                href={CONTACT_CONFIG.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-white/80 hover:text-white hover:scale-110 transition-all p-1"
              >
                <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
            {CONTACT_CONFIG.socials.instagram && (
              <a
                href={CONTACT_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/80 hover:text-white hover:scale-110 transition-all p-1"
              >
                <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
            {CONTACT_CONFIG.socials.linkedin && (
              <a
                href={CONTACT_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/80 hover:text-white hover:scale-110 transition-all p-1"
              >
                <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN NAVIGATION BAR (Generous White Bar) */}
      {/* ========================================================================= */}
      <nav className="w-full bg-white border-b border-slate-100 py-3.5 sm:py-5 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo on Left */}
          <Logo size="large" />

          {/* Navigation Links on Right (Desktop) */}
          <div className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_ITEMS.map((item) => {
              if (item.isAction) {
                return (
                  <button
                    key={item.label}
                    onClick={onOpenQuote}
                    className="text-[15px] font-bold text-slate-800 hover:text-orange-500 transition-colors duration-200 cursor-pointer focus:outline-none"
                  >
                    {item.label}
                  </button>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-[15px] transition-colors duration-200 ${
                      isActive
                        ? 'text-orange-500 font-bold'
                        : 'text-slate-800 hover:text-orange-500 font-semibold'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#00539C] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden pt-4 pb-2 border-t border-slate-100 mt-3"
            >
              <div className="flex flex-col space-y-2">
                {NAV_ITEMS.map((item) => {
                  if (item.isAction) {
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (onOpenQuote) onOpenQuote();
                        }}
                        className="text-left px-3 py-2.5 rounded-lg text-base font-bold text-orange-500 hover:bg-orange-50 transition-colors"
                      >
                        {item.label}
                      </button>
                    );
                  }

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        `px-3 py-2.5 rounded-lg text-base transition-colors ${
                          isActive
                            ? 'text-orange-500 font-bold bg-orange-50/60'
                            : 'text-slate-800 font-semibold hover:bg-slate-50 hover:text-orange-500'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile Contact Information */}
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-2 px-3">
                <a 
                  href={`mailto:${CONTACT_CONFIG.email}`} 
                  className="flex items-center gap-2 hover:text-[#00539C] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>{CONTACT_CONFIG.email}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
