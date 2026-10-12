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
  key?: string;
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
      onBack();
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
        try {
          const result = await signInWithEmailAndPassword(auth, email, password);
          await handleUserSetup(result.user);
          onBack();
        } catch (loginErr: any) {
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
      className="fixed inset-0 z-[100] bg-white flex flex-col md:flex-row h-screen overflow-hidden text-slate-900"
    >
      {/* Left Column - Visual Sidebar */}
      <div className="hidden md:flex md:w-1/2 lg:w-[45%] relative overflow-hidden p-12 flex-col justify-between border-r border-slate-200 bg-slate-900 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src={loginSidebarImg} 
            alt="Login Sidebar" 
            className="w-full h-full object-cover grayscale opacity-40 contrast-125"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-blue-600 rotate-45 shadow-[0_0_10px_rgba(37,99,235,0.7)]" />
            <span className="font-display font-bold tracking-widest text-lg text-white">NOIRBYTE</span>
          </div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-slate-300 hover:text-white transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to website
          </button>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter leading-none font-bold mb-6 text-white">
            The Digital <br />
            <span className="text-blue-400">Threshold</span>
          </h1>
          <p className="text-slate-300 text-xs tracking-wider uppercase font-mono border-l-2 border-blue-500 pl-4">
            Securing next-generation <br /> development workflows.
          </p>
          
          <div className="flex gap-2 pt-6">
            {[0, 1, 2].map(i => (
              <div key={i} className={`h-[2px] ${i === 0 ? 'w-12 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 'w-4 bg-slate-700'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 relative overflow-y-auto bg-white">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-md space-y-10 relative z-10"
        >
          <div className="space-y-3">
            <h2 className="font-display text-4xl uppercase tracking-tight font-bold text-slate-900">Sign In</h2>
            <p className="text-slate-500 text-sm">
              Don't have an account? <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors font-semibold">Sign up for access</a>
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-600 text-xs uppercase tracking-wider font-mono">
                {errors.general}
              </div>
            )}
            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-1.5 group">
                <div className="flex justify-between items-center">
                  <label className={`font-mono text-[10px] uppercase tracking-widest ${errors.email ? 'text-red-500' : 'text-slate-600 group-focus-within:text-blue-600 font-semibold'} transition-colors`}>Email Address</label>
                  <Mail className={`w-3.5 h-3.5 ${errors.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-blue-600'} transition-colors`} />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'} p-3.5 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600/10 outline-none transition-all placeholder:text-slate-400 rounded-xl shadow-sm`}
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-[10px] uppercase tracking-wider font-mono mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5 group">
                <div className="flex justify-between items-center">
                  <label className={`font-mono text-[10px] uppercase tracking-widest ${errors.password ? 'text-red-500' : 'text-slate-600 group-focus-within:text-blue-600 font-semibold'} transition-colors`}>Password</label>
                </div>
                <div className="relative flex items-center">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full bg-white border ${errors.password ? 'border-red-500' : 'border-slate-200 focus:border-blue-600'} p-3.5 pr-12 text-slate-900 text-sm focus:ring-2 focus:ring-blue-600/10 outline-none transition-all placeholder:text-slate-400 rounded-xl shadow-sm`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 p-1 rounded-md text-slate-400 hover:text-blue-600 transition-all focus:outline-none cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <motion.div
                      key={showPassword ? 'hide' : 'show'}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </motion.div>
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-[10px] uppercase tracking-wider font-mono mt-1">{errors.password}</p>
                )}
                <div className="flex justify-end pt-1">
                  <a href="#" className="text-[10px] uppercase tracking-wider font-mono text-slate-500 hover:text-blue-600 transition-colors">Forgot Password?</a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
              <label htmlFor="remember" className="text-slate-600 text-xs cursor-pointer hover:text-slate-900 transition-colors">Remember this session</label>
            </div>

            <button 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-full font-display text-xs uppercase tracking-widest font-bold shadow-md shadow-blue-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {isLoading ? 'Verifying...' : 'Authorize Access'}
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-6">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <span className="relative px-4 bg-white text-[9px] uppercase tracking-[0.4em] font-mono text-slate-400 font-semibold">Security Layer 02</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleSocialLogin(googleProvider)}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 text-xs font-mono uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 text-slate-700 transition-all shadow-sm rounded-xl cursor-pointer disabled:opacity-50"
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                Google
              </button>
              <button 
                type="button"
                onClick={() => handleSocialLogin(githubProvider)}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 bg-white border border-slate-200 py-3 text-xs font-mono uppercase tracking-wider hover:border-blue-600 hover:text-blue-600 text-slate-700 transition-all shadow-sm rounded-xl cursor-pointer disabled:opacity-50"
              >
                <Github className="w-3.5 h-3.5 text-slate-900" />
                Github
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
