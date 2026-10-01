import { cn } from '@/lib/utils';

export default function Eyebrow({ children, tone = 'light', className }: { children: React.ReactNode; tone?: 'light' | 'dark'; className?: string }) {
  return <p className={cn('text-eyebrow uppercase', tone === 'dark' ? 'text-white/70' : 'text-gray-500', className)}>{children}</p>;
}
