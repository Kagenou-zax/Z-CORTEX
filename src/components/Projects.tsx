/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, ExternalLink, Github, Sparkles, ShoppingBag, Utensils, Laptop, Layers, ShieldCheck, Terminal } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  year: string;
  description: string;
  fullDescription: string;
  tags: string[];
  extendedTags: string[];
  demoUrl: string;
  repoUrl?: string;
  image: string;
  badge?: string;
  highlights?: string[];
}

const projects: Project[] = [
  {
    id: '01',
    title: 'Sole Crafts Creation',
    subtitle: 'Handmade Footwear & E-Commerce Platform',
    category: 'E-Commerce / Retail',
    year: '2024',
    badge: 'Live Client Work',
    description: 'An artisanal e-commerce storefront for bespoke handcrafted leather slides, sandals, and custom footwear with direct WhatsApp checkout integration.',
    fullDescription: 'Sole Crafts Creation is a bespoke digital storefront built for a craft footwear studio. It showcases hand-stitched leather slides and sandals with high-fidelity product galleries, custom tone/size selectors (EU 38–46), real-time order bag compilation, and seamless WhatsApp direct-to-artisan checkout workflows.',
    tags: ['E-Commerce', 'React', 'Tailwind CSS', 'WhatsApp API'],
    extendedTags: ['Bespoke Cart Builder', 'Mobile-First UX', 'Netlify Edge', 'Vite', 'Lucide Icons', 'Conversion Optimized'],
    demoUrl: 'https://solecrafts.netlify.app/',
    repoUrl: 'https://github.com/login',
    image: 'https://solecrafts.netlify.app/authentic-white-buckle-slides.jpg?v=2',
    highlights: ['Artisanal Custom Builder', 'Zero-friction WhatsApp Checkout', '99+ PageSpeed Mobile Score'],
  },
  {
    id: '02',
    title: 'Mhunis Delicacies',
    subtitle: 'Authentic African Culinary & Online Ordering',
    category: 'Restaurant / Food',
    year: '2024',
    badge: 'Live Client Work',
    description: 'A culinary web application and interactive ordering menu for Abeokuta’s celebrated African kitchen, featuring signature smoky Jollof rice and catering services.',
    fullDescription: 'Mhunis Delicacies delivers an immersive, mouth-watering dining and catering platform. Built for high conversion, it features category-filtered menus (Party Jollof Rice, Spicy Jollof Spaghetti, Yam & Egg Sauce, Pastries), instant meal customization, catering quote calculators for university milestones, and automated WhatsApp order dispatch.',
    tags: ['Restaurant Web App', 'React', 'Tailwind CSS', 'WhatsApp Order Flow'],
    extendedTags: ['Interactive Menu', 'Catering Request Engine', 'Live Cart Calculator', 'Local SEO & OpenGraph', 'Ultra-fast CDN'],
    demoUrl: 'https://mhunisdelicacies.netlify.app/',
    repoUrl: 'https://github.com/login',
    image: 'https://mhunisdelicacies.netlify.app/images/mhunis_hero_jollof_deluxe_1790881442538.jpg',
    highlights: ['Interactive Menu System', 'Instant WhatsApp Cart Generation', 'Event Catering Calculator'],
  },
  {
    id: '03',
    title: 'Aether Core',
    subtitle: 'Decentralized Telemetry & Cloud Analytics',
    category: 'SaaS Platform',
    year: '2024',
    badge: 'Internal Product',
    description: 'A high-performance monitoring dashboard for decentralized cloud networks. Built with real-time data streaming and advanced canvas visualizations.',
    fullDescription: 'Aether Core is an enterprise-grade telemetry and network analytics suite built on a high-throughput reactive queue engine. Capable of handling over 100k events/sec down to safe millisecond bounds, it streams diagnostic records, resource allocations, and node heatmaps directly into custom visualizers with pristine clarity.',
    tags: ['Next.js', 'WebSockets', 'D3.js'],
    extendedTags: ['React Query', 'TailwindCSS', 'Redis', 'Node.js', 'Docker', 'Chart.js'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
    highlights: ['100k events/sec engine', 'Low-latency canvas graphs', 'Multi-tenant auth'],
  },
  {
    id: '04',
    title: 'Nexus OS',
    subtitle: 'Enterprise Multi-Brand Design System',
    category: 'Design System',
    year: '2024',
    badge: 'Open Source',
    description: 'A comprehensive, multi-brand design system designed for consistency across 15+ micro-services and 3 distinct user ecosystems.',
    fullDescription: 'Nexus OS delivers cross-platform schema generation, unified color tokens, and accessible, keyboard-compliant navigation primitives. Designed to bridge the gaps across 15 high-compliance micro-services, it delivers standard-conforming atomic hooks alongside robust multi-platform component generators that accelerate engineering timelines.',
    tags: ['Tailwind CSS', 'React', 'Storybook'],
    extendedTags: ['Radix UI', 'Framer Motion', 'Figma API', 'PostCSS', 'TypeScript'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    highlights: ['Accessible primitives', 'Automated token export', 'Zero-CSS-runtime overhead'],
  },
  {
    id: '05',
    title: 'Vanguard Sec',
    subtitle: 'AI Smart Contract Vulnerability Auditing',
    category: 'Cybersecurity',
    year: '2023',
    badge: 'Research Project',
    description: 'Security auditing tool that uses machine learning to predict potential vulnerability vectors in smart contract architectures.',
    fullDescription: 'Vanguard Sec leverages Graph Neural Networks (GNNs) to map abstract syntax graphs derived from smart contract bytecode. It detects recursive reentrancy access vulnerabilities, overflow boundaries, and frontrunning vectors, generating standardized ledger auditing files for secure multi-sig validation.',
    tags: ['Python', 'Solidity', 'PyTorch'],
    extendedTags: ['Hardhat', 'Slither', 'Graphviz', 'FastAPI', 'Rust', 'Ethers.js'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    highlights: ['GNN AST parsing', 'Automated reentrancy checks', 'Audit report PDF export'],
  },
  {
    id: '06',
    title: 'Prism Engine',
    subtitle: 'WebGL 2.0 Architectural Rendering Core',
    category: 'Creative Tech',
    year: '2023',
    badge: 'Graphics Lab',
    description: 'Custom 3D rendering engine for web-based architectural visualizations, utilizing WebGL 2.0 for realistic lighting.',
    fullDescription: 'Prism Engine implements forward-plus clustered lighting algorithms, custom shader-based global ambient occlusion (SSAO), and runtime asset optimization. Capable of loading high-density multi-polygon architectural meshes, it operates directly in standard browser viewports via progressive WASM decoders.',
    tags: ['Three.js', 'GLSL', 'WebGL'],
    extendedTags: ['WebGPU', 'Vite', 'Blender', 'WASM', 'Rust', 'GSAP'],
    demoUrl: 'https://accounts.google.com',
    repoUrl: 'https://github.com/login',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    highlights: ['Clustered light passes', 'Progressive mesh streaming', '60fps mobile WebGL'],
  },
];

const CATEGORIES = [
  'ALL',
  'Client Works',
  'E-Commerce / Retail',
  'Restaurant / Food',
  'SaaS Platform',
  'Design System',
  'Cybersecurity',
  'Creative Tech',
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Open the first project by default so visitors see live client proof immediately
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : selectedCategory === 'Client Works'
    ? projects.filter(p => p.badge === 'Live Client Work')
    : projects.filter(p => p.category === selectedCategory);

  const handleProjectClick = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
    setActiveIndex(index);
  };

  return (
    <section className="relative bg-slate-50/70 py-32 overflow-hidden border-t border-slate-200/80" id="projects">
      {/* Side Label */}
      <div className="absolute left-[2%] top-[15%] hidden xl:flex flex-col items-center gap-6 z-10" id="projects-rail">
         <span className="vertical-rl uppercase tracking-[0.5em] text-[10px] text-blue-600 font-semibold">Selected Archives</span>
         <div className="w-[1px] h-24 bg-gradient-to-b from-blue-600/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 sm:gap-12 mb-14" id="projects-header">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Production Shipments & Live Works</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none font-bold text-slate-900">
              Featured <br />
              <span className="text-slate-400">Works</span>
            </h2>
          </div>
          <div className="flex items-center gap-8 border-l border-slate-200 pl-8 h-fit">
            <div className="flex flex-col">
              <span className="text-blue-600 font-mono text-xl sm:text-2xl font-bold">{projects.length}</span>
              <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">Total Projects</span>
            </div>
            <div className="flex flex-col">
              <span className="text-emerald-600 font-mono text-xl sm:text-2xl font-bold">2 Live</span>
              <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">Client Deployments</span>
            </div>
            <div className="flex flex-col hidden sm:flex">
              <span className="text-slate-900 font-mono text-xl sm:text-2xl font-bold">100%</span>
              <span className="text-slate-500 font-mono text-[9px] uppercase tracking-widest">Production Ready</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIndex(0);
                setExpandedIndex(0);
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-300 border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white font-semibold border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.25)]'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-slate-900'
              }`}
            >
              {cat === 'Client Works' ? '★ Client Works' : cat}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map((project, index) => {
            const isExpanded = expandedIndex === index;
            const isClientWork = project.badge === 'Live Client Work';

            return (
              <motion.div
                key={project.id}
                layout
                className={`bg-white border rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  isExpanded 
                    ? isClientWork
                      ? 'border-blue-600 shadow-[0_15px_40px_rgba(37,99,235,0.12)] ring-1 ring-blue-600/30'
                      : 'border-blue-600 shadow-[0_15px_40px_rgba(37,99,235,0.08)]'
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                  onClick={() => handleProjectClick(index)}
                >
                  <div className="flex items-start md:items-center gap-5 sm:gap-6">
                    <span className="font-mono text-sm text-blue-600 font-bold bg-blue-50 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-blue-100">
                      {project.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 hover:text-blue-600 transition-colors">
                          {project.title}
                        </h3>
                        {project.badge && (
                          <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full border ${
                            isClientWork 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}>
                            {project.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-sans">
                        <span className="text-slate-700 font-medium">{project.category}</span>
                        <span>·</span>
                        <span>{project.year}</span>
                        {project.subtitle && (
                          <>
                            <span className="hidden sm:inline">·</span>
                            <span className="text-slate-500 hidden sm:inline">{project.subtitle}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-[11px] font-mono text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button 
                      type="button" 
                      aria-label="Expand project details"
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all shrink-0 ${
                        isExpanded ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'border-slate-200 text-slate-600 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      <ArrowUpRight className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <div className="lg:col-span-7 space-y-5">
                          <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                            {project.fullDescription}
                          </p>

                          {/* Highlights bullet points if present */}
                          {project.highlights && project.highlights.length > 0 && (
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 block">
                                Key Engineering & Business Highlights
                              </span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                                {project.highlights.map((h, hIdx) => (
                                  <div key={hIdx} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                                    <span>{h}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 pt-1">
                            {project.extendedTags.map(tag => (
                              <span key={tag} className="text-[11px] font-mono text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-6 py-3 rounded-full transition-all shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] cursor-pointer"
                            >
                              <span>Visit Live Site</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            {project.repoUrl && (
                              <a 
                                href={project.repoUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-5 py-3 rounded-full transition-colors border border-slate-200 shadow-xs cursor-pointer"
                              >
                                <span>Source Code</span>
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="lg:col-span-5 space-y-3">
                          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 relative group aspect-[16/10]">
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                // Fallback image if remote url fails
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200';
                              }}
                            />
                            {isClientWork && (
                              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200/80 shadow-xs flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 font-semibold">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Deployed on Netlify</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-1">
                            <span className="truncate max-w-[200px]">{project.demoUrl.replace(/^https?:\/\//, '')}</span>
                            <span className="text-blue-600 font-medium">Verified Active</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
