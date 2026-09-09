"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface PartnerItem {
  title: string;
}

const partnersList: PartnerItem[] = [
  { title: "IIM Alum Initiative" },
  { title: "Eco Sustainability Group" },
  { title: "Health & Wellness Coalition" },
  { title: "Digital Arts Collective" },
  { title: "Global Tech Innovators" },
];

// Vector LGPSM Sunburst Logo matching the design screenshot exactly
function LgpsmLogo() {
  const rays = [];
  const cx = 15, cy = 6;
  for (let i = 0; i < 32; i++) {
    const angle = (i * Math.PI * 2) / 32;
    const x2 = cx + Math.cos(angle) * 30;
    const y2 = cy + Math.sin(angle) * 30;
    rays.push(
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={Number(x2.toFixed(1))}
        y2={Number(y2.toFixed(1))}
        stroke="#FFA669"
        strokeWidth="0.9"
        opacity="0.8"
      />
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 116 20"
      className="h-4.5 sm:h-5 w-auto"
    >
      <defs>
        <clipPath id="lgpsm-sun-shape">
          <path d="M 5 1 Q 6 0 8 0 L 22 0 Q 24 0 23.5 1.5 L 18.5 18.5 Q 18 20 16 20 L 2 20 Q 0 20 0.5 18.5 Z" />
        </clipPath>
        <radialGradient id="lgpsm-sun-core" cx="68%" cy="30%" r="36%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="65%" stopColor="#FF7A24" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F25200" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sunburst Icon */}
      <g clipPath="url(#lgpsm-sun-shape)">
        <rect x="0" y="0" width="25" height="20" fill="#F25200" />
        {rays}
        <circle cx={cx} cy={cy} r="5.5" fill="url(#lgpsm-sun-core)" />
        <circle cx={cx} cy={cy} r="1.8" fill="#FFFFFF" />
      </g>

      {/* LGPSM Geometric Logo Mark */}
      <g
        fill="none"
        stroke="#381B12"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* L */}
        <path d="M 28 4 V 14 Q 28 16 30.5 16 H 36" />
        {/* G */}
        <path d="M 48 5 Q 48 4 46 4 H 42 Q 39 4 39 10 Q 39 16 42 16 H 46 Q 48 16 48 13 V 10.5 H 44.5" />
        {/* P */}
        <path d="M 52.5 16 V 4 H 58 Q 61.5 4 61.5 8.5 Q 61.5 12 58 12 H 52.5" />
        {/* S */}
        <path d="M 74 5.5 Q 74 4 70.5 4 H 68 Q 65.5 4 65.5 7.5 Q 65.5 10 68 10.5 L 71.5 11 Q 74 11.5 74 13.5 Q 74 16 70.5 16 H 67 Q 65 16 65 14" />
        {/* M */}
        <path d="M 78.5 16 V 4.5 L 83.5 10.5 L 88.5 4.5 V 16" />
      </g>
      {/* TM Dot/Mark */}
      <circle cx="92.5" cy="4" r="1" fill="#381B12" />
    </svg>
  );
}

export function AwardsPartnersSection() {
  return (
    <section className="w-full bg-[#FFF9F0] py-14 sm:py-18 lg:py-22 border-t border-[#F2E5D3]">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <ScrollReveal variant="fade-up" duration={600}>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-14 font-sans">
            Awards & Partners
          </h2>
        </ScrollReveal>

        {/* 5-Column Partner Cards Grid */}
        <ScrollReveal variant="fade-up" duration={600} delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5 mb-14 sm:mb-16">
            {partnersList.map((partner) => (
              <div
                key={partner.title}
                className="bg-[#FFFDF8] border-[1.5px] border-[#D6B27D] rounded-[22px] p-5 sm:p-6 text-center flex flex-col items-center justify-center min-h-[160px] sm:min-h-[175px] shadow-xs hover:shadow-md hover:border-[#C49E67] transition-all duration-200 group"
              >
                {/* Logo Emblem (Vector Sunburst Icon + LGPSM text) */}
                <div className="flex items-center justify-center pt-1">
                  <LgpsmLogo />
                </div>

                {/* Partner Tag */}
                <span className="text-[10px] sm:text-[11px] font-bold text-[#8E8E93] tracking-[0.18em] uppercase font-sans mt-3.5 mb-1.5">
                  PARTNER
                </span>

                {/* Partner Title */}
                <h3 className="text-xs sm:text-[13px] font-extrabold text-[#1F2937] leading-snug font-sans px-1">
                  {partner.title}
                </h3>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom Brands Logos Row (Developed in pure SVG/HTML, NO raster images) */}
        <ScrollReveal variant="fade-up" duration={600} delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-10 lg:gap-14 pt-2 pb-2 select-none">
            {/* 1. Google */}
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tighter font-sans hover:opacity-80 transition-opacity">
              Google
            </span>

            {/* 2. Gumroad */}
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans hover:opacity-80 transition-opacity">
              gumroad
            </span>

            {/* 3. Asana */}
            <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <svg className="w-4.5 h-4.5 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.336-5.22-5.22-5.22zm-6.78-7.433c-2.882 0-5.22 2.338-5.22 5.22 0 2.884 2.338 5.22 5.22 5.22s5.22-2.336 5.22-5.22c0-2.882-2.338-5.22-5.22-5.22zm-6.78 7.433c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.338-5.22-5.22-5.22z" />
              </svg>
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans">
                asana
              </span>
            </div>

            {/* 4. Spotify */}
            <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <div className="w-5.5 h-5.5 rounded-full bg-gray-900 flex items-center justify-center text-white shrink-0">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-sans">
                Spotify
              </span>
            </div>

            {/* 5. Gumroad (Duplicate as in design) */}
            <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans hover:opacity-80 transition-opacity">
              gumroad
            </span>

            {/* 6. Asana (Duplicate as in design) */}
            <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <svg className="w-4.5 h-4.5 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M18.78 12.653c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.336-5.22-5.22-5.22zm-6.78-7.433c-2.882 0-5.22 2.338-5.22 5.22 0 2.884 2.338 5.22 5.22 5.22s5.22-2.336 5.22-5.22c0-2.882-2.338-5.22-5.22-5.22zm-6.78 7.433c-2.882 0-5.22 2.336-5.22 5.22s2.338 5.22 5.22 5.22 5.22-2.34 5.22-5.22-2.338-5.22-5.22-5.22z" />
              </svg>
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight lowercase font-sans">
                asana
              </span>
            </div>

            {/* 7. Spotify (Duplicate as in design) */}
            <div className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <div className="w-5.5 h-5.5 rounded-full bg-gray-900 flex items-center justify-center text-white shrink-0">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight font-sans">
                Spotify
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}



