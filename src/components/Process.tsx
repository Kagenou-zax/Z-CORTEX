/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, Gauge, Globe, Layers, Settings, Zap } from 'lucide-react';
import techAbstractImg from '../assets/images/technical_abstract_dark_1779108165415.png';

const steps = [
  { id: 'craftsmanship', label: 'Craftsmanship', title: 'The Art of Code', desc: 'Meticulous attention to detail in every line of code, ensuring performance and elegance coexist seamlessly.' },
  { id: 'architecture', label: 'Architecture', title: 'System Design', desc: 'Building scalable infrastructures that stand the test of time, high-traffic loads, and continuous delivery.' },
  { id: 'technology', label: 'Technology', title: 'Modern Stack', desc: 'Leveraging modern frameworks, type-safe runtimes, and reactive pipelines to deliver cutting-edge digital experiences.' },
  { id: 'protection', label: 'Protection', title: 'Security First', desc: 'Implementing robust security protocols, rate bounds, and token encryption standards to safeguard user systems.' },
  { id: 'performance', label: 'Performance', title: 'Luxury Speed', desc: 'Optimization as a core principle, delivering sub-second response times, fluid 60fps animations, and perfect scores.' },
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
    <section className="relative bg-white py-32 overflow-hidden border-t border-slate-200/80" id="about">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Top Header Information */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
           <div className="space-y-2">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.6)]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 font-semibold">The Methodology</span>
             </div>
             <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-tight font-bold text-slate-900">
               Excellence Without <br />
               <span className="text-slate-400">Compromise</span>
             </h2>
           </div>
           
           <div className="flex items-center gap-4 text-slate-500 font-mono text-[9px] uppercase tracking-widest border-b border-slate-200 pb-2">
             <span>Noirbyte Series II</span>
             <span className="w-8 h-[1px] bg-slate-300" />
             <span>Est. 2024</span>
           </div>
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 min-h-[500px]">
          
          {/* Left Navigation */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col gap-2.5">
             {steps.map((step) => (
               <button
                 key={step.id}
                 onClick={() => setActiveStep(step)}
                 className={`w-full text-left px-5 py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 font-display text-xs uppercase tracking-wider border cursor-pointer ${
                   activeStep.id === step.id 
                     ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-[0_6px_20px_rgba(37,99,235,0.25)]' 
                     : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-slate-900 hover:bg-white'
                 }`}
               >
                 {step.label}
               </button>
             ))}
          </div>

          {/* Central Display Area */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 relative">
             <div className="h-full bg-slate-50 border border-slate-200/90 overflow-hidden rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-blue-600 uppercase tracking-widest">
                    Phase // {activeStep.id}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
                    {activeStep.title}
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed max-w-2xl font-sans">
                    {activeStep.desc}
                  </p>
                </div>

                {/* Technical Specifications bar */}
                <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-blue-600">
                        {stat.icon}
                        <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">{stat.label}</span>
                      </div>
                      <p className="text-xs font-medium text-slate-800 truncate">{stat.value}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
