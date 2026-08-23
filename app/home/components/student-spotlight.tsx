"use client";

import Image from "next/image";

interface StudentSpotlightCard {
  quote: string;
  name: string;
  age: string;
  imageSrc: string;
  archBg: string;
  badgeBg: string;
}

const spotlightCards: StudentSpotlightCard[] = [
  {
    quote:
      '"Whether you\'re a beginner or an expert, DiveTo.AI provides excellent resources to help you achieve your goals"',
    name: "Jenna Kennedy",
    age: "8 years old",
    imageSrc: "/student-blue-fleece.png",
    archBg: "bg-[#CAD5FF]",
    badgeBg: "bg-[#5422E8]",
  },
  {
    quote:
      '"Streamlining processes and boosting efficiency is key to scaling your business effectively."',
    name: "Jenna Kennedy",
    age: "8 years old",
    imageSrc: "/student-white-top.png",
    archBg: "bg-[#FEF08A]",
    badgeBg: "bg-[#656E0D]",
  },
  {
    quote:
      '"Innovation drives success. At Innovatech, we leverage AI to transform ideas into reality."',
    name: "Jenna Kennedy",
    age: "8 years old",
    imageSrc: "/student-blue-fleece.png",
    archBg: "bg-[#BAE6FD]",
    badgeBg: "bg-[#0E5266]",
  },
];

export function StudentSpotlightSection() {
  return (
    <section className="w-full bg-[#4E1FE7] py-10 sm:py-12 lg:py-14 relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight mb-8 sm:mb-10 font-sans">
          Student Spotlight
        </h2>

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {spotlightCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-black/25 hover:-translate-y-1 group"
            >
              {/* Card Quote */}
              <div className="p-6 sm:p-7 pb-2 min-h-[110px]">
                <p className="text-gray-900 font-medium text-xs sm:text-sm leading-relaxed">
                  {card.quote}
                </p>
              </div>

              {/* Student Photo Section with Color Arc & Name Badge */}
              <div className="relative w-full h-[220px] sm:h-[240px] md:h-[250px] mt-auto flex items-end justify-center overflow-hidden">
                {/* Background Semicircle Arc */}
                <div
                  className={`absolute bottom-0 w-[84%] h-[82%] rounded-t-full ${card.archBg} pointer-events-none z-0`}
                />

                {/* Student Photo */}
                <div className="relative w-full h-full flex items-end justify-center z-10">
                  <Image
                    src={card.imageSrc}
                    alt={`${card.name} - ${card.age}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-contain object-bottom select-none drop-shadow-md"
                  />
                </div>

                {/* Floating Name Badge */}
                <div
                  className={`absolute bottom-3.5 left-4 z-20 ${card.badgeBg} text-white px-3.5 py-1.5 rounded-xl shadow-md select-none`}
                >
                  <p className="text-xs sm:text-sm font-bold leading-tight font-sans">
                    {card.name}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-white/80 font-medium leading-tight">
                    {card.age}
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
