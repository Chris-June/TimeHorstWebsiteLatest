import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'default' | 'premium' | 'glass';
}

export function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  variant = 'default'
}: AnimatedSectionProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay }}
      className={cn(
        variant === 'default' && 'bg-gradient-card',
        variant === 'premium' && 'bg-gradient-premium',
        variant === 'glass' && 'glass',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
}