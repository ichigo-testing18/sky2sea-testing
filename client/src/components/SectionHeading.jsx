import React from 'react';

const SectionHeading = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className = ''
}) => {
  const alignment = {
    center: 'text-center mx-auto max-w-3xl',
    left: 'text-left max-w-2xl',
    right: 'text-right ml-auto max-w-2xl'
  };

  return (
    <div className={`mb-12 md:mb-16 ${alignment[align]} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-seablue-50 border border-seablue-200 text-seablue-700 text-xs font-bold uppercase tracking-widest mb-4 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-seablue-500 animate-pulse" />
          {badge}
        </div>
      )}
      
      {title && (
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {title}{' '}
          {highlight && (
            <span className="text-gradient-sea">
              {highlight}
            </span>
          )}
        </h2>
      )}

      {description && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
