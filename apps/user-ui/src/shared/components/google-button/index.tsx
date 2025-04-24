import * as React from "react";

const GoogleButton = (props: any) => {
  return (
    <div className="w-full flex justify-center">
      <button
      className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-2 hover:shadow-md transition"
      {...props}
    >
      <svg
        width={20}
        height={20}
        viewBox="0 0 533.5 544.3"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.4H272v95.3h146.9c-6.3 34.2-25.1 63.2-53.5 82.6v68.3h86.4c50.6-46.7 81.7-115.5 81.7-195.8z"
          fill="#4285F4"
        />
        <path
          d="M272 544.3c72.6 0 133.6-24.1 178.1-65.4l-86.4-68.3c-24 16.1-54.7 25.6-91.7 25.6-70.6 0-130.4-47.7-151.8-111.6H33.5v69.9c44.7 88.5 136.5 149.8 238.5 149.8z"
          fill="#34A853"
        />
        <path
          d="M120.2 324.6c-10.2-30.2-10.2-62.7 0-92.9V161.8H33.5c-36.3 72.6-36.3 157.8 0 230.4l86.7-67.6z"
          fill="#FBBC05"
        />
        <path
          d="M272 107.7c39.5-.6 77.4 13.6 106.3 39.5l79.1-79.1C405.4 23.9 340.5-0.3 272 0 170 0 78.2 61.3 33.5 149.8l86.7 69.9C141.6 155.4 201.4 107.7 272 107.7z"
          fill="#EA4335"
        />
      </svg>
      <span className="font-medium text-sm text-gray-700">
        Sign In with Google
      </span>
    </button>
    </div>
  );
};

export default GoogleButton;
