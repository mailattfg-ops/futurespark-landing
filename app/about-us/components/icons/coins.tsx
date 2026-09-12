export function CoinsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="coins-rim-back" gradientUnits="userSpaceOnUse" x1="23" y1="18" x2="58" y2="54">
          <stop offset="0" stopColor="#E2941C" />
          <stop offset="0.18" stopColor="#FBC244" />
          <stop offset="0.46" stopColor="#F6B52E" />
          <stop offset="0.78" stopColor="#DD8C18" />
          <stop offset="1" stopColor="#BE6E0E" />
        </linearGradient>
        <linearGradient id="coins-rim-front" gradientUnits="userSpaceOnUse" x1="5" y1="30" x2="39" y2="56">
          <stop offset="0" stopColor="#EFA625" />
          <stop offset="0.2" stopColor="#FFD25C" />
          <stop offset="0.5" stopColor="#FBBE38" />
          <stop offset="0.82" stopColor="#E4901C" />
          <stop offset="1" stopColor="#CC7A12" />
        </linearGradient>
        <radialGradient id="coins-top-back" gradientUnits="userSpaceOnUse" cx="34" cy="19.5" r="24">
          <stop offset="0" stopColor="#FFF0AC" />
          <stop offset="0.5" stopColor="#FDD456" />
          <stop offset="1" stopColor="#F0A92A" />
        </radialGradient>
        <radialGradient id="coins-top-front" gradientUnits="userSpaceOnUse" cx="16" cy="31" r="23">
          <stop offset="0" stopColor="#FFF4BC" />
          <stop offset="0.5" stopColor="#FFDA64" />
          <stop offset="1" stopColor="#F3AE2C" />
        </radialGradient>
      </defs>

      {/* art bbox is x 5..58, y 16.6..58 - recenter and scale it to fill the 64 box */}
      <g transform="translate(32 32) scale(1.1) translate(-31.5 -37.3)">
      <g fill="url(#coins-rim-back)">
        <path d="M23 46.3A17.5 5.7 0 0 1 58 46.3L58 52.3A17.5 5.7 0 0 1 23 52.3Z" />
        <path d="M23 40.3A17.5 5.7 0 0 1 58 40.3L58 46.3A17.5 5.7 0 0 1 23 46.3Z" />
        <path d="M23 34.3A17.5 5.7 0 0 1 58 34.3L58 40.3A17.5 5.7 0 0 1 23 40.3Z" />
        <path d="M23 28.3A17.5 5.7 0 0 1 58 28.3L58 34.3A17.5 5.7 0 0 1 23 34.3Z" />
        <path d="M23 22.3A17.5 5.7 0 0 1 58 22.3L58 28.3A17.5 5.7 0 0 1 23 28.3Z" />
      </g>
      <g fill="none" stroke="#C97812" strokeOpacity="0.5" strokeWidth="0.9" strokeLinecap="round">
        <path d="M23 46.3A17.5 5.7 0 0 0 58 46.3" />
        <path d="M23 40.3A17.5 5.7 0 0 0 58 40.3" />
        <path d="M23 34.3A17.5 5.7 0 0 0 58 34.3" />
        <path d="M23 28.3A17.5 5.7 0 0 0 58 28.3" />
      </g>
      <ellipse cx="40.5" cy="22.3" rx="17.5" ry="5.7" fill="url(#coins-top-back)" />
      <ellipse cx="40.5" cy="22.5" rx="12.4" ry="3.8" fill="none" stroke="#EDA92A" strokeOpacity="0.7" strokeWidth="1" />
      <path d="M29.5 20.6A12.6 4.2 0 0 1 51.5 20.6" fill="none" stroke="#FFF6CB" strokeOpacity="0.75" strokeWidth="1.2" strokeLinecap="round" />

      <g fill="url(#coins-rim-front)">
        <path d="M5 46.3A17 5.5 0 0 1 39 46.3L39 52.5A17 5.5 0 0 1 5 52.5Z" />
        <path d="M5 40.1A17 5.5 0 0 1 39 40.1L39 46.3A17 5.5 0 0 1 5 46.3Z" />
        <path d="M5 33.9A17 5.5 0 0 1 39 33.9L39 40.1A17 5.5 0 0 1 5 40.1Z" />
      </g>
      <g fill="none" stroke="#C97812" strokeOpacity="0.5" strokeWidth="0.9" strokeLinecap="round">
        <path d="M5 46.3A17 5.5 0 0 0 39 46.3" />
        <path d="M5 40.1A17 5.5 0 0 0 39 40.1" />
      </g>
      <ellipse cx="22" cy="33.9" rx="17" ry="5.5" fill="url(#coins-top-front)" />
      <ellipse cx="22" cy="34.1" rx="12" ry="3.7" fill="none" stroke="#EFAE31" strokeOpacity="0.7" strokeWidth="1" />
      <path d="M11.4 32.3A12.2 4.1 0 0 1 32.6 32.3" fill="none" stroke="#FFF8D6" strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}
