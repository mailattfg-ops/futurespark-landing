

"use client";

import Image from "next/image";

export function JoinThousandsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Join Thousands
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg mx-auto mt-2.5 leading-relaxed font-sans">
            A growing community of parents nurturing financial sense, critical thinking, and enterprise.
          </p>
        </div>

        {/* Circular Face Avatar Cloud Cluster */}
        <div className="relative w-full max-w-4xl mx-auto aspect-[16/6.5] select-none flex items-center justify-center">
          <Image
            src="/join-thousands-cloud.png"
            alt="Join Thousands of parents and students in the Finquo Junior community"
            fill
            priority
            unoptimized
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-contain object-center hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
}
