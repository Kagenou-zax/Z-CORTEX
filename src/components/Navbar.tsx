import { motion } from 'motion/react';
import { useAuth } from './AuthProvider';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

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
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-6 mix-blend-difference"
      id="navbar"
    >
      <div className="flex items-center gap-2" id="nav-logo">
        <div className="w-4 h-4 bg-brand rotate-45" />
        <span className="font-display font-medium tracking-widest text-lg">NOIRBYTE</span>
      </div>

      <div className="hidden md:flex items-center gap-12" id="nav-links">
        {['Home', 'About', 'Projects', 'Blog'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors"
          >
            {item}
          </a>
        ))}
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest font-mono text-white/40">{user.displayName || user.email}</span>
            <button 
              onClick={handleLogout}
              className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors border border-white/20 px-4 py-1.5 rounded-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="text-xs uppercase tracking-[0.2em] font-medium hover:text-brand transition-colors border border-white/20 px-4 py-1.5 rounded-sm"
          >
            Login
          </button>
        )}
      </div>

      <a 
        href="#contact"
        className="bg-brand hover:bg-brand-dark text-black px-6 py-2 rounded-sm font-medium text-xs uppercase tracking-widest transition-all duration-300"
        id="nav-contact"
      >
        Contact
      </a>
    </motion.nav>
  );
}
