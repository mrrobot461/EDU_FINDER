/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal, 
  Briefcase, 
  FlaskConical, 
  Palette, 
  Languages, 
  Theater, 
  Clock, 
  ArrowRight, 
  Globe, 
  Share2,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Layout,
  Megaphone,
  Heart,
  User,
  Calculator,
  Music,
  Camera,
  ArrowLeft
} from 'lucide-react';

// --- Types ---

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  image: string;
  categoryId: string;
  url: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

// --- Constants ---

const CATEGORIES: Category[] = [
  { id: 'tech', name: 'Tech', icon: Terminal, description: 'Coding, AI, Cybersecurity, and Cloud Computing.' },
  { id: 'business', name: 'Business', icon: Briefcase, description: 'Entrepreneurship, Finance, and Management.' },
  { id: 'science', name: 'Science', icon: FlaskConical, description: 'Physics, Biology, Chemistry, and Astronomy.' },
  { id: 'design', name: 'Design', icon: Palette, description: 'UI/UX, Graphic Design, and Motion Graphics.' },
  { id: 'languages', name: 'Languages', icon: Languages, description: 'Spanish, French, Mandarin, and more.' },
  { id: 'arts', name: 'Arts', icon: Theater, description: 'History, Literature, and Philosophy.' },
  { id: 'marketing', name: 'Marketing', icon: Megaphone, description: 'Digital Marketing, SEO, and Brand Strategy.' },
  { id: 'health', name: 'Health', icon: Heart, description: 'Nutrition, Fitness, and Mental Wellness.' },
  { id: 'personal-dev', name: 'Personal Dev', icon: User, description: 'Productivity, Leadership, and Soft Skills.' },
  { id: 'math', name: 'Math', icon: Calculator, description: 'Calculus, Statistics, and Discrete Math.' },
  { id: 'music', name: 'Music', icon: Music, description: 'Theory, Production, and Instrument Mastery.' },
  { id: 'photography', name: 'Photography', icon: Camera, description: 'Composition, Lighting, and Post-Processing.' },
];

const POPULAR_COURSES: Course[] = [
  {
    id: '1',
    title: 'Neural Networks 101',
    provider: 'Coursera',
    duration: '24h total',
    level: 'Intermediate',
    description: 'Master the fundamentals of deep learning and backpropagation from industry experts.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    categoryId: 'tech',
    url: 'https://www.coursera.org/learn/neural-networks-deep-learning',
  },
  {
    id: '2',
    title: 'UX Design Principles',
    provider: 'edX',
    duration: '12h total',
    level: 'Beginner',
    description: 'Learn how to create user-centric experiences through research and rapid prototyping.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800',
    categoryId: 'design',
    url: 'https://www.edx.org/learn/user-experience-design',
  },
  {
    id: '3',
    title: 'Microeconomics Masterclass',
    provider: 'Khan Academy',
    duration: '40h total',
    level: 'Advanced',
    description: 'A deep dive into supply, demand, and market equilibrium for serious students.',
    image: 'https://images.unsplash.com/photo-1611974717537-484418a4122a?auto=format&fit=crop&q=80&w=800',
    categoryId: 'business',
    url: 'https://www.khanacademy.org/economics-finance-domain/microeconomics',
  },
  {
    id: '4',
    title: 'Creative Writing 101',
    provider: 'FutureLearn',
    duration: '8h total',
    level: 'Beginner',
    description: 'Unlock your storytelling potential through guided exercises and peer feedback.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800',
    categoryId: 'arts',
    url: 'https://www.futurelearn.com/courses/creative-writing',
  },
  {
    id: '5',
    title: 'Python for Data Science',
    provider: 'Coursera',
    duration: '30h total',
    level: 'Beginner',
    description: 'Start your journey into data analysis with Python, NumPy, and Pandas.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    categoryId: 'tech',
    url: 'https://www.coursera.org/learn/python-for-applied-data-science',
  },
  {
    id: '6',
    title: 'Digital Marketing Strategy',
    provider: 'Google',
    duration: '15h total',
    level: 'Beginner',
    description: 'Learn the core pillars of digital marketing: SEO, SEM, and Social Media.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    categoryId: 'marketing',
    url: 'https://grow.google/certificates/digital-marketing-ecommerce/',
  },
  {
    id: '7',
    title: 'Introduction to Astronomy',
    provider: 'edX',
    duration: '20h total',
    level: 'Beginner',
    description: 'Explore the wonders of the universe, from planets to distant galaxies.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800',
    categoryId: 'science',
    url: 'https://www.edx.org/learn/astronomy',
  },
  {
    id: '8',
    title: 'Financial Markets',
    provider: 'Yale University',
    duration: '35h total',
    level: 'Intermediate',
    description: 'An overview of the ideas, methods, and institutions that permit human society to manage risks.',
    image: 'https://images.unsplash.com/photo-1611974717537-484418a4122a?auto=format&fit=crop&q=80&w=800',
    categoryId: 'business',
    url: 'https://www.coursera.org/learn/financial-markets-global',
  },
  {
    id: '9',
    title: 'Cloud Computing Fundamentals',
    provider: 'AWS',
    duration: '10h total',
    level: 'Beginner',
    description: 'Learn the basics of cloud computing, storage, and networking on AWS.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    categoryId: 'tech',
    url: 'https://aws.amazon.com/training/digital/cloud-practitioner-essentials/',
  },
  {
    id: '10',
    title: 'Cybersecurity for Everyone',
    provider: 'IBM',
    duration: '18h total',
    level: 'Beginner',
    description: 'Protect yourself and your organization from cyber threats with this comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    categoryId: 'tech',
    url: 'https://www.coursera.org/specializations/cybersecurity',
  },
  {
    id:'11',
    title: 'Computer architecture',
    provider: 'IBM',
    duration: '20h total',
    level: 'Beginner',
    description: 'indepth understanding of computer systems',
    image: 'https://images.unsplash.com/photo-1760539165425-f76a6da1e50e?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    categoryId: 'tech',
    url: ''

  }

];

// --- Components ---

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

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="bg-surface-container-highest rounded-2xl overflow-hidden ghost-border group transition-all duration-300 editorial-shadow"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[0.6875rem] uppercase tracking-wider font-bold">
            {course.level}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[0.6875rem] uppercase tracking-[0.05em] text-primary font-bold">
            {course.provider}
          </span>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-[0.6875rem]">{course.duration}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 leading-tight text-on-surface group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
        
        <a 
          href={course.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl bg-surface-container-high border border-outline/20 text-primary font-bold hover:bg-primary hover:text-on-primary transition-all duration-200 block text-center"
        >
          View Course
        </a>
      </div>
    </motion.div>
  );
};

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
