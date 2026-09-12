export function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="mic-ball" cx="0.5" cy="0.5" r="0.62" fx="0.31" fy="0.26">
          <stop offset="0" stopColor="#d4e1ea" />
          <stop offset="0.34" stopColor="#8ba3b8" />
          <stop offset="0.72" stopColor="#425974" />
          <stop offset="1" stopColor="#1f3145" />
        </radialGradient>
        <linearGradient id="mic-body" gradientUnits="userSpaceOnUse" x1="33" y1="0" x2="49.5" y2="0">
          <stop offset="0" stopColor="#42596f" />
          <stop offset="0.22" stopColor="#7d97ad" />
          <stop offset="0.55" stopColor="#3c5470" />
          <stop offset="1" stopColor="#1c2c3e" />
        </linearGradient>
        <linearGradient id="mic-ring" gradientUnits="userSpaceOnUse" x1="33.5" y1="0" x2="49" y2="0">
          <stop offset="0" stopColor="#9cb2c4" />
          <stop offset="0.24" stopColor="#e6eff5" />
          <stop offset="0.62" stopColor="#7c94a9" />
          <stop offset="1" stopColor="#3b5270" />
        </linearGradient>
        <linearGradient id="mic-cable" gradientUnits="userSpaceOnUse" x1="12" y1="48" x2="40" y2="60">
          <stop offset="0" stopColor="#33485f" />
          <stop offset="0.5" stopColor="#22344a" />
          <stop offset="1" stopColor="#16222f" />
        </linearGradient>
        <clipPath id="mic-ballClip">
          <circle cx="41" cy="20.5" r="12.6" />
        </clipPath>
      </defs>

      <path
        d="M21 49.5C17.2 53 11.4 52.8 11.2 56.1c-0.2 3 4.6 3.3 6.5 0.7 1.9-2.6 6.6-3.2 10.6-1.1 3.9 2.1 8 1.4 9.7-1.1"
        fill="none"
        stroke="url(#mic-cable)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2 50.6C16.8 53.6 11.9 53.6 12 55.8"
        fill="none"
        stroke="#7f96ab"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
      />

      <g transform="rotate(34.5 41 20.5)">
        <path d="M35.4 28.5h11.2l1.3 8.4H34.1z" fill="url(#mic-body)" />
        <path
          d="M34.1 36.9h13.8l-2.2 16.6c-0.3 2-1.9 3-4.7 3s-4.4-1-4.7-3z"
          fill="url(#mic-body)"
        />
        <path
          d="M35.4 37.2h1.4l1.8 16.4h-1.4z"
          fill="#a8bccd"
          opacity="0.45"
        />
        <path
          d="M36.4 51.9h9.2l-0.3 2.4c-0.3 1.6-1.7 2.4-4.3 2.4s-4-0.8-4.3-2.4z"
          fill="#1a2938"
          opacity="0.6"
        />
        <path d="M33.9 35.6h14.2l0.3 3.6H33.6z" fill="url(#mic-ring)" />
        <circle cx="41" cy="20.5" r="12.6" fill="url(#mic-ball)" />
        <g clipPath="url(#mic-ballClip)">
          <path
            d="M28.6 25.4C33 29.9 49 29.9 53.4 25.4l0.4 2.7C49.6 33 32.4 33 28.2 28.1z"
            fill="#c2d3e0"
            opacity="0.5"
          />
          <path
            d="M28.4 24.2C33 28.5 49 28.5 53.6 24.2"
            fill="none"
            stroke="#1f3145"
            strokeWidth="0.8"
            opacity="0.45"
          />
          <path
            d="M28.2 29.3C32.8 33.8 49.2 33.8 53.8 29.3"
            fill="none"
            stroke="#1f3145"
            strokeWidth="0.9"
            opacity="0.5"
          />
          <path
            d="M30 12.5C35 16 47 16 52 12.5M28.6 17C34 20.6 48 20.6 53.4 17"
            fill="none"
            stroke="#33495f"
            strokeWidth="0.7"
            opacity="0.35"
          />
          <path
            d="M35.5 9.6C33 11.2 33 16.6 35.5 19.6M41 8.2v12M46.5 9.6c2.5 1.9 2.5 7.4 0 10"
            fill="none"
            stroke="#33495f"
            strokeWidth="0.7"
            opacity="0.28"
          />
          <ellipse
            cx="35.6"
            cy="14.4"
            rx="5"
            ry="3.6"
            fill="#eef4f8"
            opacity="0.4"
            transform="rotate(-34 35.6 14.4)"
          />
          <path d="M28.4 30.6h25.2v4H28.4z" fill="#16222f" opacity="0.35" />
        </g>
      </g>
    </svg>
  );
}
