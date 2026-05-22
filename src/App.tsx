/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import Projects from './components/Projects';
import Process from './components/Process';
import Blog from './components/Blog';
import ContactFooter from './components/ContactFooter';
import LoginPage from './components/LoginPage';
import Questionnaire from './components/Questionnaire';
import { AnimatePresence } from 'motion/react';
import { useAuth } from './components/AuthProvider';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setShowLogin(false);
    }
  }, [user]);

  // Ensure viewports are scrolled back to top when switching views
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [showLogin, showQuestionnaire]);

  return (
    <main className="relative min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {showLogin ? (
          <LoginPage key="login" onBack={() => setShowLogin(false)} />
        ) : showQuestionnaire ? (
          <Questionnaire key="questionnaire" onBack={() => setShowQuestionnaire(false)} />
        ) : (
          <div key="landing">
            <Navbar onLoginClick={() => setShowLogin(true)} />
            <Hero onStartProjectClick={() => setShowQuestionnaire(true)} />
            <Projects />
            <Process />
            <Blog />
            <Pricing />
            <ContactFooter />
            
            {/* Scroll indicator or other background decorations could go here */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-40 pointer-events-none opacity-20">
              <div className="w-[1px] h-12 bg-white" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-light">{user ? `Authenticated: ${user.email}` : 'Scroll'}</span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
