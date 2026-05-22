/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Gauge, Globe, Layers, Settings, Zap } from 'lucide-react';

const steps = [
  { id: 'craftsmanship', label: 'Craftsmanship', title: 'The Art of Code', desc: 'Meticulous attention to detail in every line of code, ensuring performance and elegance coexist.' },
  { id: 'architecture', label: 'Architecture', title: 'System Design', desc: 'Building scalable infrastructures that stand the test of time and high-traffic demands.' },
  { id: 'technology', label: 'Technology', title: 'Modern Stack', desc: 'Leveraging the latest frameworks and tools to deliver cutting-edge digital experiences.' },
  { id: 'protection', label: 'Protection', title: 'Security First', desc: 'Implementing robust security protocols and best practices to safeguard user data.' },
  { id: 'performance', label: 'Performance', title: 'Luxury Speed', desc: 'Optimization as a core principle, delivering sub-second response times and fluid interactions.' },
];

const stats = [
  { label: 'Engine', value: 'TypeScript + Node.js', icon: <Cpu className="w-4 h-4" /> },
  { label: 'Transmission', value: 'Vite / Fast-CI', icon: <Settings className="w-4 h-4" /> },
  { label: 'Power', value: 'Gemini AI / LLMs', icon: <Zap className="w-4 h-4" /> },
  { label: 'Suspension', value: 'Tailwind / Framer', icon: <Layers className="w-4 h-4" /> },
  { label: 'Audio', value: 'Clean & DRY Code', icon: <Gauge className="w-4 h-4" /> },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(steps[0]);

  return (
    <section className="relative bg-black py-32 overflow-hidden border-t border-white/5" id="about">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Top Header Information */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
           <div className="space-y-2">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">The Methodology</span>
             </div>
             <h2 className="font-display text-4xl uppercase tracking-tight font-medium">
               Excellence Without <br />
               <span className="text-white/20">Compromise</span>
             </h2>
           </div>
           
           <div className="flex items-center gap-4 text-white/30 font-mono text-[9px] uppercase tracking-widest border-b border-white/10 pb-2">
             <span>Noirbyte Series II</span>
             <span className="w-8 h-[1px] bg-white/10" />
             <span>Est. 2024</span>
           </div>
        </div>

        {/* Main Display Grid - Based on RR Layout */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 min-h-[60vh]">
          
          {/* Left Navigation (Sidebar) */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2 flex flex-col gap-3">
             {steps.map((step) => (
               <button
                 key={step.id}
                 onClick={() => setActiveStep(step)}
                 className={`w-full text-left px-6 py-3 rounded-sm transition-all duration-300 font-display text-[11px] uppercase tracking-widest border ${
                   activeStep.id === step.id 
                     ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                     : 'bg-transparent text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                 }`}
               >
                 {step.label}
               </button>
             ))}
          </div>

          {/* Central Display Area */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 relative group">
             <div className="absolute inset-0 bg-[#0A0A0A] border border-white/5 overflow-hidden">
                
                {/* Background Typography */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-5">
                   <h3 className="font-display text-[25vw] font-bold uppercase tracking-tighter">
                     {activeStep.label}
                   </h3>
                </div>

                {/* The "Main Asset" - Using generated image or abstract */}
                <motion.div 
                  key={activeStep.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-12 lg:p-24"
                >
                   <div className="relative w-full max-w-2xl aspect-[16/9] lg:aspect-square flex items-center justify-center">
                      <img 
                        src="/src/assets/images/technical_abstract_dark_1779108165415.png" 
                        alt="Process Visualization" 
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   </div>
                </motion.div>

                {/* Informational Overlays */}
                <div className="absolute top-10 left-10 space-y-2 max-w-sm z-20">
                   <motion.div 
                     key={activeStep.id + '-text'}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="space-y-4"
                   >
                      <h4 className="font-display text-4xl uppercase font-bold tracking-tight text-white/90">
                        {activeStep.title}
                      </h4>
                      <p className="text-white/40 text-xs leading-relaxed">
                        {activeStep.desc}
                      </p>
                   </motion.div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-4 right-4 text-brand/40">
                   <Globe className="w-5 h-5 animate-spin-slow" />
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Specs Bar - Replicating the RR Spec Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/5 border border-white/5 mt-12 rounded-sm overflow-hidden">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-black p-8 space-y-4 border-r border-white/5 last:border-r-0">
               <div className="flex items-center justify-between">
                 <span className="font-display font-medium text-[11px] uppercase tracking-widest text-white/90">{stat.label}</span>
                 <div className="text-brand/40">{stat.icon}</div>
               </div>
               <div className="space-y-1">
                 <p className="text-[13px] font-mono text-white/60">{stat.value}</p>
                 <div className="w-full h-[1px] bg-gradient-to-r from-brand/40 to-transparent" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
