'use client';

import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const PRETTY: Record<string, string> = {
  all: 'All Work',
  'patio-covers': 'Patio Covers',
  concrete: 'Concrete',
  'outdoor-kitchens': 'Outdoor Kitchens',
};

export default function ProjectFilter({
  categories,
  activeFilter,
  onFilterChange,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-14">
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone mr-2">{'// Filter'}</span>
      {categories.map((category) => {
        const active = activeFilter === category;
        return (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={cn(
              'px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-300 border',
              active
                ? 'bg-rich-black text-white border-rich-black'
                : 'bg-transparent text-rich-black border-border hover:border-rich-black'
            )}
          >
            {PRETTY[category] || category.replace(/-/g, ' ')}
          </button>
        );
      })}
    </div>
  );
}
