"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ReviewItem {
  name: string;
  role: string;
  quote: string;
  avatarSrc: string;
}

const reviews: ReviewItem[] = [
  {
    name: "Leah Andrews",
    role: "CEO Techsphere",
    quote:
      '"Whether you\'re a beginner or an expert, DiveTo.AI provides excellent resources to help you achieve your goals"',
    avatarSrc: "/review-avatar-1.png",
  },
  {
    name: "Raj Patel",
    role: "COO GrowthHacks",
    quote:
      '"Streamlining processes and boosting efficiency is key to scaling your business effectively."',
    avatarSrc: "/review-avatar-2.png",
  },
  {
    name: "Michael Thomson",
    role: "CMO Innovatech",
    quote:
      '"Innovation drives success. At Innovatech, we leverage AI to transform ideas into reality."',
    avatarSrc: "/review-avatar-3.png",
  },
];

export function ParentReviewsSection() {
  return (
    <section id="reviews" className="w-full bg-white py-10 sm:py-12 lg:py-14 border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" duration={600}>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans text-center mb-8 sm:mb-10">
            What parents and kids say
          </h2>
        </ScrollReveal>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, index) => (
            <ScrollReveal
              key={index}
              variant="fade-up"
              duration={650}
              delay={index * 120}
            >
              <div
                className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full"
              >
                {/* Quote Text */}
                <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed font-sans italic mb-6">
                  {review.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={review.avatarSrc}
                      alt={review.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 font-sans leading-snug">
                      {review.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium font-sans">
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
