'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectFilter({
  categories,
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <motion.button
          key={category}
          onClick={() => onFilterChange(category)}
          className={cn(
            'px-6 py-3 rounded-full text-sm font-medium transition-all duration-300',
            activeFilter === category
              ? 'bg-primary-black text-white'
              : 'bg-white text-primary-black hover:bg-cream'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {category === 'all' ? 'All Projects' : category.replace('-', ' ')}
        </motion.button>
      ))}
    </div>
  );
}


