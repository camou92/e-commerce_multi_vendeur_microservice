// components/DashboardIcon.tsx
export default function Home() {
  return (
    <div className="p-4 flex items-center justify-center bg-black">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" fill="white" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="white" />
        <rect x="14" y="14" width="7" height="7" rx="1" fill="white" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="white" />
      </svg>
    </div>
  );
}
