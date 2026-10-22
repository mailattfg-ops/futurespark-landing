"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getDefaultSectionState, SectionState, clearLegacyStorage } from "@/lib/section-config";
import { CourseDetailsCard } from "@/app/home/components/course-details-card";
import { ModuleCards, RoadmapSummary } from "@/app/home/components/course-flow";
import { BonusSessionsSection } from "@/app/home/components/bonus-sessions";
import { GraduationSection } from "@/app/home/components/graduation";
import { PriceSection } from "@/app/home/components/price-section";
import { ParentReviewsSection } from "@/app/home/components/parent-reviews";
import { Award, Wallet, ShieldCheck, Percent, Target, ClipboardList, Store, Sparkles } from "lucide-react";

const masterItems = [
  { title: "Plan a budget and stick to it.", icon: <Wallet className="w-6 h-6" />, bg: "bg-[#FFF8E6] border-[#F7E7B5]", tile: "bg-[#F5A524]" },
  { title: "Use banks, UPI and cards safely, and spot a scam.", icon: <ShieldCheck className="w-6 h-6" />, bg: "bg-[#EEF3FF] border-[#C8D6FF]", tile: "bg-[#3B6CFF]" },
  { title: "Understand interest, loans, inflation, tax and insurance.", icon: <Percent className="w-6 h-6" />, bg: "bg-[#EEFBF3] border-[#BDE9D0]", tile: "bg-[#1CB5B5]" },
  { title: "Weigh a big purchase and set a money goal.", icon: <Target className="w-6 h-6" />, bg: "bg-[#FFF0F0] border-[#FFD1D1]", tile: "bg-[#F26B2E]" },
  { title: "Write a business plan and keep simple accounts.", icon: <ClipboardList className="w-6 h-6" />, bg: "bg-[#F4F0FF] border-[#DDD1FF]", tile: "bg-[#7C3AED]" },
  { title: "Build and present a small business in the capstone.", icon: <Store className="w-6 h-6" />, bg: "bg-[#F6FBE8] border-[#DDEBB5]", tile: "bg-[#7CB342]" },
  { title: "Finquo Junior completion certificate at graduation.", icon: <Award className="w-6 h-6" />, bg: "bg-[#4F46E5] border-[#4F46E5] text-white", tile: "bg-white/20", highlight: true },
];

const STATS = ["20 live sessions", "1 hour each", "1-on-1", "Grades 5 to 8", "5 bonus sessions"];
const H2 = "text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] tracking-[-0.03em] font-sans text-balance";

export default function CurriculumPage() {
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
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* 1. Banner with the programme card overlapping it */}
      {isEnabled("curriculum_hero") && (
        <div className="w-full bg-gradient-to-b from-white to-[#EEF0FF]">
          <section className="relative overflow-hidden mt-16 md:mt-20 h-[300px] sm:h-[380px] md:h-[440px] bg-[#7390FC]">
            <div className="absolute inset-0 select-none pointer-events-none overflow-hidden">
              <Image src="/curriculum-hero-coin.png" alt="A hand dropping a coin into a savings box" fill priority sizes="100vw" className="object-cover object-[center_62%]" />
            </div>
            <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#2B2F8F]/55 to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 top-0 pt-10 sm:pt-14 text-center px-4 rise">
              <span className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#5B2BE0] shadow-sm">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                Finquo Junior Curriculum
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] text-white drop-shadow-sm text-balance">
                Financial literacy for Grades 5 to 8
              </h1>
            </div>
          </section>
          <section id="course-details" className="relative z-20 w-full -mt-24 sm:-mt-32 md:-mt-36 pb-10 rise-2">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <CourseDetailsCard placement="curriculum" />
            </div>
          </section>
        </div>
      )}

      {/* 2. What Your Child Will Master */}
      {isEnabled("curriculum_master") && (
        <section className="w-full bg-gradient-to-b from-[#EEF0FF] to-white py-14 sm:py-20 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`${H2} text-center`}>
              What Your Child Will <span className="text-[#3B6CFF]">Master</span>
            </h2>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 list-none m-0 p-0">
              {masterItems.map((item) => (
                <li key={item.title} className={`lift p-4 sm:p-5 rounded-2xl border flex items-center gap-4 hover:shadow-lg hover:shadow-indigo-900/10 ${item.bg}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-white ${item.tile}`} aria-hidden="true">
                    {item.icon}
                  </div>
                  <span className={`text-sm sm:text-base font-extrabold leading-snug font-sans ${item.highlight ? "text-white" : "text-[#0F1035]"}`}>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 3. The 20-session syllabus, by module */}
      {isEnabled("curriculum_syllabus") && (
        <section className="w-full bg-gradient-to-b from-white to-[#EEF0FF] py-14 sm:py-20 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className={H2}>
                Our 20-Session <span className="text-[#3B6CFF]">Financial Literacy Programme</span>
              </h2>
              <p className="mt-3 text-base sm:text-lg text-gray-500 font-medium max-w-2xl mx-auto">Real rupees, real decisions, one mentor.</p>
            </div>

            <ModuleCards showHabits />

            <p className="mt-8 text-center text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
              Learning from the UAE or another GCC country? Your child follows the version of this curriculum made for your country.
            </p>

            <div className="mt-10 sm:mt-14">
              <RoadmapSummary placement="curriculum" />
            </div>
          </div>
        </section>
      )}

      {/* 4. Stats strip */}
      {isEnabled("curriculum_summaryBadges") && (
        <section className="w-full py-8 bg-[#EEF0FF] font-sans">
          <ul className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 list-none m-0">
            {STATS.map((s) => (
              <li key={s} className="px-4 py-2 rounded-full bg-white text-[#4F46E5] text-xs sm:text-sm font-extrabold shadow-sm ring-1 ring-indigo-100">{s}</li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Bonus, graduation, price */}
      {isEnabled("curriculum_bonus") && (
        <>
          <section className="w-full bg-white py-14 sm:py-20 font-sans">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
              <BonusSessionsSection embedded />
              <GraduationSection embedded />
            </div>
          </section>
          <PriceSection compact />
          <p className="max-w-3xl mx-auto px-4 sm:px-6 py-6 text-center text-xs sm:text-sm text-gray-500">
            Finquo Junior teaches money concepts for education. We do not give investment advice or sell financial products.
          </p>
        </>
      )}

      {/* 6. Reviews */}
      {isEnabled("curriculum_reviews") && <ParentReviewsSection />}

      {isEnabled("curriculum_footer") && <Footer />}
    </div>
  );
}
