import { motion } from 'motion/react';
import { useAuth } from './AuthProvider';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { Instagram, Github } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/socials';

// Custom WhatsApp SVG icon
function WhatsAppIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.507 14.307l-.009.075c-.338.824-1.637 1.547-2.28 1.635-.615.084-1.396.12-4.148-1.02-3.308-1.37-5.419-4.73-5.586-4.953-.162-.224-1.332-1.773-1.332-3.382 0-1.609.841-2.4 1.141-2.727.3-.327.653-.408.87-.408.218 0 .436.002.627.012.202.01.472-.077.738.563.273.655.932 2.274 1.014 2.438.082.164.137.355.027.573-.109.219-.163.355-.327.546-.164.191-.345.427-.492.573-.163.164-.334.342-.143.67.191.328.848 1.4 1.817 2.264 1.246 1.11 2.296 1.455 2.624 1.618.328.164.519.137.71-.082.191-.219.82-1.037 1.038-1.392.218-.355.437-.3.738-.191.3.109 1.91 1.01 2.238 1.173.328.164.546.246.628.382.082.137.082.792-.256 1.616zM12 2C6.477 2 2 6.477 2 12c0 1.892.527 3.662 1.447 5.176L2 22l4.981-1.408C8.423 21.492 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  );
}

// Custom modern X (Twitter) icon
function XTwitterIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface NavbarProps {
  onLoginClick?: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.03)]"
      id="navbar"
    >
      <div className="flex items-center gap-2.5" id="nav-logo">
        <div className="w-4 h-4 bg-blue-600 rotate-45 shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
        <a href="#" className="font-display font-bold tracking-widest text-lg text-slate-900 hover:text-blue-600 transition-colors">
          NOIRBYTE
        </a>
      </div>

      <div className="hidden lg:flex items-center gap-8" id="nav-links">
        {['Home', 'About', 'Projects', 'Blog'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            {item}
          </a>
        ))}

        {/* Social Icons Quick Bar in Header */}
        <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
          <a
            href={SOCIAL_LINKS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            aria-label="Instagram"
            className="p-1.5 text-slate-500 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="GitHub"
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
          <a
            href={SOCIAL_LINKS.twitter.url}
            target="_blank"
            rel="noopener noreferrer"
            title="X (Twitter)"
            aria-label="X (Twitter)"
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
          >
            <XTwitterIcon className="w-3.5 h-3.5" />
          </a>
          <a
            href={SOCIAL_LINKS.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            aria-label="WhatsApp"
            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500">{user.displayName || user.email}</span>
            <button 
              onClick={handleLogout}
              className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 hover:border-blue-600 px-4 py-1.5 rounded-full cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-700 hover:text-blue-600 transition-colors border border-slate-300 hover:border-blue-600 px-4 py-1.5 rounded-full cursor-pointer"
          >
            Login
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <a 
          href={SOCIAL_LINKS.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3.5 py-2 rounded-full text-xs font-semibold font-mono tracking-tight transition-all"
          title="Direct WhatsApp Chat"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp</span>
        </a>

        <a 
          href="#contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 rounded-full font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.45)] cursor-pointer"
          id="nav-contact"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
