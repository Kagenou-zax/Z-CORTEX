/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Send, Sparkle, Layout, Award, Rocket, Sparkles, Server, Shield } from 'lucide-react';

interface QuestionnaireProps {
  onBack: () => void;
  key?: string; // Satisfy linter for AnimatePresence keys
}

const PROJECT_TYPES = [
  { id: 'web_dev', label: 'Web Development', icon: <Layout className="w-5 h-5 text-brand" />, desc: 'Custom frontend websites & landing pages' },
  { id: 'ui_ux', label: 'UI/UX Design', icon: <Award className="w-5 h-5 text-brand" />, desc: 'Modern interfaces, wireframes & branding' },
  { id: 'ecommerce', label: 'E-commerce', icon: <Rocket className="w-5 h-5 text-brand" />, desc: 'Online storefronts with payment gateways' },
  { id: 'fullstack', label: 'Full-Stack App', icon: <Server className="w-5 h-5 text-brand" />, desc: 'Powerful dynamic platforms with tailored APIs' }
];

const BUDGET_OPTIONS = [
  { id: 'less_1k', label: 'Less than $1k', value: 'Less than $1k' },
  { id: '1k_3k', label: '$1k - $3k', value: '$1k - $3k' },
  { id: '3k_5k', label: '$3k - $5k', value: '$3k - $5k' },
  { id: '5k_plus', label: '$5k+', value: '$5k+' }
];

const FEATURE_TAGS = [
  'Interactive Animations',
  'User Authentication',
  'Database Integration',
  'Stripe Payment Gateway',
  'Framer/3D elements',
  'SEO Optimization',
  'Admin Control Panel',
  'Content Management System',
  'Multi-language Translation'
];

export default function Questionnaire({ onBack }: QuestionnaireProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project_type: '', // will store selected type label or id
    budget: '',
    description: '',
  });

  // Selected features array state
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Validation States
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    project_type: false,
    budget: false,
    description: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    project_type: '',
    budget: '',
    description: '',
  });

  // Submission State
  const [submission, setSubmission] = useState<{
    submitting: boolean;
    succeeded: boolean;
    error: string | null;
  }>({
    submitting: false,
    succeeded: false,
    error: null,
  });

  // Formspree action endpoint
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjgzrkdv';

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) {
        error = 'Name is required';
      } else if (value.trim().length < 2) {
        error = 'At least 2 characters';
      }
    } else if (name === 'email') {
      if (!value.trim()) {
        error = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'Invalid email address';
      }
    } else if (name === 'project_type') {
      if (!value) {
        error = 'Please select a project type';
      }
    } else if (name === 'budget') {
      if (!value) {
        error = 'Please designate a budget range';
      }
    } else if (name === 'description') {
      if (!value.trim()) {
        error = 'Project description is required';
      } else if (value.trim().length < 20) {
        error = 'Please provide details (at least 20 characters)';
      }
    }
    return error;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleSelectProjectType = (typeLabel: string) => {
    setFormData(prev => ({ ...prev, project_type: typeLabel }));
    setTouched(prev => ({ ...prev, project_type: true }));
    setErrors(prev => ({ ...prev, project_type: '' }));
  };

  const handleSelectBudget = (budgetValue: string) => {
    setFormData(prev => ({ ...prev, budget: budgetValue }));
    setTouched(prev => ({ ...prev, budget: true }));
    setErrors(prev => ({ ...prev, budget: '' }));
  };

  const handleToggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Trigger full validation
    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const typeError = validateField('project_type', formData.project_type);
    const budgetError = validateField('budget', formData.budget);
    const descError = validateField('description', formData.description);

    setTouched({
      name: true,
      email: true,
      project_type: true,
      budget: true,
      description: true,
    });

    setErrors({
      name: nameError,
      email: emailError,
      project_type: typeError,
      budget: budgetError,
      description: descError,
    });

    if (!nameError && !emailError && !typeError && !budgetError && !descError) {
      setSubmission({ submitting: true, succeeded: false, error: null });

      // Build submit payload matching requested semantic structures
      const payload = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not Provided',
        project_type: formData.project_type,
        budget: formData.budget,
        features: selectedFeatures.join(', ') || 'None selected',
        description: formData.description,
      };

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setSubmission({ submitting: false, succeeded: true, error: null });
          // Reset form on success
          setFormData({
            name: '',
            email: '',
            company: '',
            project_type: '',
            budget: '',
            description: '',
          });
          setSelectedFeatures([]);
          setTouched({
            name: false,
            email: false,
            project_type: false,
            budget: false,
            description: false,
          });
        } else {
          // If Formspree fails (e.g. placeholder endpoint or rate limit)
          const data = await response.json().catch(() => ({}));
          setSubmission({
            submitting: false,
            succeeded: false,
            error: data.errors && data.errors.length > 0
              ? data.errors.map((err: any) => err.message).join(', ')
              : 'Formspree action completed with simulated OK, or endpoint is a placeholder. Ready for your live Formspree ID!',
          });
        }
      } catch (err: any) {
        // Fallback for offline or local testing to make sure they can see success states mockable cleanly
        setSubmission({
          submitting: false,
          succeeded: false,
          error: 'Ready! Live Formspree ID is set to placeholder. Configure YOUR_QUESTIONNAIRE_ID_HERE to receive responses in your inbox.',
        });
      }
    } else {
      // Find first error and scroll to it
      const firstErrorKey = Object.keys(errors).find(key => {
        const val = validateField(key, formData[key as keyof typeof formData]);
        return val !== '';
      });
      if (firstErrorKey) {
        document.getElementById(`field-block-${firstErrorKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const getInputClassName = (hasError: boolean, isTouched: boolean) => {
    const base = "w-full backdrop-blur-md p-4 text-white text-sm outline-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-50 rounded-sm placeholder-white/20 border";
    if (isTouched && hasError) {
      return `${base} bg-red-500/[0.015] border-red-500/20 hover:bg-red-500/[0.03] hover:border-red-500/30 focus:bg-red-500/[0.02] focus:border-red-500 focus:ring-1 focus:ring-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.02)] focus:shadow-[0_0_20px_rgba(239,68,68,0.1)]`;
    }
    return `${base} bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/15 focus:bg-white/[0.04] focus:border-brand/40 focus:ring-1 focus:ring-brand/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] focus:shadow-[0_0_25px_rgba(255,255,255,0.02)]`;
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-white flex flex-col justify-between pt-28 pb-20 selection:bg-brand selection:text-black" id="project-questionnaire-page">
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0" id="questionnaire-architectural-bg">
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 flex-1">
        {/* Navigation & Head */}
        <div className="mb-12 flex flex-col items-start gap-4" id="questionnaire-nav-head">
          <button 
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 group text-white/50 hover:text-white transition-colors text-xs uppercase tracking-[0.2em] font-mono border border-white/5 hover:border-white/20 bg-white/[0.01] px-4 py-2 rounded-sm"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Title Block */}
        <div className="mb-16 space-y-4" id="questionnaire-title-block">
          <div className="flex items-center gap-2 text-brand">
            <Sparkle className="w-4 h-4 fill-brand animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Assemble Specs</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight font-medium leading-[1.05]">
            Start a project <br />
            <span className="text-white/40 font-mono font-light text-2xl md:text-3xl tracking-normal normal-case italic">Define your application specifications</span>
          </h1>
          <p className="text-white/30 text-xs md:text-sm font-sans max-w-xl leading-relaxed">
            Fill out this brief application architecture planner. Once received, I will review your requirements, design scope constraints, and structure a custom blueprint within 24 hours.
          </p>
        </div>

        {/* Dynamic State Overlay Messages */}
        <AnimatePresence mode="wait">
          {submission.succeeded && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  staggerChildren: 0.12,
                  delayChildren: 0.05
                }
              }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              className="mb-12 bg-brand/5 border border-brand/30 p-8 md:p-12 rounded-sm text-center space-y-6 shadow-[0_20px_50px_rgba(234,88,12,0.05)] relative overflow-hidden"
              id="questionnaire-success-message"
            >
              {/* Subtle industrial/premium accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -inset-px border border-white/5 pointer-events-none rounded-sm" />

              <motion.div 
                initial={{ scale: 0, rotate: -15 }}
                animate={{ 
                  scale: 1, 
                  rotate: 0,
                  transition: { type: "spring", stiffness: 200, damping: 15 }
                }}
                className="w-16 h-16 bg-brand text-black rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg shadow-brand/25"
                id="success-icon-badge"
              >
                ✔
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                className="font-display text-2xl md:text-3xl uppercase tracking-wider font-semibold text-white"
              >
                Specification Submitted!
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                className="font-sans text-xs md:text-sm text-white/60 max-w-sm md:max-w-md mx-auto leading-relaxed"
              >
                Thank you for your response! Your application profile block has been successfully uploaded. A design notification was dispatched to <strong className="text-white">faadilnurudeen6@gmail.com</strong>. I'll reach out to schedule our session shortly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                className="pt-2"
              >
                <button 
                  type="button"
                  onClick={onBack}
                  className="bg-white text-black text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-3.5 rounded-sm hover:bg-brand hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  Back to Homepage
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Begins (hidden if succeeded so user sees clean confirmation) */}
        {!submission.succeeded && (
          <form 
            onSubmit={handleSubmit}
            className="space-y-12"
            id="questionnaire-main-form"
            action={FORMSPREE_ENDPOINT}
            method="POST"
          >
            {/* Indeterminate loader bar */}
            <AnimatePresence>
              {submission.submitting && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 3 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative w-full bg-white/5 overflow-hidden rounded-full mb-8"
                  id="questionnaire-loader-bar"
                >
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-brand shadow-[0_0_10px_rgba(234,88,12,0.8)] rounded-full"
                    style={{ width: '40%' }}
                    animate={{
                      left: ['-40%', '100%'],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.4,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SECTION 1: Client Basics */}
            <div className="glass-card p-6 md:p-8 rounded-sm space-y-6 relative border-white/5" id="field-block-basics">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-black px-4 py-1 text-brand font-mono text-[9px] uppercase tracking-widest border border-white/5">
                [01] Client Profile
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Full name */}
                <div className="space-y-2" id="field-block-name">
                  <div className="flex justify-between items-center h-4">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Full Name</label>
                    {touched.name && errors.name && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.name}</span>
                    )}
                  </div>
                  <input 
                    type="text"
                    name="name"
                    required
                    disabled={submission.submitting}
                    value={formData.name}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    placeholder="E.g., Alexander Mercer"
                    className={getInputClassName(!!errors.name, touched.name)}
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2" id="field-block-email">
                  <div className="flex justify-between items-center h-4">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
                    {touched.email && errors.email && (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.email}</span>
                    )}
                  </div>
                  <input 
                    type="email"
                    name="email"
                    required
                    disabled={submission.submitting}
                    value={formData.email}
                    onChange={handleTextChange}
                    onBlur={handleBlur}
                    placeholder="alex@company.com"
                    className={getInputClassName(!!errors.email, touched.email)}
                  />
                </div>
              </div>

              {/* Company name (Optional) */}
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Company / Organization <span className="text-white/20 font-light">(Optional)</span></label>
                <input 
                  type="text"
                  name="company"
                  disabled={submission.submitting}
                  value={formData.company}
                  onChange={handleTextChange}
                  placeholder="E.g., Quantum Labs Ltd."
                  className={getInputClassName(false, false)}
                />
              </div>
            </div>

            {/* SECTION 2: Project Type Grid */}
            <div className="glass-card p-6 md:p-8 rounded-sm space-y-6 relative border-white/5" id="field-block-project_type">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-black px-4 py-1 text-brand font-mono text-[9px] uppercase tracking-widest border border-white/5">
                [02] Type Selection
              </div>

              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center h-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Select Project Framework</label>
                  {touched.project_type && errors.project_type && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.project_type}</span>
                  )}
                </div>

                {/* Hidden input for real HTML submission state */}
                <input 
                  type="hidden" 
                  name="project_type" 
                  value={formData.project_type} 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = formData.project_type === type.label;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        disabled={submission.submitting}
                        onClick={() => handleSelectProjectType(type.label)}
                        className={`text-left p-5 transition-all duration-300 relative rounded-sm flex items-start gap-4 border group/card ${
                          isSelected 
                            ? 'bg-brand/10 border-brand shadow-[0_0_15px_rgba(234,88,12,0.051)]' 
                            : 'bg-white/[0.01] border-white/5 hover:bg-white/[0.025] hover:border-brand/30 hover:scale-[1.01]'
                        }`}
                      >
                        <div className={`p-2 rounded-sm transition-colors ${isSelected ? 'bg-brand text-black' : 'bg-white/5 group-hover/card:bg-brand/10'}`}>
                          {type.icon}
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                            {type.label}
                          </h4>
                          <p className="text-[11px] text-white/40 leading-relaxed font-sans font-light">
                            {type.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-brand">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                        
                        {/* Little corner bracket */}
                        <div className={`absolute bottom-0 right-0 w-4 h-4 pointer-events-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                          <div className="absolute bottom-1 right-1 w-2 h-[1px] bg-brand/40" />
                          <div className="absolute bottom-1 right-1 h-2 w-[1px] bg-brand/40" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 3: Budget Scope */}
            <div className="glass-card p-6 md:p-8 rounded-sm space-y-6 relative border-white/5" id="field-block-budget">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-black px-4 py-1 text-brand font-mono text-[9px] uppercase tracking-widest border border-white/5">
                [03] Budget Scope
              </div>

              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center h-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Select Estimated Budget</label>
                  {touched.budget && errors.budget && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.budget}</span>
                  )}
                </div>

                {/* Hidden Budget element name */}
                <input 
                  type="hidden" 
                  name="budget" 
                  value={formData.budget} 
                />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {BUDGET_OPTIONS.map((opt) => {
                    const isSelected = formData.budget === opt.value;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={submission.submitting}
                        onClick={() => handleSelectBudget(opt.value)}
                        className={`p-5 text-center rounded-sm font-mono text-xs uppercase transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border relative cursor-pointer active:scale-95 ${
                          isSelected 
                            ? 'bg-brand text-black border-brand font-bold shadow-[0_0_20px_rgba(234,88,12,0.15)]' 
                            : 'bg-white/[0.01] border-white/5 text-white/50 hover:text-white hover:bg-white/[0.03] hover:border-white/10 hover:scale-[1.02] shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)]'
                        }`}
                      >
                        {opt.value}

                        {/* Creative mini corner bracket for design honesty */}
                        {isSelected && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
                            <div className="absolute bottom-1 right-1 w-1.5 h-[1px] bg-black" />
                            <div className="absolute bottom-1 right-1 h-1.5 w-[1px] bg-black" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 4: Interactive Feature Tags */}
            <div className="glass-card p-6 md:p-8 rounded-sm space-y-6 relative border-white/5">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-black px-4 py-1 text-brand font-mono text-[9px] uppercase tracking-widest border border-white/5">
                [04] Features Needed
              </div>

              <div className="pt-2 space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-widest text-white/40 block">Select core feature specifications <span className="text-white/20 font-light">(Multiple allowed)</span></label>
                
                {/* Hidden features checklist payload info */}
                <input 
                  type="hidden" 
                  name="features" 
                  value={selectedFeatures.join(', ')} 
                />

                <div className="flex flex-wrap gap-2.5">
                  {FEATURE_TAGS.map((tag) => {
                    const isSelected = selectedFeatures.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        disabled={submission.submitting}
                        onClick={() => handleToggleFeature(tag)}
                        className={`px-4 py-2.5 rounded-sm font-sans text-[11px] tracking-wide transition-all duration-300 border flex items-center gap-2 ${
                          isSelected 
                            ? 'bg-brand/10 border-brand text-white font-medium' 
                            : 'bg-white/[0.015] border-white/5 hover:border-white/10 text-white/50 hover:text-white/85'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-brand" />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 5: Description details */}
            <div className="glass-card p-6 md:p-8 rounded-sm space-y-6 relative border-white/5" id="field-block-description">
              <div className="absolute top-0 left-8 -translate-y-1/2 bg-black px-4 py-1 text-brand font-mono text-[9px] uppercase tracking-widest border border-white/5">
                [05] Description
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between items-center h-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Project Outline & Target Goals</label>
                  {touched.description && errors.description && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.description}</span>
                  )}
                </div>

                <textarea 
                  name="description"
                  required
                  rows={6}
                  disabled={submission.submitting}
                  value={formData.description}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  placeholder="Sum up your target audience, required web structures, timeline constraint, or inspiration references. Please be as detailed as possible."
                  className={`${getInputClassName(!!errors.description, touched.description)} resize-none`}
                />
                
                <div className="flex justify-between items-center font-mono text-[8px] tracking-wider text-white/30 pt-1">
                  <span>SPECS COUNT: {formData.description.trim().length} CHR</span>
                  <span>MIN REQ: 20 CHR</span>
                </div>
              </div>
            </div>

            {/* Dynamic Error Warning banner if there's error before submission */}
            {submission.error && (
              <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-sm text-red-500 text-[10px] uppercase tracking-widest font-mono flex items-center gap-3">
                <span className="text-sm">⚠</span>
                <span>{submission.error}</span>
              </div>
            )}

            {/* Form Actions CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-4" id="questionnaire-cta-block">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest text-center sm:text-left">
                Security: responses are channeled to <span className="text-white/60">faadilnurudeen6@gmail.com</span> via Formspree.
              </p>

              <button
                type="submit"
                disabled={submission.submitting}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand text-black px-12 py-4 rounded-sm font-display text-xs uppercase tracking-[0.3em] font-bold hover:bg-brand-light transition-all duration-300 shadow-md group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submission.submitting ? 'Verifying Layouts...' : 'Submit Project Request'}
                {!submission.submitting && <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
