"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface HeroSectionProps {
  onOpenDemoModal?: () => void;
}

export function HeroSection({ onOpenDemoModal }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-white min-h-[100dvh] lg:h-[100dvh] lg:max-h-[820px] flex items-center justify-center pt-16">
      {/* Background Purple Sunburst (Desktop absolute positioning covering top-0 to bottom on the right) */}
      <div
        className="hidden lg:block absolute top-0 right-0 h-full w-[54%] xl:w-[50%] pointer-events-none z-0 select-none opacity-90 transition-opacity duration-1000"
        aria-hidden="true"
      >
        <div className="relative w-full h-full">
          <Image
            src="/sunburst.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-left-top"
          />
        </div>
      </div>

      <div className="w-full h-full mx-2 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="h-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-4 items-center md:pl-6">
          {/* Left Column: Hero Content & CTAs */}
          <ScrollReveal variant="fade-right" duration={700} className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left max-w-2xl lg:max-w-none pt-2 lg:pt-0 pb-4 sm:pb-6 lg:pb-8">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[42px] xl:text-[50px] 2xl:text-[56px] font-extrabold text-[#4F46E5] tracking-tight leading-[1.10] mb-4 sm:mb-5 font-sans">
              The skills school{" "}
              <br className="hidden sm:inline" />
              forgets to teach.{" "}
              <br className="hidden sm:inline" />
              Taught one child at{" "}
              <br className="hidden sm:inline" />
              a time.
            </h1>

            {/* Subtitle / Paragraph */}
            <p className="text-gray-700 text-sm sm:text-base md:text-[16px] lg:text-[17px] font-normal leading-relaxed max-w-lg mb-6 sm:mb-8">
              A one-year mentorship for ages 8 to 18. Money, business, communication,
              tech, and the internet, taught weekly by mentors who actually teach
              it well.
            </p>

            {/* CTA Button & Trustpilot Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-7">
              {/* Primary Action Button */}
              <button
                type="button"
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-7 sm:py-3.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold text-sm sm:text-base shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Confirm your seat
              </button>

              {/* Trustpilot Review Badge */}
              <div className="flex flex-col gap-1 select-none">
                {/* Trustpilot Brand Header */}
                <div className="flex items-center gap-1.5">
                  {/* Trustpilot 4-Point Star Icon */}
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00B67A]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0l3.09 9.51h10l-8.09 5.88 3.09 9.51L12 19.02l-8.09 5.88 3.09-9.51L0 9.51h10z" />
                  </svg>
                  <span className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight font-sans">
                    Trustpilot
                  </span>
                </div>

                {/* 5 Green Rating Star Squares */}
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 bg-[#00B67A] flex items-center justify-center rounded-[2px]"
                    >
                      <svg
                        className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* TrustScore Text */}
                {/* <span className="text-[10px] sm:text-xs text-gray-600 font-medium">
                  TrustScore <strong className="text-gray-900">4.8</strong> |{" "}
                  <strong className="text-gray-900">347</strong> reviews
                </span> */}
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Hero Visual (Sunburst, Large Prominent Girl, Stars) */}
          <ScrollReveal variant="fade-left" duration={750} delay={150} className="h-full lg:col-span-6 xl:col-span-6 relative flex justify-center items-end mt-4 lg:mt-0">
            {/* Mobile / Tablet Purple Sunburst Background Container */}
            <div className="lg:hidden absolute inset-0 -m-3 sm:-m-4 rounded-3xl overflow-hidden pointer-events-none z-0">
              <Image
                src="/sunburst.png"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center"
              />
            </div>

            {/* Graphic Group (Relative for Stars + Girl positioning) */}
            <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none flex justify-center items-end z-10">
              {/* Upper Decorative Yellow Star (Clockwise half-rotation loop) */}
              <div className="absolute top-[20%] right-[-4%] sm:top-[22%] sm:right-[-6%] lg:top-[22%] lg:right-[10%] xl:right-[80%] z-20 pointer-events-none select-none">
                <Image
                  src="/star.png"
                  alt=""
                  width={90}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  className="w-12 sm:w-16 lg:w-18 xl:w-22 drop-shadow-md animate-star-cw origin-center"
                />
              </div>

              {/* Lower Decorative Yellow Star (Counter-clockwise half-rotation loop) */}
              <div className="absolute bottom-[8%] right-[2%] sm:bottom-[10%] sm:right-[0%] lg:bottom-[10%] lg:right-[-10%] xl:right-[90%] z-20 pointer-events-none select-none">
                <Image
                  src="/star.png"
                  alt=""
                  width={100}
                  height={100}
                  style={{ width: "auto", height: "auto" }}
                  className="w-12 sm:w-16 lg:w-18 xl:w-22 drop-shadow-md animate-star-ccw origin-center"
                />
              </div>

              {/* Hero Girl Cutout (Stationary - no floating animation) */}
              <div className="relative w-full h-[380px] sm:h-[360px] md:h-[420px] lg:h-[460px] xl:h-[530px] 2xl:h-[580px] flex items-end justify-center overflow-visible">
                <Image
                  src="/hero-girl.png"
                  alt="Student smiling looking up"
                  fill
                  priority
                  sizes="(min-width: 1536px) 700px, (min-width: 1280px) 630px, (min-width: 1024px) 560px, 100vw"
                  className="object-contain object-bottom drop-shadow-2xl select-none pointer-events-none scale-100 sm:scale-115 lg:scale-120 xl:scale-125 origin-bottom"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
