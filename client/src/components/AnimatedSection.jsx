import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up' | 'down' | 'left' | 'right' | 'none'
  duration = 0.6,
  once = true,
  id = undefined
}) => {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialVariant = {
    opacity: 0,
    ...directions[direction]
  };

  return (
    <motion.div
      id={id}
      initial={initialVariant}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0
      }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
