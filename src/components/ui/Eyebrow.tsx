import { cn } from '@/lib/utils';

/** A short, sentence-case lead-in above a heading. Use only when it adds information the heading lacks. */
export default function Eyebrow({ children, tone = 'light', className }: { children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return <p className={cn('text-eyebrow', tone === 'dark' ? 'text-white/70' : 'text-gray-500', className)}>{children}</p>;
}
