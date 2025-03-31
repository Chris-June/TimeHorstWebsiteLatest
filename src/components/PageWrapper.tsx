import { motion } from 'framer-motion';
import { pageTransition } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'alt' | 'radial' | 'mesh';
}

export function PageWrapper({ 
  children, 
  className = '',
  variant = 'default'
}: PageWrapperProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        'min-h-screen w-full',
        variant === 'default' && 'bg-gradient-premium',
        variant === 'alt' && 'bg-gradient-pattern-alt',
        variant === 'radial' && 'bg-gradient-radial',
        variant === 'mesh' && 'bg-gradient-mesh',
        className
      )}
    >
      {children}
    </motion.div>
  );
}