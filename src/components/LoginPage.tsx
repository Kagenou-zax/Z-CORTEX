/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeft, Github, Globe, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import loginSidebarImg from '../assets/images/login_sidebar_landscape_1779113380340.png';
import { auth, db, googleProvider, githubProvider } from '../lib/firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

interface LoginPageProps {
  onBack: () => void;
  key?: string; // Satisfy linter for AnimatePresence keys
}

export default function LoginPage({ onBack }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleUserSetup = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } else {
      await setDoc(userRef, {
        lastLogin: serverTimestamp(),
      }, { merge: true });
    }
  };

  const handleSocialLogin = async (provider: any) => {
    setIsLoading(true);
    setErrors({});
    try {
      const result = await signInWithPopup(auth, provider);
      await handleUserSetup(result.user);
      onBack(); // Go back to website after successful login
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string; general?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Try login first
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          await handleUserSetup(result.user);
          onBack();
        } catch (loginErr: any) {
          // If user doesn't exist, try creating account (simplified flow for this noirbyte experience)
          if (loginErr.code === 'auth/user-not-found') {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await handleUserSetup(result.user);
            onBack();
          } else {
            throw loginErr;
          }
        }
      } catch (error: any) {
        setErrors({ general: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#0A0E17] flex flex-col md:flex-row h-screen overflow-hidden text-white"
    >
      {/* Left Column - Visual Sidebar */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] relative overflow-hidden p-12 flex-col justify-between border-r border-[#38BDF8]/15">
        <div className="absolute inset-0 z-0">
          <img 
            src={loginSidebarImg} 
            alt="Login Sidebar" 
            className="w-full h-full object-cover grayscale opacity-50 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E17]/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-brand rotate-45 shadow-[0_0_10px_rgba(0,230,165,0.7)]" />
            <span className="font-display font-medium tracking-widest text-lg text-white">NOIRBYTE</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-mono text-[#94A3B8] hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to website
          </button>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter leading-none font-medium mb-8 text-white">
            The Digital <br />
            <span className="text-[#38BDF8]/30">Threshold</span>
          </h1>
          <p className="text-[#94A3B8] text-xs tracking-widest uppercase font-mono border-l-2 border-brand pl-4">
            Securing next-generation <br /> development workflows.
          </p>
          
          <div className="flex gap-2 pt-8">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-[2px] ${i === 0 ? 'w-12 bg-brand shadow-[0_0_8px_rgba(0,230,165,0.8)]' : 'w-4 bg-[#38BDF8]/20'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-y-auto bg-[#0A0E17]">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #38BDF8 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-md space-y-12 relative z-10"
        >
          <div className="space-y-4">
            <h2 className="font-display text-4xl uppercase tracking-tight font-medium text-white">Sign In</h2>
            <p className="text-[#94A3B8] text-sm">
              Don't have an account? <a href="#" className="text-brand hover:text-brand-light transition-colors font-medium">Sign up for access</a>
            </p>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-sm text-red-500 text-[10px] uppercase tracking-widest font-mono">
                {errors.general}
              </div>
            )}
            <div className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <label className={`font-mono text-[10px] uppercase tracking-widest ${errors.email ? 'text-red-500' : 'text-[#94A3B8] group-focus-within:text-brand'} transition-colors`}>Email Address</label>
                  <Mail className={`w-3 h-3 ${errors.email ? 'text-red-500' : 'text-[#38BDF8]/40 group-focus-within:text-brand'} transition-colors`} />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-[#131B2E] border ${errors.email ? 'border-red-500/50' : 'border-[#38BDF8]/20 focus:border-brand'} p-4 text-white text-sm focus:bg-[#1A243D] outline-none transition-all placeholder:text-[#94A3B8]/30 rounded-sm`}
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] uppercase tracking-widest font-mono mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <div className="flex justify-between items-center">
                  <label className={`font-mono text-[10px] uppercase tracking-widest ${errors.password ? 'text-red-500' : 'text-[#94A3B8] group-focus-within:text-brand'} transition-colors`}>Password</label>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-[#131B2E] border ${errors.password ? 'border-red-500/50' : 'border-[#38BDF8]/20 focus:border-brand'} p-4 pr-12 text-white text-sm focus:bg-[#1A243D] outline-none transition-all placeholder:text-[#94A3B8]/30 rounded-sm`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 p-1 rounded-sm text-[#94A3B8] hover:text-brand hover:bg-white/[0.03] transition-all focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <motion.div
                      key={showPassword ? 'hide' : 'show'}
                      initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.div>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] uppercase tracking-widest font-mono mt-1">{errors.password}</p>
                )}
                <div className="flex justify-end pt-1">
                  <a href="#" className="text-[10px] uppercase tracking-widest font-mono text-[#94A3B8] hover:text-brand transition-colors">Forgot Password?</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-4 h-4 bg-[#131B2E] border-[#38BDF8]/30 rounded-sm checked:bg-brand transition-all accent-brand cursor-pointer" />
              <label htmlFor="remember" className="text-[#94A3B8] text-[11px] uppercase tracking-widest cursor-pointer hover:text-white transition-colors">Remember this session</label>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-brand text-[#0A0E17] py-4 rounded-sm font-display text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-light shadow-lg hover:shadow-brand/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Authorize Access'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#38BDF8]/15"></div></div>
              <span className="relative px-4 bg-[#0A0E17] text-[9px] uppercase tracking-[0.5em] font-mono text-[#94A3B8]">Security Layer 02</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleSocialLogin(googleProvider)}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 bg-[#131B2E] border border-[#38BDF8]/20 py-3 text-[10px] font-mono uppercase tracking-widest hover:border-brand text-white transition-all group disabled:opacity-50 rounded-sm"
              >
                <Globe className="w-3 h-3 text-[#38BDF8] group-hover:text-brand transition-colors" />
                Google
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin(githubProvider)}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 bg-[#131B2E] border border-[#38BDF8]/20 py-3 text-[10px] font-mono uppercase tracking-widest hover:border-brand text-white transition-all group disabled:opacity-50 rounded-sm"
              >
                <Github className="w-3 h-3 text-[#38BDF8] group-hover:text-brand transition-colors" />
                Github
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Footer info for form area */}
        <div className="absolute bottom-8 left-0 right-0 px-12 hidden md:flex justify-between items-center pointer-events-none opacity-40 text-[#94A3B8]">
           <span className="font-mono text-[9px] uppercase tracking-[0.4em]">AES-256 Encrypted</span>
           <span className="font-mono text-[9px] uppercase tracking-[0.4em]">Noirbyte Cloud Identity</span>
        </div>
      </div>
    </motion.div>
  );
}
