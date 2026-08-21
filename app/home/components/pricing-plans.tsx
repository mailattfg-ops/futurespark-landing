"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

export function PricingPlansSection() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const features = [
    "48 Live 1-on-1 Mentorship Sessions (60 mins each)",
    "Dedicated personal mentor for the entire year",
    "4 Quarterly Physical Learning Boxes delivered home",
    "Curriculum vetted by IIM Faculty",
    "Weekly parent progress reports & session summaries",
    "Final Month Capstone Project & Presentation",
    "Certificate of Completion in Financial Intelligence",
  ];

  return (
    <section id="pricing" className="w-full bg-[#FAFAFA] py-16 sm:py-20 lg:py-24 border-t border-gray-100">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#4F46E5] bg-indigo-50 px-3.5 py-1.5 rounded-full inline-block mb-3 font-sans">
            Membership Plans
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Foundations of Wealth
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            One comprehensive year to give your child the financial fluency school never teaches.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center mt-6">
            <div className="bg-gray-200/80 p-1 rounded-2xl flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === "annual"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Annual Billing <span className="text-[#4F46E5] text-[11px] font-black ml-1">(Save 33%)</span>
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly Plan
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Card */}
        <div className="bg-white border-2 border-[#4F46E5] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Top Badge */}
          <div className="absolute top-0 right-0 bg-[#4F46E5] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-5 py-1.5 rounded-bl-2xl flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Most Popular 1-Year Journey
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Price Info */}
            <div className="lg:col-span-5 space-y-4">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-sans">
                Full 1-Year Mentorship
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                48 weekly sessions designed to build deep confidence in money, trade-offs, and critical life skills.
              </p>

              {/* Price Tag */}
              <div className="pt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-black text-gray-900 font-sans tracking-tight">
                    {billingCycle === "annual" ? "₹3,000" : "₹4,500"}
                  </span>
                  <span className="text-sm font-bold text-gray-500">
                    / month
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium mt-1">
                  {billingCycle === "annual"
                    ? "₹36,000 billed annually (includes all 4 project boxes)"
                    : "Billed monthly. Cancel anytime."}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="#book-demo"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-indigo-500/25 transition-all text-center cursor-pointer"
                >
                  Book a Free Demo First
                </Link>
              </div>
            </div>

            {/* Right Features List */}
            <div className="lg:col-span-7 bg-[#F8FAFC] border border-gray-100 rounded-2xl p-5 sm:p-7 space-y-3.5">
              <h4 className="text-xs sm:text-sm font-extrabold text-gray-900 uppercase tracking-wider font-sans">
                Everything Included in Your Membership:
              </h4>
              <div className="space-y-2.5">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-sm text-gray-800 font-semibold leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
