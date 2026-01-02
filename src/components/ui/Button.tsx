'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'white';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 rounded-full font-medium tracking-wider uppercase text-sm transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary-black text-white hover:shadow-xl hover:-translate-y-0.5',
    outline: 'border-2 border-primary-black text-primary-black hover:bg-primary-black hover:text-white',
    white: 'bg-white text-primary-black hover:shadow-xl hover:-translate-y-0.5',
  };

  const buttonContent = (
    <motion.span
      className={cn(baseStyles, variants[variant], className, disabled && 'opacity-50 cursor-not-allowed')}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {buttonContent}
    </button>
  );
}


