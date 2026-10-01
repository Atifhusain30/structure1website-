import { cn } from '@/lib/utils';
import Container from './Container';

type Tone = 'white' | 'offwhite' | 'dark';
const tones: Record<Tone, string> = { white: 'bg-white text-black', offwhite: 'bg-offwhite text-black', dark: 'bg-black text-white' };

export default function Section({
  children,
  tone = 'white',
  id,
  className,
  bleed = false,
}: {
  children: React.ReactNode;
  tone?: Tone;
  id?: string;
  className?: string;
  bleed?: boolean;
}) {
  return (
    <section id={id} className={cn(tones[tone], 'py-16 md:py-24', className)}>
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}
