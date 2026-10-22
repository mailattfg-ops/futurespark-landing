import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, ClipboardList, PiggyBank, ShieldCheck, Receipt, Sprout } from "lucide-react";
import { FEATURED_HABITS } from "@/lib/syllabus";

/**
 * Sticker artwork from creative (brief F9), keyed by habit. Until a habit has
 * its image, the card shows a tinted icon in its place; the alt text is the
 * habit either way.
 */
const STICKER_ART: Record<string, string> = {};

const CARDS = [
  { bg: "bg-[#FFF8E6] border-[#F7E7B5]", badge: "bg-[#FFE8A3] text-[#8A5A12]", icon: ShoppingCart, tint: "text-[#F5A524]" },
  { bg: "bg-[#EEF3FF] border-[#C8D6FF]", badge: "bg-[#D6E3FF] text-[#1E3A8A]", icon: ClipboardList, tint: "text-[#6B8CFF]" },
  { bg: "bg-[#EEFBF3] border-[#BDE9D0]", badge: "bg-[#C9F2D9] text-[#166534]", icon: PiggyBank, tint: "text-[#F28BA8]" },
  { bg: "bg-[#FFF0F0] border-[#FFD1D1]", badge: "bg-[#FFD1D1] text-[#991B1B]", icon: ShieldCheck, tint: "text-[#EF5B5B]" },
  { bg: "bg-[#F4F0FF] border-[#DDD1FF]", badge: "bg-[#E0D4FF] text-[#4C1D95]", icon: Receipt, tint: "text-[#9C7BFF]" },
  { bg: "bg-[#F6FBE8] border-[#DDEBB5]", badge: "bg-[#E2F3B8] text-[#3F6212]", icon: Sprout, tint: "text-[#7CB342]" },
];

export function MoneyHabitsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#EEF0FF] py-14 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] tracking-[-0.03em] font-sans text-balance">20 sessions. 20 money habits.</h2>
        <p className="mt-3 text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
          Every session ends with one habit your child takes home, on a sticker they earn.
        </p>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 list-none m-0 p-0 text-left">
          {FEATURED_HABITS.map((habit, idx) => {
            const c = CARDS[idx];
            const Icon = c.icon;
            return (
              <li key={habit} className={`lift relative overflow-hidden rounded-2xl border ${c.bg} p-6 min-h-[190px] flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-900/10`}>
                <span className={`w-11 h-11 rounded-full ${c.badge} text-sm font-extrabold flex items-center justify-center tabular-nums`} aria-hidden="true">
                  0{idx + 1}
                </span>
                <p className="mt-5 text-xl sm:text-2xl font-extrabold text-[#0F1035] leading-snug pr-28 m-0">“{habit}”</p>
                <div className="absolute right-5 bottom-5 w-24 h-24 flex items-center justify-center float" style={{ animationDelay: `${idx * 0.4}s` }} aria-hidden="true">
                  {STICKER_ART[habit] ? (
                    <Image src={STICKER_ART[habit]} alt="" width={96} height={96} className="w-24 h-24 object-contain" />
                  ) : (
                    <Icon className={`w-20 h-20 ${c.tint}`} strokeWidth={1.3} />
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 text-sm sm:text-base text-gray-500">The twentieth is “I am Money Smart”, earned at graduation.</p>
        <Link href="/curriculum" className="inline-flex items-center gap-1.5 min-h-[44px] mt-1 text-sm sm:text-base font-bold text-[#4F46E5] hover:underline">
          See all 20 sessions <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
