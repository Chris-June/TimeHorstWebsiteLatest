import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../lib/animations';
import { Card, CardProps } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends CardProps {
  delay?: number;
  children?: React.ReactNode;
  className?: string;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(({ 
  children, 
  className = '', 
  delay = 0, 
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={cn(
          "bg-gradient-card backdrop-blur-sm",
          "border border-white/20 dark:border-white/10",
          "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          "hover:shadow-[0_30px_60px_rgb(0,0,0,0.35)]",
          "transition-all duration-500 ease-out",
          className
        )} 
        {...props}
      >
        {children}
      </Card>
    </motion.div>
  );
});

AnimatedCard.displayName = 'AnimatedCard';