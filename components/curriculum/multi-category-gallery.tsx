"use client";

import { useState } from "react";
import {
  Coins,
  Lightbulb,
  Compass,
  Mic,
  Bot,
  ShieldCheck,
  Leaf,
  HeartPulse,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Sparkles,
  Users,
  Brain,
  BarChart3,
  Star,
  X,
  Layers,
  ChevronRight,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export interface ProgramCategory {
  id: string;
  name: string;
  shortName: string;
  sessionsCount: number;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  iconBg: string;
  iconColor: string;
  topics: string[];
}

export const PROGRAM_CATEGORIES: ProgramCategory[] = [
  {
    id: "financial-literacy",
    name: "Financial Literacy",
    shortName: "Financial Literacy",
    sessionsCount: 18,
    tagline: "Understand money. Make smarter choices.",
    accentColor: "from-emerald-500/8 via-teal-500/2 to-transparent",
    badgeBg: "bg-emerald-50 text-emerald-700 border border-emerald-200/50",
    badgeText: "18 Sessions",
    iconBg: "bg-emerald-600",
    iconColor: "text-white",
    topics: [
      "History and evolution of money",
      "Needs vs wants",
      "Earning and sources of income",
      "Saving and goal-based planning",
      "Budgeting and managing expenses",
      "Banks and banking systems",
      "Digital payments",
      "Interest and power of compounding",
      "Inflation and purchasing power",
      "Taxes, GST and Income Tax",
      "Credit, loans and responsible borrowing",
      "Insurance and risk protection",
      "Investments – stocks, mutual funds and more",
      "Financial scams and fraud awareness",
      "Real-life money scenarios and case studies",
      "Building lifelong money habits",
    ],
  },
  {
    id: "entrepreneurship",
    name: "Entrepreneurship & Business Fundamentals",
    shortName: "Entrepreneurship",
    sessionsCount: 4,
    tagline: "From ideas to impact.",
    accentColor: "from-amber-500/8 via-orange-500/2 to-transparent",
    badgeBg: "bg-amber-50 text-amber-700 border border-amber-200/50",
    badgeText: "4 Sessions",
    iconBg: "bg-amber-500",
    iconColor: "text-white",
    topics: [
      "What is entrepreneurship?",
      "Identifying problems and opportunities",
      "How businesses create value",
      "Customers, markets and competition",
      "Products, services and business models",
      "Revenue, cost and profit",
      "Teamwork and leadership",
      "Pitching a business idea (Shark Tank style)",
    ],
  },
  {
    id: "career-awareness",
    name: "Career Awareness & Future Planning",
    shortName: "Career Planning",
    sessionsCount: 2,
    tagline: "Explore. Discover. Plan.",
    accentColor: "from-rose-500/8 via-red-500/2 to-transparent",
    badgeBg: "bg-rose-50 text-rose-700 border border-rose-200/60",
    badgeText: "2 Sessions",
    iconBg: "bg-rose-600",
    iconColor: "text-white",
    topics: [
      "Understanding different career pathways",
      "Traditional vs emerging careers",
      "Skills for the future",
      "Identifying strengths and interests",
      "Importance of continuous learning",
      "Introduction to career planning",
    ],
  },
  {
    id: "public-speaking",
    name: "Public Speaking & Presentation Skills",
    shortName: "Public Speaking",
    sessionsCount: 6,
    tagline: "Find your voice. Share your ideas.",
    accentColor: "from-purple-500/8 via-violet-500/2 to-transparent",
    badgeBg: "bg-purple-50 text-purple-700 border border-purple-200/60",
    badgeText: "6 Sessions",
    iconBg: "bg-purple-600",
    iconColor: "text-white",
    topics: [
      "Overcoming fear of speaking",
      "Building confidence and stage presence",
      "Voice modulation and body language",
      "Structuring thoughts clearly",
      "Storytelling techniques",
      "Effective introductions and conclusions",
      "Presentation design basics",
      "Persuasive communication",
      "Handling questions and audience interaction",
      "Group presentations and real-world practice",
    ],
  },
  {
    id: "ai-literacy",
    name: "AI Literacy & Emerging Technology",
    shortName: "AI & Tech",
    sessionsCount: 4,
    tagline: "Understand today. Build tomorrow.",
    accentColor: "from-sky-500/8 via-blue-500/2 to-transparent",
    badgeBg: "bg-sky-50 text-sky-700 border border-sky-200/60",
    badgeText: "4 Sessions",
    iconBg: "bg-sky-600",
    iconColor: "text-white",
    topics: [
      "What is Artificial Intelligence?",
      "Everyday applications of AI",
      "Generative AI and its possibilities",
      "Introduction to prompting",
      "Responsible use of AI",
      "Understanding AI limitations and bias",
      "Emerging technologies shaping the future",
      "Technology, innovation and future careers",
    ],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Digital Safety",
    shortName: "Cybersecurity",
    sessionsCount: 2,
    tagline: "Be smart. Be safe. Be responsible.",
    accentColor: "from-indigo-500/8 via-slate-500/2 to-transparent",
    badgeBg: "bg-indigo-50 text-indigo-800 border border-indigo-200/60",
    badgeText: "2 Sessions",
    iconBg: "bg-indigo-700",
    iconColor: "text-white",
    topics: [
      "Understanding digital identity",
      "Password and account security",
      "Online privacy and data protection",
      "Phishing and online scams",
      "Cyberbullying awareness",
      "Social media responsibility",
      "Safe use of digital platforms",
      "Recognising misinformation",
    ],
  },
  {
    id: "sustainability",
    name: "Sustainability & Environmental Awareness",
    shortName: "Sustainability",
    sessionsCount: 2,
    tagline: "A cleaner planet. A brighter future.",
    accentColor: "from-emerald-500/8 via-green-500/2 to-transparent",
    badgeBg: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    badgeText: "2 Sessions",
    iconBg: "bg-emerald-600",
    iconColor: "text-white",
    topics: [
      "Understanding sustainability",
      "Climate and environmental challenges",
      "Responsible consumption",
      "Waste management",
      "Sustainable lifestyle choices",
      "Introduction to the Sustainable Development Goals (SDGs)",
      "Individual responsibility and action",
      "Sustainability challenge activities",
    ],
  },
  {
    id: "health-wellbeing",
    name: "Fitness, Health & Well-being",
    shortName: "Health & Well-being",
    sessionsCount: 2,
    tagline: "A healthy mind. A brighter you.",
    accentColor: "from-fuchsia-500/8 via-pink-500/2 to-transparent",
    badgeBg: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/60",
    badgeText: "2 Sessions",
    iconBg: "bg-fuchsia-600",
    iconColor: "text-white",
    topics: [
      "Importance of physical fitness",
      "Healthy lifestyle habits",
      "Nutrition basics",
      "Sleep and recovery",
      "Mental well-being and stress awareness",
      "Building sustainable healthy habits",
      "Balancing ambition with well-being",
    ],
  },
];

const PILLARS = [
  {
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    title: "Practical Learning",
    desc: "Real-world examples and activities",
    bg: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: <Brain className="w-5 h-5 text-blue-600" />,
    title: "Future Ready",
    desc: "Build skills for tomorrow",
    bg: "bg-blue-50 border-blue-100",
  },
  {
    icon: <BarChart3 className="w-5 h-5 text-amber-600" />,
    title: "Holistic Growth",
    desc: "Money, mind and life",
    bg: "bg-amber-50 border-amber-100",
  },
  {
    icon: <Star className="w-5 h-5 text-purple-600" />,
    title: "Expert Designed",
    desc: "Backed by industry and academic experts",
    bg: "bg-purple-50 border-purple-100",
  },
];

function getCategoryIcon(id: string) {
  switch (id) {
    case "financial-literacy":
      return <Coins className="w-6 h-6 text-white stroke-[2.2]" />;
    case "entrepreneurship":
      return <Lightbulb className="w-6 h-6 text-white stroke-[2.2]" />;
    case "career-awareness":
      return <Compass className="w-6 h-6 text-white stroke-[2.2]" />;
    case "public-speaking":
      return <Mic className="w-6 h-6 text-white stroke-[2.2]" />;
    case "ai-literacy":
      return <Bot className="w-6 h-6 text-white stroke-[2.2]" />;
    case "cybersecurity":
      return <ShieldCheck className="w-6 h-6 text-white stroke-[2.2]" />;
    case "sustainability":
      return <Leaf className="w-6 h-6 text-white stroke-[2.2]" />;
    case "health-wellbeing":
      return <HeartPulse className="w-6 h-6 text-white stroke-[2.2]" />;
    default:
      return <BookOpen className="w-6 h-6 text-white stroke-[2.2]" />;
  }
}

interface MultiCategoryGalleryProps {
  onOpenDemoModal?: () => void;
}

export function MultiCategoryGallery({ onOpenDemoModal }: MultiCategoryGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalCategory, setActiveModalCategory] = useState<ProgramCategory | null>(null);

  const displayedCategories =
    selectedCategory === "all"
      ? PROGRAM_CATEGORIES
      : PROGRAM_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  const selectedCategoryObj = PROGRAM_CATEGORIES.find((c) => c.id === selectedCategory);

  return (
    <section className="w-full bg-linear-to-b from-white via-[#FBFBFE] to-white py-14 sm:py-20 border-y border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Banner matching Finquo Junior style */}
        <ScrollReveal variant="fade-up" duration={600} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#7C3AED] text-xs font-bold tracking-wide uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Finquo Junior Curriculum
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18181B] tracking-tight font-sans">
            Our 40-Session Learning Program
          </h2>
          <p className="mt-2.5 text-base sm:text-lg text-[#52525B] font-medium max-w-2xl mx-auto">
            Practical skills. Real-world learning. A brighter future.
          </p>
        </ScrollReveal>

        {/* Category Filter Pills (Organized into 2 clean, centered rows) */}
        <ScrollReveal variant="fade-up" duration={500} delay={100} className="mb-10 max-w-5xl mx-auto">
          <div className="flex flex-col items-center gap-2.5 sm:gap-3">
            {/* Row 1: All + first 4 categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap ${selectedCategory === "all"
                  ? "bg-[#5B45F5] text-white shadow-md shadow-indigo-500/25 scale-105 ring-2 ring-[#7C3AED]"
                  : "bg-purple-50/50 text-[#374151] hover:bg-purple-100/70 hover:text-[#5B45F5] border border-purple-100/80"
                  }`}
              >
                All (40 Sessions)
              </button>

              {PROGRAM_CATEGORIES.slice(0, 4).map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${isActive
                      ? "bg-[#5B45F5] text-white shadow-md shadow-indigo-500/25 scale-105 ring-2 ring-[#7C3AED]"
                      : "bg-purple-50/50 text-[#374151] hover:bg-purple-100/70 hover:text-[#5B45F5] border border-purple-100/80"
                      }`}
                  >
                    <span>{cat.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-white text-[#5B45F5] border border-purple-200/60"
                        }`}
                    >
                      {cat.sessionsCount}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Row 2: Remaining 4 categories */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {PROGRAM_CATEGORIES.slice(4).map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${isActive
                      ? "bg-[#5B45F5] text-white shadow-md shadow-indigo-500/25 scale-105 ring-2 ring-[#7C3AED]"
                      : "bg-purple-50/50 text-[#374151] hover:bg-purple-100/70 hover:text-[#5B45F5] border border-purple-100/80"
                      }`}
                  >
                    <span>{cat.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isActive
                        ? "bg-white/20 text-white"
                        : "bg-white text-[#5B45F5] border border-purple-200/60"
                        }`}
                    >
                      {cat.sessionsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Active Filter Context (When filtered to a single category) */}
        {/* {selectedCategory !== "all" && selectedCategoryObj && (
          <div className="mb-8 p-5 rounded-2xl bg-purple-50/60 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                  Filtered by Category:
                </span>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-[#5B45F5] text-white">
                  {selectedCategoryObj.name} ({selectedCategoryObj.sessionsCount} Sessions)
                </span>
              </div>
              <p className="text-sm font-medium text-purple-800 mt-1 italic">
                &ldquo;{selectedCategoryObj.tagline}&rdquo;
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#5B45F5] bg-white border border-purple-200 hover:bg-purple-50 px-4 py-2 rounded-xl transition cursor-pointer shrink-0 shadow-xs"
            >
              <Layers className="w-3.5 h-3.5" />
              Show All 8 Categories
            </button>
          </div>
        )} */}

        {/* Gallery Grid (Center aligned when filtered, 4-column grid when all) */}
        <div
          className={`grid gap-6 ${
            displayedCategories.length === 1
              ? "max-w-md mx-auto grid-cols-1"
              : displayedCategories.length === 2
              ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {displayedCategories.map((cat, idx) => (
            <ScrollReveal
              key={cat.id}
              variant="fade-up"
              duration={500}
              delay={idx * 60}
              className="h-full"
            >
              <div
                onClick={() => setActiveModalCategory(cat)}
                className="group h-full flex flex-col justify-between bg-white rounded-2xl border border-purple-100/80 shadow-sm hover:shadow-xl hover:border-[#5B45F5]/40 transition-all duration-300 overflow-hidden cursor-pointer hover:-translate-y-1.5"
              >
                {/* Top Visual Area (Card Header & Curriculum Preview) */}
                <div className={`p-6 bg-linear-to-b ${cat.accentColor} flex-1 flex flex-col`}>
                  {/* Top Row: Themed Icon + Session Pill Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-md shadow-gray-300/40 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    <span
                      className={`text-xs font-black px-3 py-1 rounded-full ${cat.badgeBg} tracking-wide uppercase shadow-xs`}
                    >
                      {cat.sessionsCount} {cat.sessionsCount === 1 ? "Session" : "Sessions"}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg font-black text-[#18181B] group-hover:text-[#5B45F5] transition-colors leading-tight mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#71717A] italic font-medium mb-4">
                    &ldquo;{cat.tagline}&rdquo;
                  </p>

                  {/* Topics Preview List */}
                  <div className="mt-auto space-y-2 pt-3 border-t border-gray-100/80">
                    {cat.topics.slice(0, 3).map((topic, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-[#3F3F46]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span className="line-clamp-1 font-medium">{topic}</span>
                      </div>
                    ))}
                    {cat.topics.length > 3 && (
                      <div className="pt-1 text-[11px] font-bold text-[#5B45F5] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>+{cat.topics.length - 3} more topics</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Finquo Brand Royal Purple Bar */}
                <div className="bg-gradient-to-r from-[#5B45F5] to-[#7C3AED] px-4 py-3.5 flex items-center justify-between border-t border-purple-300/30 group-hover:from-[#4E39E0] group-hover:to-[#6D28D9] transition-all duration-300">
                  <span className="text-white font-extrabold tracking-wider text-xs uppercase truncate">
                    {cat.shortName}
                  </span>
                  <span className="text-[11px] font-bold text-purple-100 group-hover:text-white flex items-center gap-1 transition-colors">
                    Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Infographic Section (Image 3 Summary: 40 Sessions, 4 Pillars & Slogan) */}
        <ScrollReveal variant="fade-up" duration={600} delay={200} className="mt-14 sm:mt-18">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-lg shadow-indigo-900/5">
            {/* Top Pillars Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
              {/* Pillar 0: Big 40 Sessions Counter */}
              <div className="lg:col-span-1 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total</span>
                <div className="text-4xl sm:text-5xl font-black text-[#18181B] tracking-tight leading-none my-1">
                  40
                </div>
                <span className="text-sm font-extrabold text-[#5B45F5] uppercase tracking-wide">
                  Sessions
                </span>
              </div>

              {/* Pillars 1 to 4 */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {PILLARS.map((pillar, pIdx) => (
                  <div
                    key={pIdx}
                    className={`p-4 rounded-2xl border ${pillar.bg} flex flex-col justify-between transition-transform hover:-translate-y-1 duration-200`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex items-center justify-center mb-3">
                      {pillar.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900 leading-snug">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Slogan with energetic curve + Book Demo button */}
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div className="relative">
                <p className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                  Better learners. Brighter thinkers. A kinder tomorrow.
                </p>
                {/* Visual Energetic Underline Curve */}
                <svg
                  className="w-48 sm:w-64 h-3 mx-auto sm:mx-0 text-emerald-500 mt-1"
                  viewBox="0 0 260 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C60 2.5 180 2.5 257 9"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {onOpenDemoModal && (
                <button
                  type="button"
                  onClick={onOpenDemoModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold text-sm shadow-md shadow-purple-500/25 transition-all hover:scale-105 cursor-pointer shrink-0"
                >
                  <span>Book Free Demo Class</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Interactive Category Topic Detail Modal */}
      {activeModalCategory && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setActiveModalCategory(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-[#5B45F5] to-[#7C3AED] text-white flex items-start justify-between relative">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-2xl ${activeModalCategory.iconBg} flex items-center justify-center shadow-md`}
                >
                  {getCategoryIcon(activeModalCategory.id)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-white/20 text-white border border-white/30 uppercase tracking-wider">
                      {activeModalCategory.sessionsCount} Sessions
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white mt-1">
                    {activeModalCategory.name}
                  </h3>
                  <p className="text-xs text-purple-100 italic mt-0.5">
                    &ldquo;{activeModalCategory.tagline}&rdquo;
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalCategory(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Topics List (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Detailed Curriculum Modules & Topics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModalCategory.topics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-gray-50 hover:bg-purple-50/50 border border-gray-100 flex items-start gap-2.5 transition"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-gray-800 leading-relaxed">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(activeModalCategory.id);
                  setActiveModalCategory(null);
                }}
                className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 transition cursor-pointer"
              >
                Filter gallery by this category →
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalCategory(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-200 transition cursor-pointer"
                >
                  Close
                </button>
                {onOpenDemoModal && (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalCategory(null);
                      onOpenDemoModal();
                    }}
                    className="px-5 py-2 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
                  >
                    Book Free Trial
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
