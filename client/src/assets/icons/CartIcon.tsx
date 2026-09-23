import React from 'react';

export const CartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    focusable="false"
    {...props}
  >
    <path
      d="M14.45 9.03L13.56 2.39C13.53 2.03 13.22 1.76 12.86 1.76H5.16C4.8 1.76 4.5 2.03 4.46 2.39L3.55 9.03C3.47 9.78 3.72 10.54 4.24 11.11C4.75 11.67 5.48 12 6.24 12H11.79C12.54 12 13.26 11.68 13.77 11.12C14.28 10.56 14.53 9.8 14.45 9.03Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M7.13 1V3.03C7.13 3.58 6.68 4.03 6.13 4.03C5.58 4.03 5.13 3.58 5.13 3.03V1M12.85 1V3.03C12.85 3.58 12.4 4.03 11.85 4.03C11.3 4.03 10.85 3.58 10.85 3.03V1"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
