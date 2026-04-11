import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Course } from '../types';

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

export default CourseCard;