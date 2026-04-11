import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { CATEGORIES, POPULAR_COURSES } from '../constants';
import CategoryCard from '../components/CategoryCard';
import CourseCard from '../components/CourseCard';

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const category = useMemo(() => CATEGORIES.find(c => c.id === id), [id]);
  const courses = useMemo(() => POPULAR_COURSES.filter(c => c.categoryId === id), [id]);

  if (!category) {
    return (
      <div className="pt-48 pb-32 px-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Category not found</h1>
        <Link to="/categories" className="text-primary hover:underline">View all categories</Link>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-48 pb-32 px-8 max-w-7xl mx-auto"
    >
      <div className="mb-16">
        <Link to="/categories" className="text-primary hover:underline flex items-center gap-2 mb-6 font-semibold">
          <ArrowLeft className="w-5 h-5" />
          All Categories
        </Link>
        <div className="flex items-center gap-6 mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-6xl font-bold tracking-tight mb-2">{category.name}</h1>
            <p className="text-xl text-on-surface-variant max-w-2xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-surface-container-high rounded-3xl p-20 text-center border border-outline/10">
          <Sparkles className="w-12 h-12 text-primary/40 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-2">More courses coming soon</h3>
          <p className="text-on-surface-variant mb-8">We're currently indexing the best free {category.name} courses for you.</p>
          <Link to="/categories" className="px-8 py-3 rounded-xl primary-gradient text-on-primary font-bold inline-block">
            Explore Other Categories
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryDetailPage;