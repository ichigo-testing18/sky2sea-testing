import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  ShieldCheck, 
  BadgePercent, 
  CreditCard, 
  Headset, 
  Globe, 
  Compass, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import AnimatedSection from '../components/AnimatedSection';
import InteractiveRouteMap from '../components/InteractiveRouteMap';
import CTASection from '../components/CTASection';
import { BRAND_CONFIG, IMAGE_ASSETS, SERVICES_DATA, WHY_CHOOSE_US } from '../data/siteConfig';

import HeroSlider from '../components/HeroSlider';

const iconMap = {
  Truck,
  ShieldCheck,
  BadgePercent,
  CreditCard,
  Headset,
  Globe
};

const Home = ({ onOpenQuote, onSelectService }) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-white">
      
      {/* ========================================================================= */}
      {/* HERO SECTION - 3-SLIDE CAROUSEL */}
      {/* ========================================================================= */}
      <HeroSlider />


      {/* ========================================================================= */}
      {/* WHY BUSINESSES CHOOSE US - THE LOGISTICS JOURNEY */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-white">
        
        {/* Subtle background route trail */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden" aria-hidden="true">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path
              d="M 50 200 C 300 400, 600 100, 1150 450"
              stroke="#00539C"
              strokeWidth="4"
              strokeDasharray="12 12"
            />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Main Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Businesses <span className="text-[#00539C]">Choose Us</span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Reliable logistics, secure handling, and customer-first service to help your business move forward with confidence.
            </p>

            {/* Logistics Journey Storytelling Accent */}
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 bg-slate-200" />
              <p className="text-xs sm:text-sm font-semibold text-slate-500 italic">
                &ldquo;Every Shipment Has a Journey. We&apos;re Here to Make It Smoother.&rdquo;
              </p>
              <span className="h-[1px] w-12 bg-slate-200" />
            </div>
          </div>

          {/* 6 Feature Milestone Cards (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => {
              const IconComp = iconMap[item.icon] || ShieldCheck;
              return (
                <AnimatedSection key={idx} direction="up" delay={idx * 0.08}>
                  <div className="h-full bg-white border border-slate-200/90 hover:border-[#00539C]/40 rounded-2xl p-7 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                    
                    {/* Top Accent Line on Hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00539C] to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      {/* Card Header: Icon & Step Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00539C] group-hover:bg-[#00539C] group-hover:text-white group-hover:border-[#00539C] shadow-sm transition-all duration-300">
                          <IconComp className="w-7 h-7" />
                        </div>

                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200/60 group-hover:bg-orange-50 group-hover:text-orange-600 group-hover:border-orange-200 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          <span>Milestone {item.step}</span>
                        </div>
                      </div>

                      {/* Stage Tag */}
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 mb-1">
                        {item.stage}
                      </p>

                      {/* Feature Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#00539C] transition-colors">
                        {item.title}
                      </h3>

                      {/* Feature Description */}
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Card Footer: Subtle Journey Milestone Track */}
                    <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 group-hover:text-[#00539C] transition-colors">
                      <span className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Core Logistics Pillar</span>
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 group-hover:text-orange-600 transition-colors">
                        {item.step} / 06 &rarr;
                      </span>
                    </div>

                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* ===================================================================== */}
          {/* DISCOVER OUR STORY CTA (Connecting to Dedicated About Us Page) */}
          {/* ===================================================================== */}
          <AnimatedSection direction="up" delay={0.2}>
            <div className="mt-16 bg-gradient-to-r from-slate-900 via-[#004273] to-[#00539C] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
              
              {/* Subtle background route compass */}
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none" aria-hidden="true">
                <Compass className="w-64 h-64 text-white" />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-2xl space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Want to Know the Story Behind Our Service?
                  </h3>
                  <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed font-normal">
                    Discover our approach, our values, and the people behind our logistics solutions.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/about')}
                  icon={ArrowRight}
                  className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg hover:shadow-orange-500/25"
                >
                  Discover Our Story
                </Button>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICES PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 bg-slate-50 border-y border-slate-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our"
            highlight="Services"
            description="Explore our flexible range of shipping and supply chain solutions tailored for international trade."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES_DATA.map((service, idx) => (
              <AnimatedSection key={service.id} direction="up" delay={idx * 0.08}>
                <ServiceCard
                  service={service}
                  onSelectService={(selected) => {
                    if (onSelectService) onSelectService(selected);
                    navigate('/services');
                  }}
                />
              </AnimatedSection>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/services')}
              icon={ArrowRight}
            >
              View Full Freight Service Specs
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* GLOBAL CONNECTIVITY SECTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="up">
            <InteractiveRouteMap />
          </AnimatedSection>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CTA SECTION */}
      {/* ========================================================================= */}
      <CTASection onOpenQuote={onOpenQuote} />

    </div>
  );
};

export default Home;
