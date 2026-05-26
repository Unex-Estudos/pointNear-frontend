import { ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' };

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants = { primary: 'bg-brand-600 text-white hover:bg-brand-700', secondary: 'bg-white text-ink border border-slate-200 hover:border-brand-200', ghost: 'text-ink hover:bg-slate-100' };
  return <button className={cn('inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60', variants[variant], className)} {...props} />;
}
