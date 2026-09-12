export function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="heart-body" x1="12" y1="10" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff7a84" />
          <stop offset="0.32" stopColor="#f4455a" />
          <stop offset="0.72" stopColor="#e01f3c" />
          <stop offset="1" stopColor="#b3122a" />
        </linearGradient>
        <radialGradient
          id="heart-gloss"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(20 20) scale(13 9)"
        >
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.78" />
          <stop offset="0.55" stopColor="#ffd2d6" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="heart-shade"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(52 48) rotate(-30) scale(22 20)"
        >
          <stop offset="0" stopColor="#8d0a1e" stopOpacity="0.5" />
          <stop offset="1" stopColor="#8d0a1e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="heart-line" x1="11" y1="29" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#fdeef0" />
        </linearGradient>
        <clipPath id="heart-clip">
          <path d="M32 56.6C24.1 50.2 5 37.6 5 24.6C5 15.6 11.8 9.4 19.8 9.4C25.6 9.4 29.9 12.9 32 17.6C34.1 12.9 38.4 9.4 44.2 9.4C52.2 9.4 59 15.6 59 24.6C59 37.6 39.9 50.2 32 56.6Z" />
        </clipPath>
      </defs>

      <path
        d="M32 56.6C24.1 50.2 5 37.6 5 24.6C5 15.6 11.8 9.4 19.8 9.4C25.6 9.4 29.9 12.9 32 17.6C34.1 12.9 38.4 9.4 44.2 9.4C52.2 9.4 59 15.6 59 24.6C59 37.6 39.9 50.2 32 56.6Z"
        fill="url(#heart-body)"
      />

      <g clipPath="url(#heart-clip)">
        <path
          d="M32 56.6C24.1 50.2 5 37.6 5 24.6C5 15.6 11.8 9.4 19.8 9.4C25.6 9.4 29.9 12.9 32 17.6C34.1 12.9 38.4 9.4 44.2 9.4C52.2 9.4 59 15.6 59 24.6C59 37.6 39.9 50.2 32 56.6Z"
          fill="url(#heart-shade)"
        />
        <ellipse cx="20" cy="20" rx="13" ry="9" transform="rotate(38 20 20)" fill="url(#heart-gloss)" />
        <ellipse
          cx="15.8"
          cy="16.6"
          rx="4.6"
          ry="2.7"
          transform="rotate(34 15.8 16.6)"
          fill="#ffffff"
          opacity="0.5"
        />
        <path
          d="M44.6 11.3C50.3 12.6 54.6 17 55.6 22.6"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.3"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d="M11.3 38.9H23.2L24.4 35.7H27.2L30 30.3L34.8 53L39.3 34.7L43.3 37.9H53.7"
          fill="none"
          stroke="#8d0a1e"
          strokeOpacity="0.28"
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.3 37.5H23.1L24.3 34.3H27.1L29.9 28.9L34.7 51.6L39.2 33.3L43.2 36.5H53.6"
          fill="none"
          stroke="url(#heart-line)"
          strokeWidth="2.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
