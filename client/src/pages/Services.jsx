import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Ship, 
  Plane, 
  Truck, 
  Warehouse, 
  FileText, 
  Network, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  Mail, 
  Anchor,
  Boxes,
  Package,
  Check,
  Info
} from 'lucide-react';
import Button from '../components/Button';
import AnimatedSection from '../components/AnimatedSection';

// Service icon mapping
const serviceIcons = {
  'air-freight': Plane,
  'sea-freight': Ship,
  'road-transportation': Truck,
  'warehousing': Warehouse,
  'freight-forwarding': Anchor,
  'supply-chain': Network
};

// Rich, verified service definitions matching the original 6 services in siteConfig
const SERVICES_DATA = [
  {
    id: 'air-freight',
    number: '01',
    title: 'Air Freight',
    tagline: 'Rapid, time-definite air cargo solutions across premier international flight corridors.',
    description: 'When transit speed and scheduling precision are vital, our air freight division provides tailored airport-to-airport and door-to-door transportation for high-value, urgent, or temperature-sensitive commercial cargo.',
    image: '/assets/images/hero-air-freight.jpg',
    features: ['Global Airport-to-Airport Transit', 'Door-to-Door Delivery Coordination', 'Temperature-Controlled Storage', 'Real-Time Flight Milestone Tracking'],
    subOptions: [
      {
        id: 'priority',
        name: 'Priority Express Air Cargo',
        shortDesc: 'Next-flight-out and dedicated express routing for urgent freight.',
        details: {
          whatIsIt: 'Priority air freight books cargo on the earliest departing commercial flights or dedicated freighter routes with accelerated cargo acceptance cut-offs.',
          suitability: 'Ideal for critical components, pharmaceutical supplies, urgent spares, and time-sensitive commercial orders with strict contractual deadlines.',
          considerations: 'Freight charges are calculated on chargeable weight (the higher of actual gross weight or volumetric weight: L × W × H in cm ÷ 6,000).',
          quoteRequirements: 'Origin & destination airport, ready date, carton dimensions (L×W×H), total gross weight, and commodity nature.'
        }
      },
      {
        id: 'consolidated',
        name: 'Standard Consolidated Air Freight',
        shortDesc: 'Economical scheduled cargo consolidations balancing speed and freight budgets.',
        details: {
          whatIsIt: 'Consolidated air cargo combines multiple shipments onto regular scheduled flight allocations, offering cost savings without sacrificing predictable schedules.',
          suitability: 'Best for standard commercial replenishment, retail stock reorders, and regular international shipments that require faster transit than ocean freight.',
          considerations: 'Shipments move on predetermined weekly flight schedules. Ensure export packaging meets airline airworthiness standards.',
          quoteRequirements: 'Cargo dimensions, gross weight, piece count, commodity HS code, and preferred departure window.'
        }
      }
    ]
  },
  {
    id: 'sea-freight',
    number: '02',
    title: 'Sea Freight',
    tagline: 'Comprehensive ocean freight solutions engineered for commercial containerized and bulk cargo.',
    description: 'Leveraging carrier partnerships across major international shipping lines, we provide dependable maritime transport linking global seaports with structured transit schedules and port handling coordination.',
    image: '/assets/images/hero-ocean-freight.jpg',
    features: [
      'FCL (Full Container Load)',
      'LCL (Less than Container Load)',
      'Port-to-Port & Door-to-Door Solutions',
      'Port Customs Clearance Coordination',
      'Reefer & Specialized Equipment Handling'
    ],
    subOptions: [
      {
        id: 'fcl',
        name: 'FCL — Full Container Load',
        shortDesc: 'Dedicated container space offering single-shipper custody, security, and direct port transit.',
        details: {
          whatIsIt: 'Full Container Load (FCL) reserves an entire container exclusively for your consignment. The container is loaded and sealed at origin and remains sealed until arrival at the destination receiving bay.',
          suitability: 'Recommended for shipments exceeding 12–15 CBM, high-value cargo, bulk industrial products, or any goods that require sealed single-shipper transit.',
          considerations: 'Available in 20ft standard (approx. 33 CBM / 28 metric tons), 40ft standard (approx. 67 CBM), and 40ft High Cube (approx. 76 CBM). Check port road weight limits for drayage haulage.',
          quoteRequirements: 'Origin & destination ports, container type & count, gross cargo weight, cargo classification, and target departure date.'
        }
      },
      {
        id: 'lcl',
        name: 'LCL — Less than Container Load',
        shortDesc: 'Flexible shared container space allowing businesses to pay only for the volume they use.',
        details: {
          whatIsIt: 'Less than Container Load (LCL) allows smaller consignments to share container space with cargo from other commercial shippers, paying strictly for the cubic volume (CBM) or weight occupied.',
          suitability: 'Ideal for small shipments (typically 1 to 15 CBM), sample trial batches, and periodic inventory replenishment where booking an entire container is uneconomical.',
          considerations: 'Cargo is consolidated at an origin Container Freight Station (CFS) and deconsolidated at destination. Sturdy export palletization and shrink-wrapping are required.',
          quoteRequirements: 'Carton/pallet dimensions (L×W×H), total piece count, gross weight in kg, commodity description, and origin/destination locations.'
        }
      }
    ]
  },
  {
    id: 'road-transportation',
    number: '03',
    title: 'Road Transportation',
    tagline: 'Reliable ground distribution networks connecting ports, industrial hubs, and consignees.',
    description: 'Seamless overland haulage powered by dedicated heavy fleet networks, container trailers, and regional line-haul distribution ensuring safe cargo transit across country borders and domestic corridors.',
    image: '/assets/images/hero-road-transport.jpg',
    features: ['Full Truckload (FTL) Haulage', 'Container Drayage & Shunting', 'GPS Tracking & Milestone Checkpoints', 'Cross-Border Permits & Compliance'],
    subOptions: [
      {
        id: 'ftl',
        name: 'Full Truckload (FTL)',
        shortDesc: 'Dedicated vehicle allocation for direct, point-to-point highway freight.',
        details: {
          whatIsIt: 'Full Truckload dedicates an entire semi-trailer or flatbed exclusively to your cargo, providing non-stop transport directly from origin dock to delivery destination.',
          suitability: 'Ideal for high-volume orders, full warehouse transfers, heavy machinery, or sensitive goods requiring zero intermediate handling.',
          considerations: 'Ensure receiving facilities have compatible loading bays and handling equipment (forklifts, loading ramps) for the designated vehicle type.',
          quoteRequirements: 'Origin and destination addresses, cargo weight and volume, vehicle type required (closed container, flatbed, multi-axle), and loading schedule.'
        }
      },
      {
        id: 'drayage',
        name: 'Port Drayage & Container Haulage',
        shortDesc: 'Short-haul container transport between ocean terminals, railheads, and regional facilities.',
        details: {
          whatIsIt: 'Drayage handles the vital transition of shipping containers between seaport terminals, intermodal rail ramps, and local customer premises.',
          suitability: 'Essential for import container retrieval from port terminals and delivering export containers to port gates before vessel cut-off deadlines.',
          considerations: 'Coordinated scheduling to minimize container detention and port demurrage costs. Adheres to axle-load weight restrictions on national highways.',
          quoteRequirements: 'Container number, shipping line, terminal name, delivery destination, and cargo weight.'
        }
      }
    ]
  },
  {
    id: 'warehousing',
    number: '04',
    title: 'Warehousing & Hubs',
    tagline: 'Secure, climate-managed storage and high-speed order fulfillment facilities.',
    description: 'State-of-the-art storage centers equipped with modern inventory management, palletized racks, cross-docking bays, and structured picking procedures positioned along key commercial freight routes.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    features: ['Short & Long-Term Pallet Storage', 'Cross-Docking & Deconsolidation', 'Systematic Inventory Verification', 'Value-Added Staging & Repacking'],
    subOptions: [
      {
        id: 'storage',
        name: 'Commercial & Bonded Storage',
        shortDesc: 'Safe, controlled warehouse staging with systematic inventory tracking.',
        details: {
          whatIsIt: 'High-bay palletized storage facilities with round-the-clock perimeter monitoring, climate considerations, and barcoded inventory control.',
          suitability: 'Perfect for seasonal buffer stock, import holding prior to customs clearance, and long-term industrial parts storage.',
          considerations: 'Storage charges are calculated per pallet space per week/month. High-value cargo can be secured in segregated bonded zones.',
          quoteRequirements: 'Pallet dimensions, stackability, total pallet count, duration of storage, and special temperature or handling requirements.'
        }
      },
      {
        id: 'crossdock',
        name: 'Cross-Docking & Regional Dispatch',
        shortDesc: 'Fast cargo sorting and transfer directly from inbound containers to outbound trailers.',
        details: {
          whatIsIt: 'Inbound ocean containers or trucks are unloaded, sorted, repacked if necessary, and immediately reloaded onto regional distribution vehicles with zero storage delay.',
          suitability: 'Designed for fast-moving retail goods, just-in-time manufacturing parts, and multi-store replenishment.',
          considerations: 'Requires tight operational synchronization between inbound arrival schedules and outbound fleet dispatch.',
          quoteRequirements: 'Inbound shipment details, breakdown sorting instructions, delivery destination list, and dispatch timeline.'
        }
      }
    ]
  },
  {
    id: 'freight-forwarding',
    number: '05',
    title: 'Freight Forwarding',
    tagline: 'Comprehensive multi-stage freight routing, customs brokerage, and documentation compliance.',
    description: 'End-to-end multimodal logistics coordination, navigating customs documentation, tariff classifications, port handling protocols, and international shipping regulations seamlessly.',
    image: '/assets/images/about-port-story.jpg',
    features: ['Customs Clearance & Brokerage', 'Import / Export Regulatory Filings', 'Cargo Insurance Coverage Guidance', 'Multi-Modal Route Coordination'],
    subOptions: [
      {
        id: 'customs',
        name: 'Customs Clearance & Documentation',
        shortDesc: 'Accurate tariff classification, Bill of Entry filings, and regulatory compliance.',
        details: {
          whatIsIt: 'Expert brokerage managing customs clearance procedures, ensuring accurate Harmonized System (HS) code assignment, duty calculation, and statutory documentation filings.',
          suitability: 'Crucial for every international commercial shipment entering or departing national customs territories.',
          considerations: 'Ensuring invoices, packing lists, and certificates of origin are error-free prevents costly port holds and inspection delays.',
          quoteRequirements: 'Commercial invoice, packing list, HS codes, origin country, port of entry/exit, and cargo value.'
        }
      },
      {
        id: 'forwarding',
        name: 'Multimodal Transport Forwarding',
        shortDesc: 'Seamless coordination across maritime, air, rail, and road transport modes.',
        details: {
          whatIsIt: 'Full logistics management under a single point of operational accountability, aligning vessel space, terminal transfers, and inland haulage.',
          suitability: 'Ideal for businesses seeking comprehensive logistics management without having to manage multiple discrete carriers.',
          considerations: 'Carrier liability coverage and transit insurance options should be verified based on cargo value and route complexity.',
          quoteRequirements: 'Origin location, final destination, cargo parameters, and required delivery date.'
        }
      }
    ]
  },
  {
    id: 'supply-chain',
    number: '06',
    title: 'Supply Chain Solutions',
    tagline: 'Integrated logistics architecture optimizing routes, transit reliability, and visibility.',
    description: 'Strategic end-to-end supply chain planning, route optimization analysis, vendor coordination, and milestone visibility tools engineered to turn freight logistics into a predictable commercial advantage.',
    image: '/assets/images/services-hero-intermodal.jpg',
    features: ['Corridor Route Optimization', 'Vendor & Cargo Staging Coordination', 'End-to-End Milestone Transparency', 'Operational Risk Mitigation'],
    subOptions: [
      {
        id: 'optimization',
        name: 'Route & Corridor Optimization',
        shortDesc: 'Analyzing carrier schedules, transfer points, and total transit costs.',
        details: {
          whatIsIt: 'Engineering the most efficient transportation pathway by evaluating trade lane congestion, carrier reliability indexes, and port turnaround times.',
          suitability: 'Valuable for manufacturers and trading enterprises seeking to reduce freight lead times and eliminate transit unpredictability.',
          considerations: 'Evaluates seasonal shipping cycles, carrier rate fluctuations, and multi-port routing alternatives.',
          quoteRequirements: 'Annual or periodic shipping volumes, recurring origin-destination lanes, and current lead-time bottlenecks.'
        }
      },
      {
        id: 'visibility',
        name: 'Milestone Tracking & Advisory',
        shortDesc: 'Proactive shipment monitoring and communication from origin dispatch to delivery.',
        details: {
          whatIsIt: 'Structured operational updates keeping commercial teams informed of critical freight milestones, container gate moves, and estimated arrival updates.',
          suitability: 'Essential for commercial operations that require inventory arrival certainty to plan production and customer fulfillment.',
          considerations: 'Automated milestone reporting integrates with Bill of Lading records for verifiable audit trails.',
          quoteRequirements: 'Current operational requirements and desired notification parameters.'
        }
      }
    ]
  }
];

const Services = ({ onOpenQuote }) => {
  const navigate = useNavigate();

  // Active Category Filter: 'all' | 'air-freight' | 'sea-freight' | etc.
  const [activeCategory, setActiveCategory] = useState('all');

  // Track expanded sub-option for each service: { [serviceId]: optionId | null }
  // Closed by default; clients click on any feature card to view details
  const [expandedOptions, setExpandedOptions] = useState({});

  const toggleSubOption = (serviceId, optionId) => {
    setExpandedOptions((prev) => ({
      ...prev,
      [serviceId]: prev[serviceId] === optionId ? null : optionId
    }));
  };

  const filteredServices = activeCategory === 'all'
    ? SERVICES_DATA
    : SERVICES_DATA.filter((s) => s.id === activeCategory);

  return (
    <div className="relative bg-white text-slate-900 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: PREMIUM OVERSIZED "LOGISTICS SOLUTIONS" TYPOGRAPHY */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/70 via-white to-white border-b border-slate-100">
        
        {/* Subtle Watermark Word in Background */}
        <div 
          className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[120px] sm:text-[180px] md:text-[230px] lg:text-[290px] font-black uppercase tracking-tighter text-slate-100/60 leading-none z-0 overflow-hidden whitespace-nowrap"
          aria-hidden="true"
        >
          SOLUTIONS
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Eyebrow Label */}
          <div className="mb-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#00539C]">
              What We Do
            </span>
          </div>

          {/* Oversized Heading (90px - 140px range on desktop) */}
          <div className="relative mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black uppercase tracking-tight text-slate-900 leading-[0.92] select-none">
              Logistics <span className="text-[#00539C]">Solutions</span>
              <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-orange-500 ml-2 align-baseline" />
            </h1>
          </div>

          {/* Hero Content: Supporting Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
                Moving Your Business Forward, <br className="hidden sm:inline" />
                <span className="text-[#00539C]">One Route</span> at a Time.
              </h2>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                From ocean freight to air cargo and road transportation, explore logistics solutions designed to help businesses move goods with greater clarity, coordination, and confidence.
              </p>

              {/* Quick Service Tags */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs font-bold text-slate-700">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Plane className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Air Freight</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Ship className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Sea Freight</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Truck className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Road Haulage</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
                  <Warehouse className="w-3.5 h-3.5 text-[#00539C]" />
                  <span>Warehousing</span>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Image Showcase */}
          <div className="mt-12 sm:mt-16 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
            <div className="relative h-72 sm:h-96 md:h-[440px] w-full overflow-hidden bg-slate-900">
              <img
                src="/assets/images/services-hero-intermodal.jpg"
                alt="SKY2SEA Comprehensive Freight & Logistics Solutions"
                className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/20 to-transparent" />

              {/* Floating Status Banner */}
              <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-auto max-w-lg p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00539C]">Multi-Modal Corridors</span>
                </div>
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  Synchronized freight movement connecting sea ports, air gateways, and overland networks.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER NAVIGATION BAR */}
      {/* ========================================================================= */}
      <section className="sticky top-20 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#00539C] text-white shadow-md font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              All Services ({SERVICES_DATA.length})
            </button>
            {SERVICES_DATA.map((srv) => {
              const isActive = activeCategory === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveCategory(srv.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#00539C] text-white shadow-md font-bold'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
                >
                  {srv.title}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MAIN SERVICES LIST (EQUAL TREATMENT, RICH INTERACTION & DETAILS) */}
      {/* ========================================================================= */}
      <div className="divide-y divide-slate-100">
        {filteredServices.map((service, sIndex) => {
          const IconComp = serviceIcons[service.id] || Ship;
          const isEven = sIndex % 2 === 0;
          const currentExpandedOption = expandedOptions[service.id];

          return (
            <section 
              key={service.id} 
              id={service.id}
              className={`py-24 relative scroll-mt-28 ${isEven ? 'bg-white' : 'bg-slate-50/70'}`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main Service Card Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                  
                  {/* Visual Image Presentation */}
                  <div className={`lg:col-span-5 relative ${isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                      <img
                        src={service.image}
                        alt={`SKY2SEA ${service.title}`}
                        className="w-full h-80 sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                      
                      {/* Floating Service Badge */}
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
                        <IconComp className="w-4 h-4 text-[#00539C]" />
                        <span className="text-xs font-bold text-slate-800">{service.title}</span>
                      </div>

                      {/* Bottom Caption */}
                      <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md text-white border border-white/10">
                        <p className="text-xs font-semibold text-sky-200 uppercase tracking-wider">SKY2SEA Operations</p>
                        <p className="text-sm font-medium text-white mt-0.5">{service.tagline}</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Content & Interactive Sub-Options */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                    
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-black font-display text-[#00539C]/40">
                          {service.number}
                        </span>
                        <span className="text-xs font-extrabold uppercase tracking-widest text-[#00539C]">
                          Core Logistics Service
                        </span>
                      </div>

                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>

                    {/* Core Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/90 text-xs font-medium text-slate-700 shadow-2xs">
                          <Check className="w-4 h-4 text-[#00539C] shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Interactive Sub-Options (e.g. FCL vs LCL in Sea Freight, Priority vs Consolidated in Air, etc.) */}
                    {service.subOptions && service.subOptions.length > 0 && (
                      <div className="pt-4 space-y-4">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                            Service Options & Specifications (Click to Explore):
                          </p>
                          <span className="text-[11px] font-semibold text-slate-400">
                            Interactive details
                          </span>
                        </div>

                        {/* Sub-option Selector Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.subOptions.map((opt) => {
                            const isSelected = currentExpandedOption === opt.id;
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => toggleSubOption(service.id, opt.id)}
                                className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                                  isSelected
                                    ? 'border-[#00539C] ring-2 ring-[#00539C]/20 bg-sky-50/50 shadow-sm'
                                    : 'border-slate-200 bg-white hover:border-[#00539C]/40 hover:bg-slate-50'
                                }`}
                              >
                                <div>
                                  <div className="flex items-center justify-between mb-1.5">
                                    <span className="font-extrabold text-slate-900 text-sm group-hover:text-[#00539C] transition-colors">
                                      {opt.name}
                                    </span>
                                    {isSelected ? (
                                      <ChevronUp className="w-4 h-4 text-[#00539C]" />
                                    ) : (
                                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                                    )}
                                  </div>
                                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                                    {opt.shortDesc}
                                  </p>
                                </div>

                                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                                  <span className={isSelected ? 'text-[#00539C]' : 'text-slate-500'}>
                                    {isSelected ? 'Viewing details' : 'Click to learn more'}
                                  </span>
                                  <span className="text-orange-500">&rarr;</span>
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Expandable Information Drawer */}
                        <AnimatePresence>
                          {currentExpandedOption && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              {(() => {
                                const selectedOptionData = service.subOptions.find(o => o.id === currentExpandedOption);
                                if (!selectedOptionData) return null;
                                const { details } = selectedOptionData;

                                return (
                                  <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5 relative">
                                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                      <div className="flex items-center gap-2">
                                        <Info className="w-4 h-4 text-orange-400" />
                                        <h4 className="font-bold text-white text-base">
                                          {selectedOptionData.name} — Detailed Breakdown
                                        </h4>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => toggleSubOption(service.id, currentExpandedOption)}
                                        className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded bg-white/10 cursor-pointer"
                                      >
                                        Hide
                                      </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-300">
                                      <div className="space-y-3">
                                        <div>
                                          <p className="font-bold text-white mb-1">What It Means:</p>
                                          <p className="leading-relaxed text-slate-300 font-normal">{details.whatIsIt}</p>
                                        </div>
                                        <div>
                                          <p className="font-bold text-white mb-1">When Suitable:</p>
                                          <p className="leading-relaxed text-slate-300 font-normal">{details.suitability}</p>
                                        </div>
                                      </div>

                                      <div className="space-y-3">
                                        <div>
                                          <p className="font-bold text-white mb-1">Operational Considerations:</p>
                                          <p className="leading-relaxed text-slate-300 font-normal">{details.considerations}</p>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                                          <p className="font-bold text-orange-300 mb-1">Information Required for a Quote:</p>
                                          <p className="text-slate-300 leading-relaxed font-normal">{details.quoteRequirements}</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                                      <span className="text-xs text-slate-400">
                                        Need specific rates for {selectedOptionData.name}?
                                      </span>
                                      <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => onOpenQuote(service.id)}
                                        icon={ArrowRight}
                                        className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                                      >
                                        Request {service.title} Quote
                                      </Button>
                                    </div>
                                  </div>
                                );
                              })()}
                            </motion.div>
                          )}
                        </AnimatePresence>

                      </div>
                    )}

                    {/* Bottom Action Button for the Service */}
                    <div className="pt-4 flex flex-wrap items-center gap-4">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => onOpenQuote(service.id)}
                        icon={ArrowRight}
                        className="bg-[#00539C] hover:bg-[#00427c] text-white shadow-md"
                      >
                        Request a Quote for {service.title}
                      </Button>

                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => navigate('/contact')}
                        icon={Mail}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                      >
                        Contact Freight Desk
                      </Button>
                    </div>

                  </div>

                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 4. FINAL CALL TO ACTION (MATCHING ABOUT US DESIGN) */}
      {/* ========================================================================= */}
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
                  onClick={() => onOpenQuote(null)}
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

export default Services;
