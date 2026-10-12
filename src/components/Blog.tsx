/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, BookOpenText } from 'lucide-react';

const articles = [
  {
    date: 'March 14, 2024',
    category: 'Engineering',
    title: 'Architecting Scalable Micro-frontends with React',
    excerpt: 'Detailed insights into creating modular, maintainable frontend structures for enterprise-grade applications.',
    href: 'blog/architecting-scalable-microfrontends.html',
  },
  {
    date: 'February 28, 2024',
    category: 'Intelligence',
    title: 'Integrating Generative AI into Modern Workflows',
    excerpt: 'How we leverage LLMs to accelerate development cycles without compromising on architectural integrity.',
    href: 'blog/integrating-generative-ai.html',
  },
  {
    date: 'January 12, 2024',
    category: 'Design',
    title: 'The Psychology of Dark Mode in Luxury Interfaces',
    excerpt: 'Exploring the visual principles that drive user engagement in premium, low-light digital environments.',
    href: 'blog/psychology-dark-mode.html',
  },
];

export default function Blog() {
  return (
    <section className="relative bg-slate-50/70 py-32 border-t border-slate-200/80" id="blog">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenText className="w-4 h-4 text-blue-600" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 font-semibold">Knowledge Base</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none font-bold text-slate-900">
              Journal & <br />
              <span className="text-slate-400">Insights</span>
            </h2>
          </div>
          <button className="font-display text-[11px] uppercase tracking-[0.3em] font-semibold border-b-2 border-blue-600 pb-1 text-slate-800 hover:text-blue-600 transition-colors cursor-pointer">
            View All Articles
          </button>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <motion.a
              key={idx}
              href={article.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02, y: -4 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-8 sm:p-10 group cursor-pointer border border-slate-200 hover:border-blue-500 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] transition-all duration-500 flex flex-col justify-between min-h-[380px] z-10 no-underline text-slate-900 block rounded-2xl sm:rounded-3xl shadow-sm"
              id={`blog-card-${idx}`}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-blue-600 font-bold">{article.category}</span>
                    <span className="text-slate-400">{article.date}</span>
                  </div>
                  
                  <h3 className="relative font-display text-2xl font-bold leading-tight tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors duration-300 w-fit">
                    {article.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-sans">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-mono font-semibold text-slate-700 group-hover:text-blue-600">
                <span>Read Full Analysis</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-blue-600" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
