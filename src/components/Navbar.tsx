import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-on-surface">
          EduFinder
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link to="/" className={`font-medium relative group ${location.pathname === '/' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            Explore
            {location.pathname === '/' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />}
          </Link>
          <Link to="/categories" className={`font-medium relative group ${location.pathname === '/categories' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            Categories
            {location.pathname === '/categories' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />}
          </Link>
          <Link to="/questionnaire" className={`font-medium relative group ${location.pathname === '/questionnaire' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            Questionnaire
            {location.pathname === '/questionnaire' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />}
          </Link>
          <a href="#" className="text-on-surface-variant hover:text-on-surface transition-colors font-medium">
            My Learning
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-xl primary-gradient text-on-primary font-bold active:scale-95 transition-all duration-200 editorial-shadow">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;