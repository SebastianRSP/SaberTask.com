import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'default', children, ...props }, ref) => {
    const sizes = {
      narrow: 'max-w-4xl',
      default: 'max-w-7xl',
      wide: 'max-w-[1400px]',
    };

    return (
      <div
        ref={ref}
        className={cn(sizes[size], 'mx-auto px-4 sm:px-6 lg:px-8', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container;
