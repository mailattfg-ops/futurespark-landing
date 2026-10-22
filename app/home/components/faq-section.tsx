"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/faq";
import { BookDemoButton } from "@/components/book-demo-button";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="w-full bg-white pt-10 sm:pt-14 pb-16 sm:pb-20 scroll-mt-24">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] tracking-[-0.03em] font-sans">FAQ</h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 font-medium font-sans">Common questions about learning with Finquo Junior</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full min-h-[44px] px-6 py-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50/50 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 font-sans leading-snug">{faq.question}</span>
                  <span className={`w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-transform ${isOpen ? "rotate-180 bg-indigo-50 text-[#4F46E5]" : "text-gray-400"}`} aria-hidden="true">
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 font-sans">{faq.answer}</div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <BookDemoButton placement="faq" />
        </div>
      </div>
    </section>
  );
}
