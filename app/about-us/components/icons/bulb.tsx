export function BulbIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient
          id="bulb-glass"
          gradientUnits="userSpaceOnUse"
          cx="25"
          cy="16"
          r="34"
        >
          <stop offset="0" stopColor="#FFF7C4" />
          <stop offset="0.34" stopColor="#FFDF6B" />
          <stop offset="0.68" stopColor="#FFC634" />
          <stop offset="1" stopColor="#E89A0E" />
        </radialGradient>
        <linearGradient
          id="bulb-gloss"
          gradientUnits="userSpaceOnUse"
          x1="21"
          y1="10"
          x2="28"
          y2="28"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="bulb-base"
          gradientUnits="userSpaceOnUse"
          x1="23"
          y1="50"
          x2="41"
          y2="52"
        >
          <stop offset="0" stopColor="#1E6FB4" />
          <stop offset="0.28" stopColor="#4FB4EA" />
          <stop offset="0.62" stopColor="#1C7CC6" />
          <stop offset="1" stopColor="#0C3F78" />
        </linearGradient>
        <linearGradient
          id="bulb-tip"
          gradientUnits="userSpaceOnUse"
          x1="27"
          y1="55"
          x2="37"
          y2="60"
        >
          <stop offset="0" stopColor="#2E86CC" />
          <stop offset="1" stopColor="#0A3468" />
        </linearGradient>
      </defs>

      <path
        d="M26.3 46.2 C23.2 41.4 17.2 37.4 16.6 27.2 C16 14.6 23 5.2 32 5.2 C41 5.2 48 14.6 47.4 27.2 C46.8 37.4 40.8 41.4 37.7 46.2 Z"
        fill="url(#bulb-glass)"
      />
      <ellipse cx="32" cy="26" rx="11.5" ry="14" fill="#FFE27A" opacity="0.45" />
      <ellipse
        cx="24.6"
        cy="17.2"
        rx="5.4"
        ry="8.4"
        fill="url(#bulb-gloss)"
        transform="rotate(-22 24.6 17.2)"
      />
      <path
        d="M43.4 14.5 C46.2 18.6 47.3 23.2 47 28.6"
        fill="none"
        stroke="#FFF3B8"
        strokeOpacity="0.7"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M26.9 44.6 C24.6 41 20 38 18.1 31.6 C19.6 39.2 24 42 26.1 46.2 Z"
        fill="#D98A08"
        opacity="0.55"
      />

      <g
        fill="none"
        stroke="#FFFDF2"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M30.6 44.4 C30.1 38.4 29.1 32.2 29.4 27.6 C29.5 25.2 27.6 24.2 26.6 23.1" />
        <path d="M35.4 44.4 C35.9 38.4 36.9 32.2 36.6 27.6 C36.5 25.2 38.4 24.2 39.4 23.1" />
        <path d="M29.4 27.4 C30.3 25.6 31.2 24 32 22.5 C32.8 24 33.7 25.6 34.6 27.4" />
      </g>

      <path
        d="M23.4 44.4 H40.6 C40.2 49.6 39 53.4 37.2 56 H26.8 C25 53.4 23.8 49.6 23.4 44.4 Z"
        fill="url(#bulb-base)"
      />
      <g
        fill="none"
        stroke="#0B3D72"
        strokeOpacity="0.7"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <path d="M23.8 47.9 C28 49.3 36 49.3 40.2 47.9" />
        <path d="M24.4 51.5 C28.2 52.9 35.8 52.9 39.6 51.5" />
        <path d="M25.6 54.9 C28.6 56.1 35.4 56.1 38.4 54.9" />
      </g>
      <path
        d="M27.2 55.6 H36.8 C36.8 58 34.6 59.4 32 59.4 C29.4 59.4 27.2 58 27.2 55.6 Z"
        fill="url(#bulb-tip)"
      />
    </svg>
  );
}
