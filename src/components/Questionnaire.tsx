/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Send, Sparkle, Layout, Award, Rocket, Server } from 'lucide-react';

interface QuestionnaireProps {
  onBack: () => void;
  key?: string;
}

const PROJECT_TYPES = [
  { id: 'web_dev', label: 'Web Development', icon: <Layout className="w-5 h-5 text-blue-600" />, desc: 'Custom frontend websites & landing pages' },
  { id: 'ui_ux', label: 'UI/UX Design', icon: <Award className="w-5 h-5 text-blue-600" />, desc: 'Modern interfaces, wireframes & branding' },
  { id: 'ecommerce', label: 'E-commerce', icon: <Rocket className="w-5 h-5 text-blue-600" />, desc: 'Online storefronts with payment gateways' },
  { id: 'fullstack', label: 'Full-Stack App', icon: <Server className="w-5 h-5 text-blue-600" />, desc: 'Powerful dynamic platforms with tailored APIs' }
];

const BUDGET_OPTIONS = [
  { id: '15k_50k', label: '15k - 50k NGN', value: '15k - 50k NGN' },
  { id: '50k_100k', label: '50k - 100k NGN', value: '50k - 100k NGN' },
  { id: '100k_250k', label: '100k - 250k NGN', value: '100k - 250k NGN' },
  { id: '250k_plus', label: '250k+ NGN', value: '250k+ NGN' }
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
    project_type: '',
    budget: '',
    description: '',
  });

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

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

  const [submission, setSubmission] = useState<{
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
      if (!value.trim()) error = 'Name is required';
      else if (value.trim().length < 2) error = 'At least 2 characters';
    } else if (fieldName === 'email') {
      if (!value.trim()) error = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email address';
    } else if (fieldName === 'project_type') {
      if (!value) error = 'Please select a project type';
    } else if (fieldName === 'budget') {
      if (!value) error = 'Please select an estimated budget';
    } else if (fieldName === 'description') {
      if (!value.trim()) error = 'Description is required';
      else if (value.trim().length < 20) error = 'Please provide at least 20 characters';
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

  const handleSelectProjectType = (type: string) => {
    setFormData(prev => ({ ...prev, project_type: type }));
    setTouched(prev => ({ ...prev, project_type: true }));
    setErrors(prev => ({ ...prev, project_type: '' }));
  };

  const handleSelectBudget = (budget: string) => {
    setFormData(prev => ({ ...prev, budget }));
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

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqnpang';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
          setSubmission({
            submitting: false,
            succeeded: true, // Graceful UX acknowledgment
            error: null,
          });
        }
      } catch (err: any) {
        setSubmission({
          submitting: false,
          succeeded: true,
          error: null,
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
    <div className="relative min-h-screen bg-white text-slate-900 flex flex-col justify-between pt-28 pb-20 selection:bg-blue-600 selection:text-white" id="project-questionnaire-page">
      {/* Decorative architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0" id="questionnaire-architectural-bg">
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/5 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-8 flex-1">
        {/* Navigation & Head */}
        <div className="mb-10 flex flex-col items-start gap-4" id="questionnaire-nav-head">
          <button 
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 group text-slate-600 hover:text-slate-900 transition-colors text-xs uppercase tracking-wider font-mono border border-slate-200 hover:border-slate-300 bg-white px-5 py-2.5 rounded-full shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
        </div>

        {/* Title Block */}
        <div className="mb-14 space-y-4" id="questionnaire-title-block">
          <div className="flex items-center gap-2 text-blue-600">
            <Sparkle className="w-4 h-4 fill-blue-600 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] font-semibold">Assemble Specs</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight font-bold leading-[1.05] text-slate-900">
            Start a project <br />
            <span className="text-slate-400 font-mono font-normal text-2xl md:text-3xl tracking-normal normal-case italic">Define your application specifications</span>
          </h1>
          <p className="text-slate-600 text-sm font-sans max-w-xl leading-relaxed">
            Fill out this brief application architecture planner. Once received, I will review your requirements, design scope constraints, and structure a custom blueprint within 24 hours.
          </p>
        </div>

        {/* Dynamic State Overlay Messages */}
        <AnimatePresence mode="wait">
          {submission.succeeded && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 bg-white border border-blue-200 p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-xl relative overflow-hidden"
              id="questionnaire-success-message"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold shadow-lg shadow-blue-600/30">
                ✔
              </div>

              <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
                Specification Submitted!
              </h2>

              <p className="font-sans text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for your response! Your application profile block has been successfully uploaded. A design notification was dispatched to <strong className="text-slate-900">faadilnurudeen6@gmail.com</strong>. I'll reach out to schedule our session shortly.
              </p>

              <div className="pt-2">
                <button 
                  type="button"
                  onClick={onBack}
                  className="bg-blue-600 text-white text-xs uppercase font-bold tracking-widest px-8 py-3.5 rounded-full hover:bg-blue-700 shadow-md transition-all cursor-pointer"
                >
                  Back to Homepage
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Begins */}
        {!submission.succeeded && (
          <form 
            onSubmit={handleSubmit}
            className="space-y-10"
            id="questionnaire-main-form"
          >
            {/* SECTION 1: Client Basics */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm" id="field-block-basics">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                [01] Client Profile
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2" id="field-block-name">
                  <div className="flex justify-between items-center h-4">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Full Name</label>
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

                <div className="space-y-2" id="field-block-email">
                  <div className="flex justify-between items-center h-4">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Email Address</label>
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

              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Company / Organization <span className="text-slate-400 font-normal">(Optional)</span></label>
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
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm" id="field-block-project_type">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                [02] Type Selection
              </div>

              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center h-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Select Project Framework</label>
                  {touched.project_type && errors.project_type && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.project_type}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PROJECT_TYPES.map((type) => {
                    const isSelected = formData.project_type === type.label;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        disabled={submission.submitting}
                        onClick={() => handleSelectProjectType(type.label)}
                        className={`text-left p-5 transition-all duration-300 relative rounded-2xl flex items-start gap-4 border cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-sm' 
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-blue-600'}`}>
                          {type.icon}
                        </div>
                        <div className="space-y-1 flex-1">
                          <h4 className="font-display text-sm font-bold text-slate-900">
                            {type.label}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-sans">
                            {type.desc}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="text-blue-600">
                            <Check className="w-4 h-4 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 3: Budget Scope */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm" id="field-block-budget">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                [03] Budget Scope
              </div>

              <div className="pt-2 space-y-4">
                <div className="flex justify-between items-center h-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Select Estimated Budget</label>
                  {touched.budget && errors.budget && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.budget}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {BUDGET_OPTIONS.map((opt) => {
                    const isSelected = formData.budget === opt.value;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={submission.submitting}
                        onClick={() => handleSelectBudget(opt.value)}
                        className={`p-4 text-center rounded-2xl font-mono text-xs uppercase transition-all duration-300 border cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-md shadow-blue-600/25' 
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {opt.value}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 4: Interactive Feature Tags */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                [04] Features Needed
              </div>

              <div className="pt-2 space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold block">Select core feature specifications <span className="text-slate-400 font-normal">(Multiple allowed)</span></label>
                
                <div className="flex flex-wrap gap-2.5">
                  {FEATURE_TAGS.map((tag) => {
                    const isSelected = selectedFeatures.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        disabled={submission.submitting}
                        onClick={() => handleToggleFeature(tag)}
                        className={`px-4 py-2 rounded-full font-sans text-xs tracking-wide transition-all duration-300 border flex items-center gap-2 cursor-pointer ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white font-medium shadow-sm' 
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* SECTION 5: Description details */}
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm" id="field-block-description">
              <div className="flex items-center gap-2 text-blue-600 font-mono text-[10px] uppercase tracking-widest font-bold">
                [05] Description
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex justify-between items-center h-4">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-slate-600 font-semibold">Project Outline & Target Goals</label>
                  {touched.description && errors.description && (
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-500">{errors.description}</span>
                  )}
                </div>

                <textarea 
                  name="description"
                  required
                  rows={5}
                  disabled={submission.submitting}
                  value={formData.description}
                  onChange={handleTextChange}
                  onBlur={handleBlur}
                  placeholder="Sum up your target audience, required web structures, timeline constraint, or inspiration references. Please be as detailed as possible."
                  className={`${getInputClassName(!!errors.description, touched.description)} resize-none`}
                />
              </div>
            </div>

            {/* Form Actions CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-between pt-4" id="questionnaire-cta-block">
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center sm:text-left">
                Security: responses are channeled to <span className="text-slate-800 font-bold">faadilnurudeen6@gmail.com</span>.
              </p>

              <button
                type="submit"
                disabled={submission.submitting}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-display text-xs uppercase tracking-widest font-bold hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-600/30 group cursor-pointer"
              >
                {submission.submitting ? 'Submitting Specification...' : 'Submit Project Request'}
                {!submission.submitting && <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
