"use client";

import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

export function BoxUnboxingSection() {
  return (
    <section className="w-full bg-[#FAFAFA] py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <Package className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Every Quarter, A Physical Box
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto font-normal">
            A box filled with activities, worksheets, flashcards and interactive learning material delivered directly to your doorstep.
          </p>

          <div className="pt-2">
            <Link
              href="#book-demo"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4F46E5] hover:underline"
            >
              See what&apos;s inside <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
