import { cn } from '@/lib/utils';

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'alt' | 'radial' | 'mesh';
  children: React.ReactNode;
}

export function BackgroundGradient({
  variant = 'default',
  className,
  children,
  ...props
}: BackgroundGradientProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        variant === 'default' && 'bg-gradient-pattern',
        variant === 'alt' && 'bg-gradient-pattern-alt',
        variant === 'radial' && 'bg-gradient-radial',
        variant === 'mesh' && 'bg-gradient-mesh',
        className
      )}
      {...props}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-animate opacity-30" />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}