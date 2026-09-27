import React from 'react';

interface LogoProps {
  variant?: 'full' | 'icon' | 'compact';
  theme?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const textColor = isDark ? 'text-white' : 'text-slate-900';
  const subTextColor = isDark ? 'text-slate-400' : 'text-slate-500';

  // SVG Geometric Monogram for RMA Commerce
  const IconSvg = (
    <svg
      width="34"
      height="34"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      aria-label="RMA Commerce Monogram"
    >
      {/* Precision geometric shield / hexagonal modern retail diamond */}
      <rect
        x="2"
        y="2"
        width="36"
        height="36"
        rx="8"
        className={isDark ? 'fill-slate-800 stroke-slate-700' : 'fill-slate-900 stroke-slate-900'}
        strokeWidth="1.5"
      />
      {/* Precision RMA monogram vector paths */}
      <path
        d="M10 28V12H16.5C18.5 12 19.8 13.2 19.8 15C19.8 16.5 18.8 17.6 17.2 17.9L20.2 28H16.8L14.2 19H13V28H10ZM13 16.5H16.2C16.9 16.5 17.4 16 17.4 15.1C17.4 14.3 16.9 13.8 16.1 13.8H13V16.5Z"
        fill="#ffffff"
      />
      <path
        d="M21 28V12H24.2L27 21.5L29.8 12H33V28H30.4V16.6L27.9 25.2H26.1L23.6 16.6V28H21Z"
        fill="#38bdf8"
      />
      {/* Subtle modern accent dot */}
      <circle cx="34" cy="27" r="1.5" fill="#f59e0b" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{IconSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {IconSvg}
      <div className="flex flex-col text-left">
        <span
          className={`font-display text-lg font-bold tracking-tight uppercase leading-none ${textColor}`}
        >
          RMA Commerce
        </span>
        <span
          className={`text-[9.5px] uppercase font-semibold tracking-[0.2em] leading-tight mt-0.5 ${subTextColor}`}
        >
          LLC · U.S. Retail
        </span>
      </div>
    </div>
  );
};
