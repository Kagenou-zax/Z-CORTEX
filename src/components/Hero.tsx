import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Sparkles, CheckCircle2 } from 'lucide-react';
import heroImg from '../assets/images/hero_creative_workspace_1791787784513.jpg';

interface HeroProps {
  onStartProjectClick?: () => void;
}

const SERVICE_TAGS = [
  'Designing',
  'Branding',
  'Consulting',
  'Full-Stack',
  'Web Design',
  'SaaS Suites'
];

export default function Hero({ onStartProjectClick }: HeroProps) {
  const [activeTag, setActiveTag] = useState<string>('Designing');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.15
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden pt-28 pb-20 bg-white" id="home">
      {/* Background Architectural Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none z-0" id="bg-ambient">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-blue-500/5 blur-[160px] rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-600/5 blur-[150px] rounded-full" />
        {/* Subtle grid lines matching reference light blueprint */}
        <div className="absolute left-[10%] top-0 bottom-0 w-[1px] bg-slate-200/60" />
        <div className="absolute right-[10%] top-0 bottom-0 w-[1px] bg-slate-200/60" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center"
      >
        {/* Top Eyebrow Pill (Reference: Smart Marketing) */}
        <motion.div variants={itemVariants} className="mb-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-blue-600 text-xs font-mono font-medium tracking-wide shadow-sm hover:border-blue-300 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Digital Engineering & Architecture</span>
          </div>
        </motion.div>

        {/* Main Title (Reference: Our Tailored Services) */}
        <motion.h1 
          variants={itemVariants}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 capitalize leading-[1.08] max-w-3xl"
        >
          Our Tailored <span className="text-blue-600">Services</span>
        </motion.h1>

        {/* Subtitle (Reference style) */}
        <motion.p 
          variants={itemVariants}
          className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl font-sans leading-relaxed"
        >
          We create digital engineering experiences that resonate, perform, and last. From brand building to data-led platforms, we help you shape a unique technical identity.
        </motion.p>

        {/* The Central Iconic Visual Composition (Reference image showcase) */}
        <motion.div 
          variants={itemVariants}
          className="relative mt-12 sm:mt-16 w-full max-w-4xl"
        >
          {/* Main Visual Frame with organic rounded silhouette matching reference */}
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[2rem] sm:rounded-[2.75rem] overflow-hidden border border-slate-200/80 bg-slate-50 shadow-[0_20px_60px_rgba(15,23,42,0.12)] group">
            <img 
              src={heroImg} 
              alt="Creative workspace & software architecture" 
              className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            {/* Soft lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* FLOATING CARD 1: Top-Left (Reference: 99% dark card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-6 -left-3 sm:-left-6 md:-left-8 z-20 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl sm:rounded-3xl shadow-[0_15px_35px_rgba(15,23,42,0.25)] text-left max-w-[190px] sm:max-w-[220px]"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">99%</span>
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>
            <p className="mt-2 text-[11px] sm:text-xs text-slate-300 leading-snug font-sans">
              Actionable business performance with real-world architectural results.
            </p>
          </motion.div>

          {/* FLOATING CARD 2: Bottom-Left (Reference: 2.5M white card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-6 -left-3 sm:-left-6 md:-left-8 z-20 bg-white/95 border border-slate-200/90 p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-[0_15px_35px_rgba(15,23,42,0.1)] text-left max-w-[180px] sm:max-w-[210px]"
          >
            <div className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-baseline gap-1">
              2.5M<span className="text-blue-600 text-lg font-semibold">+</span>
            </div>
            <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 leading-snug font-sans">
              Total active users impacted across deployed systems.
            </p>
          </motion.div>

          {/* FLOATING CARD 3: Right (Reference: 4.8 / 4.9 rating card) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-10 sm:top-14 -right-3 sm:-right-6 md:-right-8 z-20 bg-white/95 border border-slate-200/90 p-4 sm:p-5 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-[0_15px_35px_rgba(15,23,42,0.1)] text-left min-w-[150px] sm:min-w-[175px]"
          >
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">4.9</span>
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-[0_0_8px_rgba(37,99,235,0.4)]">
                <Star className="w-3 h-3 fill-current" />
              </div>
            </div>
            <p className="mt-1.5 text-[11px] sm:text-xs text-slate-600 leading-snug font-sans">
              Our average customer satisfaction rating.
            </p>
          </motion.div>

          {/* FLOATING CARD 4: Bottom-Right Tags (Reference: Designing / Branding / Marketing / Web Design) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 bg-white/95 border border-slate-200/90 p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl backdrop-blur-md shadow-[0_15px_35px_rgba(15,23,42,0.12)] text-left max-w-[240px] sm:max-w-[280px]"
          >
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {SERVICE_TAGS.map((tag) => {
                const isActive = activeTag === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className={`px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wide transition-all duration-300 border cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white font-semibold border-blue-600 shadow-[0_4px_12px_rgba(37,99,235,0.3)]' 
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* BOTTOM ACTION BUTTON (Reference: Book Free Consulting ➔ in cobalt blue) */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 sm:mt-16 z-20"
        >
          <button 
            type="button"
            onClick={onStartProjectClick}
            className="group inline-flex items-center gap-3 bg-blue-600 text-white font-display text-xs sm:text-sm uppercase tracking-widest font-bold px-8 sm:px-10 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.35)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Book Free Consulting</span>
            <div className="w-5 h-5 rounded-full bg-white text-blue-600 flex items-center justify-center transition-transform group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 stroke-[3]" />
            </div>
          </button>
        </motion.div>

        {/* Supporting Trust Badges below */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-slate-200/80 w-full max-w-4xl flex flex-wrap items-center justify-center sm:justify-between gap-4 text-xs font-mono text-slate-500"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Guaranteed 24h Specification Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Modern High-Performance Stack</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Zero-Lockin Architecture</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
