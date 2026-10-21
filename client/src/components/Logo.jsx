import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../data/siteConfig';
import { Compass, Ship, Plane } from 'lucide-react';

const Logo = ({ className = '', size = 'normal' }) => {
  if (BRAND_CONFIG.useImageLogo) {
    return (
      <Link to="/" className={`flex items-center gap-2 group ${className}`}>
        <img 
          src={BRAND_CONFIG.logoImageSrc} 
          alt={BRAND_CONFIG.logoAlt} 
          className={size === 'large' ? 'h-12 w-auto' : 'h-10 w-auto'}
        />
      </Link>
    );
  }

  const isLarge = size === 'large';

  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Modern Logistics Emblem with Sea Blue & Orange Accents */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#00539C] via-[#0284C7] to-orange-500 p-[2px] shadow-sm group-hover:shadow-md transition-all duration-300 ${isLarge ? 'w-12 h-12' : 'w-10 h-10'}`}>
        <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-sky-50/50 group-hover:bg-sky-50 transition-colors" />
          <Compass className={`text-[#00539C] relative z-10 group-hover:rotate-45 transition-transform duration-500 ${isLarge ? 'w-6 h-6' : 'w-5 h-5'}`} />
          {/* Subtle Orange Accent dot */}
          <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-orange-500" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-display font-extrabold tracking-tight text-slate-900 ${isLarge ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}>
            SKY<span className="text-[#00539C]">2</span><span className="text-orange-500">SEA</span>
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded bg-sky-50 text-[#00539C] border border-sky-200 hidden sm:inline-block">
            {BRAND_CONFIG.shortName}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1 hidden sm:block">
          Global Logistics
        </span>
      </div>
    </Link>
  );
};

export default Logo;
