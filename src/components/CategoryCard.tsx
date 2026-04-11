import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Category } from '../types';

const CategoryCard = ({ category }: { category: Category }) => {
  const Icon = category.icon;
  return (
    <Link to={`/category/${category.id}`}>
      <motion.div
        whileHover={{ scale: 1.05, backgroundColor: 'var(--color-surface-bright)' }}
        className="bg-surface-container-highest p-8 rounded-2xl ghost-border cursor-pointer text-center group transition-colors h-full"
      >
        <div className="w-12 h-12 bg-primary-container/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="font-medium text-on-surface block mb-2">{category.name}</span>
        <p className="text-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
          {category.description}
        </p>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;