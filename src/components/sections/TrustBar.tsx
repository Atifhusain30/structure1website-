import { trust } from '@/content/trust';
import { cn } from '@/lib/utils';

export default function TrustBar({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  const rule = tone === 'dark' ? 'border-white/15' : 'border-gray-200';
  return (
    <ul
      className={cn(
        'grid grid-cols-2 gap-x-6 gap-y-3 border-y py-5 text-meta font-medium md:grid-cols-4 lg:flex lg:justify-between',
        rule,
        tone === 'dark' ? 'text-white/80' : 'text-gray-700',
        className,
      )}
    >
      {trust.map((t) => (
        <li key={t.label} className="flex items-center gap-2">
          <span className={cn('h-1.5 w-1.5 shrink-0', tone === 'dark' ? 'bg-white/60' : 'bg-black')} aria-hidden />
          {t.label}
        </li>
      ))}
    </ul>
  );
}
