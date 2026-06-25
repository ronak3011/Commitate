import React from 'react';

// Variation A: Solid Git Graph inside a squircle
export const LogoA = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <rect width="24" height="24" rx="6" fill="currentColor" fillOpacity="0.15" />
    <circle cx="17" cy="17" r="2.5" fill="currentColor" />
    <circle cx="7" cy="7" r="2.5" fill="currentColor" />
    <path d="M12 7h2.5a2.5 2.5 0 0 1 2.5 2.5v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="7" y1="9.5" x2="7" y2="19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Variation B: Circular badge
export const LogoB = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Variation C: Monogram
export const LogoC = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="6" />
    <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" strokeWidth="0.5" fontWeight="bold" fontSize="11" fill="currentColor">
      SC
    </text>
  </svg>
);

// Variation D: Two commits connected (o-o) [User's Idea]
export const LogoD = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="5" cy="12" r="3" />
    <circle cx="19" cy="12" r="3" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

// Variation E: Shield with commit node (Open source security/trust)
export const LogoE = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

// Variation F: Branch going UP like an arrow (Revival)
export const LogoF = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="20" r="3" />
    <path d="M12 17V7" />
    <path d="M7 12l5-5 5 5" />
  </svg>
);

// Variation G: Two paths merging (Coming together)
export const LogoG = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="6" r="3" />
    <path d="M12 9v4" />
    <path d="M12 13c-3 0-6 2-6 5" />
    <path d="M12 13c3 0 6 2 6 5" />
    <circle cx="6" cy="18" r="2" fill="currentColor" />
    <circle cx="18" cy="18" r="2" fill="currentColor" />
  </svg>
);

// Variation H: Diagonal commit (Minimalist)
export const LogoH = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="6" r="3" />
    <line x1="8.12" y1="15.88" x2="15.88" y2="8.12" />
  </svg>
);

// Variation I: Infinity commit (Endless continuation)
export const LogoI = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M7 16a4 4 0 1 1 0-8c2 0 3 1.5 5 4s3 4 5 4a4 4 0 1 0 0-8" />
    <circle cx="7" cy="12" r="2" fill="currentColor"/>
    <circle cx="17" cy="12" r="2" fill="currentColor"/>
  </svg>
);

// Variation J: Bracket with commit (Code focus)
export const LogoJ = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="9 18 3 12 9 6" />
    <polyline points="15 6 21 12 15 18" />
    <circle cx="12" cy="12" r="2.5" fill="currentColor" />
  </svg>
);
