"use client";

import Image from "next/image";
import { Video } from "lucide-react";

interface StepItem {
  title: string;
  description: string;
}

const steps: StepItem[] = [
  {
    title: "Match",
    description:
      "After the free demo, we pair your child with a mentor who fits their age, pace, and personality. Same mentor for the full year.",
  },
  {
    title: "Weekly session",
    description:
      "One live, one-on-one session each week. Sixty minutes. Structured, not a chat.",
  },
  {
    title: "The packet",
    description:
      "Every quarter, a physical box arrives at your home. Worksheets for the coming sessions, flashcards, stickers, and small projects.",
  },
  {
    title: "Capstone",
    description:
      "The final month is a project the child builds and presents. A budget, a small business plan, a public talk, or something they design with their mentor.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full bg-white py-20 sm:py-24 lg:py-32 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 text-center tracking-tight mb-14 sm:mb-20 font-sans">
          How It Works
        </h2>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Enlarged Live 1-on-1 Class Video Call Mockup Card */}
          <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-[32px] sm:rounded-[40px] p-6 sm:p-7 md:p-8 shadow-2xl shadow-gray-200/70">
            {/* Call Header Bar */}
            <div className="flex items-center justify-between gap-4 mb-6 pb-1">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Video Camera Icon */}
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-700 bg-gray-50">
                  <Video className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {/* Session Titles */}
                <div className="flex flex-col min-w-0">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate font-sans">
                    Financial Literacy Session 2
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal truncate mt-0.5 font-sans">
                    This session is being recorded and transcripted
                  </p>
                </div>
              </div>

              {/* End Call Pill Button */}
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors flex-shrink-0 cursor-pointer shadow-xs active:scale-95"
              >
                End call
              </button>
            </div>

            {/* 2-Column Video Feeds */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Mentor Video Feed */}
              <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                {/* Live Recording Badge */}
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white font-medium shadow-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span>Recording</span>
                </div>

                {/* Video Snapshot */}
                <Image
                  src="/call-mentor.png"
                  alt="Miss Divya S - Mentor"
                  fill
                  priority
                  quality={100}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-top select-none"
                />

                {/* Name Badge */}
                <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-xl shadow-md select-none whitespace-nowrap">
                  Miss Divya S
                </div>
              </div>

              {/* Student Video Feed */}
              <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                {/* Video Snapshot */}
                <Image
                  src="/call-student.png"
                  alt="Rhea Gupta - Student"
                  fill
                  priority
                  quality={100}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover object-top select-none"
                />

                {/* Name Badge */}
                <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-xl shadow-md select-none whitespace-nowrap">
                  Rhea Gupta
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step List with line-height: 20px on step descriptions */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 sm:gap-4.5">
                {/* Yellow Sparkle Star Icon */}
                <div className="flex-shrink-0 pt-0.5">
                  <Image
                    src="/star.png"
                    alt=""
                    width={28}
                    height={30}
                    style={{ width: "auto", height: "auto" }}
                    className="w-6 h-6 sm:w-6.5 sm:h-6.5 drop-shadow-xs select-none"
                  />
                </div>

                {/* Step Details with Exact line-height: 20px */}
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug font-sans">
                    {step.title}
                  </h3>
                  <p
                    style={{ lineHeight: "20px" }}
                    className="text-[14px] sm:text-[15px] text-gray-600 mt-1 font-normal font-sans"
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
