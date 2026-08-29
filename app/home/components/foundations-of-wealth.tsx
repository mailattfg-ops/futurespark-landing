"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, UserCheck, FolderCheck, PackageCheck } from "lucide-react";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FoundationsOfWealthSection() {
  const features = [
    { icon: <BookOpen className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "40 interactive sessions" },
    // { icon: <UserCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "1 on 1 year long mentorship program" },
    { icon: <UserCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "a year long mentorship program" },
    { icon: <FolderCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "1 capstone project" },
    { icon: <PackageCheck className="w-5 h-5 text-[#5B45F5] stroke-[2]" />, label: "quarterly mailed physical worksheets" },
  ];

  return (
    <section id="course-details" className="w-full bg-white py-10 sm:py-12 lg:py-14">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal variant="fade-up" duration={600}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-12 font-sans">
            Course Details
          </h2>
        </ScrollReveal>

        {/* Main Card */}
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
  );
}
