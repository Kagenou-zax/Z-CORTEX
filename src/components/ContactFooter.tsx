/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Instagram, Github, Linkedin, Twitter, Plus, Minus, Mail, MapPin, Phone } from 'lucide-react';

const faqs = [
  {
    question: "What technologies do you specialize in?",
    answer: "I specialize in high-performance full-stack development using React (Next.js), TypeScript, Node.js, and modern CSS frameworks like Tailwind. I also integrate AI capabilities using Gemini and OpenAI models."
  },
  {
    question: "Do you handle design as well as development?",
    answer: "Yes, I offer a holistic approach. I can take a project from initial brand strategy and UI/UX design through to full-scale engineering and deployment."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary by complexity. A standard premium landing page takes 2-4 weeks, while complex SaaS platforms or web applications typically range from 2-4 months."
  },
  {
    question: "Do you offer ongoing maintenance packages?",
    answer: "Absolutely. I provide tiered support plans to ensure your digital product stays secure, performant, and up-to-date with the latest tech standards."
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
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);

    setTouched({ name: true, email: true, message: true });
    setErrors({ name: nameError, email: emailError, message: messageError });

    if (!nameError && !emailError && !messageError) {
      setSubmissionState({ submitting: true, succeeded: false, error: null });
      try {
        const response = await fetch('https://formspree.io/f/mpqnpang', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
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
    const base = "w-full backdrop-blur-md p-4 text-white text-sm outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 rounded-sm placeholder-white/20 border";
    if (isTouched && hasError) {
      return `${base} bg-red-500/[0.01] border-red-500/20 hover:bg-red-500/[0.025] hover:border-red-500/30 focus:bg-red-500/[0.02] focus:border-red-500 focus:ring-1 focus:ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.02)] focus:shadow-[0_0_20px_rgba(239,68,68,0.1)]`;
    }
    return `${base} bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/15 focus:bg-white/[0.04] focus:border-brand/40 focus:ring-1 focus:ring-brand/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] focus:shadow-[0_0_25px_rgba(255,255,255,0.02)]`;
  };

  return (
    <div id="contact" className="bg-black">
      {/* Contact Section */}
      <section className="relative py-32 px-8 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left Side - Content & Form */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-4">
                <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none font-medium">
                  Ready to start a <br />
                  <span className="text-brand">Project?</span>
                </h2>
                <p className="text-white/40 text-sm max-w-lg leading-relaxed">
                  Whether you're looking to build something new or scale an existing product, 
                  my team is ready to bring your vision to life.
                </p>
              </div>

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
                      <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Name</label>
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
                      <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Email</label>
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
                     <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Message</label>
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
                     rows={6} 
                     className={`${getInputClassName(!!errors.message, touched.message)} resize-none`} 
                     placeholder="How can I help you?"
                   ></textarea>
                </div>

                <AnimatePresence mode="wait">
                  {submissionState.succeeded && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-brand/10 border border-brand/30 p-5 rounded-sm text-brand text-[11px] uppercase tracking-widest font-mono flex items-center gap-3"
                    >
                      <span className="text-sm">✔</span>
                      <span>Message sent successfully! I will get back to you shortly.</span>
                    </motion.div>
                  )}

                  {submissionState.error && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-500/10 border border-red-500/30 p-5 rounded-sm text-red-500 text-[11px] uppercase tracking-widest font-mono flex items-center gap-3"
                    >
                      <span className="text-sm">⚠</span>
                      <span>{submissionState.error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  type="submit"
                  disabled={submissionState.submitting}
                  className="flex items-center justify-center gap-3 bg-brand text-black px-10 py-4 rounded-sm font-display text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-light transition-all w-fit group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submissionState.submitting ? 'Verifying...' : 'Send Message'}
                  {!submissionState.submitting && <Send className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
              </form>
            </div>

            {/* Right Side - Info Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="glass-card p-12 space-y-10 relative overflow-hidden group">
                 <div className="absolute right-0 top-0 w-32 h-32 bg-brand/5 blur-[100px] pointer-events-none" />
                 
                 <div className="space-y-8">
                   <h3 className="font-display text-2xl uppercase tracking-widest font-medium">Contact Details</h3>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-brand group-hover/item:bg-brand group-hover/item:text-black transition-colors">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white/20 text-[9px] uppercase tracking-widest">Email</p>
                          <p className="text-sm font-mono">faadilnurudeen6@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-brand group-hover/item:bg-brand group-hover/item:text-black transition-colors">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white/20 text-[9px] uppercase tracking-widest">Phone</p>
                          <p className="text-sm font-mono">+234(08050559657)</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 group/item">
                        <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/5 text-brand group-hover/item:bg-brand group-hover/item:text-black transition-colors">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-white/20 text-[9px] uppercase tracking-widest">Location</p>
                          <p className="text-sm font-mono">Virtual Studio / SF based</p>
                        </div>
                      </div>
                   </div>
                 </div>

                 <div className="pt-10 border-t border-white/5">
                   <p className="text-white/40 text-xs leading-relaxed italic">
                     "Let's create something unforgettable together. Reach out to start your project."
                   </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-20">
             <h2 className="font-display text-4xl uppercase font-medium">Common Questions</h2>
             <p className="text-white/40 text-xs tracking-widest uppercase font-mono">Everything you need to know</p>
          </div>
          
          <div className="space-y-1">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-white/5 bg-black/40 overflow-hidden transition-all duration-500"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left group"
                >
                  <span className="font-display text-sm md:text-base uppercase tracking-widest font-medium transition-colors group-hover:text-brand">
                    {idx + 1}. {faq.question}
                  </span>
                  <div className={`transition-transform duration-500 ${openFaq === idx ? 'rotate-180' : ''}`}>
                    {openFaq === idx ? <Minus className="w-4 h-4 text-brand" /> : <Plus className="w-4 h-4 text-white/40" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-8 pb-8 text-white/40 text-xs leading-relaxed max-w-2xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t border-white/5 bg-[#030303]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1 space-y-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-brand rotate-45" />
              <span className="font-display font-medium tracking-widest text-lg">NOIRBYTE</span>
            </div>
            <p className="text-white/30 text-[11px] leading-relaxed max-w-[200px]">
              Empowering visionary brands through cutting-edge craftsmanship and technical excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-white/10 hover:bg-brand hover:border-brand hover:text-black transition-all rounded-sm text-white/40"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 border border-white/10 hover:bg-brand hover:border-brand hover:text-black transition-all rounded-sm text-white/40"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 border border-white/10 hover:bg-brand hover:border-brand hover:text-black transition-all rounded-sm text-white/40"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 border border-white/10 hover:bg-brand hover:border-brand hover:text-black transition-all rounded-sm text-white/40"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-display text-[10px] uppercase tracking-[0.4em] font-bold text-white">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Projects', 'Blog'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/40 text-[11px] uppercase tracking-widest hover:text-brand transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h4 className="font-display text-[10px] uppercase tracking-[0.4em] font-bold text-white">Contact Info</h4>
            <ul className="space-y-4 font-mono text-[11px] text-white/40">
              <li>faadilnurudeen6@gmail.com</li>
              <li>+234(08050559657)</li>
              <li>Nigeria</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="font-display text-[10px] uppercase tracking-[0.4em] font-bold text-white">Stay Updated</h4>
            <div className="flex bg-white/5 border border-white/10 overflow-hidden rounded-sm">
               <input type="email" placeholder="Email Address" className="bg-transparent text-[11px] px-4 py-2 border-none outline-none flex-grow" />
               <button className="bg-brand text-black px-4 py-2 font-mono text-[10px] uppercase font-bold hover:bg-brand-light transition-all">Join</button>
            </div>
            <p className="text-white/20 text-[9px] uppercase tracking-widest">Insights monthly / no spam.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20 font-mono text-[9px] uppercase tracking-widest">
           <p>© 2024 NOIRBYTE STUDIO. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
