/**
 * Solid navy pictograms used in the "Why Financial Literacy" and
 * "What Makes Finquo Junior Different" rows. Deliberately filled (not
 * stroked) so they read as the same weight as the poster artwork.
 */

type GlyphProps = { className?: string };

function Glyph({ className = "", children }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** One child: head plus shoulders. */
export function GlyphUser({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="16" cy="10.2" r="5.6" />
      <path d="M16 17.6c-5.4 0-9.8 3.4-9.8 7.7 0 .9.7 1.7 1.7 1.7h16.2c1 0 1.7-.8 1.7-1.7 0-4.3-4.4-7.7-9.8-7.7Z" />
    </Glyph>
  );
}

/** A small group: two figures behind, one in front. */
export function GlyphUsers({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <circle cx="7.4" cy="11.4" r="3.9" />
      <path d="M7.4 16.4c-3.4 0-6.2 2.2-6.2 4.9 0 .7.5 1.2 1.2 1.2h10c.7 0 1.2-.5 1.2-1.2 0-2.7-2.8-4.9-6.2-4.9Z" />
      <circle cx="24.6" cy="11.4" r="3.9" />
      <path d="M24.6 16.4c-3.4 0-6.2 2.2-6.2 4.9 0 .7.5 1.2 1.2 1.2h10c.7 0 1.2-.5 1.2-1.2 0-2.7-2.8-4.9-6.2-4.9Z" />
      <circle cx="16" cy="9.6" r="5" />
      <path d="M16 16c-4.7 0-8.5 2.9-8.5 6.6 0 .9.7 1.6 1.6 1.6h13.8c.9 0 1.6-.7 1.6-1.6 0-3.7-3.8-6.6-8.5-6.6Z" />
    </Glyph>
  );
}

/** An open book, seen from above. */
export function GlyphBook({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M15.1 10.9v13.8a.7.7 0 0 1-1 .6c-2.4-1.4-5.5-2.1-8.4-2.1A1.7 1.7 0 0 1 4 21.5V9.1c0-1 .8-1.7 1.8-1.7 3.4.1 6.7 1.1 9 2.7a.6.6 0 0 1 .3.5v.3Z" />
      <path d="M16.9 10.9v13.8a.7.7 0 0 0 1 .6c2.4-1.4 5.5-2.1 8.4-2.1a1.7 1.7 0 0 0 1.7-1.7V9.1c0-1-.8-1.7-1.8-1.7-3.4.1-6.7 1.1-9 2.7a.6.6 0 0 0-.3.5v.3Z" />
    </Glyph>
  );
}

/** Rising bars: progress tracked across the sessions. */
export function GlyphChart({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <rect x="4.5" y="20.5" width="4.4" height="6.5" rx="1.4" />
      <rect x="11.3" y="16.4" width="4.4" height="10.6" rx="1.4" />
      <rect x="18.1" y="11.6" width="4.4" height="15.4" rx="1.4" />
      <rect x="24.9" y="6.4" width="4.4" height="20.6" rx="1.4" />
    </Glyph>
  );
}

/** A five-point star: the skills that keep paying off. */
export function GlyphStar({ className }: GlyphProps) {
  return (
    <Glyph className={className}>
      <path d="M16 3.6c.5 0 .9.3 1.1.7l3.2 6.6 7.2 1c.5.1.9.4 1 .9.2.5 0 1-.3 1.3l-5.2 5.1 1.2 7.2c.1.5-.1 1-.5 1.3-.4.3-.9.3-1.4.1L16 24.4l-6.4 3.4c-.4.2-1 .2-1.4-.1-.4-.3-.6-.8-.5-1.3l1.2-7.2-5.2-5.1c-.4-.3-.5-.8-.3-1.3.1-.5.5-.8 1-.9l7.2-1 3.2-6.6c.2-.4.7-.7 1.2-.7Z" />
    </Glyph>
  );
}
