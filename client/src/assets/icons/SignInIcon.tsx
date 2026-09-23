import React from 'react';

export const SignInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    focusable="false"
    {...props}
  >
    <path
      d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M10 17L15 12L10 7"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path d="M15 12H3" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
