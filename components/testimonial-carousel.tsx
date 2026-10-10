"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/testimonials";

const EVERY_MS = 4000;

/**
 * Testimonials as on webinar.finquo.ai: two cards at a time (one on phones),
 * moving on by one every few seconds and starting over after the last, so
 * 1+2, 2+3, 3+1, ... Stops while hovered. Visitors who ask for less motion
 * (Windows with animation effects off, among others) still get the rotation,
 * just without the fade.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  useEffect(() => {
    if (paused || n < 2) return;
    const id = window.setInterval(() => setStart((s) => (s + 1) % n), EVERY_MS);
    return () => window.clearInterval(id);
  }, [paused, n]);

  if (n === 0) return null;
  const shown = n === 1 ? [items[0]] : [items[start], items[(start + 1) % n]];

  return (
    <div className="mt-8" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 list-none m-0 p-0">
        {shown.map((t, i) => (
          <li
            key={t.name}
            className={`${i === 1 ? "hidden lg:grid" : "grid"} grid-cols-1 sm:grid-cols-[38%_1fr] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-xl bg-gradient-to-br from-[#4F46E5] to-[#3730A3] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500`}
          >
            <div className="relative min-h-[300px] sm:min-h-full bg-gray-100">
              {t.photo && (
                <Image src={t.photo} alt={t.name} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 38vw, 100vw" className="object-cover object-top" />
              )}
              <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-auto sm:bottom-4 rounded-2xl bg-white px-4 py-2.5 shadow-md">
                <p className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight m-0">{t.name}</p>
              </div>
            </div>
            <div className="relative p-6 sm:p-8 flex flex-col justify-center text-white">
              <p className="text-[#FBBF24] text-xl tracking-[0.15em] m-0" aria-label="5 out of 5 stars">★★★★★</p>
              <blockquote className="mt-4 text-sm sm:text-base leading-relaxed m-0">
                <span className="text-4xl font-serif text-white/40 leading-none mr-1 align-[-0.4em]" aria-hidden="true">“</span>
                {t.quote}
              </blockquote>
              <span className="self-end mt-3 text-4xl font-serif text-white/40 leading-none" aria-hidden="true">”</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
