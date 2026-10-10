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
import { GlyphBook, GlyphChart, GlyphStar, GlyphUser, GlyphUsers } from "./components/glyphs";
import { Rocket, Printer, ShieldCheck, Globe, Scale, Store, MapPin } from "lucide-react";
/* Phosphor's duotone Coins reads better than Lucide's at this size. */
import { Coins } from "@phosphor-icons/react";

/* ── "Why Financial Literacy?" row ────────────────────────────────────────── */
const whyPoints = [
  { art: <Coins className="h-10 w-10 lg:h-12 lg:w-12 text-[#0A0F3C]" weight="duotone" />, title: "Real decisions", body: "Understand real trade-offs through everyday scenarios." },
  { art: <GlyphUsers className="h-10 w-10 lg:h-14 lg:w-14 text-[#0A0F3C]" />, title: "Built by professionals", body: "Designed with finance and education professionals." },
  { art: <GlyphUser className="h-10 w-10 lg:h-14 lg:w-14 text-[#0A0F3C]" />, title: "1-on-1 mentoring", body: "Every child has a dedicated mentor." },
  { art: <Rocket className="h-10 w-10 lg:h-12 lg:w-12 text-[#0A0F3C]" strokeWidth={1.7} />, title: "Practical & engaging", body: "Activities, challenges and real-world applications." },
];

/* ── The five modules ──────────────────────────────────────────────────────── */
const MODULE_ART = [
  { icon: <Coins className="h-[22px] w-[22px] lg:h-7 lg:w-7" weight="duotone" style={{ color: "#0F3B2C" }} />, card: "#E3F8EF", ink: "#0F3B2C", pill: "#B6EFD0", pillInk: "#1F6E48" },
  { icon: <ShieldCheck className="h-[22px] w-[22px] lg:h-7 lg:w-7" strokeWidth={1.9} style={{ color: "#131C74" }} />, card: "#E0F0FC", ink: "#131C74", pill: "#BFE0FB", pillInk: "#1E5BA8" },
  { icon: <Globe className="h-[22px] w-[22px] lg:h-7 lg:w-7" strokeWidth={1.9} style={{ color: "#1E2040" }} />, card: "#FDF6DE", ink: "#1E2040", pill: "#FAE3AC", pillInk: "#8A5A12" },
  { icon: <Scale className="h-[22px] w-[22px] lg:h-7 lg:w-7" strokeWidth={1.9} style={{ color: "#151066" }} />, card: "#F0EAFC", ink: "#151066", pill: "#D8CCFC", pillInk: "#4A35A8" },
  { icon: <Store className="h-[22px] w-[22px] lg:h-7 lg:w-7" strokeWidth={1.9} style={{ color: "#332C70" }} />, card: "#FDE7F0", ink: "#332C70", pill: "#FBB9CE", pillInk: "#A63B5F" },
];

/* ── "What Makes Finquo Junior Different?" row ────────────────────────────── */
const differentiators = [
  { glyph: <GlyphUser className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />, title: "1-on-1 Mentorship", body: "Personalised guidance in every session." },
  { glyph: <GlyphBook className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />, title: "Real-World Learning", body: "Practical, relatable and engaging." },
  { glyph: <GlyphUsers className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />, title: "Built by Professionals", body: "Designed with finance and education professionals." },
  { glyph: <GlyphChart className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />, title: "Continuous Evaluation", body: "Track progress and build consistently." },
  { glyph: <GlyphStar className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />, title: "Skills That Compound", body: "Knowledge they'll use for life." },
  { glyph: <Printer className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" strokeWidth={1.6} />, title: "Printed Worksheets", body: "A worksheet and sticker pack for every session." },
];

/** Founder names and photos come from marketing (brief F4 row 6). The block appears once this list has entries. */
const FOUNDERS: { name: string; role: string; photo: string }[] = [];

const OFFICES = [
  { label: "India Office", address: "Tower 2, 2nd Floor, 2/1149/I 94, 95, 96, HiLITE Business Park, Guruvayurappan College Road, Olavanna, Kozhikode, Kerala - 673014", phone: CONTACT.phone, phoneHref: CONTACT.phoneHref },
  { label: "UAE Office", address: "World Trade Centre, Latifa Tower, Office No. 201, Sheikh Zayed Rd (opposite Museum of the Future), Dubai, United Arab Emirates", phone: CONTACT.uaePhone, phoneHref: CONTACT.uaePhoneHref },
];

const PANEL = "rounded-[26px] sm:rounded-[34px] px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14";
const H2 = "font-extrabold tracking-[-0.03em] text-[25px] sm:text-[31px] lg:text-[35px] leading-[1.12] text-[#0A0F3C]";
const SUB = "mt-2.5 text-[17px] sm:text-[21px] lg:text-[26px] leading-snug";

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
    <div className="min-h-screen bg-white font-sans text-[#0A0F3C] overflow-x-hidden">
      <Navbar />

      <main className="mx-auto w-full max-w-[1400px] px-3 sm:px-5 lg:px-6 pt-24 sm:pt-28 pb-14 space-y-5 sm:space-y-7">
        {/* ══ 1. Hero ═══════════════════════════════════════════════════════ */}
        {isEnabled("about_hero") && (
          <section className="relative px-2 pt-5 sm:px-4 sm:pt-8 pb-4 lg:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,1fr)] gap-10 lg:gap-8 items-center">
              <div className="pt-8 sm:pt-14 lg:pt-4">
                <p className="text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.24em] text-[#5A6084]">About Us</p>

                <h1 className="mt-3 lg:mt-4 font-extrabold tracking-[-0.03em] leading-[1.08] text-[33px] sm:text-[42px] lg:text-[50px] text-[#0A0F3C]">
                  <span className="relative inline-block">
                    Building{" "}
                    <span className="relative inline-block rounded-[14px] lg:rounded-[18px] bg-[#D6D0FC] px-2.5 lg:px-4 pb-0.5">money sense</span>
                    <Sparks className="hidden sm:block absolute -right-9 lg:-right-12 -top-1 h-7 w-6 lg:h-9 lg:w-8" />
                  </span>
                  <br />
                  before life demands it.
                </h1>

                <p className="mt-5 lg:mt-7 max-w-[560px] text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.62] text-[#5E687C]">
                  <span className="font-bold text-[#2B3350]">Finquo Junior was founded with a single powerful vision:</span> to empower the next
                  generation with real-world skills, starting with financial literacy before they make their first financial decisions.
                </p>

                <p className="mt-4 lg:mt-5 max-w-[580px] text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.62] text-[#5E687C]">
                  Finquo Junior was founded to give children financial literacy before they make their first financial decisions. Our 20-session,
                  1-on-1 programme is built by finance professionals and taught by dedicated mentors through practical, age-appropriate scenarios.
                </p>

                <p className="mt-7 lg:mt-9 inline-block rounded-[14px] bg-[#EAE4FC] px-4 py-2.5 lg:px-6 lg:py-3 text-[13px] sm:text-[15px] lg:text-[17px] font-bold text-[#4F45B5]">
                  Not just learning for school. Learning for life.
                </p>
              </div>

              <Image
                src="/about-hero-artwork.png"
                alt="Finquo Junior student daydreaming beside a stack of books"
                width={1024}
                height={1024}
                priority
                sizes="(min-width: 1024px) 620px, 92vw"
                className="mx-auto h-auto w-full max-w-[430px] sm:max-w-[520px] lg:max-w-[620px]"
              />
            </div>
          </section>
        )}

        {/* ══ 2. Why Financial Literacy? ════════════════════════════════════ */}
        {isEnabled("about_whyFinancialLiteracy") && (
          <section className={`${PANEL} bg-[#FDF7E5]`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-center">
              <div className="lg:col-span-4">
                <h2 className={H2}>Why Financial Literacy?</h2>
                <p className={`${SUB} text-[#4E5568]`}>A grounding, not a lecture.</p>
                <p className="mt-5 lg:mt-7 max-w-[430px] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.65] text-[#7E8592]">
                  Children interact with money long before they earn it. Finquo Junior introduces financial thinking early through real-world
                  scenarios and practical learning.
                </p>
              </div>
              <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-[#F1E6CE]">
                {whyPoints.map((point) => (
                  <div key={point.title} className="flex flex-col items-center px-2 lg:px-3 text-center">
                    <div className="flex h-14 lg:h-[68px] items-end justify-center">{point.art}</div>
                    <h3 className="mt-3 text-[14px] sm:text-[15px] lg:text-[17px] font-extrabold text-[#1B1F3B]">{point.title}</h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] lg:text-[15px] leading-[1.5] text-[#878C99]">{point.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ 3. Our 20-Session Curriculum ══════════════════════════════════ */}
        {isEnabled("about_curriculum") && (
          <section className={`${PANEL} bg-[#F1F6FD]`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className={H2}>Our 20-Session Curriculum</h2>
                <p className={`${SUB} text-[#47576F]`}>Five money modules, one mentor.</p>
              </div>
              <div className="shrink-0 rounded-full bg-[#E3EDFB] px-4 py-2 lg:px-5 lg:py-2.5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] lg:text-[14px] text-[#7D93AC]">
                  <span>20 Sessions</span>
                  <span className="text-[#C3D3E8]">|</span>
                  <span>1-on-1</span>
                  <span className="text-[#C3D3E8]">|</span>
                  <span>Real-World Money Skills</span>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
              {MODULES.map((m, idx) => {
                const art = MODULE_ART[idx];
                return (
                  <div key={m.id} className="flex items-start gap-3 rounded-[18px] lg:rounded-[22px] px-5 py-6" style={{ backgroundColor: art.card }}>
                    <span className="inline-flex h-11 w-11 lg:h-14 lg:w-14 shrink-0 items-center justify-center rounded-[14px] lg:rounded-[18px]" style={{ backgroundColor: art.pill }} aria-hidden="true">
                      {art.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[15px] lg:text-[17px] font-extrabold leading-[1.25]" style={{ color: art.ink }}>
                        {m.id}. {m.name}
                      </h3>
                      <span className="mt-2 inline-block rounded-full px-3 py-1.5 text-[11.5px] lg:text-[13.5px] font-bold" style={{ backgroundColor: art.pill, color: art.pillInk }}>
                        Sessions {m.range[0]}–{m.range[1]}
                      </span>
                      <p className="mt-2.5 text-[12.5px] lg:text-[14px] leading-[1.45] text-[#6F7A90]">{m.blurb}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 text-[13px] sm:text-[14px] lg:text-[16px] text-[#47576F]">
              After the 20 sessions, every child gets {BONUS_SESSIONS} free 1-on-1 bonus sessions in {BONUS_SUBJECTS[0]}, {BONUS_SUBJECTS[1]} or{" "}
              {BONUS_SUBJECTS[2]}.
            </p>
          </section>
        )}

        {/* ══ 4. What Makes Finquo Junior Different? ════════════════════════ */}
        {isEnabled("about_different") && (
          <section className={`${PANEL} bg-[#FDF7EA]`}>
            <h2 className={H2}>What Makes Finquo Junior Different?</h2>
            <p className={`${SUB} text-[#6E7684]`}>More than a course. A complete learning experience.</p>
            <div className="mt-9 lg:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 lg:divide-x lg:divide-[#F1E6CE]">
              {differentiators.map((item) => (
                <div key={item.title} className="flex flex-col items-center px-2 lg:px-3 text-center">
                  <div className="flex h-10 lg:h-14 items-end justify-center">{item.glyph}</div>
                  <h3 className="mt-3 text-[14px] sm:text-[15px] lg:text-[17px] font-extrabold text-[#1B1F3B]">{item.title}</h3>
                  <p className="mt-1.5 text-[12px] sm:text-[13px] lg:text-[15px] leading-[1.5] text-[#8A8F9C]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ══ 5. People and company ═════════════════════════════════════════ */}
        {isEnabled("about_people") && (
          <section className={`${PANEL} bg-[#F4F3FB]`}>
            <h2 className={H2}>The people behind Finquo Junior</h2>

            {FOUNDERS.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-5">
                {FOUNDERS.map((f) => (
                  <div key={f.name} className="text-center">
                    <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden bg-white">
                      <Image src={f.photo} alt={f.name} fill sizes="112px" className="object-cover" />
                    </div>
                    <p className="mt-3 font-extrabold text-[#1B1F3B]">{f.name}</p>
                    <p className="text-[13px] text-[#6F7A90]">{f.role}</p>
                  </div>
                ))}
              </div>
            )}

            <h3 className="mt-8 text-[17px] lg:text-[21px] font-extrabold text-[#1B1F3B]">Our mentors</h3>
            <ul className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 list-none m-0 p-0">
              {MENTORS.map((m) => (
                <li key={m.slug}>
                  <Link href="/mentors" className="group block rounded-[18px] overflow-hidden bg-white border border-[#E4E1F5]">
                    <div className="relative w-full aspect-[3/4] bg-gray-100">
                      <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
                    </div>
                    <div className="p-3 sm:p-4">
                      <p className="text-[14px] lg:text-[16px] font-extrabold text-[#1B1F3B] leading-tight group-hover:text-[#4F46E5]">{m.name}</p>
                      <p className="mt-1 text-[12px] lg:text-[13px] text-[#6F7A90] leading-snug">{m.role}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {OFFICES.map((o) => (
                <div key={o.label} className="flex items-start gap-3 rounded-[18px] bg-white border border-[#E4E1F5] p-5">
                  <MapPin className="w-5 h-5 text-[#4F46E5] shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-[13px] lg:text-[15px] text-[#47576F]">
                    <p className="font-extrabold text-[#1B1F3B]">{o.label}</p>
                    <p className="mt-1 leading-relaxed">{o.address}</p>
                    <a href={o.phoneHref} className="inline-flex items-center min-h-[44px] font-bold text-[#4F46E5] hover:underline">{o.phone}</a>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] lg:text-[14px] text-[#6F7A90]">
              Finquo Junior is a programme of <span className="font-bold text-[#1B1F3B]">{LEGAL_NAME}</span>.
            </p>
          </section>
        )}

        {/* ══ 6. Closing banner ════════════════════════════════════════════ */}
        {isEnabled("about_cta") && (
          <section className="overflow-hidden rounded-[26px] sm:rounded-[34px] bg-[#F6F1FD] px-6 pt-9 sm:px-10 sm:pt-11 lg:px-14 lg:pt-14">
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
                <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[#F6F1FD] via-[#F6F1FD]/70 to-transparent" />
              </div>

              <div className="order-1 lg:order-2 pb-2 lg:pb-16">
                <h2 className="font-extrabold tracking-[-0.03em] text-[25px] sm:text-[31px] lg:text-[36px] leading-[1.16] text-[#0A0F3C]">
                  Let&rsquo;s raise a
                  <br />
                  <span className="mt-1.5 inline-block rounded-[12px] lg:rounded-[16px] bg-[#DED8FC] px-2.5 lg:px-3.5 pb-1 text-[#171A96]">financially confident generation.</span>
                </h2>
                <p className="mt-4 text-[14px] sm:text-[16px] lg:text-[19px] text-[#5E6880]">Confident. Responsible. Curious. Money smart.</p>
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
