import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  color = 'gold', 
  text = null,
  centered = false 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    gold: 'border-gold-200 border-t-gold-600',
    white: 'border-white/30 border-t-white',
    gray: 'border-gray-200 border-t-gray-600'
  };

  const containerClass = centered 
    ? 'flex flex-col items-center justify-center' 
    : 'flex flex-col items-start';

  return (
    <div className={containerClass}>
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`}></div>
      {text && (
        <p className={`mt-3 font-sans font-medium ${
          color === 'white' ? 'text-white' : 'text-charcoal-600'
        }`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;