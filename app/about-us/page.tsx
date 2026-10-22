"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoButton } from "@/components/book-demo-button";
import { getDefaultSectionState, SectionState, clearLegacyStorage } from "@/lib/section-config";
import { MODULES, BONUS_SESSIONS, BONUS_SUBJECTS } from "@/lib/syllabus";
import { MENTORS } from "@/lib/mentors";
import { LEGAL_NAME, CONTACT } from "@/lib/site";
import { Sparks } from "./components/decor";
import { Coins, Users, UserRound, Rocket, BookOpen, BarChart3, Star, Printer, ShieldCheck, Globe, Scale, Store, MapPin, Phone } from "lucide-react";

/* ── Tokens shared with the homepage ──────────────────────────────────────── */
const NAVY = "#0F1035";
const PANEL = "rounded-[26px] sm:rounded-[34px] px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14";
const H2 = "font-extrabold tracking-[-0.03em] text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-[#0F1035] text-balance";
const SUB = "mt-2.5 text-[16px] sm:text-[19px] lg:text-[22px] leading-snug text-gray-500";

/* ── "Why Financial Literacy?" row ────────────────────────────────────────── */
const whyPoints = [
  { icon: <Coins className="w-6 h-6" />, tile: "bg-[#F5A524]", title: "Real decisions", body: "Understand real trade-offs through everyday scenarios." },
  { icon: <Users className="w-6 h-6" />, tile: "bg-[#3B6CFF]", title: "Built by professionals", body: "Designed with finance and education professionals." },
  { icon: <UserRound className="w-6 h-6" />, tile: "bg-[#F26B2E]", title: "1-on-1 mentoring", body: "Every child has a dedicated mentor." },
  { icon: <Rocket className="w-6 h-6" />, tile: "bg-[#7C3AED]", title: "Practical & engaging", body: "Activities, challenges and real-world applications." },
];

/* ── The five modules: the homepage's pastel tiles ────────────────────────── */
const MODULE_ICONS = [Coins, ShieldCheck, Globe, Scale, Store];
const MODULE_TINTS = [
  "from-[#E6FBF7] to-[#CFF3EC] border-[#BDE9E0]",
  "from-[#EAF1FF] to-[#D6E3FF] border-[#C8D6FF]",
  "from-[#FFF8E1] to-[#FDEFC7] border-[#F7E7B5]",
  "from-[#F1EAFF] to-[#E3D6FF] border-[#D9CBFF]",
  "from-[#FFF0F3] to-[#FFD9E2] border-[#FFC9D6]",
];

/* ── "What Makes Finquo Junior Different?" row ────────────────────────────── */
const differentiators = [
  { icon: <UserRound className="w-6 h-6" />, tile: "bg-[#3B6CFF]", title: "1-on-1 Mentorship", body: "Personalised guidance in every session." },
  { icon: <BookOpen className="w-6 h-6" />, tile: "bg-[#1CB5B5]", title: "Real-World Learning", body: "Practical, relatable and engaging." },
  { icon: <Users className="w-6 h-6" />, tile: "bg-[#F5A524]", title: "Built by Professionals", body: "Designed with finance and education professionals." },
  { icon: <BarChart3 className="w-6 h-6" />, tile: "bg-[#F26B2E]", title: "Continuous Evaluation", body: "Track progress and build consistently." },
  { icon: <Star className="w-6 h-6" />, tile: "bg-[#7C3AED]", title: "Skills That Compound", body: "Knowledge they'll use for life." },
  { icon: <Printer className="w-6 h-6" />, tile: "bg-[#7CB342]", title: "Printed Worksheets", body: "A worksheet and sticker pack for every session." },
];

/** Founder names and photos come from marketing (brief F4 row 6). The block appears once this list has entries. */
const FOUNDERS: { name: string; role: string; photo: string }[] = [];

const OFFICES = [
  { label: "India Office", address: "Tower 2, 2nd Floor, 2/1149/I 94, 95, 96, HiLITE Business Park, Guruvayurappan College Road, Olavanna, Kozhikode, Kerala - 673014", phone: CONTACT.phone, phoneHref: CONTACT.phoneHref },
  { label: "UAE Office", address: "World Trade Centre, Latifa Tower, Office No. 201, Sheikh Zayed Rd (opposite Museum of the Future), Dubai, United Arab Emirates", phone: CONTACT.uaePhone, phoneHref: CONTACT.uaePhoneHref },
];

export default function AboutUsPage() {
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());

  useEffect(() => {
    clearLegacyStorage();
    async function loadSectionsConfig() {
      try {
        const res = await fetch("/api/sections", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) setSections(json.data);
        }
      } catch {}
    }
    loadSectionsConfig();
    window.addEventListener("storage_sections_updated", loadSectionsConfig);
    return () => window.removeEventListener("storage_sections_updated", loadSectionsConfig);
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#F7F8FF] to-[#EEF0FF] font-sans overflow-x-hidden" style={{ color: NAVY }}>
      <Navbar />

      <main className="mx-auto w-full max-w-[1400px] px-3 sm:px-5 lg:px-6 pt-24 sm:pt-28 pb-14 space-y-5 sm:space-y-7">
        {/* ══ 1. Hero ═══════════════════════════════════════════════════════ */}
        {isEnabled("about_hero") && (
          <section className="relative px-2 pt-5 sm:px-4 sm:pt-8 pb-4 lg:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,1fr)] gap-10 lg:gap-8 items-center">
              <div className="pt-8 sm:pt-14 lg:pt-4 rise">
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#E8E4FF] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#5B2BE0]">About Us</span>

                <h1 className="mt-5 font-extrabold tracking-[-0.03em] leading-[1.05] text-[38px] sm:text-5xl lg:text-[60px] text-[#0F1035] text-balance">
                  <span className="relative inline-block">
                    Building <span className="text-[#5B2BE0]">money sense</span>
                    <Sparks className="hidden sm:block absolute -right-9 lg:-right-12 -top-1 h-7 w-6 lg:h-9 lg:w-8" />
                  </span>
                  <br />
                  before life demands it.
                </h1>

                <p className="mt-6 max-w-[560px] text-base sm:text-lg leading-relaxed text-gray-500">
                  <span className="font-bold text-[#0F1035]">Finquo Junior was founded with a single powerful vision:</span> to empower the next
                  generation with real-world skills, starting with financial literacy before they make their first financial decisions.
                </p>

                <p className="mt-4 max-w-[580px] text-base sm:text-lg leading-relaxed text-gray-500">
                  Finquo Junior was founded to give children financial literacy before they make their first financial decisions. Our 20-session,
                  1-on-1 programme is built by finance professionals and taught by dedicated mentors through practical, age-appropriate scenarios.
                </p>

                <p className="mt-7 inline-block rounded-xl bg-[#EEF0FF] px-4 py-2.5 lg:px-6 lg:py-3 text-sm sm:text-base font-bold text-[#4F46E5]">
                  Not just learning for school. Learning for life.
                </p>
              </div>

              <div className="rise-2">
                <Image
                  src="/about-hero-artwork.png"
                  alt="Finquo Junior student daydreaming beside a stack of books"
                  width={1024}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 620px, 92vw"
                  className="mx-auto h-auto w-full max-w-[430px] sm:max-w-[520px] lg:max-w-[620px] float"
                />
              </div>
            </div>
          </section>
        )}

        {/* ══ 2. Why Financial Literacy? ════════════════════════════════════ */}
        {isEnabled("about_whyFinancialLiteracy") && (
          <section className={`${PANEL} bg-white border border-[#E4E6F2]`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-center">
              <div className="lg:col-span-4">
                <h2 className={H2}>
                  Why <span className="text-[#3B6CFF]">Financial</span> Literacy?
                </h2>
                <p className={SUB}>A grounding, not a lecture.</p>
                <p className="mt-5 max-w-[430px] text-sm sm:text-[15px] leading-relaxed text-gray-500">
                  Children interact with money long before they earn it. Finquo Junior introduces financial thinking early through real-world
                  scenarios and practical learning.
                </p>
              </div>
              <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 list-none m-0 p-0">
                {whyPoints.map((point) => (
                  <li key={point.title} className="lift flex items-start gap-4 rounded-2xl bg-[#F7F8FF] border border-[#E4E6F2] p-5 hover:shadow-lg hover:shadow-indigo-900/10">
                    <span className={`w-12 h-12 rounded-xl ${point.tile} text-white flex items-center justify-center shrink-0`} aria-hidden="true">
                      {point.icon}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-extrabold text-[#0F1035] leading-snug">{point.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{point.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ══ 3. Our 20-Session Curriculum ══════════════════════════════════ */}
        {isEnabled("about_curriculum") && (
          <section className={`${PANEL} bg-[#EEF0FF]`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className={H2}>
                  Our 20-Session <span className="text-[#3B6CFF]">Curriculum</span>
                </h2>
                <p className={SUB}>Five money modules, one mentor.</p>
              </div>
              <div className="shrink-0 rounded-full bg-white px-4 py-2 lg:px-5 lg:py-2.5 shadow-sm ring-1 ring-indigo-100">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs lg:text-sm font-bold text-[#4F46E5]">
                  <span>20 Sessions</span>
                  <span className="text-[#C7CBE3]">|</span>
                  <span>1-on-1</span>
                  <span className="text-[#C7CBE3]">|</span>
                  <span>Real-World Money Skills</span>
                </div>
              </div>
            </div>

            <ul className="mt-8 lg:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 list-none m-0 p-0">
              {MODULES.map((m) => {
                const Icon = MODULE_ICONS[m.id - 1];
                return (
                  <li key={m.id} className={`lift relative overflow-hidden rounded-2xl border bg-gradient-to-br ${MODULE_TINTS[m.id - 1]} p-5 hover:shadow-lg hover:shadow-indigo-900/10`}>
                    <span className="absolute right-2 -bottom-3 text-[80px] font-black leading-none text-[#0F1035]/[0.06] select-none" aria-hidden="true">0{m.id}</span>
                    <p className="text-[11px] font-semibold text-[#1CB5B5]">
                      Sessions {m.range[0]}–{m.range[1]}
                    </p>
                    <h3 className="mt-1.5 flex items-center gap-2 text-base lg:text-[17px] font-extrabold leading-snug text-[#0F1035]">
                      <Icon className="w-5 h-5 shrink-0" strokeWidth={2} aria-hidden="true" />
                      {m.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-gray-600">{m.blurb}</p>
                  </li>
                );
              })}
            </ul>

            <p className="mt-6 text-sm sm:text-base text-gray-600">
              After the 20 sessions, every child gets {BONUS_SESSIONS} free 1-on-1 bonus sessions in {BONUS_SUBJECTS[0]}, {BONUS_SUBJECTS[1]} or{" "}
              {BONUS_SUBJECTS[2]}.
            </p>
          </section>
        )}

        {/* ══ 4. What Makes Finquo Junior Different? ════════════════════════ */}
        {isEnabled("about_different") && (
          <section className={`${PANEL} bg-white border border-[#E4E6F2]`}>
            <h2 className={H2}>
              What Makes Finquo Junior <span className="text-[#5B2BE0]">Different?</span>
            </h2>
            <p className={SUB}>More than a course. A complete learning experience.</p>
            <ul className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 list-none m-0 p-0">
              {differentiators.map((item) => (
                <li key={item.title} className="lift flex items-start gap-4 rounded-2xl bg-[#F7F8FF] border border-[#E4E6F2] p-5 hover:shadow-lg hover:shadow-indigo-900/10">
                  <span className={`w-12 h-12 rounded-xl ${item.tile} text-white flex items-center justify-center shrink-0`} aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-[#0F1035] leading-snug">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-relaxed">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ══ 5. People and company ═════════════════════════════════════════ */}
        {isEnabled("about_people") && (
          <section className={`${PANEL} bg-[#EEF0FF]`}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#5B2BE0]">Our mentors</p>
            <h2 className={`${H2} mt-2`}>The people behind Finquo Junior</h2>
            <span className="block mt-4 h-1 w-16 rounded-full bg-[#5B2BE0]" aria-hidden="true" />

            {FOUNDERS.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-5">
                {FOUNDERS.map((f) => (
                  <div key={f.name} className="text-center">
                    <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden bg-white">
                      <Image src={f.photo} alt={f.name} fill sizes="112px" className="object-cover" />
                    </div>
                    <p className="mt-3 font-extrabold text-[#0F1035]">{f.name}</p>
                    <p className="text-[13px] text-gray-500">{f.role}</p>
                  </div>
                ))}
              </div>
            )}

            <ul className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 list-none m-0 p-0">
              {MENTORS.map((m) => (
                <li key={m.slug}>
                  <Link href="/mentors" className="group lift block h-full rounded-xl border border-[#E4E6F2] bg-white overflow-hidden hover:shadow-lg hover:shadow-indigo-900/10">
                    <div className="relative w-full aspect-[4/5] bg-[#F3F4F8]">
                      <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-base lg:text-lg font-extrabold text-[#0F1035] leading-tight group-hover:text-[#4F46E5] transition-colors">{m.name}</p>
                      <p className="mt-3 pt-3 border-t border-[#E4E6F2] text-xs lg:text-sm text-gray-500 leading-snug">{m.role}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {OFFICES.map((o) => (
                <div key={o.label} className="flex items-start gap-4 rounded-2xl bg-white border border-[#E4E6F2] p-5">
                  <span className="w-11 h-11 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center shrink-0" aria-hidden="true">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="text-sm lg:text-[15px] text-gray-600">
                    <p className="font-extrabold text-[#0F1035]">{o.label}</p>
                    <p className="mt-1 leading-relaxed">{o.address}</p>
                    <a href={o.phoneHref} className="inline-flex items-center gap-2 min-h-[44px] font-bold text-[#4F46E5] hover:underline">
                      <Phone className="w-4 h-4" aria-hidden="true" /> {o.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Finquo Junior is a programme of <span className="font-bold text-[#0F1035]">{LEGAL_NAME}</span>.
            </p>
          </section>
        )}

        {/* ══ 6. Closing banner ════════════════════════════════════════════ */}
        {isEnabled("about_cta") && (
          <section className="overflow-hidden rounded-[26px] sm:rounded-[34px] bg-white border border-[#E4E6F2] px-6 pt-9 sm:px-10 sm:pt-11 lg:px-14 lg:pt-14">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-end">
              <div className="relative order-2 lg:order-1 -mx-6 sm:-mx-10 lg:-ml-14 lg:mr-0">
                <Image
                  src="/about-cta-artwork.png"
                  alt="Finquo Junior student resting on a stack of books labelled confidence, curiosity, kindness and opportunity"
                  width={1376}
                  height={768}
                  sizes="(min-width: 1024px) 660px, 100vw"
                  className="h-auto w-full"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-white via-white/70 to-transparent" />
              </div>

              <div className="order-1 lg:order-2 pb-2 lg:pb-16">
                <h2 className={H2}>
                  Let&rsquo;s raise a
                  <br />
                  <span className="text-[#5B2BE0]">financially confident generation.</span>
                </h2>
                <p className="mt-4 text-base sm:text-lg text-gray-500">Confident. Responsible. Curious. Money smart.</p>
                <div className="mt-7 lg:mt-9">
                  <BookDemoButton placement="about" size="lg" arrow />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {isEnabled("about_footer") && <Footer />}
    </div>
  );
}
