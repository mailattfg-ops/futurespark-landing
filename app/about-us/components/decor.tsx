/**
 * The little "spark" strokes drawn beside the About Us headline. The rest of
 * the poster furniture (handwritten notes, book stacks, the child cut-outs)
 * lives in the artwork files under /public.
 */
export function Sparks({
  className = "",
  color = "#5B45F5",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 30 34"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M14 12 19 2" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M20 17 29 13" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M6 12 7 3" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
