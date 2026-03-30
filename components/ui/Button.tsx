'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', withArrow = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: withArrow ? 'bg-primary text-white hover:opacity-80' : 'bg-primary text-white hover:bg-primary-600',
      secondary: withArrow ? 'bg-white text-primary border-2 border-primary hover:opacity-80' : 'bg-white text-primary border-2 border-primary hover:bg-primary-50',
      ghost: 'text-dark hover:bg-gray-100',
    };

    const sizes = {
      sm: withArrow ? 'pl-5 pr-1.5 py-1.5 text-sm rounded-full' : 'px-4 py-2 text-sm rounded-lg',
      md: withArrow ? 'pl-6 pr-2 py-2 text-base rounded-full' : 'px-6 py-3 text-base rounded-btn',
      lg: withArrow ? 'pl-8 pr-2.5 py-2.5 text-lg rounded-full' : 'px-8 py-4 text-lg rounded-btn',
    };

    const arrowSizes = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], withArrow && 'group', className)}
        {...props}
      >
        <span>{children}</span>
        {withArrow && (
          <span className={cn('ml-3 bg-dark rounded-full flex items-center justify-center flex-shrink-0', arrowSizes[size])}>
            <svg
              className={cn(
                'transition-transform duration-200 group-hover:rotate-45',
                size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
