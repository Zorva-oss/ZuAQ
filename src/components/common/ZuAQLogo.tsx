import React from 'react';

interface ZuAQLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ZuAQLogo: React.FC<ZuAQLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  }[size];

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon */}
      <div
        className={`${iconDimensions} rounded-2xl bg-gradient-to-br from-blue-50/90 to-sky-100/60 p-1.5 flex items-center justify-center border border-blue-100/80 shadow-xs transition-transform hover:scale-105 duration-200`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="zGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="bottomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
          </defs>

          {/* Top blue bar with orange end circle */}
          <path
            d="M 22 26 L 68 26"
            stroke="#2563EB"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle cx="76" cy="26" r="8" fill="#F59E0B" />

          {/* Diagonal bar */}
          <path
            d="M 70 28 L 28 72"
            stroke="url(#zGrad)"
            strokeWidth="13"
            strokeLinecap="round"
          />

          {/* Bottom green start dot and bar with orange-red terminal */}
          <circle cx="24" cy="74" r="7.5" fill="#10B981" />
          <path
            d="M 28 74 L 68 74"
            stroke="url(#bottomGrad)"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <circle cx="76" cy="74" r="8" fill="#F97316" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className={`font-display font-extrabold tracking-tight flex items-baseline leading-none ${textSizes}`}>
          <span className="text-slate-900">Zu</span>
          <span className="text-blue-600">A</span>
          <span className="text-amber-500">Q</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1.5 inline-block animate-pulse"></span>
        </div>
      )}
    </div>
  );
};
