import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Compass, Mail } from 'lucide-react';
import Button from './Button';

const CTASection = ({ onOpenQuote }) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative bg-white overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-slate-950 via-[#003d73] to-[#00539C] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          
          {/* Subtle background compass watermark */}
          <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none" aria-hidden="true">
            <Compass className="w-80 h-80 text-white" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-6">
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let&apos;s Move Your <br className="hidden sm:inline" />
              <span className="text-orange-400">Business Forward.</span>
            </h2>

            <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-normal">
              Looking for a logistics partner for your next shipment? Let&apos;s discuss your requirements.
            </p>

            {/* Action Buttons: Request a Quote & Contact Us */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onOpenQuote ? onOpenQuote(null) : null}
                icon={ArrowRight}
                className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg hover:shadow-orange-500/25 justify-center"
              >
                Request a Quote
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/contact')}
                icon={Mail}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 justify-center"
              >
                Contact Us
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;
