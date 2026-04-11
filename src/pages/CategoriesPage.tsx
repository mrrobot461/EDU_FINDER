import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CATEGORIES } from '../constants';
import CategoryCard from '../components/CategoryCard';

const CategoriesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 pb-32 px-8 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <Link to="/" className="text-primary hover:underline flex items-center gap-2 mb-6 font-semibold">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-6xl font-bold tracking-tight mb-4">All Categories</h1>
        <p className="text-xl text-on-surface-variant max-w-2xl">
          Explore our complete catalog of free educational resources across every major discipline.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </motion.div>
  );
};

export default CategoriesPage;