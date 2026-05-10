import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Gets login status

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

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
          
          {/* ONLY SHOW "MY LEARNING" IF LOGGED IN */}
          {user && (
            <Link to="/my-learning" className={`font-medium relative group ${location.pathname === '/my-learning' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
              My Learning
              {location.pathname === '/my-learning' && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />}
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
             <div className="flex items-center gap-4">
               <span className="text-sm text-on-surface-variant hidden md:block">
                 {user.email}
               </span>
               <button 
                 onClick={handleSignOut}
                 className="px-5 py-2 rounded-xl bg-surface-container-high border border-outline/20 text-on-surface font-medium hover:bg-surface-bright transition-all"
               >
                 Sign Out
               </button>
             </div>
          ) : (
            // IF LOGGED OUT, SHOW SIGN IN BUTTON
            <Link 
              to="/auth"
              className="px-6 py-2.5 rounded-xl primary-gradient text-on-primary font-bold active:scale-95 transition-all duration-200 editorial-shadow"
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;