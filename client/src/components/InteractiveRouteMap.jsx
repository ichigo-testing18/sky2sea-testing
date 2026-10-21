import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, Anchor, Plane } from 'lucide-react';

const NODES = [
  { id: 'india', name: 'India Hub', location: 'Mumbai / Mundra Port', x: 22, y: 56, type: 'sea-air', highlight: 'Primary Origin & Export Center' },
  { id: 'middle-east', name: 'Middle East Hub', location: 'Jebel Ali / Dubai', x: 44, y: 46, type: 'sea-air', highlight: 'Strategic Transit & Logistics Hub' },
  { id: 'europe', name: 'Europe Corridor', location: 'Rotterdam / Hamburg', x: 68, y: 34, type: 'sea', highlight: 'Major European Freight Port' },
  { id: 'asia', name: 'Asia Pacific', location: 'Singapore / Shanghai', x: 88, y: 62, type: 'sea-air', highlight: 'High-Density Trade Hub' },
];

const InteractiveRouteMap = () => {
  const [activeNode, setActiveNode] = useState(NODES[0]);

  return (
    <div className="relative w-full bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 overflow-hidden shadow-sm">
      {/* Title Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Global Connectivity Network
        </h3>
        <p className="text-sm text-slate-600 mt-2">
          Visually tracking continuous shipping routes across India, Middle East, Europe, and Asia Pacific.
        </p>
      </div>

      {/* SVG Canvas for Route Paths */}
      <div className="relative z-10 w-full h-[280px] sm:h-[340px] border border-slate-200 rounded-2xl bg-white p-4 flex flex-col justify-between overflow-hidden shadow-xs">
        
        {/* SVG Animated Arc Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Dotted Route Line 1: India -> Middle East */}
          <path
            d="M 220 224 Q 330 150 440 184"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-dash"
          />

          {/* Dotted Route Line 2: Middle East -> Europe */}
          <path
            d="M 440 184 Q 560 110 680 136"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-dash"
          />

          {/* Dotted Route Line 3: Europe -> Asia */}
          <path
            d="M 680 136 Q 780 280 880 248"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            strokeDasharray="6 6"
            className="animate-dash"
          />

          {/* Moving Animated Vessel Pulse */}
          <circle r="6" fill="#0284C7">
            <animateMotion
              path="M 220 224 Q 330 150 440 184 Q 560 110 680 136 Q 780 280 880 248"
              dur="8s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        {/* Interactive Node Markers */}
        <div className="relative w-full h-full">
          {NODES.map((node) => {
            const isSelected = activeNode.id === node.id;

            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                onClick={() => setActiveNode(node)}
              >
                {/* Pulse Ring */}
                <div className={`absolute -inset-3 rounded-full bg-seablue-400/20 animate-ping ${isSelected ? 'opacity-100' : 'opacity-40'}`} />

                {/* Node Button */}
                <div className={`relative flex items-center justify-center rounded-full p-2 border transition-all duration-300 ${isSelected ? 'w-10 h-10 bg-seablue-600 border-white text-white shadow-md shadow-seablue-600/30 scale-110' : 'w-8 h-8 bg-white border-seablue-300 text-seablue-600 hover:bg-seablue-50'}`}>
                  {node.type === 'sea-air' ? <Anchor className="w-4 h-4" /> : <Plane className="w-4 h-4" />}
                </div>

                {/* Label Tooltip */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 border border-slate-800 px-3 py-1 rounded-lg shadow-lg">
                  <p className="text-xs font-bold text-white">{node.name}</p>
                  <p className="text-[10px] text-seablue-300">{node.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Corridor Info Cards */}
      <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {NODES.map((node) => (
          <div
            key={node.id}
            onClick={() => setActiveNode(node)}
            className={`p-4 rounded-2xl cursor-pointer border transition-all duration-300 ${activeNode.id === node.id ? 'bg-seablue-50 border-seablue-400 shadow-md' : 'bg-white border-slate-200 hover:border-slate-300'}`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-seablue-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{node.name}</h4>
            </div>
            <p className="text-sm font-bold text-seablue-700">{node.location}</p>
            <p className="text-xs text-slate-500 mt-1">{node.highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveRouteMap;
