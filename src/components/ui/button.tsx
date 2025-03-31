import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-medium relative',
  'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
  'disabled:opacity-50 max-w-full overflow-hidden text-ellipsis',
  'transform hover:-translate-y-0.5 active:translate-y-0',
  {
    variants: {
      variant: {
        default:
          [
            'bg-gradient-to-r from-blue-600 to-red-600 text-white',
            'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
            'hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)]',
            'hover:from-blue-700 hover:to-red-700',
            'after:absolute after:inset-0 after:rounded-lg',
            'after:border after:border-white/20 after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity',
            'active:shadow-[0_10px_20px_rgb(0,0,0,0.15)]'
          ].join(' '),
        destructive:
          [
            'bg-gradient-to-r from-red-600 to-red-700 text-white',
            'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
            'hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)]',
            'hover:from-red-700 hover:to-red-800',
            'after:absolute after:inset-0 after:rounded-lg',
            'after:border after:border-white/20 after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity'
          ].join(' '),
        outline:
          [
            'border-2 border-blue-600/80 bg-transparent text-blue-600',
            'hover:bg-blue-600 hover:text-white backdrop-blur-sm',
            'shadow-[0_4px_20px_rgb(0,0,0,0.08)]',
            'hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)]',
            'after:absolute after:inset-0 after:rounded-lg',
            'after:border after:border-blue-400/20 after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity'
          ].join(' '),
        secondary:
          [
            'bg-white/90 text-blue-600 backdrop-blur-sm',
            'shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
            'hover:shadow-[0_20px_40px_rgb(0,0,0,0.25)]',
            'hover:bg-blue-50/90',
            'after:absolute after:inset-0 after:rounded-lg',
            'after:border after:border-blue-200/20 after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity'
          ].join(' '),
        ghost:
          [
            'hover:bg-blue-50/80 hover:text-blue-600',
            'after:absolute after:inset-0 after:rounded-lg',
            'after:border after:border-blue-200/20 after:opacity-0',
            'hover:after:opacity-100 after:transition-opacity'
          ].join(' '),
        link:
          'text-primary underline-offset-4 hover:underline hover:text-blue-700'
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-md px-4 py-2 text-xs',
        lg: 'h-12 rounded-md px-10 py-3 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };