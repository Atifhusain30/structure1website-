import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'link';
  tone?: 'light' | 'dark';
  arrow?: boolean;
  disabled?: boolean;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 h-12 px-6 text-sm font-medium tracking-[0.02em] transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed';
const styles = {
  primary: { light: 'bg-black text-white hover:bg-charcoal', dark: 'bg-white text-black hover:bg-offwhite' },
  secondary: { light: 'border border-black text-black hover:bg-black hover:text-white', dark: 'border border-white text-white hover:bg-white hover:text-black' },
  link: { light: 'h-auto px-0 text-black underline-offset-4 hover:underline hover:text-timber', dark: 'h-auto px-0 text-white underline-offset-4 hover:underline' },
};

export default function Button({ children, href, onClick, type = 'button', variant = 'primary', tone = 'light', arrow = false, disabled, className }: Props) {
  const cls = cn(base, styles[variant][tone], className);
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4" aria-hidden />}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  );
}
