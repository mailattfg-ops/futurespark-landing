"use client";

import Image from "next/image";

interface CourseStep {
  number: string;
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  subtextColor: string;
}

const courseSteps: CourseStep[] = [
  {
    number: "01",
    title: "Introduction to Value",
    subtitle: "Trade-offs",
    bgColor: "bg-[#0066FF]",
    textColor: "text-white",
    subtextColor: "text-white/85",
  },
  {
    number: "02",
    title: "Understanding Costs",
    subtitle: "Fixed vs. Variable Costs",
    bgColor: "bg-[#BD7BF8]",
    textColor: "text-white",
    subtextColor: "text-white/85",
  },
  {
    number: "03",
    title: "Market Dynamics",
    subtitle: "Supply and Demand",
    bgColor: "bg-[#FACC15]",
    textColor: "text-white",
    subtextColor: "text-white/95",
  },
  {
    number: "04",
    title: "Competition Analysis",
    subtitle: "Competitor Strategies",
    bgColor: "bg-[#E56A6A]",
    textColor: "text-white",
    subtextColor: "text-white/85",
  },
  {
    number: "06",
    title: "Introduction to Value",
    subtitle: "Trade-offs",
    bgColor: "bg-[#0070F3]",
    textColor: "text-white",
    subtextColor: "text-white/85",
  },
  {
    number: "05",
    title: "Customer Segmentation",
    subtitle: "Target Markets",
    bgColor: "bg-[#22C55E]",
    textColor: "text-white",
    subtextColor: "text-white/85",
  },
  {
    number: "06",
    title: "Pricing Strategies",
    subtitle: "Psychological Pricing",
    bgColor: "bg-[#7C3AED]",
    textColor: "text-white",
    subtextColor: "text-white/85",
  },
];

export function CourseFlowSection() {
  return (
    <section id="curriculum" className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans">
            Course flow
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 font-medium font-sans">
            Join our community of forward-thinking parents on Instagram
          </p>
        </div>

        {/* Top Indicators: Starting Point -> Finishing Point */}
        <div className="flex items-center justify-between mb-3.5 px-1">
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#F59E0B] font-sans">
            STARTING POINT
          </span>
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase text-[#10B981] font-sans">
            FINISHING POINT
          </span>
        </div>

        {/* 7-Card Grid Matching Figma Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5 sm:gap-4">
          {courseSteps.map((step, idx) => (
            <div
              key={idx}
              className={`${step.bgColor} ${step.textColor} rounded-2xl sm:rounded-[22px] p-4 sm:p-4.5 flex flex-col justify-between items-start text-left shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[210px] sm:min-h-[240px] select-none group relative overflow-hidden last:col-span-2 sm:last:col-span-1 last:w-full last:max-w-[200px] sm:last:max-w-none last:mx-auto`}
            >
              {/* Top-Left Stage Number */}
              <span className="text-lg sm:text-xl font-black tracking-tight font-sans opacity-95">
                {step.number}
              </span>

              {/* Center 3D Calculator Graphic */}
              <div className="w-full flex items-center justify-center my-auto py-2">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/course-flow-calc.png"
                    alt={step.title}
                    fill
                    priority
                    unoptimized
                    sizes="120px"
                    className="object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Bottom Title & Subtitle */}
              <div className="w-full pt-1">
                <h3 className="text-sm sm:text-[14px] font-extrabold leading-tight font-sans block">
                  {step.title}
                </h3>
                <span className={`text-xs font-medium leading-tight block mt-1 ${step.subtextColor}`}>
                  {step.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
