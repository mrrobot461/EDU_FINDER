import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, Layout, ChevronRight } from 'lucide-react';
import { CATEGORIES, POPULAR_COURSES } from '../constants';
import CategoryCard from '../components/CategoryCard';
import CourseCard from '../components/CourseCard';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <section className="pt-48 pb-32 px-8 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-bold tracking-tight mb-8 max-w-5xl mx-auto leading-[0.95]"
        >
          Find the Best Free Courses, Fast
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-2xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Discover thousands of free courses from Coursera, edX, Khan Academy, and FutureLearn in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 text-left"
        >
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm mb-1 uppercase tracking-wider">Aggregated Search</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">One query searches all major platforms simultaneously, saving you hours of manual browsing.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm mb-1 uppercase tracking-wider">Verified Free</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">We filter out hidden costs and "audit-only" traps to ensure you only see truly free learning content.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Layout className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-on-surface text-sm mb-1 uppercase tracking-wider">Curated Paths</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Expert-picked course sequences designed to take you from zero to job-ready in high-demand fields.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto relative group"
        >
          <div className="flex items-center bg-surface-container-highest rounded-2xl p-2 ghost-border group-focus-within:ring-2 group-focus-within:ring-primary/30 transition-all duration-300 editorial-shadow">
            <Search className="ml-4 w-6 h-6 text-on-surface-variant" />
            <input
              type="text"
              placeholder="What do you want to learn today?"
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface placeholder:text-on-surface-variant/40 py-5 px-4 text-xl"
            />
            <button className="hidden md:block px-10 py-4 rounded-xl primary-gradient text-on-primary font-bold active:scale-95 transition-all duration-200 whitespace-nowrap mr-1">
              Find Courses
            </button>
          </div>
          <button className="md:hidden w-full mt-4 px-8 py-5 rounded-xl primary-gradient text-on-primary font-bold active:scale-95 transition-all duration-200">
            Find Courses
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-24 flex flex-wrap justify-center gap-x-16 gap-y-8 grayscale"
        >
          <span className="font-bold text-2xl tracking-tighter">Coursera</span>
          <span className="font-bold text-2xl tracking-tighter">edX</span>
          <span className="font-bold text-2xl tracking-tighter">Khan Academy</span>
          <span className="font-bold text-2xl tracking-tighter">FutureLearn</span>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span className="text-[0.75rem] uppercase tracking-[0.1em] text-primary font-bold mb-3 block">
                Curated Pathways
              </span>
              <h2 className="text-4xl font-bold tracking-tight">Explore by Category</h2>
            </div>
            <Link to="/categories" className="text-primary hover:underline flex items-center gap-2 group font-semibold">
              See all categories
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-32 max-w-7xl mx-auto px-8">
        <div className="mb-16">
          <span className="text-[0.75rem] uppercase tracking-[0.1em] text-primary font-bold mb-3 block">
            Most Popular
          </span>
          <h2 className="text-5xl font-bold tracking-tight">Popular Free Courses</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {POPULAR_COURSES.slice(0, 4).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-surface-container-high rounded-[3rem] p-12 md:p-24 relative overflow-hidden border border-outline-variant/10 text-center"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-tertiary/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              Start your learning journey for $0
            </h2>
            <p className="text-on-surface-variant text-xl mb-16 max-w-2xl mx-auto leading-relaxed">
              Join millions of learners indexing the world's knowledge. No credit card required, ever.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <button className="px-12 py-5 rounded-2xl primary-gradient text-on-primary font-bold text-lg active:scale-95 transition-all editorial-shadow">
                Create Free Account
              </button>
              <Link to="/categories" className="px-12 py-5 rounded-2xl bg-surface-container-highest border border-outline/20 text-on-surface font-bold text-lg hover:bg-surface-bright transition-all inline-flex items-center justify-center">
                Browse All Categories
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default HomePage;