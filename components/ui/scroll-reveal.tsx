"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "fade";
  duration?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant = "fade-up",
  duration = 650,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getVariantStyles = (): React.CSSProperties => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: "translate3d(0, 0, 0) scale(1)",
      };
    }

    switch (variant) {
      case "fade-up":
        return { opacity: 0, transform: "translate3d(0, 24px, 0)" };
      case "fade-down":
        return { opacity: 0, transform: "translate3d(0, -24px, 0)" };
      case "fade-left":
        return { opacity: 0, transform: "translate3d(28px, 0, 0)" };
      case "fade-right":
        return { opacity: 0, transform: "translate3d(-28px, 0, 0)" };
      case "zoom-in":
        return { opacity: 0, transform: "scale(0.95)" };
      case "fade":
      default:
        return { opacity: 0, transform: "none" };
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...getVariantStyles(),
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
