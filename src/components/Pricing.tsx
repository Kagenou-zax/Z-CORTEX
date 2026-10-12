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
    monthlyPrice: 15000,
    annualPrice: 12000,
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
    monthlyPrice: 80000,
    annualPrice: 64000,
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
    monthlyPrice: 250000,
    annualPrice: 200000,
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
    <section className="relative bg-white py-32 overflow-hidden border-t border-slate-200/80" id="pricing">
      {/* Background Decorative Architecture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40" id="pricing-architecture-bg">
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-slate-200" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-slate-200" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 -translate-x-1/2" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        
        {/* Pill & Header */}
        <div className="flex flex-col items-center text-center space-y-6 mb-16" id="pricing-heading-block">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 border border-slate-200 bg-slate-100 rounded-full shadow-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600 font-semibold">Pricing Structure</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none font-bold text-slate-900"
          >
            Clear, Predictable <br />
            <span className="text-slate-400">Investment</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-600 max-w-xl text-sm leading-relaxed"
          >
            Transparent engineering tiers calibrated for precision delivery. No hidden retainer fees. Choose the level that matches your project scale.
          </motion.p>

          {/* Billing Switch */}
          <div className="flex items-center gap-4 pt-4">
            <span className={`text-xs font-mono uppercase tracking-wider ${!isAnnual ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-12 h-6 bg-slate-200 rounded-full p-1 transition-colors duration-300 relative focus:outline-none cursor-pointer"
            >
              <div 
                className={`w-4 h-4 bg-blue-600 rounded-full transition-transform duration-300 ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} 
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono uppercase tracking-wider ${isAnnual ? 'text-blue-600 font-bold' : 'text-slate-500'}`}>Annually</span>
              <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-semibold">20% off</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.highlight 
                    ? 'bg-slate-900 text-white shadow-[0_20px_50px_rgba(15,23,42,0.25)] border-2 border-blue-600 ring-4 ring-blue-600/10' 
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-mono uppercase tracking-widest font-semibold ${plan.highlight ? 'text-blue-400' : 'text-blue-600'}`}>
                      {plan.name}
                    </span>
                    <div className={`p-2 rounded-xl ${plan.highlight ? 'bg-slate-800 text-blue-400' : 'bg-slate-100 text-blue-600'}`}>
                      {plan.icon}
                    </div>
                  </div>

                  <p className={`text-xs leading-relaxed mb-6 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
                      ₦{price.toLocaleString()}
                    </span>
                    <span className={`text-xs font-mono ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                      /{isAnnual ? 'yr' : 'mo'}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-blue-400' : 'text-blue-600'}`} />
                        <span className={plan.highlight ? 'text-slate-200' : 'text-slate-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={plan.checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full py-3.5 rounded-full text-xs font-display font-bold uppercase tracking-widest text-center transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30'
                      : 'bg-slate-100 text-slate-900 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
