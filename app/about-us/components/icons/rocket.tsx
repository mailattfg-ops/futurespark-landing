export function RocketIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="rocket-body"
          x1="20"
          y1="6"
          x2="46"
          y2="50"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#2b3283" />
          <stop offset="0.5" stopColor="#1a2069" />
          <stop offset="1" stopColor="#0d1244" />
        </linearGradient>
        <linearGradient
          id="rocket-fin"
          x1="10"
          y1="30"
          x2="54"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#232a76" />
          <stop offset="1" stopColor="#101554" />
        </linearGradient>
        <radialGradient
          id="rocket-window"
          cx="30"
          cy="20"
          r="7"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.6" stopColor="#e6efff" />
          <stop offset="1" stopColor="#b3c7e8" />
        </radialGradient>
        <linearGradient
          id="rocket-flame"
          x1="32"
          y1="46"
          x2="32"
          y2="63"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fde047" />
          <stop offset="0.45" stopColor="#f9a01b" />
          <stop offset="1" stopColor="#ef6c1a" />
        </linearGradient>
      </defs>
      <g transform="rotate(45 32 32)">
        <path
          d="M29 47 C26.6 52 27.8 58.2 32 63 C36.2 58.2 37.4 52 35 47 Z"
          fill="url(#rocket-flame)"
        />
        <path
          d="M30.4 47 C29.5 50.6 30.1 54.6 32 58.2 C33.9 54.6 34.5 50.6 33.6 47 Z"
          fill="#fff3b0"
          opacity="0.85"
        />
        <path
          d="M23 30 C17.5 32.5 13 37 11.5 43.5 C11 45.6 12.4 47 14.4 46.6 L29 46 Z"
          fill="url(#rocket-fin)"
          stroke="#eef1f8"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M41 30 C46.5 32.5 51 37 52.5 43.5 C53 45.6 51.6 47 49.6 46.6 L35 46 Z"
          fill="url(#rocket-fin)"
          stroke="#eef1f8"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M32 2 C37.8 9.5 41.5 19.5 41.5 29.5 C41.5 37.5 38.8 44 34.5 48.5 L29.5 48.5 C25.2 44 22.5 37.5 22.5 29.5 C22.5 19.5 26.2 9.5 32 2 Z"
          fill="url(#rocket-body)"
          stroke="#eef1f8"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M32 5 C28.5 12 26.5 20.5 26.5 29.5 C26.5 36 27.7 41.6 30 46 C27 41.8 25.2 36.2 25.2 29.5 C25.2 20.2 27.8 11.4 32 5 Z"
          fill="#4a52a8"
          opacity="0.55"
        />
        <circle
          cx="32"
          cy="22"
          r="5.6"
          fill="url(#rocket-window)"
          stroke="#dbe4f4"
          strokeWidth="1.2"
        />
        <circle cx="30.2" cy="20.2" r="1.8" fill="#ffffff" opacity="0.9" />
        <path
          d="M28.6 47.6 L35.4 47.6 C35 49.6 34.2 50.6 32 50.6 C29.8 50.6 29 49.6 28.6 47.6 Z"
          fill="#e7ebf6"
        />
      </g>
    </svg>
  );
}
