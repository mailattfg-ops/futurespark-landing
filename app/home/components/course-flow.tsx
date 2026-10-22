"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sticker, UserCheck, Printer, Landmark, Coins, ShieldCheck, Globe, Scale, Store } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";
import { MODULES, sessionsIn, TOTAL_SESSIONS, BONUS_SESSIONS } from "@/lib/syllabus";
import { Placement } from "@/lib/site";

export const MODULE_COLOURS = ["bg-[#0066FF]", "bg-[#8B5CF6]", "bg-[#D97706]", "bg-[#DC2626]", "bg-[#059669]"];
const MODULE_ICONS = [Coins, ShieldCheck, Globe, Scale, Store];
/* The picture tile on each card, until creative supplies module photos. */
const MODULE_TINTS = [
  "from-[#E6FBF7] to-[#CFF3EC]",
  "from-[#EAF1FF] to-[#D6E3FF]",
  "from-[#FFF8E1] to-[#FDEFC7]",
  "from-[#F1EAFF] to-[#E3D6FF]",
  "from-[#FFF0F3] to-[#FFD9E2]",
];

const TILES = [
  { icon: <Sticker className="w-5 h-5 text-[#F5A524]" aria-hidden="true" />, title: "A Money Habit sticker every session", bg: "from-[#FFF8E1] to-[#FDEFC7] border-[#F7E7B5]" },
  { icon: <UserCheck className="w-5 h-5 text-[#1CB5B5]" aria-hidden="true" />, title: "One mentor throughout", bg: "from-[#E6FBF7] to-[#CFF3EC] border-[#BDE9E0]" },
  { icon: <Printer className="w-5 h-5 text-[#3B6CFF]" aria-hidden="true" />, title: "Worksheets in hand", bg: "from-[#EAF1FF] to-[#D6E3FF] border-[#C8D6FF]" },
  { icon: <Landmark className="w-5 h-5 text-[#7C3AED]" aria-hidden="true" />, title: "Built by finance professionals", bg: "from-[#F1EAFF] to-[#E3D6FF] border-[#D9CBFF]" },
];

/** Total tile, the four value tiles and the closing line. The curriculum page shows the same block. */
export function RoadmapSummary({ placement }: { placement: Placement }) {
  return (
    <div className="rounded-[28px] border border-[#E4E6F2] bg-white/90 p-6 sm:p-10 shadow-[0_24px_60px_-32px_rgba(79,70,229,0.35)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
        <div className="text-center lg:text-left border-b lg:border-b-0 lg:border-r border-[#E4E6F2] pb-6 lg:pb-0 lg:pr-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total</span>
          <div className="text-5xl sm:text-6xl font-black text-[#0F1035] tracking-tight leading-none my-1 tabular-nums">{TOTAL_SESSIONS}</div>
          <span className="text-sm font-extrabold text-[#4F46E5] uppercase tracking-wide">Sessions + {BONUS_SESSIONS} bonus</span>
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TILES.map((t) => (
            <div key={t.title} className={`lift p-5 rounded-2xl border bg-gradient-to-br ${t.bg} flex flex-col gap-4`}>
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">{t.icon}</div>
              <h4 className="text-[15px] font-extrabold text-[#0F1035] leading-snug">{t.title}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-[#E4E6F2] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <p className="text-xl sm:text-2xl font-extrabold text-[#0F1035] tracking-tight">Tuition covers maths. Nobody covers money.</p>
        <BookDemoButton placement={placement} arrow />
      </div>
    </div>
  );
}

/**
 * Every session under its module, used by the curriculum page. On phones each
 * module is collapsed behind its heading; from md up every module is open.
 * Same card language as the homepage roadmap: white card, pastel picture tile,
 * teal session label, navy title.
 */
export function ModuleCards({ showHabits = false }: { showHabits?: boolean }) {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 sm:gap-5">
      {MODULES.map((m) => {
        const isOpen = open === m.id;
        const Icon = MODULE_ICONS[m.id - 1];
        return (
          <div key={m.id} id={`module-${m.id}`} className="lift scroll-mt-28 bg-white rounded-2xl border border-[#E4E6F2] overflow-hidden flex flex-col hover:shadow-xl hover:shadow-indigo-900/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : m.id)}
              aria-expanded={isOpen}
              className={`relative text-left p-5 flex items-start justify-between gap-3 bg-gradient-to-br ${MODULE_TINTS[m.id - 1]} xl:min-h-[190px] md:pointer-events-none md:cursor-default`}
            >
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#1CB5B5]">
                  Sessions {m.range[0]}–{m.range[1]}
                </span>
                <h3 className="mt-1.5 flex items-center gap-2 text-lg font-extrabold leading-snug text-[#0F1035] font-sans">
                  <Icon className="w-5 h-5 shrink-0" strokeWidth={2} aria-hidden="true" />
                  {m.name}
                </h3>
                <p className="text-[12px] italic text-[#1CB5B5] mt-1 leading-relaxed">“{m.blurb}”</p>
              </div>
              <span className="absolute right-3 bottom-1 text-[64px] font-black leading-none text-[#0F1035]/[0.06] select-none" aria-hidden="true">0{m.id}</span>
              <ChevronDown className={`w-5 h-5 shrink-0 mt-1 text-[#0F1035] transition-transform md:hidden ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            <ol className={`${isOpen ? "block" : "hidden"} md:block p-5 space-y-3 list-none m-0 flex-1`}>
              {sessionsIn(m.id).map((s) => (
                <li key={s.n} className="flex items-start gap-2.5 text-sm text-gray-800">
                  <span className="w-6 h-6 rounded-full bg-[#EEF0FF] text-[#4F46E5] text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                    {s.n}
                  </span>
                  <span className="leading-snug">
                    <span className="font-semibold">{s.title}</span>
                    {showHabits && <span className="block text-xs text-[#B8731A] font-bold mt-0.5">Sticker: “{s.habit}”</span>}
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

/** The roadmap on the homepage: filter pills, one card per module, then the summary panel. */
export function CourseFlowSection() {
  const [filter, setFilter] = useState<"all" | number>("all");
  const shown = filter === "all" ? MODULES : MODULES.filter((m) => m.id === filter);

  const pill = (active: boolean) =>
    `min-h-[44px] px-5 py-2 rounded-full text-sm font-bold text-white transition-colors cursor-pointer ${active ? "bg-[#3B6CFF]" : "bg-[#1CB5B5] hover:bg-[#169E9E]"}`;

  return (
    <section className="w-full bg-gradient-to-b from-[#EEF0FF] to-white py-14 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] text-center tracking-[-0.03em] font-sans text-balance">
          Course <span className="text-[#3B6CFF]">Flow &amp; Roadmap</span>
        </h2>
        <p className="mt-3 text-center text-base sm:text-lg text-gray-500 font-medium">20 sessions. One subject: money.</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Modules">
          <button type="button" role="tab" aria-selected={filter === "all"} onClick={() => setFilter("all")} className={pill(filter === "all")}>
            All ({TOTAL_SESSIONS})
          </button>
          {MODULES.map((m) => (
            <button key={m.id} type="button" role="tab" aria-selected={filter === m.id} onClick={() => setFilter(m.id)} className={pill(filter === m.id)}>
              {m.name}
            </button>
          ))}
        </div>

        <div className={`mt-8 grid grid-cols-1 gap-5 sm:gap-6 ${shown.length > 1 ? "lg:grid-cols-2" : "max-w-2xl mx-auto"}`}>
          {shown.map((m) => {
            const Icon = MODULE_ICONS[m.id - 1];
            return (
              <article key={m.id} className={`lift rounded-2xl border border-[#E4E6F2] bg-white p-5 sm:p-6 grid grid-cols-[1fr_auto] gap-5 hover:shadow-xl hover:shadow-indigo-900/10 ${shown.length === 5 && m.id === 5 ? "lg:col-span-2 lg:max-w-[calc(50%-0.75rem)] lg:mx-auto lg:w-full" : ""}`}>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#1CB5B5]">
                    Sessions {m.range[0]}–{m.range[1]}
                  </p>
                  <h3 className="mt-1 flex items-start gap-3 text-xl sm:text-2xl font-extrabold text-[#0F1035] leading-tight break-words">
                    <Icon className="w-7 h-7 shrink-0 mt-0.5" strokeWidth={2} aria-hidden="true" />
                    <span className="min-w-0">{m.name}</span>
                  </h3>
                  <p className="mt-1.5 text-sm italic text-[#1CB5B5]">“{m.blurb}”</p>
                  <ul className="mt-4 space-y-2 list-none m-0 p-0">
                    {sessionsIn(m.id)
                      .slice(0, 3)
                      .map((s) => (
                        <li key={s.n} className="flex items-start gap-2.5 text-sm text-gray-800">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#F26B2E] shrink-0" aria-hidden="true" />
                          {s.title}
                        </li>
                      ))}
                  </ul>
                  <Link href={`/curriculum#module-${m.id}`} className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-sm font-semibold text-[#3B6CFF] underline underline-offset-4 hover:text-[#2F55D8]">
                    Explore <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
                <div className={`relative w-24 sm:w-32 md:w-40 lg:w-36 xl:w-44 self-stretch min-h-[160px] rounded-2xl bg-gradient-to-br ${MODULE_TINTS[m.id - 1]} overflow-hidden flex items-center justify-center`} aria-hidden="true">
                  <span className="absolute -bottom-4 right-1 text-[110px] font-black leading-none text-[#0F1035]/[0.06] select-none">0{m.id}</span>
                  <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-[#0F1035]/70" strokeWidth={1.3} />
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16">
          <RoadmapSummary placement="roadmap" />
        </div>
      </div>
    </section>
  );
}
