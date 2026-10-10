"use client";

import { useState } from "react";
import { ChevronDown, Sticker, UserCheck, Printer, Landmark } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";
import { MODULES, sessionsIn, TOTAL_SESSIONS, BONUS_SESSIONS } from "@/lib/syllabus";
import { Placement } from "@/lib/site";

export const MODULE_COLOURS = ["bg-[#0066FF]", "bg-[#8B5CF6]", "bg-[#D97706]", "bg-[#DC2626]", "bg-[#059669]"];

const TILES = [
  { icon: <Sticker className="w-5 h-5 text-amber-600" aria-hidden="true" />, title: "A Money Habit sticker every session", bg: "bg-amber-50 border-amber-100" },
  { icon: <UserCheck className="w-5 h-5 text-emerald-600" aria-hidden="true" />, title: "One mentor throughout", bg: "bg-emerald-50 border-emerald-100" },
  { icon: <Printer className="w-5 h-5 text-blue-600" aria-hidden="true" />, title: "Worksheets in hand", bg: "bg-blue-50 border-blue-100" },
  { icon: <Landmark className="w-5 h-5 text-purple-600" aria-hidden="true" />, title: "Built by finance professionals", bg: "bg-purple-50 border-purple-100" },
];

/** Total tile, the four value tiles and the closing line (brief F2 rows 20–21). The curriculum page shows the same block. */
export function RoadmapSummary({ placement }: { placement: Placement }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-lg shadow-indigo-900/5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
        <div className="text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total</span>
          <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight leading-none my-1 tabular-nums">{TOTAL_SESSIONS}</div>
          <span className="text-sm font-extrabold text-[#4F46E5] uppercase tracking-wide">Sessions + {BONUS_SESSIONS} bonus</span>
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TILES.map((t) => (
            <div key={t.title} className={`p-4 rounded-2xl border ${t.bg} flex flex-col gap-3`}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">{t.icon}</div>
              <h4 className="text-sm font-extrabold text-gray-900 leading-snug">{t.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <p className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">Tuition covers maths. Nobody covers money.</p>
        <BookDemoButton placement={placement} arrow />
      </div>
    </div>
  );
}

/**
 * The five modules with their session titles (brief F2 row 19). On phones each
 * module is collapsed behind its heading so the page stays short (brief F12);
 * from md up every module is open and the heading is just a heading.
 */
export function ModuleCards({ showHabits = false }: { showHabits?: boolean }) {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5">
      {MODULES.map((m, idx) => {
        const isOpen = open === m.id;
        return (
          <div key={m.id} className="bg-white rounded-2xl border border-gray-200/90 shadow-sm overflow-hidden flex flex-col">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : m.id)}
              aria-expanded={isOpen}
              className={`${MODULE_COLOURS[idx]} text-white text-left p-5 flex items-start justify-between gap-3 md:pointer-events-none md:cursor-default`}
            >
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/25 border border-white/20 px-2.5 py-0.5 rounded-full">
                  Sessions {m.range[0]}–{m.range[1]}
                </span>
                <h3 className="text-lg font-extrabold leading-snug mt-2.5 font-sans">
                  {m.id}. {m.name}
                </h3>
                <p className="text-[12px] text-white/90 mt-1 leading-relaxed">{m.blurb}</p>
              </div>
              <ChevronDown className={`w-5 h-5 shrink-0 mt-1 transition-transform md:hidden ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            <ol className={`${isOpen ? "block" : "hidden"} md:block p-5 space-y-3 list-none m-0 flex-1`}>
              {sessionsIn(m.id).map((s) => (
                <li key={s.n} className="flex items-start gap-2.5 text-sm text-gray-800">
                  <span className="w-6 h-6 rounded-full bg-indigo-50 text-[#4F46E5] text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    {s.n}
                  </span>
                  <span className="leading-snug">
                    <span className="font-semibold">{s.title}</span>
                    {showHabits && <span className="block text-xs text-amber-700 font-bold mt-0.5">Sticker: “{s.habit}”</span>}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}

export function CourseFlowSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-10 sm:py-12 lg:py-16 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-8 sm:mb-12 font-sans text-balance">
          20 sessions. One subject: money.
        </h2>
        <ModuleCards />
        <div className="mt-10 sm:mt-14">
          <RoadmapSummary placement="roadmap" />
        </div>
      </div>
    </section>
  );
}
