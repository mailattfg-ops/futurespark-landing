import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURED_HABITS } from "@/lib/syllabus";

/**
 * Sticker artwork from creative (brief F9), keyed by habit. Until a habit has
 * its image, the card shows the habit as a text sticker; the alt text is the
 * habit either way.
 */
const STICKER_ART: Record<string, string> = {};

const CARD_COLOURS = [
  "bg-amber-100 text-amber-900",
  "bg-sky-100 text-sky-900",
  "bg-emerald-100 text-emerald-900",
  "bg-rose-100 text-rose-900",
  "bg-purple-100 text-purple-900",
  "bg-lime-100 text-lime-900",
];

export function MoneyHabitsSection() {
  return (
    <section className="w-full bg-[#FFF8EE] py-10 sm:py-12 lg:py-14 border-t border-[#F7EBD9]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans text-balance">20 sessions. 20 money habits.</h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Every session ends with one habit your child takes home, on a sticker they earn.
        </p>

        <ul className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 list-none m-0 p-0">
          {FEATURED_HABITS.map((habit, idx) => (
            <li key={habit} className="flex items-center justify-center">
              {STICKER_ART[habit] ? (
                <Image src={STICKER_ART[habit]} alt={habit} width={240} height={240} className="w-40 h-40 sm:w-48 sm:h-48 object-contain" />
              ) : (
                <div className={`w-full aspect-square max-w-[220px] rounded-full ${CARD_COLOURS[idx]} border-4 border-white shadow-md rotate-[-3deg] flex items-center justify-center p-6`}>
                  <span className="text-sm sm:text-base font-black leading-snug text-balance">“{habit}”</span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm sm:text-base text-gray-700 font-semibold">The twentieth is “I am Money Smart”, earned at graduation.</p>
        <Link href="/curriculum" className="inline-flex items-center gap-1.5 min-h-[44px] mt-2 text-sm font-bold text-[#4F46E5] hover:underline">
          See all 20 sessions <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
