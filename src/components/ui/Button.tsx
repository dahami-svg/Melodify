import React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary-fixed font-bold neon-glow hover:scale-[1.02] active:scale-95 transition-all',
      secondary: 'bg-surface-container-highest text-white font-semibold hover:bg-surface-variant transition-all',
      ghost: 'bg-transparent text-primary-fixed font-bold hover:text-primary transition-all',
      glass: 'glass border border-white/5 text-white font-semibold hover:bg-surface-variant/80 transition-all',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs rounded-full',
      md: 'px-6 py-3 text-sm rounded-full',
      lg: 'px-8 py-4 text-base rounded-full',
      xl: 'px-10 py-5 text-lg rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
