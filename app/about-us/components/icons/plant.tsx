export function PlantIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="plant-leaf-r" gradientUnits="userSpaceOnUse" x1="36" y1="8" x2="50" y2="30">
          <stop offset="0" stopColor="#8AD968" />
          <stop offset="0.45" stopColor="#52B23C" />
          <stop offset="1" stopColor="#2C7F33" />
        </linearGradient>
        <linearGradient id="plant-leaf-l" gradientUnits="userSpaceOnUse" x1="14" y1="16" x2="32" y2="32">
          <stop offset="0" stopColor="#7FD25E" />
          <stop offset="0.5" stopColor="#4BAA38" />
          <stop offset="1" stopColor="#2A782F" />
        </linearGradient>
        <linearGradient id="plant-rim" gradientUnits="userSpaceOnUse" x1="14" y1="0" x2="50" y2="0">
          <stop offset="0" stopColor="#BC5E31" />
          <stop offset="0.3" stopColor="#E28F5C" />
          <stop offset="0.62" stopColor="#CA7241" />
          <stop offset="1" stopColor="#9A4620" />
        </linearGradient>
        <linearGradient id="plant-body" gradientUnits="userSpaceOnUse" x1="17" y1="0" x2="49" y2="0">
          <stop offset="0" stopColor="#B4562C" />
          <stop offset="0.26" stopColor="#D9834F" />
          <stop offset="0.58" stopColor="#C26A3B" />
          <stop offset="1" stopColor="#91411E" />
        </linearGradient>
        <linearGradient id="plant-soil" gradientUnits="userSpaceOnUse" x1="18" y1="36" x2="46" y2="40">
          <stop offset="0" stopColor="#4A2C1A" />
          <stop offset="1" stopColor="#6B4127" />
        </linearGradient>
        <radialGradient
          id="plant-pot-gloss"
          gradientUnits="userSpaceOnUse"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="translate(24 49) scale(6.5 9.5)"
        >
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        d="M15.6 43.2 L48.4 43.2 L44.9 57 C44.7 58.6 44.4 59 43.9 59 L20.1 59 C19.6 59 19.3 58.6 19.1 57 Z"
        fill="url(#plant-body)"
      />
      <ellipse cx="24" cy="49" rx="6.5" ry="9.5" fill="url(#plant-pot-gloss)" />
      <path
        d="M44.9 57 L48.4 43.2 L45.4 43.2 L41.9 57 C41.7 58.4 41.4 59 40.9 59 L43.9 59 C44.4 59 44.7 58.6 44.9 57 Z"
        fill="#7C3416"
        opacity="0.35"
      />
      <path
        d="M14.2 37.4 C14.2 34.6 49.8 34.6 49.8 37.4 L49 43.8 C47.2 45.4 16.8 45.4 15 43.8 Z"
        fill="url(#plant-rim)"
      />
      <ellipse cx="32" cy="37.9" rx="14" ry="1.9" fill="url(#plant-soil)" />

      <path
        d="M33.4 36.4 C32.9 34.4 32.5 32.8 31.9 31.5"
        fill="none"
        stroke="#2E7C33"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M33.2 38.2 C33 35.5 33.6 32.5 35.3 30.5"
        fill="none"
        stroke="#31853A"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      <path d="M32 31.4 C25 34 15 27.5 12.4 15.3 C21 14 30 23.5 32 31.4 Z" fill="url(#plant-leaf-l)" />
      <path
        d="M31.8 31.2 C27 28 21 24 16 18.4"
        fill="none"
        stroke="#1F6427"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M29.6 29.4 C24 27.4 18.5 23 14.6 16.4 C21 18.5 26.5 24 29.6 29.4 Z"
        fill="#FFFFFF"
        opacity="0.14"
      />

      <path d="M34.6 30.9 C29.5 20 37 6.5 49.8 5.6 C57 11 46.5 27.5 34.6 30.9 Z" fill="url(#plant-leaf-r)" />
      <path
        d="M34.8 30.7 C39 22 44.2 15 47.4 9.8"
        fill="none"
        stroke="#1E6628"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M36.2 27.6 C34.4 19.8 39.5 10.5 47.8 7.2 C43.4 14.6 39 21 36.2 27.6 Z"
        fill="#FFFFFF"
        opacity="0.16"
      />
    </svg>
  );
}
