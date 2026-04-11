/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Globe, Share2 } from 'lucide-react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import QuestionnairePage from './pages/Questionaire';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />

        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/:id" element={<CategoryDetailPage />} />
              <Route path="/questionnaire" element={<QuestionnairePage />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="bg-surface-container-low border-t border-outline-variant/10 py-20 px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <Link to="/" className="text-xl font-bold text-on-surface mb-3 tracking-tighter block">EduFinder</Link>
              <p className="text-on-surface-variant/50 text-[0.75rem] uppercase tracking-[0.1em] font-medium">
                © 2026 EduFinder • Built with Passion
              </p>
            </div>

            <div className="flex gap-16 font-medium text-[0.75rem] uppercase tracking-[0.15em]">
              <a href="#" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">About</a>
              <Link to="/categories" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">Categories</Link>
              <a href="#" className="text-on-surface-variant/60 hover:text-on-surface transition-colors">Privacy</a>
            </div>

            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-dim hover:bg-primary hover:text-on-primary transition-all duration-300">
                <Globe className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary-dim hover:bg-primary hover:text-on-primary transition-all duration-300">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
