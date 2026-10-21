import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Ship, 
  Plane, 
  Truck, 
  Mail,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';

const About = ({ onOpenQuote }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white text-slate-900 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: STRIKING, OVERSIZED "ABOUT US" TYPOGRAPHY */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100">
        
        {/* Subtle Watermark Word in Background */}
        <div 
          className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[120px] sm:text-[180px] md:text-[230px] lg:text-[290px] font-black uppercase tracking-tighter text-slate-100/60 leading-none z-0 overflow-hidden whitespace-nowrap"
          aria-hidden="true"
        >
          LOGISTICS
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          

          {/* Oversized ABOUT US Heading (90px - 140px range on desktop) */}
          <div className="relative mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[132px] font-black uppercase tracking-tight text-slate-900 leading-[0.92] select-none">
              About <span className="text-[#00539C]">Us</span>
              <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-orange-500 ml-2 align-baseline" />
            </h1>
          </div>

          {/* Hero Content: Supporting Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Moving Businesses Forward, <br className="hidden sm:inline" />
                <span className="text-[#00539C]">One Shipment</span> at a Time.
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Behind every shipment is a business counting on us. We understand the importance of dependable logistics, clear communication, and careful cargo handling. Our focus is to make the movement of goods simpler, smoother, and more dependable for the businesses we serve.
              </p>

              {/* Quick Pillar Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold text-slate-700">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Ship className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Ocean Freight</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Plane className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Air Transport</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Truck className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Overland Haulage</span>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Image Showcase */}
          <div className="mt-12 sm:mt-16 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
            <div className="relative h-72 sm:h-96 md:h-[440px] w-full overflow-hidden bg-slate-900">
              <img
                src="/assets/images/hero-ocean-freight.jpg"
                alt="SKY2SEA International Maritime Logistics"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

              {/* Floating Status Banner */}
              <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto max-w-lg p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00539C]">Multi-Modal Operations</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  Reliable end-to-end transportation across global trade lanes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION: OUR STORY */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Section Label, Heading & Story Copy */}
            <div className="lg:col-span-6 space-y-6">
              
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600">
                  Our Story
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mt-2">
                  Logistics Is More Than <br />
                  <span className="text-[#00539C]">Moving Goods.</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                Every shipment represents a promise to a customer, a business, or a partner waiting at the other end. We recognize the role logistics plays in keeping businesses connected and opportunities moving.
              </p>

              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Our approach is built around understanding customer requirements, communicating clearly, and treating every shipment with care. We aim to make logistics easier to navigate by focusing on the details that matter throughout the transportation process.
              </p>

              {/* Highlight Callout Quote */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border-l-4 border-[#00539C] space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#00539C]">The SKY2SEA Principle</p>
                <p className="text-sm font-semibold text-slate-800 italic">
                  &ldquo;Connecting businesses with clarity, care, and continuous coordination across every mile.&rdquo;
                </p>
              </div>

            </div>

            {/* Right: Tasteful Image Composition */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                <img
                  src="/assets/images/about-port-story.jpg"
                  alt="Bustling container port terminal with cranes loading cargo ships"
                  className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

                {/* Corner Decorative Accent */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold text-slate-800">Harbor & Corridor Operations</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                  <p className="text-xs font-semibold text-sky-200 uppercase tracking-wider">Operational Focus</p>
                  <p className="text-sm font-medium text-white mt-0.5">Precision logistics connecting sea ports, air hubs, and inland corridors.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION: OUR APPROACH (Editorial 01, 02, 03 Layout) */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00539C]">
              Our Approach
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Built Around What <span className="text-[#00539C]">Matters Most.</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We shape our logistics operations around three fundamental standards that keep commercial freight predictable and secure.
            </p>
          </div>

          {/* Three Editorial Elements: 01, 02, 03 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            
            {/* 01 — RELIABILITY */}
            <div className="relative p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#00539C]/40 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl font-black font-display text-[#00539C]/30 group-hover:text-[#00539C] transition-colors">
                    01
                  </span>
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#00539C] transition-colors uppercase tracking-tight">
                  Reliability
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Businesses need logistics they can plan around. We focus on dependable service and clear communication throughout the process.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#00539C]">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Dependable Schedules & Transit</span>
              </div>
            </div>

            {/* 02 — CAREFUL HANDLING */}
            <div className="relative p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#00539C]/40 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl font-black font-display text-[#00539C]/30 group-hover:text-[#00539C] transition-colors">
                    02
                  </span>
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#00539C] transition-colors uppercase tracking-tight">
                  Careful Handling
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Every shipment deserves attention. We value careful coordination and responsible handling of goods.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#00539C]">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Cargo Integrity & Protection</span>
              </div>
            </div>

            {/* 03 — CUSTOMER PARTNERSHIP */}
            <div className="relative p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-[#00539C]/40 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl font-black font-display text-[#00539C]/30 group-hover:text-[#00539C] transition-colors">
                    03
                  </span>
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                </div>

                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-[#00539C] transition-colors uppercase tracking-tight">
                  Customer Partnership
                </h3>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Every business has different requirements. We aim to understand those needs and provide service that supports our customers&apos; day-to-day operations.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-[#00539C]">
                <Layers className="w-4 h-4 text-orange-500" />
                <span>Tailored Support & Cooperation</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION: WHY OUR APPROACH MATTERS */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-gradient-to-br from-slate-900 to-[#002f57] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden">
            {/* Subtle Compass Background Motif */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none" aria-hidden="true">
              <Compass className="w-96 h-96 text-white" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6">
              

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Confidence in Every <span className="text-orange-400">Connection.</span>
              </h2>

              <p className="text-base sm:text-lg text-sky-100/90 leading-relaxed font-normal">
                Logistics is more than moving cargo across borders — it requires active coordination, transparent communication, and genuine trust between commercial partners. When businesses know their goods are managed with care, they can focus on expanding their operations with certainty.
              </p>

              {/* 3 Core Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Visibility</p>
                  <p className="text-sm text-sky-100">Clear cargo milestone awareness at every phase.</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Coordination</p>
                  <p className="text-sm text-sky-100">Synchronized handoffs between road, sea, and air.</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-1">Dedication</p>
                  <p className="text-sm text-sky-100">Personalized attention to your shipping criteria.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION: OUR COMMITMENT */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#00539C]">
                Our Commitment
              </span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Your Business Moves. <br />
                <span className="text-[#00539C]">We Move With You.</span>
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                <p>
                  We believe strong logistics relationships are built through clear communication, thoughtful coordination, and a commitment to understanding the needs of every customer.
                </p>
                <p className="text-base text-slate-600">
                  Our goal is to support your business with logistics solutions that make moving goods a more straightforward experience.
                </p>
              </div>

              {/* Transport Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                  <Ship className="w-5 h-5 text-[#00539C] mb-2" />
                  <p className="text-xs font-bold text-slate-900">Maritime Routes</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Flexible container handling</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                  <Plane className="w-5 h-5 text-[#00539C] mb-2" />
                  <p className="text-xs font-bold text-slate-900">Priority Air</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Express cargo transfers</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                  <Truck className="w-5 h-5 text-[#00539C] mb-2" />
                  <p className="text-xs font-bold text-slate-900">Inland Haulage</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Safe road connectivity</p>
                </div>
              </div>
            </div>

            {/* Visual Graphic Representation */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src="/assets/images/hero-air-freight.jpg"
                  alt="SKY2SEA Commercial Freight Operations"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-orange-400">Integrated Freight Network</p>
                  <p className="text-base sm:text-lg font-bold text-white mt-1">Connecting origin points to final destinations with care.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CALL TO ACTION */}
      {/* ========================================================================= */}
      <section className="py-24 relative bg-white overflow-hidden">
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
                  onClick={onOpenQuote}
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

    </div>
  );
};

export default About;
