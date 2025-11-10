import React from 'react';

const ProgressBar = ({ 
  progress, 
  height = 'h-2',
  showLabel = true,
  labelPosition = 'inside',
  animate = true 
}) => {
  const safeProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="w-full">
      <div className={`${height} bg-gray-200 rounded-full overflow-hidden relative`}>
        <div
          className={`h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full ${
            animate ? 'transition-all duration-1000 ease-out' : ''
          }`}
          style={{ width: `${safeProgress}%` }}
        >
          {showLabel && labelPosition === 'inside' && safeProgress >= 30 && (
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white">
              {safeProgress.toFixed(1)}%
            </span>
          )}
        </div>
        
        {showLabel && labelPosition === 'outside' && (
          <div className="absolute -top-6 left-0 right-0 flex justify-between text-xs text-charcoal-500">
            <span>0%</span>
            <span className="font-medium">{safeProgress.toFixed(1)}%</span>
            <span>100%</span>
          </div>
        )}
      </div>
      
      {showLabel && labelPosition === 'below' && (
        <div className="flex justify-between text-xs text-charcoal-500 mt-1">
          <span>0%</span>
          <span className="font-medium">{safeProgress.toFixed(1)}%</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
};

// Variantes spécialisées
export const VoteProgressBar = ({ candidate, totalVotes, showCount = true }) => {
  const progress = totalVotes > 0 ? ((candidate.votes || 0) / totalVotes) * 100 : 0;
  
  return (
    <div className="space-y-2">
      {showCount && (
        <div className="flex justify-between text-sm">
          <span className="font-medium text-charcoal-700">
            {candidate.votes?.toLocaleString() || 0} votes
          </span>
          <span className="text-charcoal-500">
            {progress.toFixed(1)}%
          </span>
        </div>
      )}
      
      <ProgressBar 
        progress={progress} 
        height="h-3" 
        showLabel={false}
        animate={true}
      />
    </div>
  );
};

export const CategoryProgressBar = ({ category, totalVotes, color = 'gold' }) => {
  const progress = totalVotes > 0 ? (category.votes / totalVotes) * 100 : 0;
  const colorClasses = {
    gold: 'from-gold-400 to-gold-600',
    pink: 'from-pink-400 to-pink-600',
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600'
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="font-sans font-semibold text-charcoal-900 capitalize">
          {category.name}
        </span>
        <span className="text-charcoal-600 text-sm">
          {category.votes.toLocaleString()} votes • {progress.toFixed(1)}%
        </span>
      </div>
      
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${progress}% `}}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;