"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoModal } from "@/app/home/components/book-demo-modal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { track } from "@/lib/meta";
import { getDefaultSectionState, SectionState, clearLegacyStorage } from "@/lib/section-config";
import { Sparks } from "./components/decor";
import { GlyphBook, GlyphChart, GlyphStar, GlyphUser, GlyphUsers } from "./components/glyphs";
import { CoinsIcon } from "./components/icons/coins";
import { BulbIcon } from "./components/icons/bulb";
import { CompassIcon } from "./components/icons/compass";
import { MicIcon } from "./components/icons/mic";
import { RobotIcon } from "./components/icons/robot";
import { ShieldIcon } from "./components/icons/shield";
import { PlantIcon } from "./components/icons/plant";
import { HeartIcon } from "./components/icons/heart";
import { RocketIcon } from "./components/icons/rocket";

/* ── "Why Financial Literacy?" row ────────────────────────────────────────── */
const whyPoints = [
  {
    art: <CoinsIcon className="h-12 w-12 lg:h-16 lg:w-16" />,
    title: "Real decisions",
    body: "Understand real trade-offs through everyday scenarios.",
  },
  {
    art: <GlyphUsers className="h-10 w-10 lg:h-14 lg:w-14 text-[#0A0F3C]" />,
    title: "Expert curated",
    body: "Designed with industry and academic experts including IIM & IIT.",
  },
  {
    art: <GlyphUser className="h-10 w-10 lg:h-14 lg:w-14 text-[#0A0F3C]" />,
    title: "1-on-1 mentoring",
    body: "Every child has a dedicated mentor.",
  },
  {
    art: <RocketIcon className="h-12 w-12 lg:h-16 lg:w-16" />,
    title: "Practical & engaging",
    body: "Activities, challenges and real-world applications.",
  },
];

/* ── The eight learning areas ─────────────────────────────────────────────── */
const learningAreas = [
  {
    art: <CoinsIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Financial Literacy",
    sessions: "18 Sessions",
    body: "Understand money. Make smarter choices.",
    card: "#E3F8EF",
    title_: "#0F3B2C",
    pill: "#B6EFD0",
    pillInk: "#1F6E48",
    body_: "#6F8A90",
  },
  {
    art: <BulbIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Entrepreneurship & Business Fundamentals",
    sessions: "4 Sessions",
    body: "Turn ideas into impact.",
    card: "#FDF6DE",
    title_: "#1E2040",
    pill: "#FAE3AC",
    pillInk: "#8A5A12",
    body_: "#8A8472",
  },
  {
    art: <CompassIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Career Awareness & Future Planning",
    sessions: "2 Sessions",
    body: "Explore. Discover. Plan.",
    card: "#F0EAFC",
    title_: "#151066",
    pill: "#D8CCFC",
    pillInk: "#4A35A8",
    body_: "#7C7A93",
  },
  {
    art: <MicIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Public Speaking & Presentation Skills",
    sessions: "6 Sessions",
    body: "Find your voice. Share your ideas.",
    card: "#E0F0FC",
    title_: "#131C74",
    pill: "#BFE0FB",
    pillInk: "#1E5BA8",
    body_: "#6E8299",
  },
  {
    art: <RobotIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "AI Literacy & Emerging Technology",
    sessions: "4 Sessions",
    body: "Understand today. Build tomorrow.",
    card: "#EFEAFC",
    title_: "#1A1A75",
    pill: "#D8CCFC",
    pillInk: "#4A35A8",
    body_: "#7C7A93",
  },
  {
    art: <ShieldIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Cybersecurity & Digital Safety",
    sessions: "2 Sessions",
    body: "Be smart. Be safe. Be responsible.",
    card: "#E4F0FC",
    title_: "#2B3392",
    pill: "#AFD9FB",
    pillInk: "#1E5BA8",
    body_: "#6E8299",
  },
  {
    art: <PlantIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Sustainability & Environmental Awareness",
    sessions: "2 Sessions",
    body: "A cleaner planet. A brighter future.",
    card: "#EAFCE4",
    title_: "#17362E",
    pill: "#C6F0B8",
    pillInk: "#2C6B2F",
    body_: "#6E8C7A",
  },
  {
    art: <HeartIcon className="h-14 w-14 lg:h-[76px] lg:w-[76px]" />,
    title: "Fitness, Health & Well-being",
    sessions: "2 Sessions",
    body: "A healthy mind. A brighter you.",
    card: "#FDE7F0",
    title_: "#332C70",
    pill: "#FBB9CE",
    pillInk: "#A63B5F",
    body_: "#8A7E8C",
  },
];

/* ── "What Makes Finquo Junior Different?" row ────────────────────────────── */
const differentiators = [
  {
    glyph: <GlyphUser className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />,
    title: "1-on-1 Mentorship",
    body: ["Personalised guidance", "in every session."],
  },
  {
    glyph: <GlyphBook className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />,
    title: "Real-World Learning",
    body: ["Practical, relatable", "and engaging."],
  },
  {
    glyph: <GlyphUsers className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />,
    title: "Expert-Curated Curriculum",
    body: ["Backed by industry", "and academic experts."],
  },
  {
    glyph: <GlyphChart className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />,
    title: "Continuous Evaluation",
    body: ["Track progress and", "build consistently."],
  },
  {
    glyph: <GlyphStar className="h-8 w-8 lg:h-12 lg:w-12 text-[#0A0F3C]" />,
    title: "Skills That Compound",
    body: ["Knowledge they’ll use", "for life."],
  },
];

export default function AboutUsPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());

  const handleOpenDemoModal = () => {
    track("InitiateCheckout");
    setIsDemoModalOpen(true);
  };

  useEffect(() => {
    clearLegacyStorage();

    async function loadSectionsConfig() {
      try {
        const res = await fetch("/api/sections", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setSections(json.data);
          }
        }
      } catch { }
    }
    loadSectionsConfig();

    const handleUpdate = () => loadSectionsConfig();
    window.addEventListener("storage_sections_updated", handleUpdate);
    const handleOpenModalEvent = () => handleOpenDemoModal();
    window.addEventListener("open_demo_modal", handleOpenModalEvent);
    return () => {
      window.removeEventListener("storage_sections_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener("open_demo_modal", handleOpenModalEvent);
    };
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  return (
    <div className="min-h-screen bg-white font-sans text-[#0A0F3C] overflow-x-hidden">
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      <main className="mx-auto w-full max-w-[1400px] px-3 sm:px-5 lg:px-6 pt-24 sm:pt-28 pb-14 space-y-5 sm:space-y-7">
        {/* ══ 1. Hero ═══════════════════════════════════════════════════════ */}
        {isEnabled("about_hero") && (
          <section className="relative px-2 pt-5 sm:px-4 sm:pt-8 pb-4 lg:pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.14fr)_minmax(0,1fr)] gap-10 lg:gap-8 items-center">
              {/* ── Left: the words ── */}
              <ScrollReveal variant="fade-up" duration={650} className="pt-8 sm:pt-14 lg:pt-4">
                <p className="text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.24em] text-[#5A6084]">
                  About Us
                </p>

                <h1 className="mt-3 lg:mt-4 font-extrabold tracking-[-0.03em] leading-[1.08] text-[33px] sm:text-[42px] lg:text-[50px] text-[#0A0F3C]">
                  <span className="relative inline-block">
                    Building{" "}
                    <span className="relative inline-block rounded-[14px] lg:rounded-[18px] bg-[#D6D0FC] px-2.5 lg:px-4 pb-0.5">
                      life skills
                    </span>
                    <Sparks className="hidden sm:block absolute -right-9 lg:-right-12 -top-1 h-7 w-6 lg:h-9 lg:w-8" />
                  </span>
                  <br />
                  before life demands them.
                </h1>

                <p className="mt-5 lg:mt-7 max-w-[560px] text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.62] text-[#5E687C]">
                  <span className="font-bold text-[#2B3350]">
                    Finquo Junior was founded with a single powerful vision:
                  </span>{" "}
                  to empower the next generation with real-world skills, starting with financial
                  literacy before they make their first financial decisions.
                </p>

                <p className="mt-4 lg:mt-5 max-w-[580px] text-[14px] sm:text-[15px] lg:text-[17px] leading-[1.62] text-[#5E687C]">
                  Our 40-session, 1-on-1 learning program is curated by industry and academic
                  experts, and delivered by dedicated mentors through practical, age-appropriate
                  scenarios. We don&rsquo;t just teach concepts — we help children build confidence,
                  make smarter decisions, and develop the skills they need to thrive in an evolving
                  world.
                </p>

                <p className="mt-7 lg:mt-9 inline-block rounded-[14px] bg-[#EAE4FC] px-4 py-2.5 lg:px-6 lg:py-3 text-[13px] sm:text-[15px] lg:text-[17px] font-bold text-[#4F45B5]">
                  Not just learning for school. Learning for life.
                </p>
              </ScrollReveal>

              {/* ── Right: the hero artwork ── */}
              <ScrollReveal variant="fade-left" duration={750} delay={120}>
                <Image
                  src="/about-hero-artwork.png"
                  alt="Finquo Junior student daydreaming beside a stack of books on money, ideas, technology, people, planet and health"
                  width={1024}
                  height={1024}
                  priority
                  sizes="(min-width: 1024px) 620px, 92vw"
                  className="mx-auto h-auto w-full max-w-[430px] sm:max-w-[520px] lg:max-w-[620px]"
                />
              </ScrollReveal>
            </div>
          </section>
        )}

        {/* ══ 2. Why Financial Literacy? ════════════════════════════════════ */}
        {isEnabled("about_whyFinancialLiteracy") && (
          <ScrollReveal variant="fade-up" duration={650}>
            <section className="rounded-[26px] sm:rounded-[34px] bg-[#FDF7E5] px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-10 items-center">
                {/* Heading block */}
                <div className="lg:col-span-4">
                  <h2 className="font-extrabold tracking-[-0.03em] text-[25px] sm:text-[31px] lg:text-[35px] leading-[1.12] text-[#0A0F3C]">
                    Why Financial Literacy?
                  </h2>
                  <p className="mt-2.5 text-[17px] sm:text-[21px] lg:text-[26px] leading-snug text-[#4E5568]">
                    A grounding, not a lecture.
                  </p>
                  <p className="mt-5 lg:mt-7 max-w-[430px] text-[13px] sm:text-[14px] lg:text-[16px] leading-[1.65] text-[#7E8592]">
                    Children interact with money long before they earn it. Finquo Junior introduces
                    financial thinking early through real-world scenarios and practical learning.
                  </p>
                </div>

                {/* Four points, divided like the poster */}
                <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-y-10 lg:divide-x lg:divide-[#F1E6CE]">
                  {whyPoints.map((point) => (
                    <div
                      key={point.title}
                      className="flex flex-col items-center px-2 lg:px-3 text-center"
                    >
                      <div className="flex h-14 lg:h-[68px] items-end justify-center">{point.art}</div>
                      <h3 className="mt-3 text-[14px] sm:text-[15px] lg:text-[17px] font-extrabold text-[#1B1F3B]">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-[12px] sm:text-[13px] lg:text-[15px] leading-[1.5] text-[#878C99]">
                        {point.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ 3. Our 40-Session Curriculum ══════════════════════════════════ */}
        {isEnabled("about_curriculum") && (
          <ScrollReveal variant="fade-up" duration={650}>
            <section className="rounded-[26px] sm:rounded-[34px] bg-[#F1F6FD] px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-extrabold tracking-[-0.03em] text-[25px] sm:text-[31px] lg:text-[35px] leading-[1.12] text-[#0A0F3C]">
                    Our 40-Session Curriculum
                  </h2>
                  <p className="mt-2.5 text-[17px] sm:text-[21px] lg:text-[26px] leading-snug text-[#47576F]">
                    Eight essential learning areas for a brighter future.
                  </p>
                </div>

                {/* Programme facts */}
                <div className="shrink-0 rounded-full bg-[#E3EDFB] px-4 py-2 lg:px-5 lg:py-2.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] lg:text-[14px] text-[#7D93AC]">
                    <span>40 Sessions</span>
                    <span className="text-[#C3D3E8]">|</span>
                    <span>8 Learning Areas</span>
                    <span className="text-[#C3D3E8]">|</span>
                    <span>Real-World Skills</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                {learningAreas.map((area) => (
                  <div
                    key={area.title}
                    className="flex items-start gap-3 rounded-[18px] lg:rounded-[22px] px-5 py-6 lg:px-5 lg:py-7"
                    style={{ backgroundColor: area.card }}
                  >
                    <div className="shrink-0 pt-0.5">{area.art}</div>
                    <div className="min-w-0">
                      <h3
                        className="text-[15px] lg:text-[17px] font-extrabold leading-[1.25]"
                        style={{ color: area.title_ }}
                      >
                        {area.title}
                      </h3>
                      <span
                        className="mt-2 inline-block rounded-full px-3 py-1.5 text-[11.5px] lg:text-[13.5px] font-bold"
                        style={{ backgroundColor: area.pill, color: area.pillInk }}
                      >
                        {area.sessions}
                      </span>
                      <p
                        className="mt-2.5 text-[12.5px] lg:text-[14px] leading-[1.45]"
                        style={{ color: area.body_ }}
                      >
                        {area.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ 4. What Makes Finquo Junior Different? ════════════════════════ */}
        {isEnabled("about_different") && (
          <ScrollReveal variant="fade-up" duration={650}>
            <section className="rounded-[26px] sm:rounded-[34px] bg-[#FDF7EA] px-6 py-9 sm:px-10 sm:py-11 lg:px-14 lg:py-14">
              <h2 className="font-extrabold tracking-[-0.03em] text-[25px] sm:text-[31px] lg:text-[35px] leading-[1.12] text-[#0A0F3C]">
                What Makes Finquo Junior Different?
              </h2>
              <p className="mt-2.5 text-[17px] sm:text-[21px] lg:text-[26px] leading-snug text-[#6E7684]">
                More than a course. A complete learning experience.
              </p>

              <div className="mt-9 lg:mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 lg:divide-x lg:divide-[#F1E6CE]">
                {differentiators.map((item) => (
                  <div
                    key={item.title}
                    className="flex flex-col items-center px-2 lg:px-3 text-center"
                  >
                    <div className="flex h-10 lg:h-14 items-end justify-center">{item.glyph}</div>
                    <h3 className="mt-3 text-[14px] sm:text-[15px] lg:text-[17px] font-extrabold text-[#1B1F3B]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] sm:text-[13px] lg:text-[15px] leading-[1.5] text-[#8A8F9C]">
                      {item.body[0]}
                      <br className="hidden lg:inline" />{" "}
                      {item.body[1]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ 5. Closing banner ════════════════════════════════════════════ */}
        {isEnabled("about_cta") && (
          <ScrollReveal variant="fade-up" duration={700}>
            <section className="overflow-hidden rounded-[26px] sm:rounded-[34px] bg-[#F6F1FD] px-6 pt-9 sm:px-10 sm:pt-11 lg:px-14 lg:pt-14">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-12 items-end">
                {/* Artwork, bled into the bottom-left corner of the panel */}
                <div className="relative order-2 lg:order-1 -mx-6 sm:-mx-10 lg:-ml-14 lg:mr-0">
                  <Image
                    src="/about-cta-artwork.png"
                    alt="Finquo Junior student resting on a stack of books labelled confidence, curiosity, kindness and opportunity"
                    width={1376}
                    height={768}
                    sizes="(min-width: 1024px) 660px, 100vw"
                    className="h-auto w-full"
                  />
                  {/* The desk in the artwork ends square — feather it back into the panel */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[#F6F1FD] via-[#F6F1FD]/70 to-transparent"
                  />
                </div>

                {/* Invitation */}
                <div className="order-1 lg:order-2 pb-2 lg:pb-16">
                  <h2 className="font-extrabold tracking-[-0.03em] text-[25px] sm:text-[31px] lg:text-[36px] leading-[1.16] text-[#0A0F3C]">
                    Let&rsquo;s raise a generation of
                    <br />
                    <span className="mt-1.5 inline-block rounded-[12px] lg:rounded-[16px] bg-[#DED8FC] px-2.5 lg:px-3.5 pb-1 text-[#171A96]">
                      global citizens.
                    </span>
                  </h2>
                  <p className="mt-4 text-[14px] sm:text-[16px] lg:text-[19px] text-[#5E6880]">
                    Confident. Responsible. Curious. Financially intelligent.
                  </p>

                  <Link
                    href="/pilot"
                    className="mt-7 lg:mt-9 inline-flex items-center gap-3 rounded-full bg-[#F9A825] px-6 py-3.5 lg:px-8 lg:py-4 text-[15px] lg:text-[19px] font-bold text-[#1F2140] shadow-[0_6px_16px_rgba(249,168,37,0.35)] transition-all hover:bg-[#EE9A13] hover:shadow-[0_8px_20px_rgba(249,168,37,0.45)]"
                  >
                    Join the Free Pilot Program
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="h-4 w-4 lg:h-5 lg:w-5"
                    >
                      <path
                        d="M4 12h15m0 0-5.5-5.5M19 12l-5.5 5.5"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}
      </main>

      {isEnabled("about_footer") && <Footer onOpenDemoModal={handleOpenDemoModal} />}

      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
