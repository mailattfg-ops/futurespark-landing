"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";

/* ── Data ─────────────────────────────────────────────────────────────────── */

export interface Step {
  title: string;
  description: string;
  /** The colour the number, node, line and card take when this step is active. */
  color: string;
}

const STEPS: Step[] = [
  { title: "Free demo", description: "A free one-hour class so you can see how your child responds.", color: "#1BA5B8" },
  { title: "Match", description: "We pair your child with a mentor who fits their age, pace and personality. Same mentor for all 20 sessions.", color: "#2F6BFF" },
  { title: "Weekly session", description: "One live, 1-on-1 hour each week, with a printed worksheet and sticker pack for every session.", color: "#2563EB" },
  {
    title: "Capstone, certificate and bonus",
    description:
      "A two-session capstone where your child builds and presents a small business, a Finquo Junior certificate at graduation, then five free bonus sessions in AI, Public Speaking and Cyber Awareness.",
    color: "#7C3AED",
  },
];

/* ── The wave (desktop) ────────────────────────────────────────────────────── */

const VIEW = { w: 1200, h: 420 };
/* One node per step, each on a crest or trough so the curve is flat there and
   the segments join smoothly. `up` sends the stem up to a card above the
   wave, otherwise down to one below; `anchor` is where the stem ends, and the
   card's nearest edge sits CARD_GAP past it. */
const NODES = [
  { x: 170, y: 300, up: true, anchor: 205 },
  { x: 470, y: 190, up: false, anchor: 285 },
  { x: 760, y: 315, up: true, anchor: 180 },
  { x: 1050, y: 205, up: false, anchor: 300 },
];
const WAVE = "M0 250 C60 250 110 300 170 300 C270 300 370 190 470 190 C570 190 660 315 760 315 C860 315 950 205 1050 205 C1100 205 1150 215 1200 215";
/* The big numbers, centred on their node: under the troughs for 1 and 3,
   over the crests for 2 and 4, all the same distance from the line. */
const NUMERAL_OFFSET = 110;
const NUMERALS = NODES.map((n) => ({ x: n.x, y: n.up ? n.y + NUMERAL_OFFSET : n.y - NUMERAL_OFFSET }));
/* Where each card sits across the drawing; the last is wider so its long title keeps to two lines. */
const CARDS = [
  { left: "5%", width: "23%" },
  { left: "29%", width: "23%" },
  { left: "54%", width: "23%" },
  { left: "74%", width: "26%" },
];
const CARD_GAP = 30;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
/* A card hangs from its anchor: bottom edge for cards above the wave, top edge for cards below. */
const cardPos = (n: (typeof NODES)[number], i: number) => ({
  ...CARDS[i],
  ...(n.up ? { bottom: pct(VIEW.h - (n.anchor - CARD_GAP), VIEW.h) } : { top: pct(n.anchor + CARD_GAP, VIEW.h) }),
});

const Sparkle = () => (
  <Image src="/star.png" alt="" width={22} height={24} style={{ width: "auto", height: "auto" }} className="w-6 h-6 shrink-0 select-none" />
);

/* ── The explorer ──────────────────────────────────────────────────────────── */

interface StepExplorerProps {
  steps: Step[];
  /** Which step is selected to begin with (0-based); none by default. */
  initial?: number | null;
}

/**
 * Hover or focus a number (or its card) and that step lights up: the number,
 * title and card take the step's colour, a ring and halo grow around its dot,
 * the wave draws up to it and a line draws from the dot to the card. Leaving
 * restores the step unless it was clicked, which keeps it lit until another
 * is chosen. Desktop lays the steps on the wave; smaller screens stack them
 * down a line.
 */
export function StepExplorer({ steps, initial = null }: StepExplorerProps) {
  const [selected, setSelected] = useState<number | null>(initial);
  const [hovered, setHovered] = useState<number | null>(null);
  const active = hovered ?? selected;
  const [fractions, setFractions] = useState<number[]>(() => NODES.map((n) => n.x / VIEW.w));
  const pathRef = useRef<SVGPathElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const lit = active === null ? null : steps[active];

  /* How far along the drawn line each node sits, so the bright line stops exactly on it. */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    const at = (x: number) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).x < x) lo = mid;
        else hi = mid;
      }
      return lo / total;
    };
    setFractions(NODES.map((n) => at(n.x)));
  }, []);

  /* Arrow keys move the selection and the focus together. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = steps.length;
    const from = active ?? -1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (from + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (from - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    setSelected(next);
    buttons.current[next]?.focus();
  };

  /* Pointer and focus light a step; a click keeps it lit. */
  const handlers = (i: number) => ({
    onMouseEnter: () => setHovered(i),
    onMouseLeave: () => setHovered((h) => (h === i ? null : h)),
    onClick: () => setSelected(i),
  });

  const node = active === null ? null : NODES[active];

  return (
    <div>
      {/* Desktop: the wave */}
      <div className="hidden lg:block relative mt-16 xl:mt-12 mb-44 xl:mb-36" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }} onKeyDown={onKeyDown}>
        <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="absolute inset-0 w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={`${baseId}-wave`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#22C1D6" />
              <stop offset="0.5" stopColor="#2F6BFF" />
              <stop offset="1" stopColor="#7C3AED" />
            </linearGradient>
            <radialGradient id={`${baseId}-glow`}>
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.45" stopColor="#fff" stopOpacity="0.9" />
              <stop offset="1" stopColor={lit?.color ?? "#2F6BFF"} stopOpacity="0" />
            </radialGradient>
          </defs>

          <path d={WAVE} fill="none" stroke={`url(#${baseId}-wave)`} strokeWidth="6" strokeLinecap="round" opacity="0.28" />
          <path
            ref={pathRef}
            d={WAVE}
            pathLength={1}
            fill="none"
            stroke={`url(#${baseId}-wave)`}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="1"
            style={{ strokeDashoffset: active === null ? 1 : 1 - fractions[active], transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}
          />

          {NODES.map((n, i) => {
            const on = i === active;
            const color = steps[i].color;
            return (
              <g key={i}>
                {/* The quiet stem, always there */}
                <line x1={n.x} y1={n.y} x2={n.x} y2={n.anchor} stroke="#C7CBE3" strokeWidth="2" />
                {/* The accent line, drawn from the dot out to the anchor while lit */}
                <path
                  d={`M${n.x} ${n.y} V${n.anchor}`}
                  pathLength={1}
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  strokeDasharray="1"
                  style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 0.45s cubic-bezier(0.4, 0, 0.2, 1)" }}
                />
                {/* The anchor by the card: a dot that gains a ring while lit */}
                <circle cx={n.x} cy={n.anchor} r="9" fill="#fff" stroke={color} strokeWidth="2.5" style={{ opacity: on ? 1 : 0, transition: "opacity 0.3s ease 0.25s" }} />
                <circle cx={n.x} cy={n.anchor} r="5" fill={color} />
                {/* The ring and halo exist only while the step is lit */}
                <g
                  className="hiw-move"
                  style={{
                    transformBox: "fill-box",
                    transformOrigin: "center",
                    transform: `scale(${on ? 1 : 0.4})`,
                    opacity: on ? 1 : 0,
                    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.25s ease",
                  }}
                >
                  <circle cx={n.x} cy={n.y} r="44" fill={color} opacity="0.18" />
                  <circle cx={n.x} cy={n.y} r="30" fill="#fff" />
                </g>
                <circle cx={n.x} cy={n.y} r="12" fill={color} />
              </g>
            );
          })}

          {node && (
            <g className="hiw-move" style={{ transform: `translate(${node.x}px, ${node.y}px)`, transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)" }}>
              <circle r="26" fill={`url(#${baseId}-glow)`} />
              <circle r="8" fill="#fff" stroke={lit!.color} strokeWidth="3" />
            </g>
          )}
        </svg>

        {/* The numbers are the controls */}
        {NUMERALS.map((n, i) => {
          const on = i === active;
          return (
            <button
              key={i}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              aria-pressed={selected === i}
              aria-label={`Step ${i + 1}: ${steps[i].title}`}
              {...handlers(i)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered((h) => (h === i ? null : h))}
              style={{ left: pct(n.x, VIEW.w), top: pct(n.y, VIEW.h), color: on ? steps[i].color : "#DDE0EE" }}
              className="hiw-move absolute -translate-x-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] px-4 text-[clamp(96px,11vw,150px)] font-black leading-none tabular-nums cursor-pointer select-none transition-[color,transform] duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 rounded-3xl"
            >
              {i + 1}
            </button>
          );
        })}

        {/* The cards, each hung from its anchor; they light their step too */}
        <ol className="absolute inset-0 list-none m-0 p-0 pointer-events-none">
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.title} className="absolute pointer-events-auto cursor-pointer" style={cardPos(NODES[i], i)} {...handlers(i)}>
                <div className="flex items-center gap-2.5">
                  <Sparkle />
                  <h3 className="text-xl xl:text-2xl font-extrabold leading-tight font-sans transition-colors duration-300" style={{ color: on ? s.color : "#0F1035" }}>
                    {s.title}
                  </h3>
                </div>
                <p className="mt-2 pl-[34px] text-sm leading-[22px] xl:text-[15px] xl:leading-6 text-gray-600">{s.description}</p>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Smaller screens: the steps down a line, each node joined to its card */}
      <ol className="lg:hidden relative mt-10 space-y-5 list-none m-0 p-0" onKeyDown={onKeyDown}>
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <li key={s.title} className="relative flex items-start">
              {/* The line down to the next node, in the two steps' colours */}
              {i < steps.length - 1 && (
                <span
                  className="absolute left-[21px] top-[22px] bottom-[-42px] w-[3px] rounded-full opacity-30"
                  style={{ background: `linear-gradient(to bottom, ${s.color}, ${steps[i + 1].color})` }}
                  aria-hidden="true"
                />
              )}
              <button
                type="button"
                aria-pressed={selected === i}
                aria-label={`Step ${i + 1}: ${s.title}`}
                {...handlers(i)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                className="relative z-10 w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-base font-black tabular-nums cursor-pointer transition-[background-color,color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
                style={{
                  backgroundColor: on ? s.color : "#fff",
                  color: on ? "#fff" : s.color,
                  boxShadow: on ? `0 0 0 6px ${s.color}22` : "0 0 0 1px #E4E6F2, 0 2px 6px rgba(15, 16, 53, 0.12)",
                }}
              >
                {i + 1}
              </button>
              {/* The line from the node to the card, drawn while lit */}
              <span className="relative mt-[21px] h-[2px] w-5 shrink-0 bg-[#C7CBE3]" aria-hidden="true">
                <span className="absolute inset-0 origin-left transition-transform duration-300" style={{ backgroundColor: s.color, transform: `scaleX(${on ? 1 : 0})` }} />
              </span>
              <div className="flex-1 min-w-0 pt-1 cursor-pointer" {...handlers(i)}>
                <div className="flex items-center gap-2.5">
                  <Sparkle />
                  <h3 className="text-lg font-extrabold leading-tight font-sans transition-colors duration-300" style={{ color: on ? s.color : "#0F1035" }}>
                    {s.title}
                  </h3>
                </div>
                <p className="mt-1.5 text-sm leading-[22px] text-gray-600">{s.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── The section ───────────────────────────────────────────────────────────── */

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full bg-gradient-to-b from-white via-[#F7F8FF] to-[#EEF0FF] py-14 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] text-center tracking-[-0.03em] font-sans">
          How It <span className="text-[#3B6CFF]">Works</span>
        </h2>
        <StepExplorer steps={STEPS} />
      </div>
    </section>
  );
}
