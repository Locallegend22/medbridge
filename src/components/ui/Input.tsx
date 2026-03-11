'use client';

import React, { forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-primary mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary
              placeholder:text-text-secondary
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
              transition-all duration-200
              disabled:bg-slate-50 disabled:cursor-not-allowed
              ${icon ? 'pl-10' : ''}
              ${error ? 'border-error focus:ring-error focus:border-error' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <div className="flex items-center mt-1 text-sm text-error">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
