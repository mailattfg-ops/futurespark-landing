"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What age group is this program suitable for?",
    answer:
      "Our curriculum is designed for children ages 8 to 18. Students are paired with age-appropriate tracks (Junior 8–12 and Senior 13–18) ensuring lessons, simulations, and case studies match their developmental stage.",
  },
  {
    question: "How does the 1 on 1 mentor matching work?",
    answer:
      "During the free 60-minute demo session, our academic director assesses your child's communication style, interests, and learning speed. We then assign a dedicated mentor who stays with your child for the entire journey.",
  },
  {
    question: "What is inside the quarterly physical box?",
    answer:
      "Every 3 months, a curated physical learning kit arrives at your doorstep containing customized lesson worksheets, tangible trade-off cards, simulation coins, budgeting journals, and stickers.",
  },
  {
    question: "What if we need to reschedule a weekly session?",
    answer:
      "You can reschedule any class with a 24-hour notice directly from your parent dashboard with zero penalty.",
  },
  {
    question: "Is there a free trial before enrolling?",
    answer:
      "Yes! We offer a 100% free 60-minute diagnostic session with an expert mentor. No credit card or commitment is required.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-white pt-10 sm:pt-14 pb-20 sm:pb-24 lg:pb-32">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proper Ratio Typography */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans">
            FAQ
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 font-medium font-sans">
            Common questions about learning with Finquo Junior
          </p>
        </div>

        {/* FAQ Accordion List with Smooth Grid Height Expansion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200/90 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:border-gray-300"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-gray-900 font-sans leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out ${
                      isOpen ? "rotate-180 bg-indigo-50 text-[#4F46E5]" : "text-gray-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed font-normal border-t border-gray-100 font-sans">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
