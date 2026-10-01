import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'link';
  tone?: 'light' | 'dark';
  disabled?: boolean;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2 h-12 px-6 text-[0.9375rem] font-medium transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed';
const styles = {
  // The estimate action is the only thing on the site in cedar.
  primary: { light: 'bg-timber text-black hover:bg-black hover:text-white', dark: 'bg-timber text-black hover:bg-white' },
  secondary: { light: 'border border-black text-black hover:bg-black hover:text-white', dark: 'border border-white/60 text-white hover:border-white hover:bg-white hover:text-black' },
  link: { light: 'h-auto px-0 text-black underline underline-offset-4 decoration-gray-200 hover:decoration-black', dark: 'h-auto px-0 text-white underline underline-offset-4 decoration-white/40 hover:decoration-white' },
};

export default function Button({ children, href, onClick, type = 'button', variant = 'primary', tone = 'light', disabled, className }: Props) {
  const cls = cn(base, styles[variant][tone], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
