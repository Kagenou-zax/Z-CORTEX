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
    <section className="relative bg-[#0A0E17] py-32 border-t border-[#38BDF8]/10" id="blog">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpenText className="w-4 h-4 text-brand" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#94A3B8]">Knowledge Base</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl uppercase tracking-tighter leading-none font-medium text-white">
              Journal & <br />
              <span className="text-[#38BDF8]/30">Insights</span>
            </h2>
          </div>
          <button className="font-display text-[11px] uppercase tracking-[0.3em] font-medium border-b border-brand pb-1 text-white hover:text-brand transition-colors">
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
              className="bg-[#131B2E] p-10 group cursor-pointer border border-[#38BDF8]/15 hover:border-brand/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between min-h-[400px] z-10 no-underline text-white block rounded-sm"
              id={`blog-card-${idx}`}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-brand font-bold">{article.category}</span>
                    <span className="text-[#94A3B8]/60">{article.date}</span>
                  </div>
                  
                  <h3 className="relative font-display text-2xl uppercase font-medium leading-tight tracking-tight text-white group-hover:text-brand transition-colors duration-300 w-fit">
                    {article.title}
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-brand transition-all duration-500 group-hover:w-full" />
                  </h3>
                  <p className="text-[#94A3B8] text-[13px] leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-8 flex items-center justify-between border-t border-[#38BDF8]/15">
                <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#94A3B8] group-hover:text-white transition-colors">Read More</span>
                <div className="w-8 h-8 rounded-full border border-[#38BDF8]/30 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-all">
                  <ArrowRight className="w-4 h-4 text-white group-hover:text-[#0A0E17] transition-colors" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
