/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Code, ExternalLink, ShieldCheck, Github } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'Aether Core',
    category: 'SaaS Platform',
    year: '2024',
    description: 'A high-performance monitoring dashboard for decentralized cloud networks. Built with real-time data streaming and advanced visualization.',
    fullDescription: 'Aether Core is an enterprise-grade telemetry and network analytics suite built on a high-throughput reactive queue engine. Capable of handling over 100k events/sec down to safe millisecond bounds, it streams diagnostic records, resource allocations, and node heatmaps directly into custom canvas visualizers with pristine clarity.',
    tags: ['Next.js', 'WebSockets', 'D3.js'],
    extendedTags: ['React Query', 'TailwindCSS', 'Redis', 'Node.js', 'Docker', 'Chart.js'],
    demoUrl: 'https://accounts.google.com', // Realistic standard navigation placeholder
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '02',
    title: 'Nexus OS',
    category: 'Design System',
    year: '2024',
    description: 'A comprehensive, multi-brand design system designed for consistency across 15+ micro-services and 3 distinct user ecosystems.',
    fullDescription: 'Nexus OS delivers cross-platform schema generation, unified color tokens, and accessible, keyboard-compliant navigation primitives. Designed to bridge the gaps across 15 high-compliance micro-services, it delivers standard-conforming atomic hooks alongside robust multi-platform component generators that accelerate engineering timelines.',
    tags: ['Tailwind', 'React', 'Storybook'],
    extendedTags: ['Radix UI', 'Framer Motion', 'Figma API', 'PostCSS', 'TypeScript'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '03',
    title: 'Vanguard Sec',
    category: 'Cybersecurity',
    year: '2023',
    description: 'Security auditing tool that uses ML to predict potential vulnerability vectors in smart contract architectures.',
    fullDescription: 'Vanguard Sec leverages Graph Neural Networks (GNNs) to map abstract syntax graphs derived from smart contract bytecode. It detects recursive reentrancy access vulnerabilities, overflow boundaries, and frontrunning vectors, generating standardized ledger auditing files for secure multi-sig validation.',
    tags: ['Python', 'Solidity', 'PyTorch'],
    extendedTags: ['Hardhat', 'Slither', 'Graphviz', 'FastAPI', 'Rust', 'Ethers.js'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '04',
    title: 'Prism Engine',
    category: 'Creative Tech',
    year: '2023',
    description: 'Custom 3D rendering engine for web-based architectural visualizations, utilizing WebGL 2.0 for realistic lighting.',
    fullDescription: 'Prism Engine implements forward-plus clustered lighting algorithms, custom shader-based global ambient occlusion (SSAO), and runtime asset optimization. Capable of loading high-density multi-polygon architectural meshes, it operates directly in standard browser viewports via progressive WASM decoders.',
    tags: ['Three.js', 'GLSL', 'WebGL'],
    extendedTags: ['WebGPU', 'Vite', 'Blender', 'WASM', 'Rust', 'GSAP'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = selectedCategory === 'ALL' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0] || projects[0];

  const handleProjectClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setActiveIndex(index);
  };

  return (
    <section className="relative bg-black py-32 overflow-hidden border-t border-white/5" id="projects">
      {/* Side Label (Sticky-like feel) */}
      <div className="absolute left-[2%] top-[15%] hidden xl:flex flex-col items-center gap-6 z-10" id="projects-rail">
         <span className="vertical-rl uppercase tracking-[0.5em] text-[10px] text-brand/60 font-medium">Selected Archives</span>
         <div className="w-[1px] h-24 bg-gradient-to-b from-brand/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16" id="projects-header">
          <div className="space-y-4">
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none font-medium">
              Featured <br />
              <span className="text-white/20">Works</span>
            </h2>
          </div>
          <div className="flex items-center gap-8 border-l border-white/10 pl-8 h-fit">
            <div className="flex flex-col">
              <span className="text-brand font-mono text-xl">{projects.length}</span>
              <span className="text-white/40 text-[10px] uppercase tracking-widest">Total Case Studies</span>
            </div>
            <p className="text-white/40 text-xs max-w-[200px] leading-relaxed">
              Carefully curated projects focusing on high-end performance and design precision.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pb-8 mb-12 border-b border-white/5" id="projects-filter-bar">
          {['ALL', 'SaaS Platform', 'Design System', 'Cybersecurity', 'Creative Tech'].map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setActiveIndex(0);
                  setExpandedIndex(null);
                }}
                className={`px-4 py-2 font-mono text-[9px] md:text-[10px] uppercase tracking-widest border transition-all duration-300 relative rounded-sm ${
                  isActive 
                    ? 'bg-brand/10 border-brand text-brand hover:bg-brand/15' 
                    : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/[0.08] hover:text-white hover:border-white/20'
                }`}
              >
                {isActive && (
                  <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-brand animate-pulse" />
                )}
                {category === 'ALL' ? 'Show All' : category}
              </button>
            );
          })}
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-12 gap-12">
          {/* List Column */}
          <div className="col-span-12 lg:col-span-5 space-y-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                key={project.id}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleProjectClick(index)}
                className={`relative px-8 py-10 cursor-pointer transition-all duration-500 border border-transparent border-b-white/5 group rounded-sm hover:-translate-y-0.5 hover:scale-[1.01] ${
                  expandedIndex === index 
                    ? 'bg-white/[0.06] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]' 
                    : activeIndex === index 
                      ? 'bg-white/[0.03] border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)]' 
                      : 'hover:bg-white/[0.02] hover:border-white/10 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]'
                }`}
                id={`project-item-${project.id}`}
              >
                {/* Active/Expanded Indicator Line */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: (activeIndex === index || expandedIndex === index) ? '100%' : '0%',
                    opacity: (activeIndex === index || expandedIndex === index) ? 1 : 0
                  }}
                  className="absolute left-0 top-0 w-[2px] bg-brand"
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-brand uppercase tracking-widest block">
                      {project.id} / {project.category}
                    </span>
                    <h3 className={`font-display text-2xl uppercase tracking-widest transition-colors duration-300 ${
                      (activeIndex === index || expandedIndex === index) ? 'text-white' : 'text-white/40'
                    }`}>
                      {project.title}
                    </h3>
                  </div>
                  <div className={`transition-all duration-500 transform ${
                    (activeIndex === index || expandedIndex === index) ? 'rotate-95 text-brand' : 'rotate-45 text-white/40 group-hover:text-white'
                  }`}>
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Sub-text revealed on active / expanded */}
                <AnimatePresence initial={false}>
                  {(activeIndex === index || expandedIndex === index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      {expandedIndex !== index ? (
                        <>
                          <p className="pt-6 text-white/50 text-xs leading-relaxed max-w-[40ch]">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-6">
                            {project.tags.map(tag => (
                              <span key={tag} className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <p className="pt-4 text-brand font-mono text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            <span>Click to expand specs</span>
                            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                          </p>
                        </>
                      ) : (
                        <div className="pt-6 space-y-6" onClick={(e) => e.stopPropagation()}>
                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-brand block mb-2">Detailed Spec-Sheet</span>
                            <p className="text-white/85 text-xs leading-relaxed max-w-[45ch]">
                              {project.fullDescription}
                            </p>
                          </div>

                          <div>
                            <span className="font-mono text-[9px] uppercase tracking-widest text-brand block mb-3">System Technologies</span>
                            <div className="flex flex-wrap gap-2 max-w-[40ch]">
                              {project.extendedTags.map(tag => (
                                <span 
                                  key={tag} 
                                  className="text-[9px] font-mono bg-white/5 border border-white/10 px-2 py-1 rounded-sm text-white/60 hover:border-brand/40 hover:text-white transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-2">
                            <a 
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-brand text-black px-4 py-2.5 rounded-sm font-mono text-[10px] uppercase tracking-widest hover:bg-brand-light hover:shadow-lg hover:shadow-brand/20 transition-all"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Live Demo
                            </a>
                            <a 
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 hover:text-white px-4 py-2.5 rounded-sm font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                              <Code className="w-3.5 h-3.5 text-white/40" />
                              Repository
                            </a>
                          </div>

                          <button 
                            type="button"
                            onClick={() => handleProjectClick(index)}
                            className="text-white/30 hover:text-brand font-mono text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 cursor-pointer select-none transition-colors pt-2"
                          >
                            <span>Click to collapse specs</span>
                            <span>↑</span>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>

          {/* Preview Image Column */}
          <div className="col-span-12 lg:col-span-7 relative h-[60vh] lg:h-[70vh] sticky top-24" id="project-preview">
            <div className="absolute inset-0 bg-[#111] overflow-hidden">
               {/* Frame Corners */}
               <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-white/20 z-20" />
               <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-white/20 z-20" />
               <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-bottom border-white/20 z-20" />
               <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-bottom border-white/20 z-20" />

               <AnimatePresence mode="wait">
                 <motion.div
                    key={`${selectedCategory}-${activeIndex}`}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full"
                 >
                   <img 
                     src={activeProject.image} 
                     alt={activeProject.title}
                     className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" 
                     referrerPolicy="no-referrer"
                   />
                   
                   {/* Project Metadata Overlay */}
                   <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between z-30">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-brand font-mono text-[10px] uppercase">
                          <ShieldCheck className="w-3 h-3" /> Certified Dev
                        </div>
                        <h4 className="font-display text-4xl uppercase font-bold tracking-tighter">
                          {activeProject.title}
                        </h4>
                      </div>
                      
                      <button 
                        onClick={() => handleProjectClick(activeIndex)}
                        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-sm font-mono text-xs uppercase tracking-widest hover:bg-brand hover:text-white transition-all group"
                      >
                         {expandedIndex === activeIndex ? 'Minimize Details' : 'Expand Details'}
                         <ExternalLink className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                   </div>

                   {/* Overlay Gradients */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                 </motion.div>
               </AnimatePresence>
            </div>
            
            {/* Tech Specs Label (Right Side) */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 vertical-rl flex items-center gap-4 text-white/20">
               <div className="w-[1px] h-12 bg-white/10" />
               <span className="uppercase text-[9px] tracking-[0.4em] font-mono whitespace-nowrap">Technical Specs Attached / {activeProject.year}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
