import React from 'react';

export const SignOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    focusable="false"
    {...props}
  >
    <path
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M16 17L21 12L16 7"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path d="M21 12H9" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);
