import React from "react";

/**
 * Formerly an IntersectionObserver fade-in that rendered children at opacity 0
 * until scrolled into view. Change brief F11: content must be visible by
 * default, with JavaScript off and during a fast scroll. The wrapper stays so
 * the call sites keep their layout classes; the props are accepted and ignored.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  duration?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  return <div className={className}>{children}</div>;
}
