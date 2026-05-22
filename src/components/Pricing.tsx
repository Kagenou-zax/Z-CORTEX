/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Layers, Cpu, Sparkles, ArrowRight } from 'lucide-react';

const pricingPlans = [
  {
    id: 'starter',
    name: 'Landing Tier',
    icon: <Layers className="w-5 h-5" />,
    description: 'Perfect for startups needing modular, super-fast, high-converting marketing sites.',
    monthlyPrice: 490,
    annualPrice: 390,
    features: [
      'Up to 3 Interactive Pages',
      'Tailwind CSS & React Setup',
      'High-performance scoring (98%+ PageSpeed)',
      'Basic SEO & metadata optimization',
      '48-hour revision turnaround',
    ],
    highlight: false,
    checkoutUrl: 'https://checkout.stripe.com/pay/noirbyte_starter_mock',
    ctaText: 'Deploy Landing',
  },
  {
    id: 'growth',
    name: 'SaaS Platform',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Complete full-stack development, interactive dashboards, dynamic routing, and clean APIs.',
    monthlyPrice: 1490,
    annualPrice: 1190,
    features: [
      'Full-Scale Custom Application',
      'Express Backend & API routing',
      'Database integration & state engine',
      'Bespoke Framer Motion layout animations',
      'Headless CMS content dashboard',
      'Dedicated Discord / Slack war-room channel',
    ],
    highlight: true, // Most popular
    badge: 'Most Popular',
    checkoutUrl: 'https://checkout.stripe.com/pay/noirbyte_growth_mock',
    ctaText: 'Assemble SaaS',
  },
  {
    id: 'scale',
    name: 'Custom Suite',
    icon: <Sparkles className="w-5 h-5" />,
    description: 'Comprehensive software engineering, dedicated development hours, security audits, and SLAs.',
    monthlyPrice: 3490,
    annualPrice: 2790,
    features: [
      'Unlimited projects queue',
      'Dedicated lead staff engineer',
      'Advanced client-side caching & state sync',
      'OAuth & advanced third-party webhooks',
      'Full security, rate limit, and penetration logs',
      '99.99% uptime guarantee SLA',
      'Ongoing 24/7 security & patch support',
    ],
    highlight: false,
    checkoutUrl: 'https://checkout.stripe.com/pay/noirbyte_scale_mock',
    ctaText: 'Inquire Custom Space',
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="relative bg-[#000000] py-32 overflow-hidden border-t border-white/5" id="pricing">
      {/* Background Decorative Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20" id="pricing-architecture-bg">
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-white/5" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-white/5" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
        {/* Accent light shine */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        
        {/* Pill & Header */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16" id="pricing-heading-block">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 border border-white/10 bg-white/[0.02] rounded-full"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/60">Pricing Structure</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl uppercase tracking-tight font-medium leading-[1.05]"
          >
            Simple Pricing Plans <br />
            <span className="text-white">for Growing Businesses</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 font-sans text-xs md:text-sm max-w-lg leading-relaxed"
          >
            Choose the plan that fits your business needs and scale with confidence.
          </motion.p>
        </div>

        {/* Dynamic Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-20" id="pricing-billing-toggle-container">
          <button 
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${!isAnnual ? 'text-white font-medium' : 'text-white/40 hover:text-white/65'}`}
          >
            Monthly
          </button>
          
          <button 
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative w-11 h-6 bg-white/5 border border-white/10 rounded-full flex items-center p-0.5 cursor-pointer focus:outline-none transition-colors duration-300"
            aria-label="Toggle annual billing"
          >
            <motion.div 
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`w-4.5 h-4.5 rounded-full shadow-md ${isAnnual ? 'bg-brand ml-auto' : 'bg-white/40'}`}
            />
          </button>

          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setIsAnnual(true)}
              className={`font-mono text-[10px] uppercase tracking-wider transition-colors duration-300 ${isAnnual ? 'text-white font-medium' : 'text-white/40 hover:text-white/65'}`}
            >
              Annually
            </button>
            <span className="bg-brand/10 border border-brand/20 px-2 py-0.5 rounded-sm text-[9px] font-mono font-medium text-brand uppercase tracking-wider">
              20% Off
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch" id="pricing-cards-container">
          {pricingPlans.map((plan, index) => {
            const currentPrice = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            const priceLabel = isAnnual ? '/month billed annually' : '/month';

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 * index, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col p-8 md:p-10 h-full backdrop-blur-md transition-all duration-500 rounded-sm group ${
                  plan.highlight 
                    ? 'bg-white/[0.04] border border-brand/40 shadow-[0_20px_50px_rgba(234,88,12,0.08)] hover:border-brand hover:shadow-[0_25px_60px_rgba(234,88,12,0.15)] hover:-translate-y-1.5' 
                    : 'bg-white/[0.015] border border-white/5 hover:bg-white/[0.035] hover:border-brand/35 hover:shadow-[0_20px_40px_rgba(255,255,255,0.02)] hover:-translate-y-1.5'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-brand text-black px-4 py-1 rounded-sm font-mono text-[8px] uppercase font-bold tracking-[0.2em] shadow-lg shadow-brand/10">
                    {plan.badge}
                  </div>
                )}

                {/* Card Icon Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-sm transition-colors duration-300 ${plan.highlight ? 'bg-brand text-black' : 'bg-white/5 text-brand group-hover:bg-brand/10 group-hover:text-brand'}`}>
                    {plan.icon}
                  </div>
                </div>

                {/* Plan Metadata */}
                <h3 className="font-display text-2xl uppercase tracking-widest font-medium text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed mb-6 min-h-[3em] font-sans">
                  {plan.description}
                </p>

                {/* Dynamic Price Render */}
                <div className="mb-8 flex flex-col justify-start">
                  <div className="flex items-baseline gap-1" id={`price-${plan.id}`}>
                    <span className="text-5xl font-display font-bold text-white tracking-tighter">
                      ${currentPrice}
                    </span>
                    <span className="text-white/30 text-[10px] font-mono uppercase tracking-widest">
                      {priceLabel}
                    </span>
                  </div>
                </div>

                {/* Separator */}
                <div className="w-full h-[1px] bg-white/5 mb-8" />

                {/* Features Checklist */}
                <div className="mb-10 flex-grow">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-brand/80 mb-5 block">
                    Includes:
                  </p>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3.5 text-xs text-white/75 group/item transition-colors">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${plan.highlight ? 'text-brand' : 'text-brand/40 group-hover/item:text-brand'}`} />
                        <span className="font-sans font-light tracking-wide text-white/70 hover:text-white transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Gateway Stripe/Mock Payments Checkout URL Anchor */}
                <a
                  href={plan.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-4 rounded-sm font-display text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_5px_15px_rgba(0,0,0,0.4)] ${
                    plan.highlight
                      ? 'bg-brand text-black hover:bg-brand-light'
                      : 'bg-white/5 text-white/80 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                </a>

                {/* Visual Architectural corner bounds */}
                <div className={`absolute bottom-0 right-0 w-8 h-8 pointer-events-none transition-opacity duration-300 ${plan.highlight ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                   <div className="absolute bottom-1.5 right-1.5 w-3 h-[1px] bg-brand/30" />
                   <div className="absolute bottom-1.5 right-1.5 h-3 w-[1px] bg-brand/30" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
