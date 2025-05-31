import React from 'react';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ fullScreen = true, size = 'lg' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const spinner = (
    <div className="animate-spin rounded-full border-b-2 border-blue-500"></div>
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className={sizeClasses[size]}>{spinner}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className={sizeClasses[size]}>{spinner}</div>
    </div>
  );
} 