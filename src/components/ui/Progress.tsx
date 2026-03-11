import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning';
  className?: string;
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'default',
  className = '',
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variants = {
    default: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning',
  };

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-text-primary">Progress</span>
          <span className="text-sm font-medium text-text-secondary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${variants[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
