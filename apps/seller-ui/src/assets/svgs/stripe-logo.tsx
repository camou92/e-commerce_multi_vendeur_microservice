// components/StripeSimpleLogo.tsx
import React from "react";

const StripeLogo = () => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="w-12 h-12"
    >
      <rect width="512" height="512" fill="#635BFF" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="320"
        fontWeight="bold"
        fill="white"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        S
      </text>
    </svg>
  );
};

export default StripeLogo;
