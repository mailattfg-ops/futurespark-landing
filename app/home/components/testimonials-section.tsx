"use client";

import Image from "next/image";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  relation: string;
  location: string;
  quote: string;
  highlight: string;
  avatarBg: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Leah Andrews",
    relation: "Mother of Kabir (10 yrs)",
    location: "Bengaluru",
    highlight: "Understands trade-offs now",
    quote:
      "Kabir now calculates opportunity costs and trade-offs before asking for things in stores. The 1-on-1 mentor format kept him completely engaged for a full year.",
    avatarBg: "bg-indigo-100 text-[#4F46E5]",
    initials: "LA",
  },
  {
    name: "Raj Patel",
    relation: "Father of Ananya (13 yrs)",
    location: "Mumbai",
    highlight: "Quarterly project boxes are brilliant",
    quote:
      "The quarterly physical box arriving home makes concepts tangible. Ananya built her first profit-loss model for a school bake sale and pitched it with full confidence.",
    avatarBg: "bg-amber-100 text-amber-700",
    initials: "RP",
  },
  {
    name: "Michael Thomson",
    relation: "Parent of Leo (11 yrs)",
    location: "London, UK",
    highlight: "Real mentorship, not recorded videos",
    quote:
      "Finally, an education program that doesn't just stick kids in front of a pre-recorded screen. Having one dedicated mentor who adapts to Leo's pace has been invaluable.",
    avatarBg: "bg-emerald-100 text-emerald-700",
    initials: "MT",
  },
];

export function TestimonialsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#4F46E5] bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3 font-sans">
            Real Stories
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Loved by Parents. <br className="hidden sm:inline" />
            Built for Kids.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            See how children across the globe are mastering essential life skills one week at a time.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-[#FAFAFA] border border-gray-200/80 rounded-3xl p-6 sm:p-7 flex flex-col justify-between hover:shadow-xl hover:border-gray-300 transition-all duration-300"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#F59E0B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <h3 className="text-base font-extrabold text-gray-900 mb-2 font-sans">
                  &ldquo;{t.highlight}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal mb-6">
                  {t.quote}
                </p>
              </div>

              {/* Author Details */}
              <div className="pt-4 border-t border-gray-200/60 flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-xs font-black font-sans`}
                >
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight font-sans">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 font-medium leading-tight mt-0.5">
                    {t.relation} • {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
