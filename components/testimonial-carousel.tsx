"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

const EVERY_MS = 3000;
const CARD_GROUNDS = ["bg-[#EEF0FF]", "bg-[#FBF4EE]"];

const roleOf = (t: Testimonial) => [t.city, t.grade].filter(Boolean).join(" · ") || "Finquo Junior family";

/**
 * Two cards at a time (one on phones), moving on by one every few seconds and
 * starting over after the last, with a short slide so each change is seen.
 * The dots jump to a card and restart the count. It keeps moving under the
 * mouse; it holds only while a dot has keyboard focus, so someone tabbing
 * through can read without it moving on.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [start, setStart] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = items.length;

  // Restarts on every change, so picking a dot gives that card the full time.
  useEffect(() => {
    if (paused || n < 2) return;
    const id = window.setTimeout(() => setStart((s) => (s + 1) % n), EVERY_MS);
    return () => window.clearTimeout(id);
  }, [start, paused, n]);

  if (n === 0) return null;
  const shown = n === 1 ? [items[0]] : [items[start], items[(start + 1) % n]];

  return (
    <div>
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 list-none m-0 p-0">
        {shown.map((t, i) => (
          <li
            // Keyed by position too, so every change remounts the card and replays the slide.
            key={`${start}-${t.name}`}
            style={{ animationDelay: `${i * 90}ms` }}
            className={`swap-in ${i === 1 ? "hidden xl:grid" : "grid"} ${CARD_GROUNDS[i]} grid-cols-1 sm:grid-cols-[30%_1fr] gap-5 rounded-[28px] p-5 sm:p-6 shadow-[0_24px_60px_-36px_rgba(79,70,229,0.45)]`}
          >
            <div className="flex flex-col">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-white">
                {t.photo && <Image src={t.photo} alt={t.name} fill sizes="(min-width: 1024px) 18vw, (min-width: 640px) 36vw, 100vw" className="object-cover object-top" />}
              </div>
              <p className="mt-3 text-base font-extrabold text-[#0F1035] leading-tight m-0">{t.name}</p>
              <p className="text-xs text-gray-500 m-0 mt-0.5">{roleOf(t)}</p>
            </div>
            <div className="relative">
              <span className="absolute top-0 right-0 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center text-[#4F46E5]" aria-hidden="true">
                <Quote className="w-4 h-4" />
              </span>
              <p className="text-[#F5A524] text-lg tracking-[0.12em] m-0" aria-label="5 out of 5 stars">★★★★★</p>
              <blockquote className="mt-3 pr-10 text-sm leading-relaxed text-gray-700 m-0">{t.quote}</blockquote>
            </div>
          </li>
        ))}
      </ul>

      {n > 1 && (
        <div className="mt-6 flex items-center justify-center gap-1" onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show ${t.name}'s review`}
              aria-current={i === start}
              onClick={() => setStart(i)}
              className="group flex items-center justify-center h-11 min-w-[28px] px-1 cursor-pointer focus-visible:outline-none"
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-indigo-300 ${i === start ? "w-7 bg-[#4F46E5]" : "w-2 bg-[#C7CBE3] group-hover:bg-[#A5ABD3]"}`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
