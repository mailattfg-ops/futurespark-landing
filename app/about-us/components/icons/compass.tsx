export function CompassIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="compass-rim" x1="12" y1="14" x2="52" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFEDB0" />
          <stop offset="0.35" stopColor="#FBB52C" />
          <stop offset="0.7" stopColor="#F09410" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="compass-bail" x1="27" y1="5" x2="38" y2="17" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFE79C" />
          <stop offset="0.55" stopColor="#F7A81B" />
          <stop offset="1" stopColor="#DE8409" />
        </linearGradient>
        <radialGradient id="compass-face" cx="0.36" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.62" stopColor="#F4F8FD" />
          <stop offset="1" stopColor="#DDE7F4" />
        </radialGradient>
        <linearGradient id="compass-needle-n" x1="30" y1="36" x2="43" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5468CC" />
          <stop offset="0.55" stopColor="#33409B" />
          <stop offset="1" stopColor="#1C2461" />
        </linearGradient>
        <linearGradient id="compass-needle-s" x1="34" y1="36" x2="22" y2="51" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8EDCFC" />
          <stop offset="0.5" stopColor="#3FA6EC" />
          <stop offset="1" stopColor="#1874C9" />
        </linearGradient>
        <radialGradient id="compass-hub" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFAEC" />
          <stop offset="0.6" stopColor="#F8D9A3" />
          <stop offset="1" stopColor="#E0A055" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="10.5" r="5.2" fill="none" stroke="url(#compass-bail)" strokeWidth="3.4" />
      <path
        d="M28.6 13.6a5.2 5.2 0 0 1-0.9-4.6"
        fill="none"
        stroke="#FFF3CE"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <ellipse cx="32" cy="15.2" rx="4.6" ry="2.8" fill="url(#compass-bail)" />

      <circle cx="32" cy="36" r="22.4" fill="none" stroke="url(#compass-rim)" strokeWidth="6.2" />
      <path
        d="M13.8 25.4A22.4 22.4 0 0 1 32 13.6"
        fill="none"
        stroke="#FFF4CF"
        strokeWidth="2.1"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle cx="32" cy="36" r="19.4" fill="none" stroke="#C4760A" strokeWidth="1" opacity="0.35" />

      <circle cx="32" cy="36" r="19" fill="url(#compass-face)" />
      <ellipse
        cx="24.5"
        cy="26.5"
        rx="11"
        ry="6.4"
        fill="#FFFFFF"
        opacity="0.6"
        transform="rotate(-34 24.5 26.5)"
      />

      <path d="M32 19.4v3.6" stroke="#3B4252" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M32 49v3.6" stroke="#3B4252" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M45 36h3.6" stroke="#3B4252" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15.4 36H19" stroke="#3B4252" strokeWidth="2.2" strokeLinecap="round" />

      <path d="M41.4 21.6 34.9 37.9 29.1 34.1Z" fill="url(#compass-needle-n)" />
      <path d="M22.6 50.4 29.1 34.1 34.9 37.9Z" fill="url(#compass-needle-s)" />
      <path d="M41.4 21.6 32 36 29.1 34.1Z" fill="#6C7FDA" opacity="0.5" />
      <path d="M22.6 50.4 32 36 34.9 37.9Z" fill="#0F5FA8" opacity="0.3" />

      <circle cx="32" cy="36" r="3.4" fill="url(#compass-hub)" />
      <circle cx="31" cy="34.9" r="1.1" fill="#FFFFFF" opacity="0.85" />
    </svg>
  );
}
