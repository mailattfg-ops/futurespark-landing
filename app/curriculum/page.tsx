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

const ICON = "w-5 h-5 text-emerald-600";
const masterItems = [
  { title: "Plan a budget and stick to it.", icon: <Wallet className={ICON} /> },
  { title: "Use banks, UPI and cards safely, and spot a scam.", icon: <ShieldCheck className={ICON} /> },
  { title: "Understand interest, loans, inflation, tax and insurance.", icon: <Percent className={ICON} /> },
  { title: "Weigh a big purchase and set a money goal.", icon: <Target className={ICON} /> },
  { title: "Write a business plan and keep simple accounts.", icon: <ClipboardList className={ICON} /> },
  { title: "Build and present a small business in the capstone.", icon: <Store className={ICON} /> },
  { title: "Finquo Junior completion certificate at graduation.", icon: <Award className="w-5 h-5 text-[#4F46E5]" />, highlight: true },
];

const STATS = ["20 live sessions", "1 hour each", "1-on-1", "Grades 5 to 8", "5 bonus sessions"];

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
        <div className="w-full">
          <section className="bg-[#7390FC] relative overflow-hidden text-white mt-16 md:mt-20 h-[280px] sm:h-[360px] md:h-[400px]">
            <div className="absolute inset-0 select-none pointer-events-none overflow-hidden">
              <Image src="/curriculum-hero-coin.png" alt="A hand dropping a coin into a savings box" fill priority sizes="100vw" className="object-cover object-[center_62%]" />
            </div>
          </section>
          <section id="course-details" className="relative z-20 w-full -mt-28 sm:-mt-36 md:-mt-40 pb-4">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <CourseDetailsCard placement="curriculum" />
            </div>
          </section>
        </div>
      )}

      {/* 2. What Your Child Will Master */}
      {isEnabled("curriculum_master") && (
        <section className="w-full bg-white py-14 sm:py-20 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B4B] tracking-tight mb-8 sm:mb-10 font-sans">What Your Child Will Master</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 list-none m-0 p-0">
              {masterItems.map((item) => (
                <li
                  key={item.title}
                  className={`p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 ${item.highlight ? "bg-[#4F46E5] text-white" : "bg-[#F4FBF7] border border-[#D1F2E0] text-gray-900"}`}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white" aria-hidden="true">{item.icon}</div>
                  <span className={`text-sm sm:text-base font-extrabold leading-snug font-sans ${item.highlight ? "text-white" : "text-gray-900"}`}>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 3. The 20-session syllabus, by module */}
      {isEnabled("curriculum_syllabus") && (
        <section className="w-full bg-[#FAFAFA] py-14 sm:py-20 font-sans border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#4F46E5] text-xs font-bold tracking-wide uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                Finquo Junior Curriculum
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181B] tracking-tight font-sans text-balance">Our 20-Session Financial Literacy Programme</h2>
              <p className="mt-2.5 text-base sm:text-lg text-[#52525B] font-medium max-w-2xl mx-auto">Real rupees, real decisions, one mentor.</p>
            </div>

            <ModuleCards showHabits />

            <p className="mt-8 text-center text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
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
        <section className="w-full py-8 bg-white border-b border-gray-100 font-sans">
          <ul className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 list-none m-0">
            {STATS.map((s) => (
              <li key={s} className="px-4 py-2 rounded-xl bg-purple-50 text-[#4F46E5] text-xs sm:text-sm font-extrabold">{s}</li>
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
