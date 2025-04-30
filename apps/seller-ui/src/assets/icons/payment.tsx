// components/PaymentIcon.tsx

import React from 'react';

interface PaymentIconProps {
  size?: number;
  color?: string;
}

const PaymentIcon: React.FC<PaymentIconProps> = ({ size = 48, color = 'currentColor' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
      <line x1="2" y1="10" x2="22" y2="10" stroke={color} strokeWidth="2" />
      <circle cx="7" cy="16" r="1" fill={color} />
      <circle cx="11" cy="16" r="1" fill={color} />
    </svg>
  );
};

export default PaymentIcon;
