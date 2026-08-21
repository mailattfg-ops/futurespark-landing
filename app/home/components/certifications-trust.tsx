"use client";

/* eslint-disable @next/next/no-img-element */

export function CertificationsTrustSection() {
  return (
    <section className="w-full bg-[#FAFAF7] py-16 sm:py-20 lg:py-24 border-t border-gray-200/60 font-sans">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans text-center mb-12 sm:mb-16">
          Our Certifications & Trust
        </h2>

        {/* Top 3 Trust Rating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {/* Card 1: Trustpilot */}
          <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 flex flex-col items-center justify-between min-h-[220px] shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-center my-auto w-full py-2">
              <img
                src="/cert-trustpilot.svg"
                alt="Trustpilot rating"
                className="h-12 sm:h-14 w-auto max-w-[85%] object-contain mx-auto"
              />
            </div>
            <span className="bg-[#00B67A] text-white text-xs sm:text-sm font-extrabold px-5 py-2 rounded-full font-sans shadow-xs mt-3">
              4.8/5 TrustScore
            </span>
          </div>

          {/* Card 2: kidSAFE Certified */}
          <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 flex flex-col items-center justify-between min-h-[220px] shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-center my-auto w-full py-1">
              <img
                src="/cert-kidsafe.png"
                alt="kidSAFE Certified seal"
                className="h-20 sm:h-24 w-auto max-w-[90%] object-contain mx-auto"
              />
            </div>
            <span className="bg-[#FCE7F3] text-[#A21CAF] text-xs sm:text-sm font-extrabold px-5 py-2 rounded-full font-sans shadow-xs mt-3">
              Vetted & Certified Safe
            </span>
          </div>

          {/* Card 3: Google Reviews */}
          <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 flex flex-col items-center justify-between min-h-[220px] shadow-xs hover:shadow-md transition-all">
            <div className="flex items-center justify-center my-auto w-full py-2">
              <img
                src="/cert-google.png"
                alt="Google reviews"
                className="h-12 sm:h-14 w-auto max-w-[85%] object-contain mx-auto"
              />
            </div>
            <span className="bg-[#00B67A] text-white text-xs sm:text-sm font-extrabold px-5 py-2 rounded-full font-sans shadow-xs mt-3">
              4.9/5 ★ (2,400+ reviews)
            </span>
          </div>
        </div>

        {/* Bottom 2 Info Badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto mt-6 sm:mt-8">
          {/* Badge 1: ISO 27001 */}
          <div className="w-full sm:w-1/2 rounded-2xl border border-gray-200/90 bg-white p-5 text-center shadow-xs hover:shadow-md transition-all">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C3AED] font-sans block">
              ISO 27001 COMPLIANT
            </span>
            <span className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight mt-1.5 font-sans block">
              Enterprise Data Protection
            </span>
          </div>

          {/* Badge 2: STEM Outreach Award */}
          <div className="w-full sm:w-1/2 rounded-2xl border border-gray-200/90 bg-white p-5 text-center shadow-xs hover:shadow-md transition-all">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#7C3AED] font-sans block">
              STEM OUTREACH AWARD
            </span>
            <span className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight mt-1.5 font-sans block">
              Top EdTech Initiative 2024
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
