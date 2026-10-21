import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship, Truck, Warehouse, Network, Anchor, ArrowRight } from 'lucide-react';
import Button from './Button';

const iconMap = {
  'air-freight': Plane,
  'sea-freight': Ship,
  'road-transportation': Truck,
  'warehousing': Warehouse,
  'freight-forwarding': Anchor,
  'supply-chain': Network
};

const ServiceCard = ({ service, onSelectService }) => {
  const IconComponent = iconMap[service.id] || Ship;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative flex flex-col h-full rounded-2xl bg-white border border-slate-200 hover:border-seablue-300 shadow-sm hover:shadow-xl hover:shadow-seablue-500/10 overflow-hidden transition-all duration-300"
    >
      {/* Top Image Preview */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
        
        {/* Badge Tag */}
        {service.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 text-seablue-700 border border-seablue-200 shadow-xs backdrop-blur-md">
            {service.badge}
          </span>
        )}

        {/* Floating Service Icon Circle */}
        <div className="absolute -bottom-5 right-5 w-12 h-12 rounded-xl bg-seablue-600 text-white p-0.5 shadow-md group-hover:scale-110 transition-transform duration-300">
          <div className="w-full h-full bg-seablue-600 rounded-[10px] flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-seablue-600 transition-colors">
          {service.title}
        </h3>
        
        <p className="text-sm text-slate-600 mb-6 flex-1 leading-relaxed">
          {service.shortDesc}
        </p>

        {/* Key Features List */}
        {service.features && (
          <div className="mb-6 space-y-1.5 border-t border-slate-100 pt-4">
            {service.features.slice(0, 3).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-seablue-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSelectService && onSelectService(service)}
            icon={ArrowRight}
            className="w-full justify-between px-0 text-seablue-700 hover:text-seablue-800 hover:bg-transparent font-bold"
          >
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
