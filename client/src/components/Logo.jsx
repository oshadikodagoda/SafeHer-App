import React from 'react';

const Logo = ({ size = 40, showText = true }) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="#D81B60" />
            </linearGradient>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FCE7F3" />
            </linearGradient>
          </defs>

          <path
            d="M50 5 L85 20 L85 50 C85 70 70 85 50 95 C30 85 15 70 15 50 L15 20 Z"
            fill="url(#shieldGradient)"
            stroke="#FFFFFF"
            strokeWidth="2"
          />

          <path
            d="M50 65 C50 65 35 55 35 45 C35 40 38 37 42 37 C45 37 48 39 50 42 C52 39 55 37 58 37 C62 37 65 40 65 45 C65 55 50 65 50 65 Z"
            fill="url(#heartGradient)"
          />

          <path
            d="M50 18 L52 24 L58 24 L53 28 L55 34 L50 30 L45 34 L47 28 L42 24 L48 24 Z"
            fill="#FCD34D"
            stroke="#FFFFFF"
            strokeWidth="1"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <span
            className="font-heading font-extrabold text-xl tracking-tight"
            style={{ color: '#8A2BE2' }}
          >
            SafeHer
          </span>
          <span className="text-[10px] text-neutral font-medium tracking-wide">
            Safety & Support Network
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;