import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-seablue-500 focus:ring-offset-2 overflow-hidden cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-seablue-600 via-seablue-700 to-seablue-800 text-white shadow-md shadow-seablue-600/20 hover:shadow-lg hover:shadow-seablue-600/30 hover:scale-[1.01] active:scale-[0.98]",
    secondary: "bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-seablue-300 shadow-sm hover:scale-[1.01] active:scale-[0.98]",
    outline: "bg-transparent text-seablue-700 border border-seablue-300 hover:bg-seablue-50 hover:border-seablue-500 hover:scale-[1.01] active:scale-[0.98]",
    ghost: "bg-transparent text-slate-600 hover:text-seablue-700 hover:bg-seablue-50/60"
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs font-semibold gap-1.5",
    md: "px-5 py-2.5 text-sm font-semibold gap-2",
    lg: "px-7 py-3.5 text-base font-bold gap-2.5"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} transition-transform group-hover:-translate-x-0.5`} />
      )}
      
      <span className="relative z-10">{children}</span>

      {Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} transition-transform group-hover:translate-x-1`} />
      )}
    </motion.button>
  );
};

export default Button;
