'use client';

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
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {categories.map((category) => {
        const active = activeFilter === category;
        return (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={cn(
              'px-5 py-2.5 text-[11px] font-body font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
              active
                ? 'bg-rich-black text-white'
                : 'bg-warm-white text-rich-black border border-border hover:border-rich-black'
            )}
          >
            {category === 'all' ? 'All Projects' : category.replace('-', ' ')}
          </button>
        );
      })}
    </div>
  );
}
