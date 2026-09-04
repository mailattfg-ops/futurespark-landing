"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoModal } from "@/app/home/components/book-demo-modal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { track } from "@/lib/meta";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";
import { DEFAULT_WEEKLY_PLANS, CurriculumPlanItem } from "@/lib/curriculum-plans-config";
import { PlanIcon } from "@/components/curriculum-plan-icon";
import {
  BookOpen,
  Award,
  Briefcase,
  Calendar,
  Star,
  ChevronDown,
  BarChart2,
  TrendingUp,
  CreditCard,
  Building2,
  PieChart,
  ShieldCheck,
  Coins,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  UserCheck,
  FolderCheck,
  PackageCheck,
  Wallet,
} from "lucide-react";
import Link from "next/link";

interface MasterItem {
  title: string;
  icon: ReactNode;
  isHighlight?: boolean;
}

const masterItems: MasterItem[] = [
  {
    title: "Think like an entrepreneur and build a business mind set",
    icon: <Building2 className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: "Budget wisely, understand taxes and manage money smarty",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: "Master saving, compounding and smart financial decisions",
    icon: <Coins className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: "Evaluate loans, EMIs and investments",
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: "Navigate market cycles, behavioural biases and risk",
    icon: <PieChart className="w-5 h-5 text-emerald-600" />,
  },
  {
    title: "Acclaimed Certification included upon completion",
    icon: <Award className="w-5 h-5 text-emerald-600" />,
    isHighlight: true,
  },
];

interface ReviewItem {
  name: string;
  role: string;
  company: string;
  avatar: string;
  comment: string;
}

const reviews: ReviewItem[] = [
  {
    name: "Leah Andrews",
    role: "CEO",
    company: "Inspihire",
    avatar: "/review-avatar-1.png",
    comment:
      "Whether you're a beginner or an expert, Finquo Junior provides excellent resources to help your child achieve financial mastery.",
  },
  {
    name: "Raj Patel",
    role: "COO",
    company: "GrowthHacks",
    avatar: "/avatar-man-gray.png",
    comment:
      "Streamlining processes and boosting financial confidence early is key to scaling a child's business mindset effectively.",
  },
  {
    name: "Michael Thomson",
    role: "CTO",
    company: "Innovatech",
    avatar: "/avatar-woman-pink.png",
    comment:
      "Innovation drives success. Finquo Junior transforms complex economic concepts into clear, engaging, real-world habits.",
  },
];

const features = [
  { icon: <BookOpen className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "40 interactive sessions" },
  { icon: <UserCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "a year long mentorship program" },
  { icon: <FolderCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "1 capstone project" },
  { icon: <PackageCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "quarterly mailed physical worksheets" },
];

export default function CurriculumPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [visibleWeeksCount, setVisibleWeeksCount] = useState(4);
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());
  const [weeklyPlans, setWeeklyPlans] = useState<CurriculumPlanItem[]>(DEFAULT_WEEKLY_PLANS);

  useEffect(() => {
    async function loadSectionsConfig() {
      try {
        const cached = localStorage.getItem("landing_sections_config");
        if (cached) {
          setSections(JSON.parse(cached));
        }
        const res = await fetch("/api/sections");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setSections(json.data);
            localStorage.setItem("landing_sections_config", JSON.stringify(json.data));
          }
        }
      } catch {}
    }
    loadSectionsConfig();

    const handleUpdate = () => {
      const cached = localStorage.getItem("landing_sections_config");
      if (cached) setSections(JSON.parse(cached));
    };
    window.addEventListener("storage_sections_updated", handleUpdate);
    return () => window.removeEventListener("storage_sections_updated", handleUpdate);
  }, []);

  useEffect(() => {
    async function loadWeeklyPlans() {
      try {
        const cached = localStorage.getItem("landing_curriculum_plans");
        if (cached) {
          setWeeklyPlans(JSON.parse(cached));
        }
        const res = await fetch("/api/curriculum-plans");
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            setWeeklyPlans(json.data);
            localStorage.setItem("landing_curriculum_plans", JSON.stringify(json.data));
          }
        }
      } catch {}
    }
    loadWeeklyPlans();

    const handlePlansUpdate = () => {
      const cached = localStorage.getItem("landing_curriculum_plans");
      if (cached) setWeeklyPlans(JSON.parse(cached));
    };
    window.addEventListener("storage_curriculum_plans_updated", handlePlansUpdate);
    return () => window.removeEventListener("storage_curriculum_plans_updated", handlePlansUpdate);
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  // Timeline Scroll Animation State
  const timelineRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start progress when timeline top reaches 65% of viewport
      const startOffset = windowHeight * 0.65;
      const distanceFromStart = startOffset - rect.top;
      const totalDist = rect.height;

      if (distanceFromStart > 0) {
        const rawPercent = Math.min(100, Math.max(0, (distanceFromStart / totalDist) * 100));
        setScrollProgress(rawPercent);

        const count = Math.min(visibleWeeksCount, weeklyPlans.length);
        const activeIdx = Math.min(count - 1, Math.floor((rawPercent / 100) * count));
        setActiveItemIndex(activeIdx);
      } else {
        setScrollProgress(0);
        setActiveItemIndex(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleWeeksCount]);

  const handleOpenDemoModal = () => {
    track("InitiateCheckout");
    setIsDemoModalOpen(true);
  };

  const handleToggleWeeks = () => {
    if (visibleWeeksCount < weeklyPlans.length) {
      setVisibleWeeksCount(weeklyPlans.length);
    } else {
      setVisibleWeeksCount(4);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* 1. Shared Navigation Header */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* 2. Hero Vector Banner & Main Floating Card Container */}
      {isEnabled("curriculum_hero") && (
        <div className="relative w-full pb-[520px] sm:pb-[420px] md:pb-[380px]">
          <section className="bg-[#5B6EF6] relative overflow-hidden text-white pt-20 sm:pt-24 pb-32 sm:pb-44 mt-20 h-[240px] sm:h-[340px] md:h-[400px]">
            {/* Background Piggybank Coin Vector Image (100% Opacity) */}
            <div className="absolute inset-x-0 top-0 h-[240px] sm:h-[340px] md:h-[400px] select-none pointer-events-none overflow-hidden">
              <Image
                src="/curriculum-hero.jpg"
                alt="Curriculum piggybank vector graphic"
                fill
                priority
                sizes="100vw"
                className="object-cover object-top opacity-100"
              />
            </div>
          </section>

          {/* Main Floating Card Overlapping Hero Banner with position absolute */}
          <section id="course-details" className="absolute inset-x-0 top-36 sm:top-52 md:top-80 z-20 w-full py-0">
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollReveal variant="zoom-in" duration={700} delay={150} className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
                  {/* Left Column: Course Graphic & Price Info */}
                  <div className="flex flex-col justify-between h-full space-y-4">
                    {/* Graphic Thumbnail */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F5EE] border border-[#E9DAC6] shadow-xs">
                      <Image
                        src="/course-thumbnail.jpg"
                        alt="Financial literacy Foundations of Wealth"
                        fill
                        priority
                        quality={100}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>

                    {/* Title & Info Row Under Image */}
                    <div className="pt-1 flex flex-col sm:flex-row items-start justify-between gap-3 border-t border-gray-100">
                      <div className="space-y-1">
                        <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 font-sans tracking-tight">
                          Foundations of Wealth
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-500 font-normal leading-relaxed">
                          Inclusive of quarterly physical worksheets &amp; mentorship
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: 4 Feature Points List */}
                  <div className="flex flex-col justify-center space-y-3.5 sm:space-y-4 h-full">
                    {features.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 bg-[#FAFAFA] p-3.5 sm:p-4 rounded-2xl border border-gray-100 transition-all hover:border-indigo-100 hover:bg-white hover:shadow-xs"
                      >
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 text-[#5B45F5]">
                          {item.icon}
                        </div>
                        <span className="text-xs sm:text-[14px] font-bold text-gray-800 font-sans">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Full-Width CTA Button */}
                <div className="mt-8 pt-2">
                  <Link
                    href="#book-demo"
                    onClick={(e) => {
                      e.preventDefault();
                      track("InitiateCheckout");
                      const el = document.getElementById("book-demo") || document.getElementById("book-class");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.hash = "book-demo";
                      }
                    }}
                    className="w-full inline-flex items-center justify-center py-4 px-6 rounded-xl bg-[#5B45F5] hover:bg-[#4E39E0] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all text-center cursor-pointer active:scale-98"
                  >
                    Confirm your seat
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </div>
      )}

      {/* 3. What Your Child Will Master Section */}
      {isEnabled("curriculum_master") && (
        <section className="w-full bg-white py-14 sm:py-20 font-sans">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up" duration={600}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1B4B] tracking-tight mb-8 sm:mb-10 text-left font-sans">
                What Your Child Will Master
              </h2>
            </ScrollReveal>

            {/* 6 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {masterItems.map((item, idx) => (
                <ScrollReveal
                  key={idx}
                  variant="fade-up"
                  duration={550}
                  delay={idx * 80}
                >
                  <div
                    className={`p-4 sm:p-5 rounded-2xl flex items-center gap-3.5 transition-all duration-200 ${item.isHighlight
                      ? "bg-[#8B5CF6] text-white shadow-md border border-[#7C3AED]"
                      : "bg-[#F4FBF7] border border-[#D1F2E0] text-gray-900 hover:border-[#A3E6C3] hover:shadow-xs"
                      }`}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-white shadow-xs"
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-sm sm:text-base font-extrabold leading-snug font-sans ${item.isHighlight ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {item.title}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Weekly Course Plan Timeline Section */}
      {isEnabled("curriculum_weeklyPlan") && (
        <section className="w-full bg-white py-14 sm:py-20 border-y border-gray-100 font-sans">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Top Wide Purple Header Banner matching Image 2 */}
            <ScrollReveal variant="fade-up" duration={600} className="mb-10">
              <div className="w-full bg-[#8B5CF6] rounded-[24px] px-8 py-5 shadow-xs">
                <h3 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight font-sans">
                  Weekly Course Plan
                </h3>
              </div>
            </ScrollReveal>

            {/* Timeline List Container */}
            <div ref={timelineRef} className="relative max-w-4xl mx-auto">
              {/* Background Muted Track Line */}
              <div className="absolute top-[12px] bottom-[12px] left-[96px] sm:left-[116px] w-[1.5px] bg-[#E5E7EB] pointer-events-none z-0" />

              {/* Active Emerald Progress Fill Line Growing Smoothly on Scroll */}
              <div
                className="absolute top-[12px] left-[96px] sm:left-[116px] w-[1.5px] bg-[#10B981] pointer-events-none z-[1] transition-[height] duration-500 ease-out"
                style={{
                  height: `calc(${scrollProgress}% - 12px)`,
                  maxHeight: "calc(100% - 24px)",
                }}
              />

              <div className="space-y-4 relative z-10">
                {weeklyPlans.slice(0, visibleWeeksCount).map((plan, idx) => {
                  const stepThreshold = (idx / (visibleWeeksCount - 1 || 1)) * 100;
                  const isActive = scrollProgress >= stepThreshold - 5;

                  return (
                    <ScrollReveal
                      key={idx}
                      variant="fade-up"
                      duration={500}
                      delay={idx * 60}
                    >
                      <div className="flex items-center gap-4 sm:gap-6 relative">
                        {/* Left Column: Week Label + Green Dot with Halo Ring on Line */}
                        <div className="w-[105px] sm:w-[125px] flex-shrink-0 flex items-center justify-end gap-2.5 pr-1 relative z-10">
                          <span className="text-base sm:text-lg font-bold text-[#C4B5FD] font-sans tracking-tight">
                            {plan.week}
                          </span>
                          {/* Green Dot with Soft Ring Halo */}
                          <span
                            className={`w-2.5 h-2.5 rounded-full bg-[#10B981] ring-4 ring-[#DCFCE7] flex-shrink-0 z-10 transition-transform duration-300 ${
                              isActive ? "scale-110" : "scale-100"
                            }`}
                          />
                        </div>

                        {/* Right Card matching Image 2 */}
                        <div className="flex-1 bg-white border border-[#8B5CF6] rounded-[20px] p-4 sm:p-5 flex items-center gap-4 hover:shadow-md transition-all">
                          {/* Solid Filled Purple Circle Icon Badge */}
                          <div className="w-12 h-12 rounded-full bg-[#8B5CF6] flex items-center justify-center flex-shrink-0 text-white shadow-xs">
                            <PlanIcon name={plan.icon} className="w-5 h-5 text-white stroke-[2.2]" />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className="text-base sm:text-lg font-extrabold text-[#18181B] font-sans leading-snug">
                              {plan.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-[#71717A] font-medium leading-relaxed">
                              {plan.subtitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            {/* Load More Pill Button matching Image 2 */}
            <div className="mt-10 text-center">
              <button
                type="button"
                onClick={handleToggleWeeks}
                className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-[#F4F4F5] hover:bg-[#E4E4E7] text-[#18181B] text-xs sm:text-sm font-extrabold transition-all cursor-pointer"
              >
                <span>
                  {visibleWeeksCount < weeklyPlans.length ? "Load More" : "Show Less"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    visibleWeeksCount >= weeklyPlans.length ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 5. Summary Pill Badges Row */}
      {isEnabled("curriculum_summaryBadges") && (
        <section className="w-full py-8 bg-white border-b border-gray-100 font-sans">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="px-4 py-2 rounded-xl bg-purple-50 text-[#8B5CF6] text-xs sm:text-sm font-extrabold">
                48 Interactive Modules
              </span>
              <span className="px-4 py-2 rounded-xl bg-purple-50 text-[#8B5CF6] text-xs sm:text-sm font-extrabold">
                Capstone Business Project
              </span>
              <span className="px-4 py-2 rounded-xl bg-purple-50 text-[#8B5CF6] text-xs sm:text-sm font-extrabold">
                52-Week Structured Program
              </span>
              <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 text-xs sm:text-sm font-extrabold flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                4.5 Ratings
              </span>
              <span className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-extrabold">
                Grades 5 to 12
              </span>
            </div>
          </div>
        </section>
      )}

      {/* 6. What parents and kids say Section */}
      {isEnabled("curriculum_reviews") && (
        <section className="w-full bg-white py-14 sm:py-20 font-sans">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <ScrollReveal variant="fade-up" duration={600}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-14 font-sans">
                What parents and kids say
              </h2>
            </ScrollReveal>

            {/* 3 Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {reviews.map((rev, idx) => (
                <ScrollReveal
                  key={idx}
                  variant="fade-up"
                  duration={600}
                  delay={idx * 100}
                >
                  <div className="bg-[#FAF9FF] border border-indigo-100/80 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between h-full space-y-6">
                    {/* Top User Profile */}
                    <div className="flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-indigo-200 flex-shrink-0">
                        <Image
                          src={rev.avatar}
                          alt={rev.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-gray-900 font-sans leading-tight">
                          {rev.name}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium">
                          {rev.role}, {rev.company}
                        </p>
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Shared Navigation Footer */}
      {isEnabled("curriculum_footer") && <Footer />}

      {/* 8. Booking Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
