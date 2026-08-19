"use client";

import Image from "next/image";

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
    <section id="reviews" className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans text-center mb-12 sm:mb-16">
          What parents and kids say
        </h2>

        {/* 3 Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="rounded-[28px] border border-gray-200/90 bg-white p-6 sm:p-7 flex flex-col justify-start min-h-[210px] shadow-xs hover:shadow-md transition-all duration-300 select-none"
            >
              {/* Header: Avatar + Name & Role */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                  <Image
                    src={rev.avatarSrc}
                    alt={rev.name}
                    fill
                    priority
                    unoptimized
                    sizes="56px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 font-sans leading-tight">
                    {rev.name}
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500 font-medium font-sans block mt-0.5">
                    {rev.role}
                  </span>
                </div>
              </div>

              {/* Quote Content */}
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans mt-5 font-normal">
                {rev.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
