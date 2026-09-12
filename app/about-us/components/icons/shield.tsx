export function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="shield-outer" x1="14" y1="6" x2="50" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6FB6FF" />
          <stop offset="0.45" stopColor="#2E8BFF" />
          <stop offset="1" stopColor="#0B4FC2" />
        </linearGradient>
        <linearGradient id="shield-face" x1="18" y1="10" x2="46" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4C9DFF" />
          <stop offset="0.55" stopColor="#1878F5" />
          <stop offset="1" stopColor="#0E5FDE" />
        </linearGradient>
        <linearGradient id="shield-edge" x1="52" y1="14" x2="34" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0A57CC" />
          <stop offset="1" stopColor="#0846A8" />
        </linearGradient>
        <linearGradient id="shield-gloss" x1="20" y1="10" x2="30" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="shield-lock" x1="24" y1="28" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DCE9F7" />
        </linearGradient>
        <linearGradient id="shield-keyhole" x1="29" y1="34" x2="35" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1D7BF2" />
          <stop offset="1" stopColor="#0C5AD0" />
        </linearGradient>
      </defs>

      <path
        d="M32 5c-1.3 0-2.6.2-3.8.6L9.6 12.3C8.2 12.8 7.2 14.2 7.2 15.7v15.4c0 11.4 6.6 21.8 18.2 27.9l4.5 2.4c1.3.7 2.9.7 4.2 0l4.5-2.4c11.6-6.1 18.2-16.5 18.2-27.9V15.7c0-1.5-1-2.9-2.4-3.4L35.8 5.6A11.6 11.6 0 0 0 32 5Z"
        fill="url(#shield-outer)"
      />
      <path
        d="M32 5c1.3 0 2.6.2 3.8.6l18.6 6.7c1.4.5 2.4 1.9 2.4 3.4v15.4c0 11.4-6.6 21.8-18.2 27.9l-4.5 2.4c-.6.4-1.4.6-2.1.6V5Z"
        fill="url(#shield-edge)"
        fillOpacity="0.45"
      />
      <path
        d="M32 11.4c-.9 0-1.8.2-2.6.5l-14 5c-1 .4-1.7 1.3-1.7 2.4v11.7c0 9 5.2 17.2 14.3 22l2.7 1.4c.8.4 1.8.4 2.6 0l2.7-1.4c9.1-4.8 14.3-13 14.3-22V19.3c0-1.1-.7-2-1.7-2.4l-14-5a7.8 7.8 0 0 0-2.6-.5Z"
        fill="url(#shield-face)"
      />
      <path
        d="M32 11.4c-.9 0-1.8.2-2.6.5l-14 5c-1 .4-1.7 1.3-1.7 2.4v11.7c0 3.6.8 7.1 2.4 10.3-.5-3.1-.7-6-.7-9.1 0-6 .4-11.6 1.6-14.1 1.3-2.6 8.1-5.4 15-6.7Z"
        fill="url(#shield-gloss)"
      />

      <path
        d="M25.2 31.4v-3.9a6.8 6.8 0 0 1 13.6 0v3.9"
        fill="none"
        stroke="url(#shield-lock)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <rect x="20.6" y="29.6" width="22.8" height="18.4" rx="3.6" fill="url(#shield-lock)" />
      <path
        d="M39.8 29.6h-3.2c2 0 3.6 1.6 3.6 3.6v11.2c0 2-1.6 3.6-3.6 3.6h3.2c2 0 3.6-1.6 3.6-3.6V33.2c0-2-1.6-3.6-3.6-3.6Z"
        fill="#C6D9EE"
        fillOpacity="0.7"
      />
      <circle cx="32" cy="36.4" r="2.9" fill="url(#shield-keyhole)" />
      <path
        d="M30.5 38.4h3l1.1 4.6c.2.9-.5 1.7-1.4 1.7h-2.4c-.9 0-1.6-.8-1.4-1.7l1.1-4.6Z"
        fill="url(#shield-keyhole)"
      />
    </svg>
  );
}
