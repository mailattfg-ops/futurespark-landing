"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Folder, Calendar } from "lucide-react";

export function FoundationsOfWealthSection() {
  const [activeLevel, setActiveLevel] = useState<string>("LEVEL 1");

  const features = [
    { icon: <BookOpen className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "48 interactive activities" },
    { icon: <Award className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "IIM-vetted Certification" },
    { icon: <Folder className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "1 Capstone Business Project" },
    { icon: <Calendar className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "52 Weekly Sessions (1 year)" },
  ];

  return (
    <section id="course-details" className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-12 font-sans">
          Course Details
        </h2>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-7 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            {/* Left Column: Course Graphic & Price */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              {/* Graphic Thumbnail */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#F8F5EE] border border-[#E9DAC6] shadow-xs">
                <Image
                  src="/course-thumbnail.png"
                  alt="Financial literacy Foundations of Wealth - 15,430 kids enrolled"
                  fill
                  priority
                  quality={100}
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Title & Price Row Under Image */}
              <div className="pt-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 font-sans tracking-tight">
                    Foundations of Wealth
                  </h3>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-xl sm:text-2xl font-black text-gray-900 font-sans">
                      ₹2,400
                    </span>
                    <span className="text-xs text-gray-500 font-medium">/ month</span>
                  </div>
                  <span className="text-[10px] text-gray-500 block">
                    Inclusive of all physical boxes & mentorship
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Features, Ratings & Level Selector */}
            <div className="md:col-span-5 flex flex-col justify-between space-y-4 pt-1">
              {/* Feature Points List */}
              <div className="space-y-3">
                {features.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-shrink-0">{item.icon}</div>
                    <span className="text-xs sm:text-[13px] font-bold text-gray-800 font-sans">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rating Card */}
              <div className="bg-[#FAFAFA] border border-gray-200/90 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-2xl select-none">⭐</div>
                  <span className="text-2xl font-black text-gray-900 font-sans tracking-tight">
                    4.5
                  </span>
                </div>
                <div className="border-l border-gray-300 pl-4 text-left">
                  <span className="text-xs font-bold text-gray-700 block leading-tight">
                    2000+
                  </span>
                  <span className="text-[11px] text-gray-500 leading-tight">
                    amazing ratings
                  </span>
                </div>
              </div>

              {/* Level Selector Pills */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {["LEVEL 1", "LEVEL 2", "LEVEL 3"].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setActiveLevel(lvl)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold tracking-wider transition-all ${
                      activeLevel === lvl
                        ? "bg-black text-white shadow-xs"
                        : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Full-Width CTA Button */}
          <div className="mt-6 pt-2">
            <Link
              href="#book-demo"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById("book-demo") || document.getElementById("book-class");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.location.hash = "book-demo";
                }
              }}
              className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-[#5B45F5] hover:bg-[#4E39E0] text-white font-extrabold text-sm sm:text-base shadow-md transition-all text-center cursor-pointer"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
