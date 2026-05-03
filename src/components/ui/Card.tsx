import React from 'react';
import { cn } from '@/src/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'low' | 'high' | 'highest' | 'glass';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-surface-container',
      low: 'bg-surface-container-low',
      high: 'bg-surface-container-high',
      highest: 'bg-surface-container-highest',
      glass: 'glass border border-white/5',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-md overflow-hidden', variants[variant], className)}
        {...props}
      />
    );
  }
);
