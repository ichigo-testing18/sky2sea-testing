import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowUpRight, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo';
import { BRAND_CONFIG, CONTACT_CONFIG, SERVICES_DATA } from '../data/siteConfig';

const Footer = ({ onOpenQuote }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <div className="p-2.5 rounded-xl bg-white inline-block">
              <Logo size="large" />
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {BRAND_CONFIG.tagline} {BRAND_CONFIG.subTagline}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONTACT_CONFIG.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-seablue-400 hover:border-seablue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_CONFIG.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-seablue-400 hover:border-seablue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_CONFIG.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-seablue-400 hover:border-seablue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CONTACT_CONFIG.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-seablue-400 hover:border-seablue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-seablue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-seablue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-400 hover:text-seablue-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-seablue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <button onClick={onOpenQuote} className="text-seablue-400 hover:underline font-semibold inline-flex items-center gap-1">
                  <span>Request Rate Quote</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Core Services</h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES_DATA.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link to="/services" className="text-slate-400 hover:text-seablue-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact Desk</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-seablue-400 shrink-0 mt-1" />
                <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-seablue-400 shrink-0 mt-1" />
                <span>{CONTACT_CONFIG.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {BRAND_CONFIG.name}. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms of Carriage</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Global Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
