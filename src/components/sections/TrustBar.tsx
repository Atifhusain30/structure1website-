import { trust } from '@/content/trust';
import { cn } from '@/lib/utils';

/** The seven facts, as a plain wrapped list. No boxes. */
export default function TrustBar({ tone = 'light', className }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-x-7 gap-y-2 text-small font-medium', tone === 'dark' ? 'text-white/85' : 'text-gray-700', className)}>
      {trust.map((t) => (
        <li key={t.label} className="flex items-center gap-2.5">
          <span className={cn('h-1.5 w-1.5 shrink-0', tone === 'dark' ? 'bg-white/70' : 'bg-black')} aria-hidden />
          {t.label}
        </li>
      ))}
    </ul>
  );
}
