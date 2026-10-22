"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

const EVERY_MS = 6000;
const CARD_GROUNDS = ["bg-[#EEF0FF]", "bg-[#FBF4EE]"];

const roleOf = (t: Testimonial) => [t.city, t.grade].filter(Boolean).join(" · ") || "Finquo Junior family";

/**
 * Two cards at a time (one on phones), moving on by one every few seconds and
 * starting over after the last. Dots and arrows let the visitor drive it;
 * it pauses while hovered.
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
  const go = (d: number) => setStart((s) => (s + d + n) % n);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 list-none m-0 p-0">
        {shown.map((t, i) => (
          <li
            key={t.name}
            className={`${i === 1 ? "hidden xl:grid" : "grid"} ${CARD_GROUNDS[i]} grid-cols-1 sm:grid-cols-[30%_1fr] gap-5 rounded-[28px] p-5 sm:p-6 shadow-[0_24px_60px_-36px_rgba(79,70,229,0.45)] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500`}
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
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2" aria-hidden="true">
            {items.map((_, i) => (
              <span key={i} className={`h-2 rounded-full transition-all ${i === start ? "w-6 bg-[#4F46E5]" : "w-2 bg-[#C7CBE3]"}`} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Previous" className="w-11 h-11 rounded-full border border-[#C7CBE3] bg-white text-[#4F46E5] flex items-center justify-center hover:bg-[#EEF0FF] cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="w-11 h-11 rounded-full bg-[#4F46E5] text-white flex items-center justify-center hover:bg-[#4338CA] cursor-pointer">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
