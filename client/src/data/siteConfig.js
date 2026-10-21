/**
 * Centralized Site Configuration for SKY2SEA (S2S)
 * Easy editing for brand details, contact info, images, services, and statistics.
 */

export const BRAND_CONFIG = {
  name: "SKY2SEA",
  shortName: "S2S",
  tagline: "Moving Possibilities. Connecting the World.",
  subTagline: "Modern end-to-end multi-modal logistics & ocean-to-sky transportation solutions engineered for global commerce.",
  useImageLogo: false, // Set to true when real logo image is provided
  logoImageSrc: "/assets/images/logo.png",
  logoAlt: "SKY2SEA Logistics Logo"
};

export const CONTACT_CONFIG = {
  email: "sky2seaglobal@gmail.com",
  salesEmail: "sky2seaglobal@gmail.com",
  phone: "",
  altPhone: "",
  address: "SKY2SEA Logistics Tower, Financial & Cargo Hub District, Mumbai, India",
  operatingHours: "Mon - Sat: 08:00 AM - 08:00 PM IST",
  socials: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  }
};

export const IMAGE_ASSETS = {
  heroBg: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000", // High res cargo container port
  shipVisual: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=1400", // Cargo ship on sea
  airFreight: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200", // Aircraft loading cargo
  seaFreight: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200", // Ship at sea dusk
  roadFreight: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200", // Modern truck on highway
  warehousing: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200", // Modern warehouse facility
  freightForwarding: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200", // Container yard harbor
  supplyChain: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=1200", // Port logistics overhead view
  aboutHero: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1800", // Warehouse operations
  globalMapBg: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1800", // Earth connection map
  techLogistics: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&q=80&w=1200", // Tech & logistics tracking
};

export const SERVICES_DATA = [
  {
    id: "air-freight",
    title: "Air Freight",
    shortDesc: "Fast, reliable priority air charter & scheduled transport for time-critical global cargo.",
    fullDesc: "Our dedicated air freight division provides rapid, express, and standard international air transport options tailored for urgent, high-value, or temperature-controlled goods with real-time flight tracking.",
    image: IMAGE_ASSETS.airFreight,
    badge: "Express Speed",
    features: ["Global Airport-to-Airport", "Door-to-Door Delivery", "Charter Services", "Temperature Controlled Storage"]
  },
  {
    id: "sea-freight",
    title: "Sea Freight",
    shortDesc: "Cost-effective ocean shipping for FCL and LCL high-volume international freight.",
    fullDesc: "Leveraging key vessel charter agreements, we offer flexible Full Container Load (FCL) and Less than Container Load (LCL) solutions connecting ocean ports worldwide with optimized transit schedules.",
    image: IMAGE_ASSETS.seaFreight,
    badge: "High Capacity",
    features: [
      "FCL (Full Container Load)",
      "LCL (Less than Container Load)",
      "Port-to-Port & Door-to-Door Solutions",
      "Port Customs Clearance Coordination",
      "Reefer & Specialized Equipment Handling"
    ]
  },
  {
    id: "road-transportation",
    title: "Road Transportation",
    shortDesc: "Reliable ground distribution networks connecting ports, hubs, and end destinations.",
    fullDesc: "Seamless overland haulage powered by dedicated heavy fleet networks, container trailers, and last-mile logistics ensuring precision delivery across country borders and inland corridors.",
    image: IMAGE_ASSETS.roadFreight,
    badge: "Flexible Overland",
    features: ["Full Truckload (FTL)", "Less Truckload (LTL)", "GPS Real-time Tracking", "Cross-Border Trucking"]
  },
  {
    id: "warehousing",
    title: "Warehousing & Hubs",
    shortDesc: "Secure, climate-managed storage and high-speed order fulfillment facilities.",
    fullDesc: "State-of-the-art storage centers equipped with modern inventory management systems, palletized racks, cross-docking, and automated picking processes to streamline product flows.",
    image: IMAGE_ASSETS.warehousing,
    badge: "Smart Storage",
    features: ["Short & Long Term Storage", "Cross-Dock Operations", "Inventory Tracking System", "Value-Added Packaging"]
  },
  {
    id: "freight-forwarding",
    title: "Freight Forwarding",
    shortDesc: "Multi-stage freight routing, customs brokerage, and complex paperwork clearance.",
    fullDesc: "Complete multimodal freight coordination, managing customs document compliance, tariff classifications, port handling fees, and international shipping legal protocols smoothly.",
    image: IMAGE_ASSETS.freightForwarding,
    badge: "End-to-End",
    features: ["Customs Clearance", "Import/Export Documentation", "Insurance Coverage", "Multi-modal Transfers"]
  },
  {
    id: "supply-chain",
    title: "Supply Chain Solutions",
    shortDesc: "Custom integrated supply chain architecture optimizing costs and speed to market.",
    fullDesc: "Strategic end-to-end supply chain design, route optimization analysis, vendor coordination, and real-time visibility tools to transform logistically complex supply lines into competitive advantages.",
    image: IMAGE_ASSETS.supplyChain,
    badge: "Strategic Design",
    features: ["Route Optimization", "Vendor Management", "Customs Advisory", "Risk Mitigation"]
  }
];

export const WHY_CHOOSE_US = [
  {
    step: "01",
    stage: "Dispatch & Movement",
    icon: "Truck",
    title: "Fast & Safe Delivery",
    desc: "We focus on dependable transportation and timely delivery to help your business keep moving."
  },
  {
    step: "02",
    stage: "Handling & Protection",
    icon: "ShieldCheck",
    title: "Product Security",
    desc: "Your cargo deserves careful handling and attention throughout its logistics journey."
  },
  {
    step: "03",
    stage: "Commercial Value",
    icon: "BadgePercent",
    title: "Price Oriented",
    desc: "Practical logistics solutions designed to balance transportation costs with your business requirements."
  },
  {
    step: "04",
    stage: "Seamless Booking",
    icon: "CreditCard",
    title: "Secured Payment",
    desc: "A straightforward payment experience designed to support confidence throughout the booking process."
  },
  {
    step: "05",
    stage: "Continuous Support",
    icon: "Headset",
    title: "24/7 Support",
    desc: "We aim to make communication and assistance accessible when your logistics needs require attention."
  },
  {
    step: "06",
    stage: "Industry Expertise",
    icon: "Globe",
    title: "Well Experienced",
    desc: "Industry knowledge and practical logistics experience help us understand the challenges involved in moving goods."
  }
];

export const APPROACH_STEPS = [
  {
    number: "01",
    step: "Understand",
    title: "Needs Assessment",
    desc: "We analyze your cargo profile, transit deadlines, volume commitments, and compliance constraints."
  },
  {
    number: "02",
    step: "Plan",
    title: "Route & Carrier Strategy",
    desc: "We design an optimal multi-modal shipping route balancing cost-efficiency, speed, and carrier capacity."
  },
  {
    number: "03",
    step: "Move",
    title: "Execution & Real-Time Tracking",
    desc: "Cargo is dispatched with end-to-end digital tracking and proactive milestone management."
  },
  {
    number: "04",
    step: "Deliver",
    title: "Final Destination & Verification",
    desc: "Customs clearing, final mile handoff, and immediate digital Proof of Delivery (POD) confirmation."
  }
];

export const CONNECTIVITY_ROUTES = [
  { from: "India (Mumbai / Mundra)", to: "Middle East (Jebel Ali)", duration: "3-5 Days" },
  { from: "Middle East (Jebel Ali)", to: "Europe (Rotterdam / Hamburg)", duration: "10-14 Days" },
  { from: "Europe (Rotterdam)", to: "Asia (Singapore / Shanghai)", duration: "16-20 Days" },
];
