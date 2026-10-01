import Eyebrow from '@/components/ui/Eyebrow';
import { cn } from '@/lib/utils';

export default function SectionHeader({
  eyebrow,
  title,
  text,
  tone = 'light',
  align = 'left',
  as: Tag = 'h2',
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <Eyebrow tone={tone} className="mb-4">
          {eyebrow}
        </Eyebrow>
      )}
      <Tag className={cn('font-display', Tag === 'h1' ? 'text-h1' : 'text-h2')}>{title}</Tag>
      {text && <p className={cn('mt-4 text-lead', tone === 'dark' ? 'text-white/70' : 'text-gray-700')}>{text}</p>}
    </div>
  );
}
