/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Instagram, 
  Github, 
  Linkedin, 
  Twitter, 
  Plus, 
  Minus, 
  Mail, 
  MapPin, 
  Phone,
  MessageCircle,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { SOCIAL_LINKS } from '../config/socials';

// Custom high-fidelity WhatsApp SVG Icon for pristine branding
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
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
function XTwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
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

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in high-performance full-stack development using React (Next.js/Vite), TypeScript, Node.js, and modern CSS frameworks like Tailwind. I also integrate AI capabilities using Gemini models and real-time backend systems."
  },
  {
    question: "Do you handle design as well as development?",
    answer: "Yes, I offer a holistic approach. I can take a project from initial brand strategy and UI/UX design through to full-scale engineering and deployment."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary by complexity. A standard premium landing page takes 1-2 weeks, while complex e-commerce stores, custom SaaS platforms, or multi-role web applications typically range from 3-6 weeks."
  },
  {
    question: "Do you offer direct WhatsApp & emergency support?",
    answer: "Yes! Direct WhatsApp project communication is available for immediate scoping, live updates, and urgent requests. You can click any of the WhatsApp links to start chatting instantly."
  }
];

export default function ContactFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [touched, setTouched] = useState({ name: false, email: false, message: false });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submissionState, setSubmissionState] = useState<{
    submitting: boolean;
    succeeded: boolean;
    error: string | null;
  }>({
    submitting: false,
    succeeded: false,
    error: null,
  });

  const validateField = (fieldName: string, value: string) => {
    let error = '';
    if (fieldName === 'name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'At least 2 characters';
      }
    } else if (fieldName === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Invalid email address';
      }
    } else if (fieldName === 'message') {
      if (!value.trim()) {
        error = 'Message is required';
      } else if (value.trim().length < 10) {
        error = 'At least 10 characters';
      }
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTouched = { name: true, email: true, message: true };
    const nameErr = validateField('name', formData.name);
    const emailErr = validateField('email', formData.email);
    const msgErr = validateField('message', formData.message);

    setTouched(newTouched);
    setErrors({ name: nameErr, email: emailErr, message: msgErr });

    if (!nameErr && !emailErr && !msgErr) {
      setSubmissionState({ submitting: true, succeeded: false, error: null });
      try {
        const response = await fetch("https://formspree.io/f/mpqnpang", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setSubmissionState({ submitting: false, succeeded: true, error: null });
          setFormData({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
        } else {
          const data = await response.json();
          setSubmissionState({
            submitting: false,
            succeeded: false,
            error: data.errors && data.errors.length > 0
              ? data.errors.map((err: any) => err.message).join(', ')
              : 'Form submission failed. Please try again.',
          });
        }
      } catch (err: any) {
        setSubmissionState({
          submitting: false,
          succeeded: false,
          error: err.message || 'A network error occurred. Please try again.',
        });
      }
    }
  };

  const getInputClassName = (hasError: boolean, isTouched: boolean) => {
    const base = "w-full p-4 text-slate-900 text-sm outline-none transition-all duration-300 disabled:opacity-50 rounded-xl placeholder-slate-400 border";
    if (isTouched && hasError) {
      return `${base} bg-red-50/50 border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500/20`;
    }
    return `${base} bg-white border-slate-200 hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 shadow-sm`;
  };

  return (
    <div id="contact" className="bg-white">
      {/* Contact Section */}
      <section className="relative py-32 px-8 overflow-hidden border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            
            {/* Left Side - Content & Form */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[11px] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for new contracts & collaborations
                </div>
                <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none font-bold text-slate-900">
                  Initiate <br />
                  <span className="text-slate-400">Collaboration</span>
                </h2>
                <p className="text-slate-600 max-w-xl text-base leading-relaxed">
                  Whether you're looking to build something new, scale your brand, or discuss an immediate project, 
                  reach out directly or connect through our social and instant messaging channels below.
                </p>
              </div>

              {/* Direct Instant Channels (WhatsApp & Quick Socials) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                {/* WhatsApp Direct Card */}
                <a
                  href={SOCIAL_LINKS.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/70 hover:border-emerald-300 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.35)] group-hover:scale-110 transition-transform">
                      <WhatsAppIcon className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 font-display">Chat on WhatsApp</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <p className="text-[11px] text-slate-600 font-mono">Instant direct response</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {/* Instagram Direct Card */}
                <a
                  href={SOCIAL_LINKS.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 rounded-2xl border border-pink-200 bg-pink-50/50 hover:bg-pink-100/60 hover:border-pink-300 transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-md"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shadow-[0_4px_12px_rgba(236,72,153,0.35)] group-hover:scale-110 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 font-display block">Instagram</span>
                      <p className="text-[11px] text-slate-600 font-mono">@aeonwright.studio</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-pink-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>

              {/* Form */}
              <form 
                className="space-y-6 max-w-xl" 
                id="contact-form"
                action="https://formspree.io/f/mpqnpang"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center h-4">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Name</label>
                      {touched.name && errors.name && (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.name}</span>
                      )}
                    </div>
                    <input 
                      type="text" 
                      name="name"
                      required
                      disabled={submissionState.submitting}
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClassName(!!errors.name, touched.name)} 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center h-4">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Email</label>
                      {touched.email && errors.email && (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.email}</span>
                      )}
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      required
                      disabled={submissionState.submitting}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={getInputClassName(!!errors.email, touched.email)} 
                      placeholder="your@email.com" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between items-center h-4">
                     <label className="font-mono text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Message</label>
                     {touched.message && errors.message && (
                       <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.message}</span>
                     )}
                   </div>
                   <textarea 
                     name="message"
                     required
                     disabled={submissionState.submitting}
                     value={formData.message}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     rows={5} 
                     className={`${getInputClassName(!!errors.message, touched.message)} resize-none`} 
                     placeholder="Describe your project, timeline, and goals..."
                   ></textarea>
                </div>

                <AnimatePresence mode="wait">
                  {submissionState.succeeded && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-blue-50 border border-blue-200 p-5 rounded-xl text-blue-700 text-xs uppercase tracking-wider font-mono flex items-center gap-3"
                    >
                      <span className="text-sm font-bold">✔</span>
                      <span>Message sent successfully! I will get back to you shortly.</span>
                    </motion.div>
                  )}

                  {submissionState.error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 p-5 rounded-xl text-red-600 text-xs uppercase tracking-wider font-mono flex items-center gap-3"
                    >
                      <span className="text-sm font-bold">⚠</span>
                      <span>{submissionState.error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    type="submit"
                    disabled={submissionState.submitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-display text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.45)] flex items-center gap-3 cursor-pointer"
                  >
                    <span>{submissionState.submitting ? 'Sending Request...' : 'Send Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>

                  <a 
                    href={SOCIAL_LINKS.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-4 rounded-full font-display text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-[0_4px_16px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] flex items-center gap-2 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    <span>WhatsApp Direct</span>
                  </a>
                </div>
              </form>
            </div>

            {/* Right Side - FAQ Accordion */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h3>
                <p className="text-slate-500 text-xs">Everything you need to know about partnering with Noirbyte.</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between gap-4 font-sans font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <div className={`p-1.5 rounded-full transition-transform ${isOpen ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Verified Connect Card */}
              <div className="p-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xs uppercase tracking-widest font-bold text-slate-900">Official Channels</h4>
                  <span className="font-mono text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">Active & Monitored</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a 
                    href={SOCIAL_LINKS.instagram.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-pink-300 hover:bg-pink-50/40 text-slate-700 hover:text-pink-600 transition-all font-medium"
                  >
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href={SOCIAL_LINKS.github.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all font-medium"
                  >
                    <Github className="w-4 h-4 text-slate-800" />
                    <span>GitHub</span>
                  </a>
                  <a 
                    href={SOCIAL_LINKS.twitter.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all font-medium"
                  >
                    <XTwitterIcon className="w-4 h-4 text-slate-900" />
                    <span>X (Twitter)</span>
                  </a>
                  <a 
                    href={SOCIAL_LINKS.whatsapp.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800 transition-all font-medium"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 bg-blue-600 rotate-45 shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
              <span className="font-display font-bold tracking-widest text-lg text-slate-900">NOIRBYTE</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-[220px]">
              Empowering visionary brands through cutting-edge craftsmanship, performant systems, and technical excellence.
            </p>
            
            {/* Social Icons row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a 
                href={SOCIAL_LINKS.instagram.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Noirbyte on Instagram (@aeonwright.studio)"
                aria-label="Instagram"
                className="p-2.5 border border-slate-200 bg-white hover:bg-pink-600 hover:border-pink-600 hover:text-white transition-all rounded-full text-slate-600 shadow-sm"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.github.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Noirbyte on GitHub (@noirbyte)"
                aria-label="GitHub"
                className="p-2.5 border border-slate-200 bg-white hover:bg-slate-900 hover:border-slate-900 hover:text-white transition-all rounded-full text-slate-600 shadow-sm"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.twitter.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Noirbyte on X / Twitter (@noirbyte_tech)"
                aria-label="X / Twitter"
                className="p-2.5 border border-slate-200 bg-white hover:bg-slate-950 hover:border-slate-950 hover:text-white transition-all rounded-full text-slate-600 shadow-sm"
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.whatsapp.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Chat with Noirbyte on WhatsApp (+234 805 055 9657)"
                aria-label="WhatsApp"
                className="p-2.5 border border-slate-200 bg-white hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all rounded-full text-slate-600 shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a 
                href={SOCIAL_LINKS.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                title="Noirbyte on LinkedIn"
                aria-label="LinkedIn"
                className="p-2.5 border border-slate-200 bg-white hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all rounded-full text-slate-600 shadow-sm"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-display text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Projects', 'Blog'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-slate-600 text-xs uppercase tracking-wider hover:text-blue-600 transition-colors font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="font-display text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900">Contact Info</h4>
            <ul className="space-y-3 font-mono text-xs text-slate-600">
              <li>
                <a href="mailto:faadilnurudeen6@gmail.com" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>faadilnurudeen6@gmail.com</span>
                </a>
              </li>
              <li>
                <a href={SOCIAL_LINKS.whatsapp.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-2">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>+234 805 055 9657</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Nigeria · Available Globally</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="font-display text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900">Stay Updated</h4>
            <div className="flex bg-white border border-slate-200 overflow-hidden rounded-full focus-within:border-blue-600 shadow-sm">
               <input type="email" placeholder="Email Address" className="bg-transparent text-xs px-4 py-2.5 border-none outline-none flex-grow text-slate-900 placeholder-slate-400" />
               <button className="bg-blue-600 text-white px-5 py-2.5 font-mono text-[10px] uppercase font-bold hover:bg-blue-700 transition-all cursor-pointer">Join</button>
            </div>
            <p className="text-slate-500 text-[10px] uppercase tracking-wider">Insights monthly / no spam.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
           <p>© 2026 NOIRBYTE STUDIO. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
