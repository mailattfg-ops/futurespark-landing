"use client";

import { ReactNode } from "react";
import { Coins, PiggyBank, ShieldAlert, Receipt, TrendingUp, Megaphone, Cpu } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface CourseStep {
  number: string;
  title: string;
  sessions: string;
  description: string;
  bgColor: string;
  textColor: string;
  subtextColor: string;
  icon: ReactNode;
}

const courseSteps: CourseStep[] = [
  {
    number: "01",
    title: "Money Foundations",
    sessions: "Sessions 1–4",
    description: "What money is, how it evolved, how it loses value, and how it's earned honestly.",
    bgColor: "bg-[#0066FF]",
    textColor: "text-white",
    subtextColor: "text-white/90",
    icon: <Coins className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
  {
    number: "02",
    title: "Budgeting & Banking",
    sessions: "Sessions 5–10",
    description: "Income vs expense, needs vs wants, the 50/30/20 rule, how banks work, accounts, cards, loans and interest.",
    bgColor: "bg-[#8B5CF6]",
    textColor: "text-white",
    subtextColor: "text-white/90",
    icon: <PiggyBank className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
  {
    number: "03",
    title: "Smart Spending & Scam Safety",
    sessions: "Sessions 11–15",
    description: "Impulse buying, brand pressure, EMI & debt traps, plus Ponzi schemes, phishing & safe banking habits.",
    bgColor: "bg-[#F59E0B]",
    textColor: "text-white",
    subtextColor: "text-white/95",
    icon: <ShieldAlert className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
  {
    number: "04",
    title: "Economy & Tax",
    sessions: "Sessions 16–19",
    description: "GDP, inflation, RBI & SEBI, Union Budget, direct vs indirect tax, ITR basics, global economy links.",
    bgColor: "bg-[#EF4444]",
    textColor: "text-white",
    subtextColor: "text-white/90",
    icon: <Receipt className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
  {
    number: "05",
    title: "Earning & Investing",
    sessions: "Sessions 20–24",
    description: "Jobs, freelancing, compounding, SIPs, stocks & bonds, insurance, net worth & money psychology.",
    bgColor: "bg-[#10B981]",
    textColor: "text-white",
    subtextColor: "text-white/90",
    icon: <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
  {
    number: "06",
    title: "Voice & Venture",
    sessions: "Sessions 25–32",
    description: "Public speaking, storytelling, professional comms — plus business basics, funding & pitching a real idea.",
    bgColor: "bg-[#6366F1]",
    textColor: "text-white",
    subtextColor: "text-white/90",
    icon: <Megaphone className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
  {
    number: "07",
    title: "Future Ready",
    sessions: "Sessions 33–40",
    description: "AI tools & prompting, cyber awareness, sustainable finance & capstone personal money plan.",
    bgColor: "bg-[#06B6D4]",
    textColor: "text-white",
    subtextColor: "text-white/90",
    icon: <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-xs" />,
  },
];

export function CourseFlowSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-10 sm:py-12 lg:py-16 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal variant="fade-up" duration={600}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-8 sm:mb-12 font-sans">
            Course Flow &amp; Roadmap
          </h2>
        </ScrollReveal>

        {/* Responsive 7-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-5">
          {courseSteps.map((step, idx) => (
            <ScrollReveal
              key={idx}
              variant="zoom-in"
              duration={550}
              delay={idx * 60}
              className="h-full"
            >
              <div
                className={`${step.bgColor} ${step.textColor} rounded-2xl p-4 sm:p-5 flex flex-col justify-between items-start text-left shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 min-h-[270px] select-none group relative overflow-hidden h-full border border-white/20`}
              >
                {/* Top Bar: Stage Number & Session Tag Stacked */}
                <div className="w-full flex flex-col items-start gap-1.5 pb-1">
                  <span className="text-xl sm:text-2xl font-black tracking-tight font-sans opacity-95">
                    {step.number}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-white/25 border border-white/20 whitespace-nowrap tracking-wider">
                    {step.sessions}
                  </span>
                </div>

                {/* Center Unique Glassmorphic Icon Badge */}
                <div className="w-full flex items-center justify-center my-auto py-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/35 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {step.icon}
                  </div>
                </div>

                {/* Bottom Title & Description */}
                <div className="w-full pt-3 border-t border-white/20">
                  <h3 className="text-sm sm:text-[15px] font-extrabold leading-snug font-sans block">
                    {step.title}
                  </h3>
                  <p className={`text-[11px] font-normal leading-relaxed block mt-1.5 ${step.subtextColor}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
