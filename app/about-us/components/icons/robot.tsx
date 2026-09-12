export function RobotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="robot-shell" x1="16" y1="14" x2="50" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#f2f7fe" />
          <stop offset="1" stopColor="#cfe0f4" />
        </linearGradient>
        <linearGradient id="robot-torso" x1="20" y1="46" x2="44" y2="61" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9dcf3" />
        </linearGradient>
        <linearGradient id="robot-face" x1="18" y1="21" x2="47" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#16305e" />
          <stop offset="0.45" stopColor="#0c1c3c" />
          <stop offset="1" stopColor="#060d20" />
        </linearGradient>
        <linearGradient id="robot-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#59b6f7" />
          <stop offset="0.5" stopColor="#2b8ae8" />
          <stop offset="1" stopColor="#1856bf" />
        </linearGradient>
        <radialGradient id="robot-eye" cx="0.38" cy="0.32" r="0.78">
          <stop offset="0" stopColor="#c6fffb" />
          <stop offset="0.5" stopColor="#5ceae0" />
          <stop offset="1" stopColor="#1fb6c4" />
        </radialGradient>
        <radialGradient id="robot-chest" cx="0.36" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#8fd4ff" />
          <stop offset="0.55" stopColor="#2e97f2" />
          <stop offset="1" stopColor="#1560c8" />
        </radialGradient>
      </defs>

      <path d="M32 15.6v-4.4" stroke="#2b8ae8" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="32" cy="7.6" r="3.4" fill="url(#robot-blue)" />
      <circle cx="30.9" cy="6.5" r="1.1" fill="#dff0ff" opacity="0.85" />

      <ellipse cx="11" cy="31" rx="4.4" ry="7.3" fill="url(#robot-blue)" />
      <ellipse cx="53" cy="31" rx="4.4" ry="7.3" fill="url(#robot-blue)" />

      <path d="M24 43h16l2.6 5.6H21.4z" fill="url(#robot-blue)" />

      <path d="M20.5 47.4h23c3.9 0 7 3.2 7 7.1V60H13.5v-5.5c0-3.9 3.1-7.1 7-7.1z" fill="url(#robot-torso)" />
      <path d="M13.5 55.4c0-2.7 2-4.9 4.5-4.9s4.5 2.2 4.5 4.9V60h-9z" fill="url(#robot-blue)" opacity="0.7" />
      <path d="M41.5 55.4c0-2.7 2-4.9 4.5-4.9s4.5 2.2 4.5 4.9V60h-9z" fill="url(#robot-blue)" opacity="0.7" />
      <circle cx="32" cy="54.2" r="4.6" fill="url(#robot-chest)" />
      <circle cx="30.4" cy="52.6" r="1.5" fill="#e4f4ff" opacity="0.8" />

      <path d="M32 14.2c11.6 0 20.5 6.4 20.5 16.4S43.6 46.6 32 46.6 11.5 40.6 11.5 30.6 20.4 14.2 32 14.2z" fill="url(#robot-shell)" />
      <path d="M20.4 19.6c2.9-2.4 6.9-3.9 11.6-3.9 2.2 0 4.3.3 6.3.9-6.6-.4-13.2 1-17.9 3z" fill="#ffffff" opacity="0.9" />

      <rect x="15.6" y="20.4" width="32.8" height="21.6" rx="7.6" fill="url(#robot-face)" />
      <path d="M23.2 20.4h17.6c-6.4 1.6-12.6 4.1-17.6 7.4v-7.4z" fill="#2a5fa8" opacity="0.22" />

      <circle cx="24.4" cy="29.6" r="3.9" fill="url(#robot-eye)" />
      <circle cx="39.6" cy="29.6" r="3.9" fill="url(#robot-eye)" />

      <path d="M27.4 35.4c1.1 2.3 2.7 3.4 4.6 3.4s3.5-1.1 4.6-3.4" fill="none" stroke="#f4fbff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
