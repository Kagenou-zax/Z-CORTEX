import { motion } from 'motion/react';
import { ArrowRight, Sparkle } from 'lucide-react';

interface HeroProps {
  onStartProjectClick?: () => void;
}

export default function Hero({ onStartProjectClick }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden pt-20" id="home">
      {/* Background and Vertical Lines */}
      <div className="absolute inset-0 pointer-events-none" id="bg-lines">
        <div className="absolute left-[12%] top-0 bottom-0 w-[1px] bg-white/5" />
        <div className="absolute left-[12%] top-[20%] w-4 h-[1px] bg-brand/50 -translate-x-1/2" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1440px] mx-auto px-8 flex-1 flex flex-col"
      >
        {/* Top Left Label - Side Rail */}
        <div className="absolute left-0 top-1/4 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4" id="side-label">
          <div className="w-[1px] h-12 bg-white/20" />
          <span className="vertical-rl uppercase tracking-[0.3em] text-[10px] text-white/40 font-medium">Modern Development</span>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-12 gap-4 flex-1 h-full">
          {/* Headline and Image Container */}
          <div className="col-span-12 lg:col-span-8 relative flex flex-col justify-center py-20" id="main-content">
            <motion.div variants={itemVariants} className="relative z-20">
              <h1 className="font-display text-[8vw] lg:text-[7vw] leading-[0.9] font-medium tracking-tight uppercase max-w-[10ch]">
                Where <br />
                Creative <br />
                Meet <br />
                <span className="flex items-center gap-4">
                  Result
                  <Sparkle className="w-[1em] h-[1em] text-brand fill-brand animate-pulse" />
                </span>
              </h1>
              
              <button 
                onClick={onStartProjectClick}
                className="mt-12 bg-white text-black px-10 py-4 rounded-sm font-medium tracking-widest text-sm uppercase hover:bg-brand hover:text-white transition-all duration-300"
              >
                Start a Project
              </button>
            </motion.div>

            {/* Profile Image - Absolute to this container */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 bottom-0 w-3/4 lg:w-[60%] z-10 select-none grayscale contrast-125"
            >
              <div className="relative">
                <img 
                  src="/src/assets/images/hero_profile_bw_1779093593063.png" 
                  alt="Profile" 
                  className="w-full h-auto object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right Text Column (Floating) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end lg:justify-center items-end lg:items-start space-y-4 pb-20 lg:pb-0" id="right-column">
            <motion.div variants={itemVariants} className="flex flex-col items-end lg:items-start text-right lg:text-left space-y-1">
              {['Services', 'Tech Stack', 'Featured Work', 'Case Studies', 'Toolkit'].map((text, i) => (
                <a 
                  key={text} 
                  href="#" 
                  className={`text-xs uppercase tracking-[0.2em] hover:text-brand transition-colors ${text === 'Featured Work' ? 'text-white flex items-center gap-2' : 'text-white/40'}`}
                >
                  {text === 'Featured Work' && <ArrowRight className="w-3 h-3 text-brand" />}
                  {text}
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Cards Section */}
        <div className="grid grid-cols-12 gap-8 py-12 border-t border-white/5" id="bottom-cards">
          {/* Scalable Code Card */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-4 lg:col-span-3">
             <div className="relative overflow-hidden group">
                <div className="absolute -left-1 -top-1 w-4 h-4 border-l border-t border-brand" />
                <div className="p-8 space-y-4">
                  <h3 className="font-display text-lg tracking-widest uppercase font-medium">Scalable Code</h3>
                  <p className="text-white/40 text-xs leading-relaxed max-w-[25ch]">
                    I write maintainable, efficient, and scalable code using modern development practices and frameworks.
                  </p>
                  <button className="w-10 h-10 flex items-center justify-center bg-white text-black hover:bg-brand transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
             </div>
          </motion.div>

          {/* Full-Stack Development Card */}
          <motion.div variants={itemVariants} className="col-span-12 md:col-span-5 lg:col-span-4 self-end">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-medium uppercase tracking-widest leading-tight">
                Full-Stack <br />
                <span className="text-brand">Development</span>
              </h2>
              <p className="text-white/40 text-xs leading-relaxed max-w-[35ch]">
                From frontend interfaces to backend systems, I build complete and scalable web solutions.
              </p>
            </div>
          </motion.div>

          {/* Building Digital Solutions Card - Floating Style */}
          <motion.div 
            variants={itemVariants} 
            className="col-span-12 md:col-span-3 lg:col-span-4 lg:col-start-9 relative"
          >
            <div className="glass-card p-10 space-y-12 relative overflow-hidden">
               <div className="absolute right-4 top-4 text-brand font-mono text-[10px]">[01]</div>
               <div className="space-y-4">
                 <h3 className="font-display text-base uppercase tracking-widest leading-normal">
                   Building Digital <br /> Solutions
                 </h3>
                 <p className="text-white/40 text-xs leading-relaxed">
                   I help startups and businesses turn ideas into real products through modern web technologies and thoughtful development.
                 </p>
               </div>
               
               <div className="flex flex-col gap-6">
                 <div className="flex gap-4">
                    <div className="w-24 h-16 bg-white/5 rounded-sm overflow-hidden border border-white/10 group">
                       <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Work" />
                    </div>
                    <div className="w-24 h-16 bg-white/5 rounded-sm overflow-hidden border border-white/10 group">
                       <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="Work" />
                    </div>
                 </div>
                 <a href="#" className="font-display text-xs uppercase tracking-[0.3em] font-light hover:text-brand transition-colors inline-block pb-1 border-b border-white/20 w-fit">
                    See Projects
                 </a>
               </div>
               
               <div className="absolute -bottom-1 -right-1 w-12 h-[1px] bg-brand" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
